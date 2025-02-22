import { forwardRef, isValidElement, useEffect, useMemo, useRef, useState } from 'react';
import innerText from 'react-innertext';
import { css } from '@emotion/react';
import styled, { CSSObject } from '@emotion/styled';
import { omit, px } from '@gilbarbara/helpers';
import is from 'is-lite';

import { useResizeScrollHandler } from '~/hooks/useResizeScrollHandler';
import { fadeIn } from '~/modules/animations';
import { getColorTokens } from '~/modules/colors';
import { getComputedPlacement, getFloatingStyles } from '~/modules/positioning';
import { baseStyles, getStyledOptions, getStyles } from '~/modules/system';

import { Text } from '~/components/Text';

import { FloatingAlignment, FloatingPlacement, Position, Sizes, WithTheme } from '~/types';

import {
  TooltipArrowProps,
  TooltipBodyProps,
  TooltipColorProps,
  TooltipProps,
  TooltipSharedProps,
  useTooltip,
} from './useTooltip';

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

const StyledArrow = styled.span<
  TooltipSharedProps & Required<TooltipArrowProps> & TooltipColorProps
>(props => {
  const { arrowBase, arrowLength, arrowMargin, bg, placement } = props;
  const [position, align] = placement.split('-') as [Position, FloatingAlignment | undefined];

  const borderSize = arrowBase / 2;
  const arrowStyles: CSSObject = {};
  const styles: CSSObject = {};

  switch (position) {
    case 'bottom': {
      arrowStyles.borderLeft = `${px(borderSize)} solid transparent`;
      arrowStyles.borderRight = `${px(borderSize)} solid transparent`;
      arrowStyles.borderBottom = `${px(arrowLength)} solid ${bg}`;

      styles.top = `-${px(arrowLength)}`;
      styles.height = arrowLength;
      styles.width = arrowBase;

      break;
    }
    case 'left': {
      arrowStyles.borderTop = `${px(borderSize)} solid transparent`;
      arrowStyles.borderBottom = `${px(borderSize)} solid transparent`;
      arrowStyles.borderLeft = `${px(arrowLength)} solid ${bg}`;

      styles.right = `-${px(arrowLength)}`;
      styles.height = arrowBase;
      styles.width = arrowLength;

      break;
    }
    case 'right': {
      arrowStyles.borderTop = `${px(borderSize)} solid transparent`;
      arrowStyles.borderBottom = `${px(borderSize)} solid transparent`;
      arrowStyles.borderRight = `${px(arrowLength)} solid ${bg}`;

      styles.left = `-${px(arrowLength)}`;
      styles.height = arrowBase;
      styles.width = arrowLength;

      break;
    }
    case 'top': {
      arrowStyles.borderLeft = `${px(borderSize)} solid transparent`;
      arrowStyles.borderRight = `${px(borderSize)} solid transparent`;
      arrowStyles.borderTop = `${px(arrowLength)} solid ${bg}`;

      styles.bottom = `-${px(arrowLength)}`;
      styles.height = arrowLength;
      styles.width = arrowBase;

      break;
    }
    // No default
  }

  if (['bottom', 'top'].includes(position)) {
    if (align === 'start') {
      styles.left = arrowMargin;
    } else if (align === 'end') {
      styles.right = arrowMargin;
    } else {
      styles.left = '50%';
      styles.transform = 'translateX(-50%)';
    }
  } else if (['left', 'right'].includes(position)) {
    if (align === 'start') {
      styles.top = arrowMargin;
    } else if (align === 'end') {
      styles.bottom = arrowMargin;
    } else {
      styles.top = '50%';
      styles.transform = 'translateY(-50%)';
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
)<Omit<TooltipBodyProps, 'content' | 'getDataAttributes' | 'setRendering'>>(props => {
  const {
    arrowBase,
    arrowLength,
    arrowMargin,
    bg,
    color,
    delay,
    distance,
    duration,
    easing,
    placement,
    size,
    theme,
    wrap,
    zIndex,
  } = props;
  const { spacing } = theme;

  const styles = getFloatingStyles(placement, {
    distance: arrowLength + distance,
    // 1px is added to compensate for the arrow being 1px inside the tooltip
    offset: -(arrowMargin - arrowBase / 2 + 1),
  });

  const wrapWidths: Record<Sizes, string> = { sm: '100px', md: '200px', lg: '320px' };
  const width = wrap ? wrapWidths[wrap] : undefined;

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

const TooltipBody = forwardRef<HTMLDivElement, TooltipBodyProps>((props, ref) => {
  const {
    arrowBase,
    arrowLength,
    arrowMargin,
    bg,
    bold,
    color,
    content,
    distance,
    getDataAttributes,
    italic,
    placement,
    radius,
    setRendering,
    shadow,
    size,
    style,
    theme,
    wrap,
    ...rest
  } = props;

  useEffect(() => {
    setRendering(true);

    return () => setRendering(false);
  }, [setRendering]);

  return (
    <StyledBody
      ref={ref}
      arrowBase={arrowBase}
      arrowLength={arrowLength}
      arrowMargin={arrowMargin}
      bg={bg}
      color={color}
      distance={distance}
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
        arrowBase={arrowBase}
        arrowLength={arrowLength}
        arrowMargin={arrowMargin}
        bg={bg}
        color={color}
        distance={distance}
        {...getDataAttributes('TooltipArrow')}
        placement={placement}
        theme={theme}
      />
    </StyledBody>
  );
});

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
    onHide,
    onShow,
    open,
    placement,
    theme,
    title,
    ...rest
  } = componentProps;
  const [isOpen, setOpen] = useState(open ?? false);
  const [computedPlacement, setComputedPlacement] = useState<FloatingPlacement | null>(null);
  const [isRendering, setRendering] = useState(false);

  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const previousIsOpen = useRef(isOpen);
  const previousPlacement = useRef<FloatingPlacement | null>(null);

  const label = useMemo(() => ariaLabel ?? innerText(content), [ariaLabel, content]);

  const { mainColor, textColor } = getColorTokens(bg, color, theme);

  // Handle open prop
  useEffect(() => {
    setOpen(open ?? false);
  }, [open]);

  // Handle callbacks
  useEffect(() => {
    if (previousIsOpen.current !== isOpen) {
      isOpen ? onShow?.() : onHide?.();

      previousIsOpen.current = isOpen;
    }
  }, [isOpen, onHide, onShow]);

  // Handle placement
  useEffect(() => {
    if (!isRendering) {
      return;
    }

    const nextPlacement = getComputedPlacement(placement, triggerRef.current, tooltipRef.current);

    setComputedPlacement(nextPlacement);

    previousPlacement.current = placement;
  }, [isRendering, placement]);

  // Handle placement for window resize/scroll
  useResizeScrollHandler(() => {
    const nextPlacement = getComputedPlacement(placement, triggerRef.current, tooltipRef.current);

    setComputedPlacement(nextPlacement);
  }, !isRendering);

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
      ref={triggerRef}
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
          ref={tooltipRef}
          bg={mainColor}
          color={textColor}
          content={content}
          getDataAttributes={getDataAttributes}
          placement={computedPlacement ?? placement}
          setRendering={setRendering}
          theme={theme}
          {...rest}
        />
      )}
    </StyledTooltip>
  );
}

Tooltip.displayName = 'Tooltip';

export { defaultProps, type TooltipProps } from './useTooltip';
