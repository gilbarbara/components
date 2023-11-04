import { ButtonHTMLAttributes, forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Simplify } from '@gilbarbara/types';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { textDefaultOptions } from '~/modules/options';
import {
  appearanceStyles,
  baseStyles,
  borderStyles,
  colorStyles,
  displayStyles,
  getOutlineStyles,
  getStyledOptions,
  layoutStyles,
  marginStyles,
  paddingStyles,
  radiusStyles,
  textStyles,
} from '~/modules/system';

import { Icon } from '~/components/Icon';

import {
  OmitElementProps,
  StyledProps,
  WithBorder,
  WithBusy,
  WithChildren,
  WithColors,
  WithDisplay,
  WithFlexBox,
  WithLayout,
  WithMargin,
  WithPadding,
  WithRadius,
  WithTextOptions,
} from '~/types';

export interface ButtonUnstyledKnownProps
  extends StyledProps,
    WithBorder,
    WithBusy,
    WithChildren,
    Pick<WithColors, 'color'>,
    WithDisplay,
    Pick<WithFlexBox, 'align' | 'justify'>,
    WithLayout,
    WithMargin,
    WithPadding,
    WithRadius,
    WithTextOptions {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export type ButtonUnstyledProps = Simplify<
  OmitElementProps<HTMLButtonElement, ButtonUnstyledKnownProps>
>;

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
  const { align, busy, color, justify } = props;

  const { darkMode, ...theme } = getTheme(props);
  const selectedColor = color ?? darkMode ? 'white' : 'black';

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

    :focus {
      ${getOutlineStyles(getColorTokens(selectedColor, null, theme).mainColor)};
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

ButtonUnstyled.displayName = 'ButtonUnstyled';
