import { isValidElement, useEffect, useMemo, useState } from 'react';
import innerText from 'react-innertext';
import { css } from '@emotion/react';
import styled, { CSSObject } from '@emotion/styled';
import { omit, px } from '@gilbarbara/helpers';
import { SetRequired } from '@gilbarbara/types';
import is from 'is-lite';

import { UseThemeReturn } from '~/hooks/useTheme';

import { fadeIn } from '~/modules/animations';
import { getColorTokens } from '~/modules/colors';
import { baseStyles, getStyledOptions, getStyles } from '~/modules/system';

import { Text } from '~/components/Text';

import { WithPadding, WithRadius, WithShadow, WithTextSize, WithTheme } from '~/types';

import {
  TooltipAnimationProps,
  TooltipArrowProps,
  TooltipColorProps,
  TooltipProps,
  TooltipSharedProps,
  useTooltip,
} from './useTooltip';

const arrowSize = 6;

const StyledTooltip = styled(
  'div',
  getStyledOptions(),
)<WithTheme>(
  props => css`
    ${baseStyles(props.theme)};
    display: inline-flex;
    line-height: 1;
    position: relative;
  `,
);

const StyledArrow = styled.span<TooltipSharedProps & TooltipArrowProps & TooltipColorProps>(
  props => {
    const { arrowLength, arrowMargin, bg, placement } = props;
    const [position, align] = placement.split('-');

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
        styles.right = arrowMargin;
      }
    } else if (['left', 'right'].includes(position)) {
      if (align === 'start') {
        styles.top = arrowMargin;
      } else if (align === 'middle') {
        styles.top = '50%';
        styles.transform = 'translateY(-50%)';
      } else {
        styles.bottom = arrowMargin;
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
  },
);

const StyledBody = styled(
  'span',
  getStyledOptions(),
)<
  TooltipSharedProps &
    TooltipAnimationProps &
    TooltipArrowProps &
    TooltipColorProps &
    WithPadding &
    WithRadius &
    WithShadow &
    WithTextSize &
    WithTheme
>(props => {
  const {
    arrowDistance,
    arrowLength,
    bg,
    color,
    delay,
    duration,
    easing,
    placement,
    size,
    theme,
    wrap,
    zIndex,
  } = props;
  const { spacing } = theme;
  const arrowSpacing = arrowLength + arrowDistance;
  const [position, align] = placement.split('-');

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
    case 'xs':
    case 'sm': {
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
    ${styles};
    ${getStyles(omit(props, 'wrap'), { useFontSize: true })};
  `;
});

const StyledContent = styled(Text)`
  position: relative;
  z-index: 10;
`;

function TooltipBody(
  props: SetRequired<Omit<TooltipProps, 'children' | 'open'>, 'placement'> &
    TooltipAnimationProps &
    TooltipArrowProps &
    TooltipColorProps &
    UseThemeReturn,
) {
  const {
    arrowDistance,
    arrowLength,
    arrowMargin,
    bg,
    bold,
    color,
    content,
    getDataAttributes,
    italic,
    placement,
    radius,
    shadow,
    size,
    style,
    theme,
    wrap,
    ...rest
  } = props;

  return (
    <StyledBody
      arrowDistance={arrowDistance}
      arrowLength={arrowLength}
      arrowMargin={arrowMargin}
      bg={bg}
      color={color}
      {...getDataAttributes('TooltipBody')}
      placement={placement}
      radius={radius}
      shadow={shadow}
      size={size}
      style={style}
      theme={theme}
      wrap={wrap}
      {...rest}
    >
      {isValidElement(content) ? (
        content
      ) : (
        <StyledContent
          bold={bold}
          {...getDataAttributes('TooltipContent')}
          italic={italic}
          size={size}
        >
          {content}
        </StyledContent>
      )}
      <StyledArrow
        arrowDistance={arrowDistance}
        arrowLength={arrowLength}
        arrowMargin={arrowMargin}
        bg={bg}
        color={color}
        {...getDataAttributes('TooltipArrow')}
        placement={placement}
        theme={theme}
      />
    </StyledBody>
  );
}

export function Tooltip(props: TooltipProps) {
  const { componentProps, getDataAttributes } = useTooltip(props);
  const {
    ariaLabel,
    bg,
    children,
    color,
    content,
    disabled,
    eventType,
    open,
    theme,
    title,
    ...rest
  } = componentProps;
  const [isOpen, setOpen] = useState(open ?? false);

  const label = useMemo(() => ariaLabel ?? innerText(content), [ariaLabel, content]);

  const { mainColor, textColor } = getColorTokens(bg, color, theme);

  useEffect(() => {
    setOpen(open ?? false);
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
      {...getDataAttributes('Tooltip')}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="tooltip"
      theme={theme}
      title={title}
      {...rest}
    >
      {children}
      {isOpen && (
        <TooltipBody
          getDataAttributes={getDataAttributes}
          {...componentProps}
          bg={mainColor}
          color={textColor}
          theme={theme}
        />
      )}
    </StyledTooltip>
  );
}

Tooltip.displayName = 'Tooltip';

export { defaultProps, type TooltipProps } from './useTooltip';
