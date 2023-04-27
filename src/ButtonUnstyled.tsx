import { ButtonHTMLAttributes, forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Icon } from './Icon';
import { textDefaultOptions } from './modules/options';
import {
  appearanceStyles,
  baseStyles,
  borderStyles,
  colorStyles,
  displayStyles,
  getStyledOptions,
  layoutStyles,
  marginStyles,
  paddingStyles,
  radiusStyles,
  textStyles,
} from './modules/system';
import {
  ComponentProps,
  StyledProps,
  WithBorder,
  WithBusy,
  WithChildren,
  WithColor,
  WithDisplay,
  WithFlexBox,
  WithLayout,
  WithMargin,
  WithPadding,
  WithRadius,
  WithTextOptions,
} from './types';

export interface ButtonUnstyledKnownProps
  extends StyledProps,
    WithBorder,
    WithBusy,
    WithChildren,
    WithColor,
    WithDisplay,
    Pick<WithFlexBox, 'align' | 'justify'>,
    WithLayout,
    WithMargin,
    WithPadding,
    WithRadius,
    WithTextOptions {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export type ButtonUnstyledProps = ComponentProps<HTMLButtonElement, ButtonUnstyledKnownProps>;

export const defaultProps = {
  ...textDefaultOptions,
  align: 'center',
  busy: false,
  disabled: false,
  type: 'button',
} satisfies Omit<ButtonUnstyledProps, 'children'>;

export const StyledButtonUnstyled = styled(
  'button',
  getStyledOptions(),
)<Omit<ButtonUnstyledProps, 'children'>>(props => {
  const { align, busy, justify } = props;

  return css`
    ${appearanceStyles};
    ${baseStyles(props)};
    align-items: ${align};
    background-color: transparent;
    border: 0;
    color: inherit;
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    justify-content: ${justify};
    line-height: 1;
    padding: 0;
    ${borderStyles(props)};
    ${colorStyles(props)};
    ${displayStyles(props)};
    ${layoutStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${radiusStyles(props)};
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
