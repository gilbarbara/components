import { CSSObject } from '@emotion/react';

import { parseFloatNumber } from '~/modules/helpers';

import { FloatingAlignment, FloatingPlacement, Position } from '~/types';

interface ElementDimensions {
  height: number;
  width: number;
}

export interface GetComputedPlacementOptions {
  preferredPlacements?: FloatingPlacement[];
}

export interface GetElementDimensionsResult {
  height: number;
  width: number;
}

export interface GetFloatingStylesOptions {
  distance?: number;
  offset?: number;
}

export const positionToDiretionMap = {
  auto: 'down',
  top: 'up',
  bottom: 'down',
  left: 'left',
  right: 'right',
} as const;

export function getComputedPlacement(
  placement: FloatingPlacement,
  triggerElement: HTMLElement | null,
  contentElement: HTMLElement | null,
  options: GetComputedPlacementOptions = {},
): FloatingPlacement {
  const { innerHeight: height, innerWidth: width } = window;
  const { preferredPlacements } = options;

  if (!triggerElement || !contentElement) {
    return placement === 'auto' ? 'bottom' : placement;
  }

  const triggerRect = triggerElement.getBoundingClientRect();
  const { height: contentHeight, width: contentWidth } = getElementDimensions(contentElement);

  const spaces = {
    top: triggerRect.top,
    bottom: height - triggerRect.bottom,
    left: triggerRect.left,
    right: width - triggerRect.right,
  };

  let computedPosition: Position;
  let computedAlignment: FloatingAlignment | undefined;

  if (placement === 'auto') {
    // Get all positions with sufficient space
    const positionsWithSpace = Object.entries(spaces).filter(
      ([_, availableSpace]) => availableSpace >= contentHeight,
    );

    // Check if 'bottom' is among the positions with sufficient space
    const bottomSpace = positionsWithSpace.find(([pos]) => pos === 'bottom');

    if (bottomSpace) {
      // If 'bottom' has enough space, use it
      computedPosition = 'bottom';
    } else {
      // Otherwise, sort remaining positions by available space and pick the best one
      const bestFit = positionsWithSpace
        .sort((a, b) => b[1] - a[1])
        .map(([pos]) => pos as Position);

      // Still default to 'bottom' if nothing works
      computedPosition = bestFit[0] || 'bottom';
    }
  } else {
    [computedPosition, computedAlignment] = placement.split('-') as [
      Position,
      FloatingAlignment | undefined,
    ];
  }

  // Check for horizontal overflow considering the full placement
  const wouldOverflowHorizontally = (pos: Position, alignment?: FloatingAlignment) => {
    let horizontalPosition: number;

    if (['left', 'right'].includes(pos)) {
      // For left/right placements, set the horizontal position
      horizontalPosition = pos === 'left' ? triggerRect.left - contentWidth : triggerRect.right;
    } else if (alignment) {
      horizontalPosition =
        alignment === 'start' ? triggerRect.left : triggerRect.right - contentWidth;
    } else {
      horizontalPosition = triggerRect.left + (triggerRect.width - contentWidth) / 2;
    }

    return horizontalPosition < 0 || horizontalPosition + contentWidth > width;
  };

  // Check for vertical overflow considering the full placement
  const wouldOverflowVertically = (pos: Position, alignment?: FloatingAlignment) => {
    let verticalPosition: number;

    if (['bottom', 'top'].includes(pos)) {
      // For top/bottom placements, set the vertical position
      verticalPosition = pos === 'top' ? triggerRect.top - contentHeight : triggerRect.bottom;
    } else if (alignment) {
      verticalPosition =
        alignment === 'start' ? triggerRect.top : triggerRect.bottom - contentHeight;
    } else {
      verticalPosition = triggerRect.top + (triggerRect.height - contentHeight) / 2;
    }

    return verticalPosition < 0 || verticalPosition + contentHeight > height;
  };

  // Check if the current computed placement would overflow
  if (
    !wouldOverflowHorizontally(computedPosition, computedAlignment) &&
    !wouldOverflowVertically(computedPosition, computedAlignment)
  ) {
    return `${computedPosition}${computedAlignment ? `-${computedAlignment}` : ''}` as FloatingPlacement;
  }

  const defaultPlacementsOrder =
    {
      auto: [
        'bottom',
        'bottom-start',
        'bottom-end',
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'left',
        'left-start',
        'left-end',
      ],
      bottom: ['bottom-end', 'bottom-start', 'top', 'top-start', 'top-end', 'right', 'left'],
      left: [
        'left-start',
        'left-end',
        'top-start',
        'top',
        'top-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'right',
      ],
      right: [
        'right-start',
        'right-end',
        'bottom-end',
        'bottom',
        'bottom-start',
        'top-end',
        'top',
        'top-start',
        'left',
      ],
      top: ['top-end', 'top-start', 'bottom', 'bottom-start', 'bottom-end', 'right', 'left'],
    }[computedPosition] || [];

  // Define fallback order based on the requested placement
  const placementsOrder = preferredPlacements ?? defaultPlacementsOrder;

  // Find the first available placement with the least overflow
  let lowestOverflow = Infinity;
  let bestPlacement: FloatingPlacement | null = null;

  for (const p of placementsOrder) {
    const [pos, align] = p.split('-') as [Position, FloatingAlignment | undefined];

    // Calculate overflow scores
    const horizontalOverflowAmount = wouldOverflowHorizontally(pos, align) ? 1 : 0;
    const verticalOverflowAmount = wouldOverflowVertically(pos, align) ? 1 : 0;
    const totalOverflow = horizontalOverflowAmount + verticalOverflowAmount;

    // Check if this placement has space on its primary axis
    const hasSpaceOnPrimaryAxis =
      pos === 'top' || pos === 'bottom'
        ? spaces[pos] >= contentHeight
        : spaces[pos] >= contentWidth;

    if (hasSpaceOnPrimaryAxis && totalOverflow < lowestOverflow) {
      lowestOverflow = totalOverflow;
      bestPlacement = p as FloatingPlacement;

      // If we found a placement with no overflow, use it immediately
      if (totalOverflow === 0) {
        break;
      }
    }
  }

  // If we found a best placement without an alignment but the original had one,
  // try to preserve the original alignment if possible
  if (bestPlacement && !bestPlacement.includes('-') && computedAlignment) {
    const candidatePlacement = `${bestPlacement}-${computedAlignment}` as FloatingPlacement;
    const [pos, align] = candidatePlacement.split('-') as [Position, FloatingAlignment];

    if (!wouldOverflowHorizontally(pos, align) && !wouldOverflowVertically(pos, align)) {
      return candidatePlacement;
    }
  }

  return bestPlacement ?? 'bottom';
}

/**
 * Gets the dimensions of an element with its margins
 */
export function getElementDimensions(contentElement: HTMLElement): ElementDimensions {
  const contentStyles = getComputedStyle(contentElement);

  const margin = Math.round(parseFloatNumber(contentStyles.margin));
  const marginX = Math.round(
    parseFloatNumber(contentStyles.marginLeft) + parseFloatNumber(contentStyles.marginRight),
  );
  const marginY = Math.round(
    parseFloatNumber(contentStyles.marginTop) + parseFloatNumber(contentStyles.marginBottom),
  );

  // Get dimensions from computed style and scroll dimensions
  const styleHeight = Math.round(parseFloatNumber(contentStyles.height));
  const styleWidth = Math.round(parseFloatNumber(contentStyles.width));
  const scrollHeight = Math.round(contentElement.scrollHeight);
  const scrollWidth = Math.round(contentElement.scrollWidth);

  // Use the largest value between style dimensions and scroll dimensions
  const height = Math.max(styleHeight, scrollHeight) + (marginY || margin);
  const width = Math.max(styleWidth, scrollWidth) + (marginX || margin);

  return { height, width };
}

/**
 * Returns computed styles for a floating element based on placement and distance.
 */
export function getFloatingStyles(
  placement: FloatingPlacement,
  options: GetFloatingStylesOptions = {},
): CSSObject {
  const { distance = 0, offset = 0 } = options;
  const styles: CSSObject = {};

  const [position, alignment] = placement.split('-') as [Position, FloatingAlignment | undefined];

  switch (position) {
    case 'bottom': {
      styles.top = '100%';
      styles.marginTop = distance;

      if (alignment === 'start') {
        styles.left = offset;
      } else if (alignment === 'end') {
        styles.right = offset;
      } else {
        styles.left = '50%';
        styles.transform = 'translateX(-50%)';
      }

      break;
    }
    case 'top': {
      styles.bottom = '100%';
      styles.marginBottom = distance;

      if (alignment === 'start') {
        styles.left = offset;
      } else if (alignment === 'end') {
        styles.right = offset;
      } else {
        styles.left = '50%';
        styles.transform = 'translateX(-50%)';
      }

      break;
    }
    case 'left': {
      styles.right = '100%';
      styles.marginRight = distance;

      if (alignment === 'start') {
        styles.top = offset;
      } else if (alignment === 'end') {
        styles.bottom = offset;
      } else {
        styles.top = '50%';
        styles.transform = 'translateY(-50%)';
      }

      break;
    }
    case 'right': {
      styles.left = '100%';
      styles.marginLeft = distance;

      if (alignment === 'start') {
        styles.top = offset;
      } else if (alignment === 'end') {
        styles.bottom = offset;
      } else {
        styles.top = '50%';
        styles.transform = 'translateY(-50%)';
      }

      break;
    }
  }

  return styles;
}
