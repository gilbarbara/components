import { ChangeEvent, forwardRef, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { Simplify, StringOrNull } from '@gilbarbara/types';

import { getTheme } from '~/modules/helpers';
import { baseStyles, getStyledOptions } from '~/modules/system';

import { BoxInline } from '~/components/Box';
import { Button } from '~/components/Button';
import { Truncate } from '~/components/Truncate';

import { OmitElementProps, StyledProps, WithAccent, WithFormElements } from '~/types';

export interface InputFileKnownProps extends StyledProps, WithAccent, WithFormElements {
  /**
   * Invert background
   * @default true
   */
  invert?: boolean;
  /** @default false */
  large?: boolean;
  value?: string;
}

export type InputFileProps = Simplify<
  OmitElementProps<HTMLInputElement, InputFileKnownProps, 'name' | 'type' | 'width'>
>;

export const defaultProps = {
  accent: 'primary',
  disabled: false,
  invert: true,
  large: false,
  placeholder: 'Upload a file',
  readOnly: false,
  width: '100%',
} satisfies Omit<InputFileProps, 'name'>;

export const StyledFileInput = styled(
  'div',
  getStyledOptions(),
)<Partial<InputFileProps>>(props => {
  const { width } = props;
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
  bottom: 0;
  font-size: 24px;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;

  &::file-selector-button {
    cursor: pointer;
  }
`;

export const InputFile = forwardRef<HTMLInputElement, InputFileProps>((props, ref) => {
  const { accent, disabled, invert, large, name, onChange, placeholder, readOnly, value, ...rest } =
    {
      ...defaultProps,
      ...props,
    };
  const [localValue, setLocalValue] = useState<StringOrNull>(null);
  const isDisabled = disabled || readOnly;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    setLocalValue(files?.length ? files[0].name : '');

    onChange?.(event);
  };

  return (
    <StyledFileInput data-component-name="InputFile" {...rest}>
      <BoxInline position="relative">
        <Button
          bg={accent}
          disabled={isDisabled}
          invert={invert}
          size={large ? 'lg' : 'md'}
          style={{ zIndex: isDisabled ? 2 : 1 }}
        >
          {placeholder}
        </Button>
        <StyledInput ref={ref} id={name} name={name} onChange={handleChange} type="file" />
      </BoxInline>
      <Truncate maxWidth="100%">{localValue ?? value}</Truncate>
    </StyledFileInput>
  );
});

InputFile.displayName = 'InputFile';
