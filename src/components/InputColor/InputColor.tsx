import { ChangeEvent, forwardRef, useRef, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';

import { getColorTokens } from '~/modules/colors';
import { getDisableStyles, getStyledOptions } from '~/modules/system';
import { inputHeight } from '~/modules/theme';

import { Text } from '~/components/Text';

import { WithTheme } from '~/types';

import { InputColorProps, useInputColor } from './useInputColor';

const StyledInputColor = styled(
  'div',
  getStyledOptions(),
)<
  Required<
    Pick<InputColorProps, 'accent' | 'borderless' | 'disabled' | 'height' | 'width'> & {
      isFilled: boolean;
    }
  > &
    WithTheme
>(props => {
  const { accent, borderless, disabled, isFilled, theme, width } = props;
  const { darkMode, dataAttributeName, grayScale, radius, white } = theme;
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

    [data-${dataAttributeName}='Text'] {
      min-width: 75px;
    }
  `;
});

const StyledLabel = styled(
  'label',
  getStyledOptions(),
)<Required<Pick<InputColorProps, 'height'>> & WithTheme>(props => {
  const { height, theme } = props;
  const { darkMode, grayScale, radius, spacing } = theme;
  const size = parseInt(inputHeight[height], 10) - 10;
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
  const { componentProps, getDataAttributes } = useInputColor(props);
  const {
    accent,
    borderless,
    disabled,
    height,
    name,
    onChange,
    onChangeDebounce,
    placeholder,
    readOnly,
    theme,
    value: initialValue,
    width,
    ...rest
  } = componentProps;
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
      {...getDataAttributes('InputColor')}
      disabled={isDisabled}
      height={height}
      isFilled={!!value}
      theme={theme}
      width={width}
    >
      <StyledLabel {...getDataAttributes('InputColorLabel')} height={height} theme={theme}>
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

export { defaultProps, type InputColorProps } from './useInputColor';
