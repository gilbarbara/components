import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  useRef,
  useState,
} from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { Simplify } from '@gilbarbara/types';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { getDisableStyles, getStyledOptions, isDarkMode } from '~/modules/system';
import { inputHeight } from '~/modules/theme';

import { Text } from '~/components/Text';

import {
  OmitElementProps,
  StyledProps,
  WithAccent,
  WithBorderless,
  WithFormElements,
} from '~/types';

export interface InputColorKnownProps
  extends StyledProps,
    WithAccent,
    WithBorderless,
    WithFormElements {
  /** @default false */
  large?: boolean;
  /**
   * Get the value only when the color picker is closed.
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /**
   * Get the value every time the color changes.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /**
   * Debounce onChange event in milliseconds.
   * Set it to 0 for real-time events.
   * @default 250
   */
  onChangeDebounce?: number;
  placeholder?: string;
  /**
   * A 7-character string specifying an RGB color in hexadecimal format.
   */
  value?: string;
}

export type InputColorProps = Simplify<
  OmitElementProps<HTMLInputElement, InputColorKnownProps, 'name' | 'type' | 'width'>
>;

export const defaultProps = {
  accent: 'primary',
  borderless: false,
  disabled: false,
  large: false,
  onChangeDebounce: 250,
  placeholder: 'Select a color',
  readOnly: false,
  width: 'auto',
} satisfies Omit<InputColorProps, 'name'>;

const StyledInputColor = styled(
  'div',
  getStyledOptions(),
)<
  Required<
    Pick<InputColorProps, 'accent' | 'borderless' | 'disabled' | 'large' | 'width'> & {
      isFilled: boolean;
    }
  >
>(props => {
  const { accent, borderless, disabled, isFilled, width } = props;
  const { grayScale, radius, white, ...theme } = getTheme(props);
  const darkMode = isDarkMode(props);
  const { mainColor } = getColorTokens(accent, null, theme);

  let borderColor = darkMode ? grayScale['700'] : grayScale['500'];

  if (isFilled) {
    borderColor = mainColor;
  }

  const styles = borderless
    ? css`
        border: 0;
        border-bottom: 1px solid ${borderColor};
      `
    : css`
        background-color: ${darkMode ? grayScale['800'] : white};
        border: 1px solid ${borderColor};
        border-radius: ${radius.xs};
      `;

  return css`
    align-items: center;
    display: flex;
    padding: 4px 16px 4px 4px;
    width: ${px(width)};
    ${styles};

    ${disabled &&
    css`
      ${getDisableStyles(props)}
      color: ${grayScale['500']};
    `};

    [data-component-name='Text'] {
      min-width: 75px;
    }
  `;
});

const StyledLabel = styled(
  'label',
  getStyledOptions(),
)<Pick<InputColorProps, 'large'>>(props => {
  const { large } = props;
  const { grayScale, radius, spacing } = getTheme(props);
  const darkMode = isDarkMode(props);
  const size = parseInt(large ? inputHeight.large : inputHeight.normal, 10) - 10;
  const inputSize = px(size + 16);

  return css`
    border: 1px solid ${darkMode ? grayScale['700'] : grayScale['100']};
    border-radius: ${radius.xs};
    height: ${px(size)};
    overflow: hidden;
    position: relative;
    margin-right: ${spacing.xs};
    width: ${px(size)};

    input {
      appearance: none;
      background: none;
      border: 0;
      cursor: pointer;
      height: ${inputSize};
      margin: -8px;
      padding: 0;
      width: ${inputSize};

      &:disabled {
        cursor: not-allowed;
      }
    }
  `;
});

export const InputColor = forwardRef<HTMLInputElement, InputColorProps>((props, ref) => {
  const {
    accent,
    borderless,
    disabled,
    large,
    name,
    onChange,
    onChangeDebounce,
    placeholder,
    readOnly,
    value: initialValue,
    width,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  };
  const [value, setValue] = useState<string>(initialValue ?? '');
  const debounceTimeout = useRef<number>(0);
  const isDisabled = disabled || readOnly;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    if (!onChange) {
      return;
    }

    if (!onChangeDebounce) {
      onChange(event);

      return;
    }

    clearTimeout(debounceTimeout.current);

    debounceTimeout.current = window.setTimeout(() => {
      onChange(event);

      debounceTimeout.current = 0;
    }, onChangeDebounce);
  };

  let text;

  if (value) {
    text = <Text>{value}</Text>;
  } else if (placeholder) {
    text = <Text color="gray.500">{placeholder}</Text>;
  }

  return (
    <StyledInputColor
      accent={accent}
      borderless={borderless}
      data-component-name="InputColor"
      disabled={isDisabled}
      isFilled={!!value}
      large={large}
      width={width}
    >
      <StyledLabel data-component-name="InputColorLabel" large={large}>
        <input
          ref={ref}
          disabled={isDisabled}
          id={name}
          name={name}
          onChange={handleChange}
          type="color"
          value={value}
          {...rest}
        />
      </StyledLabel>
      {text}
    </StyledInputColor>
  );
});

InputColor.displayName = 'InputColor';
