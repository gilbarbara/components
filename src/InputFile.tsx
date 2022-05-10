import { ChangeEvent, forwardRef, useState } from 'react';
import styled from '@emotion/styled';

import { Button } from './Button';
import { FlexInline } from './Flex';
import { getStyledOptions } from './modules/system';
import { Spacer } from './Spacer';
import { Truncate } from './Truncate';
import { ComponentProps, StyledProps, WithInvert } from './types';

export interface InputFileKnownProps extends StyledProps, WithInvert {
  /** @default false */
  large?: boolean;
  value?: string;
}

export type InputFileProps = ComponentProps<HTMLInputElement, InputFileKnownProps, 'type'>;

export const StyledInputFile = styled('input', getStyledOptions())`
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
    <Spacer gap="xs">
      <FlexInline overflow="hidden" position="relative">
        <Button invert={invert} size={large ? 'lg' : 'md'}>
          {placeholder}
        </Button>
        <StyledInputFile
          ref={ref}
          id={name}
          name={name}
          onChange={handleChange}
          type="file"
          {...rest}
        />
      </FlexInline>
      <Truncate maxWidth="70%">{value || localValue}</Truncate>
    </Spacer>
  );
});

InputFile.defaultProps = {
  invert: true,
  large: false,
  placeholder: 'Upload a file',
};
InputFile.displayName = 'InputFile';
