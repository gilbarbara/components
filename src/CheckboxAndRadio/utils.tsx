import { ChangeEventHandler, KeyboardEvent } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { pick } from '@gilbarbara/helpers';

import { getTheme, px } from '../modules/helpers';
import {
  baseStyles,
  getStyledOptions,
  isDarkMode,
  marginStyles,
  outlineStyles,
} from '../modules/system';
import {
  CheckboxItem,
  ComponentProps,
  RadioItem,
  StyledProps,
  WithComponentSize,
  WithFlexBox,
  WithMargin,
} from '../types';

export interface SharedProps extends StyledProps, WithComponentSize, WithMargin {
  /** @default center */
  align?: WithFlexBox['align'];
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export type CheckboxProps = ComponentProps<HTMLInputElement, SharedProps & CheckboxItem>;
export type RadioProps = ComponentProps<HTMLInputElement, SharedProps & RadioItem>;

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

  const { fontSize } = typography[size === 'sm' ? 'mid' : 'regular'];

  return css`
    font-size: ${fontSize};
  `;
});

export const StyledElement = styled(
  'span',
  getStyledOptions('label'),
)<InnerProps>(props => {
  const { category = 'checkbox', label, size } = props;
  const { colors, grayDark, grayDarker, grayLighter, radius, white } = getTheme(props);
  const darkMode = isDarkMode(props);

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
      border-bottom: 2px solid ${colors.primary};
      border-left: 2px solid ${colors.primary};
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
      background-color: ${colors.primary};
      border-radius: 50%;
      height: ${px(innerDimensions)};
      transform: translate(-50%, -50%);
      width: ${px(innerDimensions)};
    `;
  }

  return css`
    ${baseStyles(props)};
    background-color: ${darkMode ? grayDarker : white};
    border: 2px solid ${grayDark};
    border-radius: ${category === 'checkbox' ? radius.xxs : radius.round};
    display: inline-flex;
    flex-shrink: 0;
    height: ${px(dimensions)};
    margin-right: ${label ? '6px' : '0'};
    overflow: hidden;
    position: relative;
    transition: background-color 0.2s, border-color 0.2s;
    width: ${px(dimensions)};

    &:focus {
      filter: drop-shadow(0 0 2px ${colors.primary});
      outline: none;
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
      border-color: ${colors.primary};

      &:after {
        display: inline-block;
      }
    }

    input:disabled ~ & {
      cursor: not-allowed;
      opacity: 0.6;
    }

    input:not(:checked):disabled ~ & {
      background-color: ${grayLighter};
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
    cursor: ${disabled ? 'default' : 'pointer'};
    display: flex;
    justify-content: flex-start;
    position: relative;

    &:focus,
    &:hover {
      [data-component-name='Checkbox'],
      [data-component-name='Radio'] {
        &:not(:checked) ~ [data-component-name='Checkbox'],
        &:not(:checked) ~ [data-component-name='Radio'] {
          ${outlineStyles(props)};
        }

        &:not(:disabled):checked ~ [data-component-name='Checkbox'],
        &:not(:disabled):checked ~ [data-component-name='Radio'] {
          ${outlineStyles(props)};
        }
      }
    }
  `;
});

export function getMarginProps(props: CheckboxProps | RadioProps) {
  return pick(props, 'margin', 'mb', 'ml', 'mr', 'mt', 'mx', 'my');
}

export function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
  const target = event.target as HTMLSpanElement;
  const input = target.previousElementSibling as HTMLInputElement;

  if (!input || input.disabled || ![' ', 'Enter'].includes(event.key)) {
    return;
  }

  input.checked = !input.checked;
}
