import { useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit, px } from '@gilbarbara/helpers';
import { useSetState } from '@gilbarbara/hooks';
import { SetRequired } from '@gilbarbara/types';

import { getGrowAnimation, getSlideAnimation } from '~/modules/animations';
import {
  getComputedPlacement,
  getElementDimensions,
  GetElementDimensionsResult,
  getFloatingStyles,
  positionToDiretionMap,
} from '~/modules/positioning';
import { getStyledOptions, getStyles } from '~/modules/system';

import { AnimationDirection, FloatingPlacement, Position, WithTheme } from '~/types';

import { FlyoutProps, useFlyout } from './useFlyout';

const StyledWrapper = styled(
  'div',
  getStyledOptions(),
)<
  SetRequired<
    Pick<FlyoutProps, 'animationType' | 'direction' | 'distance' | 'initialSize' | 'placement'>,
    'animationType' | 'direction' | 'distance' | 'placement'
  > & {
    isOpen: boolean;
  } & WithTheme
>(props => {
  const { animationType, direction, distance, initialSize = 0, isOpen, placement, theme } = props;

  const isVertical = ['down', 'up'].includes(direction);
  let startSize;

  if (animationType === 'grow') {
    startSize = isVertical
      ? css`
          height: ${px(initialSize)};
        `
      : css`
          width: ${px(initialSize)};
        `;
  }

  const floatingStyles = getFloatingStyles(placement, { distance });

  return css`
    overflow: hidden;
    z-index: ${theme.zIndex.md};
    ${floatingStyles};
    ${getStyles(omit(props, 'direction'))};
    ${!isOpen &&
    css`
      ${startSize};
      pointer-events: none;
      visibility: ${animationType === 'grow' && initialSize ? 'visible' : 'hidden'};
    `};
  `;
});

const StyledFlyout = styled(
  'div',
  getStyledOptions('duration', 'open', 'type'),
)<
  SetRequired<
    Omit<FlyoutProps, 'open' | 'triggerRef'>,
    'animationEnterDuration' | 'animationExitDuration' | 'animationType' | 'direction'
  > & {
    dimensions: GetElementDimensionsResult | null;
    isOpen: boolean;
    isRendering: boolean;
  }
>(props => {
  const {
    animationEnterDuration,
    animationExitDuration,
    animationType,
    dimensions,
    direction,
    initialSize,
    isOpen,
    isRendering,
    ...rest
  } = props;

  const isVertical = ['down', 'up'].includes(direction);
  const transform = isVertical
    ? `translateY(${direction === 'down' ? '-100%' : '100%'})`
    : `translateX(${direction === 'left' ? '100%' : '-100%'})`;

  if (animationType === 'grow' && dimensions) {
    const endSize = isVertical ? dimensions.height : dimensions.width;

    return css`
      ${isRendering &&
      css`
        animation: ${getGrowAnimation(direction, endSize, isOpen, initialSize)}
          ${isOpen ? animationEnterDuration : animationExitDuration}ms ease-in-out forwards;
        ${getStyles(rest)};
      `};
    `;
  } else if (animationType === 'scale') {
    let transformStart = '';
    let transformEnd = '';
    let transformOrigin = '';

    switch (direction) {
      case 'up': {
        transformStart = 'scaleY(0)';
        transformEnd = 'scaleY(1)';
        transformOrigin = 'bottom';

        break;
      }
      case 'down': {
        transformStart = 'scaleY(0)';
        transformEnd = 'scaleY(1)';
        transformOrigin = 'top';

        break;
      }
      case 'left': {
        transformStart = 'scaleX(0)';
        transformEnd = 'scaleX(1)';
        transformOrigin = 'right';

        break;
      }
      case 'right': {
        transformStart = 'scaleX(0)';
        transformEnd = 'scaleX(1)';
        transformOrigin = 'left center';

        break;
      }
      // No default
    }

    return css`
      transform: ${transformStart};
      transform-origin: ${transformOrigin};
      transition: all ${isOpen ? animationEnterDuration : animationExitDuration}ms;
      ${isRendering &&
      css`
        transform: ${transformEnd};
        ${getStyles(rest)};
      `};
    `;
  }

  return css`
    ${isRendering &&
    css`
      animation: ${getSlideAnimation(direction, isOpen)}
        ${isOpen ? animationEnterDuration : animationExitDuration}ms ease-in-out forwards;
      ${getStyles(rest)};
    `};
    transform: ${transform};
  `;
});

interface State {
  computedDirection: AnimationDirection;
  computedPlacement: FloatingPlacement | null;
  floaterDimensions: GetElementDimensionsResult | null;
  isRendering: boolean;
  startingSize: number | undefined;
}

export function Flyout(props: FlyoutProps) {
  const { componentProps, getDataAttributes } = useFlyout(props);
  const {
    animationEnterDuration,
    animationExitDuration,
    animationType,
    children,
    direction,
    initialSize,
    onHide,
    onShow,
    open,
    placement,
    triggerRef,
    ...rest
  } = componentProps;
  const flyoutRef = useRef<HTMLDivElement>(null);
  const previousOpen = useRef(open);

  const [position] = placement.split('-') as [Position | 'auto'];
  const initialDirection = direction ?? positionToDiretionMap[position];

  const [
    { computedDirection, computedPlacement, floaterDimensions, isRendering, startingSize },
    setState,
  ] = useSetState<State>({
    computedDirection: initialDirection,
    computedPlacement: null,
    floaterDimensions: null,
    startingSize: undefined,
    isRendering: open,
  });

  useEffect(() => {
    if (flyoutRef.current) {
      setState({
        floaterDimensions: getElementDimensions(flyoutRef.current),
      });
    }
  }, [setState]);

  // Handle open/close
  useEffect(() => {
    if (previousOpen.current === open) {
      return undefined;
    }

    if (open) {
      setState({ isRendering: true });
      onShow?.();

      previousOpen.current = open;

      return undefined;
    }

    const timer = setTimeout(
      () => {
        setState({ isRendering: false });
        onHide?.();

        previousOpen.current = open;
      },
      open ? animationEnterDuration : animationExitDuration,
    );

    return () => clearTimeout(timer);
  }, [animationEnterDuration, animationExitDuration, onHide, onShow, open, setState]);

  // Handle placement/direction
  useEffect(() => {
    const newPlacement = getComputedPlacement(
      placement,
      triggerRef?.current ?? null,
      flyoutRef.current,
    );
    const [newPosition] = newPlacement.split('-') as [Position];

    setState({
      computedDirection: positionToDiretionMap[newPosition],
      computedPlacement: newPlacement,
      startingSize: initialSize,
    });
  }, [direction, initialDirection, initialSize, placement, setState, triggerRef]);

  return (
    <StyledWrapper
      ref={flyoutRef}
      animationType={animationType}
      {...getDataAttributes('Flyout')}
      direction={direction ?? computedDirection}
      initialSize={startingSize}
      isOpen={isRendering}
      placement={computedPlacement ?? placement}
      {...rest}
    >
      <StyledFlyout
        animationEnterDuration={animationEnterDuration}
        animationExitDuration={animationExitDuration}
        animationType={animationType}
        {...getDataAttributes('FlyoutPanel')}
        dimensions={floaterDimensions}
        direction={direction ?? computedDirection}
        initialSize={initialSize}
        isOpen={open}
        isRendering={isRendering}
      >
        {children}
      </StyledFlyout>
    </StyledWrapper>
  );
}

Flyout.displayName = 'Flyout';

export { defaultProps, type FlyoutProps } from './useFlyout';
