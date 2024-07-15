import { ButtonHTMLAttributes, forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps } from '@gilbarbara/helpers';
import { Simplify } from '@gilbarbara/types';

import { useTheme } from '~/hooks/useTheme';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { textDefaultOptions } from '~/modules/options';
import {
  appearanceStyles,
  baseStyles,
  borderStyles,
  colorStyles,
  displayStyles,
  getStyledOptions,
  layoutStyles,
  marginStyles,
  outlineStyles,
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
  WithDisableOutline,
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
    WithDisableOutline,
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
  disableOutline: false,
  type: 'button',
} satisfies Omit<ButtonUnstyledProps, 'children'>;

export const StyledButtonUnstyled = styled(
  'button',
  getStyledOptions(),
)<Omit<ButtonUnstyledProps, 'children'>>(props => {
  const { align, busy, color, justify } = props;

  const { darkMode, opacityDisabled, ...theme } = getTheme(props);
  const selectedColor = (color ?? darkMode) ? 'white' : 'black';
  const { mainColor } = getColorTokens(selectedColor, null, theme);

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
    ${outlineStyles(mainColor, props)};

    :disabled {
      cursor: not-allowed;
      opacity: ${opacityDisabled};
    }

    ${!!busy &&
    css`
      pointer-events: none;
    `};
  `;
});

export const ButtonUnstyled = forwardRef<HTMLButtonElement, ButtonUnstyledProps>((props, ref) => {
  const { busy, children, ...rest } = mergeProps(defaultProps, props);
  const { fontSize = '16px' } = textStyles(props);
  const { getDataAttributes } = useTheme();

  return (
    <StyledButtonUnstyled ref={ref} busy={busy} {...getDataAttributes('ButtonUnstyled')} {...rest}>
      {children}
      {busy && <Icon ml="xxs" name="spinner" size={parseInt(`${fontSize}`, 10) + 2} spin />}
    </StyledButtonUnstyled>
  );
});

ButtonUnstyled.displayName = 'ButtonUnstyled';
