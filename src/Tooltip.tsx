import { CSSProperties, isValidElement, ReactNode, useEffect, useMemo, useState } from 'react';
import innerText from 'react-innertext';
import { css, useTheme } from '@emotion/react';
import styled, { CSSObject } from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';
import is from 'is-lite';

import { fadeIn } from './modules/animations';
import { getColorVariant, getTheme, px } from './modules/helpers';
import { textDefaultOptions } from './modules/options';
import {
  baseStyles,
  getStyledOptions,
  radiusStyles,
  shadowStyles,
  textStyles,
} from './modules/system';
import { Text } from './Text';
import {
  Placement,
  Sizes,
  WithChildren,
  WithColor,
  WithOpen,
  WithRadius,
  WithShadow,
  WithTextOptions,
  WithTextSize,
} from './types';

interface SharedProps {
  /** @default middle */
  align: 'start' | 'middle' | 'end';
  /** @default bottom */
  position: Placement;
  /**
   * Optional title for the tooltip.
   */
  title?: string;
  /** Content wrapping */
  wrap?: Sizes;
  /** @default 100 */
  zIndex?: number;
}

interface AnimationProps {
  /**
   * The delay before the tooltip is shown in milliseconds.
   * @default 180
   */
  delay: number;
  /**
   * The duration of the animation in milliseconds.
   * default 260
   */
  duration: number;
  /**
   * The easing function.
   * @default 'ease-in-out'
   */
  easing: string;
}

interface ArrowProps {
  /**
   * The distance between the arrow and the target.
   * @default 4
   */
  arrowDistance: number;
  /** @default 8 */
  arrowLength: number;
  /**
   * The margin for the arrow with start/end alignment.
   * @default 4 */
  arrowMargin: number;
}

interface ColorProps {
  bg: string;
  color: string;
}

export interface TooltipProps
  extends Partial<SharedProps>,
    Partial<AnimationProps>,
    Partial<ArrowProps>,
    WithChildren,
    WithColor,
    WithOpen,
    WithRadius,
    WithShadow,
    WithTextOptions {
  /**
   * Optional aria label for the tooltip.
   * @default innerText of the content
   */
  ariaLabel?: string;
  content: ReactNode;
  /**
   * Disable the tooltip.
   * @default false
   */
  disabled?: boolean;
  /**
   * Trigger type.
   * @default hover
   */
  eventType?: 'click' | 'hover';
  style?: CSSProperties;
}

const arrowSize = 6;

const StyledTooltip = styled('div', getStyledOptions())`
  ${baseStyles};
  display: inline-flex;
  line-height: 1;
  position: relative;
`;

const StyledArrow = styled.span<SharedProps & ArrowProps & ColorProps>(props => {
  const { align, arrowDistance, arrowLength, arrowMargin, bg, position } = props;

  const arrowStyles: CSSObject = {};
  const styles: CSSObject = {};

  switch (position) {
    case 'bottom': {
      arrowStyles.borderLeft = `${px(arrowSize)} solid transparent`;
      arrowStyles.borderRight = `${px(arrowSize)} solid transparent`;
      arrowStyles.borderBottom = `${px(arrowLength)} solid ${bg}`;

      styles.top = `-${px(arrowLength)}`;
      styles.height = arrowLength;
      styles.width = arrowSize * 2;

      break;
    }
    case 'left': {
      arrowStyles.borderTop = `${px(arrowSize)} solid transparent`;
      arrowStyles.borderBottom = `${px(arrowSize)} solid transparent`;
      arrowStyles.borderLeft = `${px(arrowLength)} solid ${bg}`;

      styles.right = `-${px(arrowLength)}`;
      styles.height = arrowSize * 2;
      styles.width = arrowLength;

      break;
    }
    case 'right': {
      arrowStyles.borderTop = `${px(arrowSize)} solid transparent`;
      arrowStyles.borderBottom = `${px(arrowSize)} solid transparent`;
      arrowStyles.borderRight = `${px(arrowLength)} solid ${bg}`;

      styles.left = `-${px(arrowLength)}`;
      styles.height = arrowSize * 2;
      styles.width = arrowLength;

      break;
    }
    case 'top': {
      arrowStyles.borderLeft = `${px(arrowSize)} solid transparent`;
      arrowStyles.borderRight = `${px(arrowSize)} solid transparent`;
      arrowStyles.borderTop = `${px(arrowLength)} solid ${bg}`;

      styles.bottom = `-${px(arrowLength)}`;
      styles.height = arrowLength;
      styles.width = arrowSize * 2;

      break;
    }
    // No default
  }

  if (['bottom', 'top'].includes(position)) {
    if (align === 'start') {
      styles.left = arrowMargin;
    } else if (align === 'middle') {
      styles.left = '50%';
      styles.transform = 'translateX(-50%)';
    } else {
      styles.right = arrowDistance;
    }
  } else if (['left', 'right'].includes(position)) {
    if (align === 'start') {
      styles.top = arrowDistance;
    } else if (align === 'middle') {
      styles.top = '50%';
      styles.transform = 'translateY(-50%)';
    } else {
      styles.bottom = arrowDistance;
    }
  }

  return css`
    display: block;
    position: absolute;
    z-index: 5;
    ${styles};

    &:before {
      content: '';
      display: block;
      height: 0;
      width: 0;
      ${arrowStyles};
    }
  `;
});

const StyledBody = styled(
  'span',
  getStyledOptions(),
)<SharedProps & AnimationProps & ArrowProps & ColorProps & WithRadius & WithShadow & WithTextSize>(
  props => {
    const {
      align,
      arrowDistance,
      arrowLength,
      bg,
      color,
      delay,
      duration,
      easing,
      position,
      size,
      wrap,
      zIndex = 100,
    } = props;
    const { spacing } = getTheme(props);
    const arrowSpacing = arrowLength + arrowDistance;

    const styles: CSSObject = {};

    if (align === 'start') {
      if (['left', 'right'].includes(position)) {
        styles.top = arrowDistance;
      } else {
        styles.left = 0;
      }
    } else if (align === 'middle') {
      if (['left', 'right'].includes(position)) {
        styles.top = '50%';
        styles.transform = 'translateY(-50%)';
      } else {
        styles.left = '50%';
        styles.transform = 'translateX(-50%)';
      }
    } else if (['left', 'right'].includes(position)) {
      styles.bottom = arrowDistance;
    } else {
      styles.right = arrowDistance;
    }

    switch (position) {
      case 'bottom': {
        styles.marginTop = arrowSpacing;
        styles.top = '100%';

        break;
      }
      case 'left': {
        styles.right = '100%';
        styles.marginRight = arrowSpacing;

        break;
      }
      case 'right': {
        styles.left = '100%';
        styles.marginLeft = arrowSpacing;

        break;
      }
      case 'top': {
        styles.bottom = '100%';
        styles.marginBottom = arrowSpacing;

        break;
      }
    }

    switch (size) {
      case 'small':
      case 'mid': {
        styles.padding = `${spacing.xxs} ${spacing.xs}`;
        break;
      }
      default: {
        styles.padding = `${spacing.xs} ${spacing.sm}`;
        break;
      }
    }

    let width;

    switch (wrap) {
      case 'sm': {
        width = '100px';
        break;
      }
      case 'md': {
        width = '200px';
        break;
      }
      case 'lg': {
        width = '320px';
        break;
      }
    }

    return css`
      animation: ${fadeIn} ${duration}ms forwards ${easing};
      animation-delay: ${delay}ms;
      background-color: ${bg};
      color: ${color};
      opacity: 0;
      position: absolute;
      text-align: center;
      white-space: ${wrap ? 'initial' : 'nowrap'};
      width: ${width};
      z-index: ${zIndex};
      ${radiusStyles(props)};
      ${shadowStyles(props, true)};
      ${textStyles(props)};
      ${styles};
    `;
  },
);

const StyledContent = styled(Text)`
  position: relative;
  z-index: 10;
`;

function TooltipBody(
  props: Omit<TooltipProps, 'children' | 'open'> & AnimationProps & ArrowProps & ColorProps,
) {
  const {
    align = 'middle',
    arrowDistance,
    arrowLength,
    arrowMargin,
    bg,
    bold,
    color,
    content,
    italic,
    position = 'right',
    radius = 'xxs',
    shadow,
    size = 'mid',
    style,
    wrap,
    ...rest
  } = props;

  return (
    <StyledBody
      align={align}
      arrowDistance={arrowDistance}
      arrowLength={arrowLength}
      arrowMargin={arrowMargin}
      bg={bg}
      color={color}
      data-component-name="TooltipBody"
      position={position}
      radius={radius}
      shadow={shadow}
      size={size}
      style={style}
      wrap={wrap}
      {...rest}
    >
      {isValidElement(content) ? (
        content
      ) : (
        <StyledContent bold={bold} data-component-name="TooltipContent" italic={italic} size={size}>
          {content}
        </StyledContent>
      )}
      <StyledArrow
        align={align}
        arrowDistance={arrowDistance}
        arrowLength={arrowLength}
        arrowMargin={arrowMargin}
        bg={bg}
        color={color}
        data-component-name="TooltipArrow"
        position={position}
      />
    </StyledBody>
  );
}

export function Tooltip(props: TooltipProps): JSX.Element {
  const {
    ariaLabel,
    arrowDistance = 4,
    arrowLength = 8,
    arrowMargin = 4,
    children,
    content,
    delay = 180,
    disabled = false,
    duration = 260,
    easing = 'ease-in-out',
    eventType = 'hover',
    open,
    shade,
    title,
    variant = 'gray',
  } = props;
  const [isOpen, setOpen] = useState(open || false);

  const { variants } = getTheme({ theme: useTheme() });

  const label = useMemo(() => ariaLabel ?? innerText(content), [ariaLabel, content]);

  const { bg, color } = getColorVariant(variant, shade, variants);

  useEffect(() => {
    setOpen(open || false);
  }, [open]);

  const handleClick = () => {
    if (eventType === 'click' && !disabled) {
      setOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (eventType === 'hover' && !is.boolean(open) && !disabled) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (eventType === 'hover' && !is.boolean(open) && !disabled) {
      setOpen(false);
    }
  };

  return (
    <StyledTooltip
      aria-label={label}
      data-component-name="Tooltip"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="tooltip"
      title={title}
    >
      {children}
      {isOpen && (
        <TooltipBody
          {...props}
          arrowDistance={arrowDistance}
          arrowLength={arrowLength}
          arrowMargin={arrowMargin}
          bg={bg}
          color={color}
          delay={delay}
          duration={duration}
          easing={easing}
        />
      )}
    </StyledTooltip>
  );
}

Tooltip.defaultProps = {
  ...omit(textDefaultOptions, 'size'),
  align: 'middle',
  arrowDistance: 4,
  arrowMargin: 4,
  arrowLength: 8,
  delay: 180,
  disabled: false,
  duration: 260,
  easing: 'ease-in-out',
  eventType: 'hover',
  position: 'bottom',
  radius: 'xxs',
  shade: 'dark',
  size: 'mid',
  variant: 'gray',
  zIndex: 100,
} as const;
