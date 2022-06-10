import { CSSProperties, isValidElement, ReactNode, useEffect, useRef, useState } from 'react';
import innerText from 'react-innertext';
import { css, useTheme } from '@emotion/react';
import styled, { CSSObject } from '@emotion/styled';
import is from 'is-lite';

import { fadeIn } from './modules/animations';
import { getColorVariant, getTheme, px } from './modules/helpers';
import { baseStyles, getStyledOptions } from './modules/system';
import { Text } from './Text';
import { Sizes, WithChildren, WithColor, WithOpen, WithTextOptions, WithTextSize } from './types';

interface SharedProps {
  /** @default middle */
  align: 'start' | 'middle' | 'end';
  /** @default bottom */
  position: 'bottom' | 'left' | 'right' | 'top';
  /** Content wrapping */
  wrap?: Sizes;
}

interface ColorProps {
  bg: string;
  color: string;
}

export interface TooltipProps
  extends Partial<SharedProps>,
    WithChildren,
    WithColor,
    WithOpen,
    WithTextOptions {
  content: ReactNode;
  style?: CSSProperties;
}

const arrowDistance = -3;
const arrowSize = 10;
const arrowSpacing = arrowSize + 2;

const StyledTooltip = styled('span', getStyledOptions())`
  ${baseStyles};
  display: inline-flex;
  line-height: 1;
  position: relative;
`;

const StyledArrow = styled.span<SharedProps & ColorProps>(props => {
  const { align, bg, position } = props;

  const styles: CSSObject = {};
  const distance = '10px';
  const offset = '-7px';
  let arrowTranslate = '';

  switch (position) {
    case 'bottom': {
      styles.top = offset;
      arrowTranslate = 'translate(-2px, 2px)';

      break;
    }
    case 'left': {
      styles.right = offset;
      arrowTranslate = 'translate(-2px, -2px)';

      break;
    }
    case 'right': {
      styles.left = offset;
      arrowTranslate = 'translate(2px, 2px)';

      break;
    }
    case 'top': {
      styles.bottom = offset;
      arrowTranslate = 'translate(2px, -2px)';

      break;
    }
    // No default
  }

  if (['bottom', 'top'].includes(position)) {
    if (align === 'start') {
      styles.left = distance;
    } else if (align === 'middle') {
      styles.left = '50%';
      styles.transform = 'translateX(-50%)';
    } else {
      styles.right = distance;
    }
  } else if (['left', 'right'].includes(position)) {
    if (align === 'start') {
      styles.top = distance;
    } else if (align === 'middle') {
      styles.top = '50%';
      styles.transform = 'translateY(-50%)';
    } else {
      styles.bottom = distance;
    }
  }

  return css`
    display: block;
    height: ${px(arrowSize)};
    position: absolute;
    width: ${px(arrowSize)};
    z-index: 5;
    ${styles};

    &:before {
      background-color: ${bg};
      border-radius: 1px;
      content: '';
      display: block;
      height: ${px(arrowSize)};
      position: absolute;
      transform: rotate(-45deg) ${arrowTranslate};
      width: ${px(arrowSize)};
    }
  `;
});

const StyledBody = styled(
  'span',
  getStyledOptions(),
)<SharedProps & ColorProps & WithTextSize>(props => {
  const { align, bg, color, position, size, wrap } = props;
  const { radius, spacing } = getTheme(props);

  const styles: CSSObject = {};

  if (align === 'start') {
    if (['left', 'right'].includes(position)) {
      styles.top = px(arrowDistance);
    } else {
      styles.left = px(arrowDistance);
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
    styles.bottom = px(arrowDistance);
  } else {
    styles.right = px(arrowDistance);
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
    animation: ${fadeIn} 0.2s forwards;
    background-color: ${bg};
    border-radius: ${radius.xxs};
    color: ${color};
    position: absolute;
    text-align: center;
    white-space: ${wrap ? 'initial' : 'nowrap'};
    width: ${width};
    ${styles};
  `;
});

const StyledContent = styled(Text)`
  position: relative;
  z-index: 10;
`;

function TooltipBody(props: Omit<TooltipProps, 'children' | 'open'> & ColorProps) {
  const {
    align = 'middle',
    bg,
    bold,
    color,
    content,
    position = 'right',
    size = 'mid',
    style,
    wrap,
  } = props;

  return (
    <StyledBody
      align={align}
      bg={bg}
      color={color}
      data-component-name="TooltipBody"
      position={position}
      size={size}
      style={style}
      wrap={wrap}
    >
      {isValidElement(content) ? (
        content
      ) : (
        <StyledContent bold={bold} data-component-name="TooltipContent" size={size}>
          {content}
        </StyledContent>
      )}
      <StyledArrow
        align={align}
        bg={bg}
        color={color}
        data-component-name="TooltipArrow"
        position={position}
      />
    </StyledBody>
  );
}

export function Tooltip(props: TooltipProps): JSX.Element {
  const { children, content, open, shade, variant = 'gray' } = props;
  const isActive = useRef(false);
  const [isOpen, setOpen] = useState(open || false);

  const { variants } = getTheme({ theme: useTheme() });

  const text = innerText(content);

  const { bg, color } = getColorVariant(variant, shade, variants);

  useEffect(() => {
    isActive.current = true;

    return () => {
      isActive.current = false;
    };
  }, []);

  const handleMouseEnter = () => {
    if (!is.boolean(open)) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!is.boolean(open)) {
      setOpen(false);
    }
  };

  return (
    <StyledTooltip
      aria-label={text}
      data-component-name="Tooltip"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="tooltip"
    >
      {children}
      {isOpen && <TooltipBody {...props} bg={bg} color={color} />}
    </StyledTooltip>
  );
}

Tooltip.defaultProps = {
  align: 'middle',
  bold: false,
  position: 'bottom',
  shade: 'dark',
  size: 'mid',
  variant: 'gray',
};
