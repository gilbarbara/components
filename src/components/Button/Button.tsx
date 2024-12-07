import { forwardRef, isValidElement, MouseEvent, ReactNode, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit, px } from '@gilbarbara/helpers';
import { useMergeRefs } from '@gilbarbara/hooks';
import { PlainObject, SetRequired } from '@gilbarbara/types';

import { getColorTokens } from '~/modules/colors';
import {
  getDisableStyles,
  getStyledOptions,
  getStyles,
  hoverStyles,
  outlineStyles,
} from '~/modules/system';

import { Icon } from '~/components/Icon';
import { Ripple, useRipple } from '~/components/Ripple';

import { WithTheme } from '~/types';

import { ButtonProps, defaultProps, useButton } from './useButton';

export const StyledButton = styled('button', getStyledOptions())<
  SetRequired<ButtonProps, keyof typeof defaultProps> & WithTheme
>(
  {
    alignItems: 'center',
    boxShadow: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    transition: 'background-color 0.6s, border-color 0.6s',
  },
  props => {
    const { bg, block, color, iconOnly, light, size, theme, wide } = props;
    const { borderRadius, fontSize, fontWeight, height, lineHeight, padding } = theme.button[size];
    let buttonPadding = `${padding[0]} ${wide ? px(parseInt(padding[1], 10) * 2) : padding[1]}`;

    if (iconOnly) {
      buttonPadding = '0px';
    }

    const { mainColor } = getColorTokens(bg, color, theme);

    return css`
      border-radius: ${borderRadius};
      font-size: ${fontSize};
      font-weight: ${light ? 400 : fontWeight};
      min-height: ${height};
      min-width: ${height};
      line-height: ${lineHeight};
      padding: ${buttonPadding};
      width: ${block ? '100%' : 'auto'};
      ${getStyles(props)};
      ${outlineStyles(mainColor, theme)};

      &:disabled {
        ${getDisableStyles(props, { isButton: true })};
      }

      &:hover {
        ${hoverStyles(props)};
      }
    `;
  },
);

export const Button = forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useButton(props);
  const {
    bg,
    busy,
    children,
    disableRipple,
    endContent,
    iconOnly,
    onClick,
    size,
    spinner,
    spinnerPosition,
    startContent,
    theme,
  } = componentProps;

  const { onClick: onClickRipple, ...rippleProps } = useRipple();
  const localRef = useRef<HTMLButtonElement | null>(null);
  const mergedRefs = useMergeRefs(localRef, ref);

  const { fontSize } = theme.button[size];

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (busy || disableRipple) {
      return;
    }

    onClickRipple(event);
  };

  const content: PlainObject<ReactNode> = {
    children,
    spinner: busy && (spinner ?? <Icon name="spinner" size={parseInt(fontSize, 10) + 4} spin />),
  };

  if (iconOnly && busy) {
    content.children = content.spinner;
    content.spinner = '';
  }

  if (startContent) {
    content.startContent = isValidElement(startContent) ? (
      startContent
    ) : (
      <span>{startContent}</span>
    );
  }

  if (endContent) {
    content.endContent = isValidElement(endContent) ? endContent : <span>{endContent}</span>;
  }

  if (!disableRipple) {
    content.ripple = <Ripple color={bg} {...rippleProps} />;
  }

  return (
    <StyledButton
      ref={mergedRefs}
      {...getDataAttributes('Button')}
      onClick={handleClick}
      {...omit(componentProps, 'onClick')}
    >
      {content.startContent}
      {spinnerPosition === 'start' && content.spinner}
      {content.children}
      {spinnerPosition === 'end' && content.spinner}
      {content.endContent}
      {content.ripple}
    </StyledButton>
  );
});

Button.displayName = 'Button';

export { defaultProps, type ButtonProps } from './useButton';
