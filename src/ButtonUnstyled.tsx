import { ButtonHTMLAttributes, forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Icon } from './Icon';
import { textDefaultOptions } from './modules/options';
import {
  appearanceStyles,
  baseStyles,
  colorStyles,
  getStyledOptions,
  marginStyles,
  paddingStyles,
  textStyles,
} from './modules/system';
import {
  ComponentProps,
  StyledProps,
  WithBusy,
  WithChildren,
  WithColor,
  WithMargin,
  WithPadding,
  WithTextOptions,
} from './types';

export interface ButtonUnstyledKnownProps
  extends StyledProps,
    WithBusy,
    WithChildren,
    WithColor,
    WithMargin,
    WithPadding,
    WithTextOptions {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export type ButtonUnstyledProps = ComponentProps<HTMLButtonElement, ButtonUnstyledKnownProps>;

export const defaultProps = {
  ...textDefaultOptions,
  busy: false,
  disabled: false,
  type: 'button',
} satisfies Omit<ButtonUnstyledProps, 'children'>;

export const StyledButtonUnstyled = styled(
  'button',
  getStyledOptions(),
)<Omit<ButtonUnstyledProps, 'children'>>(props => {
  const { busy } = props;

  return css`
    ${appearanceStyles};
    ${baseStyles(props)};
    align-items: center;
    background-color: transparent;
    border: 0;
    color: inherit;
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    line-height: 1;
    padding: 0;
    ${colorStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${textStyles(props)};

    :disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    ${!!busy &&
    css`
      pointer-events: none;
    `};
  `;
});

export const ButtonUnstyled = forwardRef<HTMLButtonElement, ButtonUnstyledProps>((props, ref) => {
  const { busy, children, ...rest } = { ...defaultProps, ...props };
  const { fontSize = '16px' } = textStyles(props);

  return (
    <StyledButtonUnstyled ref={ref} busy={busy} data-component-name="ButtonUnstyled" {...rest}>
      {children}
      {busy && <Icon ml="xxs" name="spinner" size={parseInt(`${fontSize}`, 10) + 2} spin />}
    </StyledButtonUnstyled>
  );
});
