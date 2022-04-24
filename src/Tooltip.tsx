import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import innerText from 'react-innertext';
import { useMount, useUnmount } from 'react-use';
import { css, useTheme } from '@emotion/react';
import styled, { CSSObject } from '@emotion/styled';
import is from 'is-lite';

import { fadeIn } from './modules/animations';
import { getColorVariant, getTheme, px } from './modules/helpers';
import { baseStyles, styledOptions } from './modules/system';
import { Text } from './Text';
import { WithColor, WithTextOptions } from './types';

interface SharedProps {
  /** @default middle */
  align: 'start' | 'middle' | 'end';
  /** @default 320 */
  maxWidth?: number;
  /** @default right */
  position: 'bottom' | 'left' | 'right' | 'top';
}

interface ColorProps {
  bg: string;
  color: string;
}

export interface TooltipProps extends Partial<SharedProps>, WithColor, WithTextOptions {
  children: React.ReactNode;
  content: React.ReactNode;
  open?: boolean;
  style?: React.CSSProperties;
}

const arrowSize = 12;
const distance = -5;

const StyledTooltip = styled('span', styledOptions)`
  ${baseStyles};
  display: inline-flex;
  line-height: 1;
  position: relative;
`;

const Body = styled(
  'span',
  styledOptions,
)<SharedProps & ColorProps & { width: string | number }>(props => {
  const { align, bg, color, position, width } = props;
  const { radius, spacing } = getTheme(props);
  const space = '14px';

  const styles: CSSObject = {};

  if (align === 'start') {
    if (['left', 'right'].includes(position)) {
      styles.top = px(distance);
    } else {
      styles.left = px(distance);
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
    styles.bottom = px(distance);
  } else {
    styles.right = px(distance);
  }

  switch (position) {
    case 'bottom': {
      styles.marginTop = space;
      styles.top = '100%';

      break;
    }
    case 'left': {
      styles.right = '100%';
      styles.marginRight = space;

      break;
    }
    case 'right': {
      styles.left = '100%';
      styles.marginLeft = space;

      break;
    }
    case 'top': {
      styles.bottom = '100%';
      styles.marginBottom = space;

      break;
    }
    // No default
  }

  return css`
    animation: ${fadeIn} 0.2s forwards;
    background-color: ${bg};
    border-radius: ${radius.xxs};
    color: ${color};
    max-width: 320px;
    padding: ${spacing.xs} ${spacing.md};
    position: absolute;
    width: ${px(width)};
    z-index: 1000;
    ${styles};
  `;
});

const Content = styled(Text)`
  position: relative;
  z-index: 10;
`;

const Arrow = styled.span<SharedProps & ColorProps>(props => {
  const { align, bg, position } = props;

  const styles: CSSObject = {};
  let arrowTranslate = '';

  switch (position) {
    case 'bottom': {
      styles.top = '-8px';
      arrowTranslate = 'translate(-2px, 2px)';

      break;
    }
    case 'left': {
      styles.right = '-8px';
      arrowTranslate = 'translate(-2px, -2px)';

      break;
    }
    case 'right': {
      styles.left = '-8px';
      arrowTranslate = 'translate(2px, 2px)';

      break;
    }
    case 'top': {
      styles.bottom = '-8px';
      arrowTranslate = 'translate(2px, -2px)';

      break;
    }
    // No default
  }

  if (['bottom', 'top'].includes(position)) {
    if (align === 'start') {
      styles.left = '10px';
    } else if (align === 'middle') {
      styles.left = '50%';
      styles.transform = 'translateX(-50%)';
    } else {
      styles.right = '10px';
    }
  } else if (['left', 'right'].includes(position)) {
    if (align === 'start') {
      styles.top = '10px';
    } else if (align === 'middle') {
      styles.top = '50%';
      styles.transform = 'translateY(-50%)';
    } else {
      styles.bottom = '10px';
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
      border-radius: 2px;
      content: '';
      display: block;
      height: ${px(arrowSize)};
      position: absolute;
      transform: rotate(-45deg) ${arrowTranslate};
      width: ${px(arrowSize)};
    }
  `;
});

function TooltipBody(
  props: Omit<TooltipProps, 'children' | 'open'> &
    ColorProps & {
      width: string | number;
    },
) {
  const {
    align = 'middle',
    bg,
    bold,
    color,
    content,
    maxWidth = 320,
    position = 'right',
    size = 'mid',
    style,
    width,
  } = props;

  return (
    <Body
      align={align}
      bg={bg}
      color={color}
      maxWidth={maxWidth}
      position={position}
      style={style}
      width={width}
    >
      <Content bold={bold} size={size}>
        {content}
      </Content>
      <Arrow align={align} bg={bg} color={color} position={position} />
    </Body>
  );
}

export function Tooltip(props: TooltipProps): JSX.Element {
  const { children, content, open, shade, variant = 'gray' } = props;
  const isMounted = React.useRef(false);
  const [isActive, setActive] = React.useState(open || false);
  const [width, setWidth] = React.useState<number>(0);

  const { variants } = getTheme({ theme: useTheme() });

  const text = innerText(content);

  const { bg, color } = getColorVariant(variant, shade, variants);

  useMount(() => {
    isMounted.current = true;
  });

  useUnmount(() => {
    isMounted.current = false;
  });

  React.useEffect(() => {
    const element = document.createElement('div');

    element.id = 'tooltip-sizing';
    element.style.position = 'absolute';
    element.style.top = '-9999px';
    element.style.left = '-9999px';
    document.body.appendChild(element);

    render(
      <TooltipBody
        {...props}
        bg="#000"
        color="#fff"
        style={{ position: 'static', whiteSpace: 'nowrap' }}
        width="auto"
      />,
      element,
      () => {
        const rect = element.getBoundingClientRect();

        if (isMounted.current) {
          setWidth(Math.ceil(rect.width - arrowSize));
        }

        unmountComponentAtNode(element);
        document.body.removeChild(element);
      },
    );
  }, [props, width]);

  const handleMouseEnter = () => {
    if (!is.boolean(open)) {
      setActive(true);
    }
  };

  const handleMouseLeave = () => {
    if (!is.boolean(open)) {
      setActive(false);
    }
  };

  return (
    <StyledTooltip
      aria-label={text}
      data-component-name="Tooltip"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isActive && <TooltipBody {...props} bg={bg} color={color} width={width} />}
    </StyledTooltip>
  );
}

Tooltip.defaultProps = {
  shade: 'dark',
  variant: 'gray',
};
