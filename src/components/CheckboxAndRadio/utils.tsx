import { ChangeEventHandler, KeyboardEvent } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { pick, px } from '@gilbarbara/helpers';
import { Simplify } from '@gilbarbara/types';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import {
  baseStyles,
  getDisableStyles,
  getOutlineStyles,
  getStyledOptions,
  isDarkMode,
  marginStyles,
} from '~/modules/system';

import {
  CheckboxItem,
  OmitElementProps,
  RadioItem,
  StyledProps,
  WithAccent,
  WithBorderless,
  WithComponentSize,
  WithFlexBox,
  WithMargin,
} from '~/types';

export interface CheckboxAndRadioKnownProps
  extends StyledProps,
    WithAccent,
    WithBorderless,
    WithComponentSize,
    WithMargin {
  /** @default center */
  align?: WithFlexBox['align'];
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export type CheckboxProps = Simplify<
  OmitElementProps<HTMLInputElement, CheckboxAndRadioKnownProps & CheckboxItem>
>;
export type RadioProps = Simplify<
  OmitElementProps<HTMLInputElement, CheckboxAndRadioKnownProps & RadioItem>
>;

interface InnerProps
  extends Omit<CheckboxProps, 'name' | 'value'>,
    Omit<RadioProps, 'name' | 'value'> {
  category?: 'checkbox' | 'radio';
}

export const StyledCheckboxRadioInput = styled('input', getStyledOptions())`
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  z-index: -1;
`;

export const StyledText = styled(
  'span',
  getStyledOptions(),
)<InnerProps>(props => {
  const { size } = props;
  const { typography } = getTheme(props);

  const { fontSize } = typography[size ?? 'md'];

  return css`
    font-size: ${fontSize};
  `;
});

export const StyledElement = styled(
  'span',
  getStyledOptions('label'),
)<InnerProps>(props => {
  const { accent = 'primary', borderless, category = 'checkbox', label, size } = props;
  const { grayScale, radius, white, ...theme } = getTheme(props);
  const darkMode = isDarkMode(props);
  const { mainColor } = getColorTokens(accent, null, theme);
  let backgroundColor = darkMode ? grayScale['800'] : white;

  if (borderless) {
    backgroundColor = darkMode ? grayScale['700'] : grayScale['100'];
  }

  let after;
  let dimensions = 18;

  if (size === 'md') {
    dimensions = 20;
  }

  if (size === 'lg') {
    dimensions = 22;
  }

  if (category === 'checkbox') {
    let height = 4;
    let width = 7;

    if (size === 'md') {
      height = 6;
      width = 9;
    }

    if (size === 'lg') {
      height = 7;
      width = 11;
    }

    after = css`
      border-bottom: 2px solid ${mainColor};
      border-left: 2px solid ${mainColor};
      height: ${px(height)};
      transform: rotate(-45deg) translateY(-100%);
      width: ${px(width)};
    `;
  } else {
    let innerDimensions = 6;

    if (size === 'md') {
      innerDimensions = 7;
    }

    if (size === 'lg') {
      innerDimensions = 8;
    }

    after = css`
      background-color: ${mainColor};
      border-radius: 50%;
      height: ${px(innerDimensions)};
      transform: translate(-50%, -50%);
      width: ${px(innerDimensions)};
    `;
  }

  return css`
    ${baseStyles(props)};
    background-color: ${backgroundColor};
    border: ${borderless ? 0 : `2px solid ${grayScale['700']}`};
    border-radius: ${category === 'checkbox' ? radius.xxs : radius.round};
    display: inline-flex;
    flex-shrink: 0;
    height: ${px(dimensions)};
    margin-right: ${label ? '6px' : '0'};
    overflow: hidden;
    position: relative;
    transition:
      background-color 0.2s,
      border-color 0.2s;
    width: ${px(dimensions)};

    input:not(:disabled) ~ &:focus {
      ${getOutlineStyles(mainColor)};
    }

    &:after {
      content: '';
      display: none;
      position: absolute;
      left: 50%;
      top: 50%;
      ${after};
    }

    input:checked ~ & {
      border-color: ${mainColor};

      &:after {
        display: inline-block;
      }
    }

    input:disabled ~ & {
      ${getDisableStyles(props)};
    }
  `;
});

export const StyledLabel = styled(
  'label',
  getStyledOptions(),
)<InnerProps>(props => {
  const { align, disabled } = props;

  return css`
    ${marginStyles(props)};
    align-items: ${align};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    display: flex;
    justify-content: flex-start;
    position: relative;
  `;
});

export function getMarginProps(props: CheckboxProps | RadioProps) {
  return pick(props, 'margin', 'mb', 'ml', 'mr', 'mt', 'mx', 'my');
}

export function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
  const target = event.target as HTMLSpanElement;
  const input = target.previousElementSibling as HTMLInputElement;

  if (!input || input.disabled || !['Space', 'Enter'].includes(event.code)) {
    return;
  }

  input.click();
}
