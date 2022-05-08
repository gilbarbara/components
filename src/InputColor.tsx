import { ChangeEvent, forwardRef, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { StringOrNumber } from '@gilbarbara/types';
import is from 'is-lite';
import { SetRequired } from 'type-fest';

import { Box } from './Box';
import { getTheme, px } from './modules/helpers';
import { getStyledOptions } from './modules/system';
import { Text } from './Text';
import { ComponentProps, StyledProps } from './types';

export interface InputColorKnownProps extends StyledProps {
  height?: StringOrNumber;
  value?: string;
  width?: StringOrNumber;
}

export type InputColorProps = ComponentProps<HTMLInputElement, InputColorKnownProps, 'type'>;

const StyledColorGroup = styled(
  'div',
  getStyledOptions(),
)<SetRequired<InputColorProps, 'height' | 'width'>>(props => {
  const { height, width } = props;

  const innerHeight = (is.string(height) ? parseInt(height, 10) : height) + 16;
  const innerWidth = (is.string(width) ? parseInt(width, 10) : width) + 16;

  return css`
    align-items: center;
    display: flex;

    [data-component-name='Text'] {
      min-width: 75px;
    }

    input {
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      background: none;
      border: 0;
      cursor: pointer;
      height: ${px(innerHeight)};
      margin: -8px;
      padding: 0;
      width: ${px(innerWidth)};
    }
  `;
});

export const InputColor = forwardRef<HTMLInputElement, InputColorProps>((props, ref) => {
  const { spacing } = getTheme({ theme: useTheme() });
  const { height = spacing.xl, name, onChange, value, width = spacing.xl, ...rest } = props;
  const [localValue, setLocalValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value);

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <StyledColorGroup data-component-name="InputColor" height={height} width={width}>
      <Box height={height} mr="xs" overflow="hidden" shadow="high" width={width}>
        <input ref={ref} id={name} name={name} onChange={handleChange} type="color" {...rest} />
      </Box>
      <Text>{value || localValue}</Text>
    </StyledColorGroup>
  );
});

InputColor.defaultProps = {
  height: '32px',
  width: '32px',
};
InputColor.displayName = 'InputColor';
