import { ChangeEvent, forwardRef, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { BoxInline } from './Box';
import { Button } from './Button';
import { getTheme, px } from './modules/helpers';
import { baseStyles, getStyledOptions } from './modules/system';
import { Truncate } from './Truncate';
import { ComponentProps, StyledProps, WithFormElements, WithInvert } from './types';

export interface InputFileKnownProps extends StyledProps, WithFormElements, WithInvert {
  /** @default false */
  large?: boolean;
  value?: string;
}

export type InputFileProps = ComponentProps<
  HTMLInputElement,
  InputFileKnownProps,
  'name' | 'type' | 'width'
>;

export const StyledFileInput = styled(
  'div',
  getStyledOptions(),
)<Partial<InputFileProps>>(props => {
  const { width = '100%' } = props;
  const { spacing } = getTheme(props);

  return css`
    ${baseStyles(props)};
    align-items: center;
    display: flex;
    width: ${px(width)};

    [data-component-name='Truncate'] {
      flex: 1;
      margin-left: ${spacing.xs};

      &:empty {
        display: none;
      }
    }
  `;
});

export const StyledInput = styled('input', getStyledOptions())`
  font-size: 48px;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  z-index: 1;
`;

export const InputFile = forwardRef<HTMLInputElement, InputFileProps>((props, ref) => {
  const { invert, large, name, onChange, placeholder, value, ...rest } = props;
  const [localValue, setLocalValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    setLocalValue(files?.length ? files[0].name : '');

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <StyledFileInput data-component-name="InputFile" {...rest}>
      <BoxInline overflow="hidden" position="relative">
        <Button invert={invert} size={large ? 'lg' : 'md'}>
          {placeholder}
        </Button>
        <StyledInput ref={ref} id={name} name={name} onChange={handleChange} type="file" />
      </BoxInline>
      <Truncate maxWidth="100%">{value || localValue}</Truncate>
    </StyledFileInput>
  );
});

InputFile.defaultProps = {
  disabled: false,
  invert: true,
  large: false,
  placeholder: 'Upload a file',
  readOnly: false,
  width: '100%',
};
