import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme, px } from './modules/helpers';
import { baseStyles, isDarkMode, outlineStyles, styledOptions } from './modules/system';
import {
  CheckboxOption,
  ComponentProps,
  Option,
  StyledProps,
  WithComponentSize,
  WithInline,
} from './types';

export interface SharedProps extends StyledProps, WithComponentSize, WithInline {
  name: string;
}

export interface CheckboxKnownProps extends SharedProps, CheckboxOption {}
export interface RadioKnownProps extends SharedProps, Option {}

export type CheckboxProps = ComponentProps<HTMLInputElement, CheckboxKnownProps>;

export type RadioProps = ComponentProps<HTMLInputElement, RadioKnownProps>;

interface InnerProps
  extends Omit<CheckboxProps, 'label' | 'name' | 'value'>,
    Omit<RadioProps, 'label' | 'name' | 'value'> {
  category?: 'checkbox' | 'radio';
}

const StyledCheckboxRadioInput = styled('input', styledOptions)`
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  z-index: -1;
`;

const StyledText = styled(
  'span',
  styledOptions,
)<InnerProps>(props => {
  const { size } = props;
  const { typography } = getTheme(props);

  const { fontSize } = typography[size === 'sm' ? 'mid' : 'regular'];

  return css`
    font-size: ${fontSize};
  `;
});

const StyledElement = styled(
  'span',
  styledOptions,
)<InnerProps>(props => {
  const { category = 'checkbox', size } = props;
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
    border-radius: ${category === 'checkbox' ? radius.xxs : radius.circular};
    display: inline-flex;
    flex-shrink: 0;
    height: ${px(dimensions)};
    margin-right: 6px;
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

const StyledLabel = styled(
  'label',
  styledOptions,
)<InnerProps>(props => {
  const { disabled, inline } = props;

  return css`
    align-items: center;
    cursor: ${disabled ? 'default' : 'pointer'};
    display: ${inline ? 'inline-flex' : 'flex'};
    margin-bottom: 8px;
    position: relative;
    margin-right: ${inline && '12px'};

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

function handleKeyDown(event: React.KeyboardEvent<HTMLSpanElement>) {
  const target = event.target as HTMLSpanElement;
  const input = target.previousElementSibling as HTMLInputElement;

  if (!input || input.disabled || ![' ', 'Enter'].includes(event.key)) {
    return;
  }

  input.checked = !input.checked;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    checked,
    children,
    defaultChecked,
    id,
    inline,
    label,
    name,
    size = 'md',
    style,
    ...rest
  } = props;
  const inputId = id || name;

  return (
    <StyledLabel data-component-name="Checkbox" htmlFor={inputId} inline={inline} size={size}>
      <StyledCheckboxRadioInput
        ref={ref}
        aria-checked={checked || defaultChecked}
        checked={checked}
        defaultChecked={defaultChecked}
        id={inputId}
        name={name}
        role="checkbox"
        type="checkbox"
        {...rest}
      />
      <StyledElement
        category="checkbox"
        onKeyDown={handleKeyDown}
        size={size}
        style={style}
        tabIndex={props.disabled ? -1 : 0}
      />
      <StyledText category="checkbox" size={size}>
        {children || label}
      </StyledText>
    </StyledLabel>
  );
});

Checkbox.defaultProps = {
  inline: false,
};
Checkbox.displayName = 'Checkbox';

/**
 * Use the RadioGroup component instead of this.
 * RadioGroup accepts an `options` prop that render this component in a group and is responsible for managing state and interactions.
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const {
    checked,
    children,
    defaultChecked,
    id,
    inline,
    label,
    name,
    size = 'md',
    style,
    ...rest
  } = props;

  return (
    <StyledLabel category="radio" data-component-name="Radio" htmlFor={id} inline={inline}>
      <StyledCheckboxRadioInput
        ref={ref}
        aria-checked={!!(checked || defaultChecked)}
        checked={checked}
        defaultChecked={defaultChecked}
        id={id}
        name={name}
        role="radio"
        type="radio"
        {...rest}
      />
      <StyledElement
        category="radio"
        onKeyDown={handleKeyDown}
        size={size}
        style={style}
        tabIndex={props.disabled ? -1 : 0}
      />
      <StyledText category="radio" size={size}>
        {children || label}
      </StyledText>
    </StyledLabel>
  );
});

Radio.defaultProps = {
  inline: false,
};
Radio.displayName = 'Radio';
