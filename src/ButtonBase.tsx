import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Icon } from './Icon';
import {
  appearanceStyles,
  baseStyles,
  colorStyles,
  marginStyles,
  paddingStyles,
  styledOptions,
  textStyles,
} from './modules/system';
import {
  ComponentProps,
  StyledProps,
  WithColor,
  WithMargin,
  WithPadding,
  WithTextOptions,
} from './types';

export interface ButtonBaseKnownProps
  extends StyledProps,
    WithColor,
    WithMargin,
    WithPadding,
    WithTextOptions {
  /**
   * Add an animation icon
   * @default false
   */
  busy?: boolean;
  children: React.ReactNode;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export type ButtonBaseProps = ComponentProps<HTMLButtonElement, ButtonBaseKnownProps>;

export const StyledButtonBase = styled(
  'button',
  styledOptions,
)<ButtonBaseProps>(props => {
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

export const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonBaseProps>((props, ref) => {
  const { busy, children } = props;
  const { fontSize = '16px' } = textStyles(props);

  return (
    <StyledButtonBase ref={ref} data-component-name="ButtonBase" {...props}>
      {children}
      {busy && <Icon ml="xxs" name="spinner" size={parseInt(`${fontSize}`, 10) + 2} spin />}
    </StyledButtonBase>
  );
});

ButtonBase.defaultProps = {
  size: 'regular',
  type: 'button',
};
ButtonBase.displayName = 'ButtonBase';
