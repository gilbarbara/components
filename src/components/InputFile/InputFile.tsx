import { ChangeEvent, forwardRef, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { StringOrNull } from '@gilbarbara/types';

import { baseStyles, getStyledOptions } from '~/modules/system';

import { Button } from '~/components/Button';
import { FlexInline } from '~/components/Flex';
import { Truncate } from '~/components/Truncate';

import { WithTheme } from '~/types';

import { InputFileProps, useInputFile } from './useInputFile';

export const StyledFileInput = styled(
  'div',
  getStyledOptions(),
)<Partial<InputFileProps> & WithTheme>(props => {
  const { theme, width } = props;
  const { dataAttributeName, spacing } = theme;

  return css`
    ${baseStyles(theme)};
    align-items: center;
    display: flex;
    width: ${px(width)};

    [data-${dataAttributeName}='Truncate'] {
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
  const { componentProps, getDataAttributes } = useInputFile(props);
  const { accent, disabled, height, name, onChange, placeholder, readOnly, solid, value, ...rest } =
    componentProps;
  const [localValue, setLocalValue] = useState<StringOrNull>(null);

  const isDisabled = disabled || readOnly;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    setLocalValue(files?.length ? files[0].name : '');

    onChange?.(event);
  };

  return (
    <StyledFileInput {...getDataAttributes('InputFile')} {...rest}>
      <FlexInline position="relative">
        <Button
          bg={accent}
          disabled={isDisabled}
          size={height}
          style={{ zIndex: isDisabled ? 2 : 1 }}
          variant={solid ? 'solid' : 'bordered'}
        >
          {placeholder}
        </Button>
        <StyledInput ref={ref} id={name} name={name} onChange={handleChange} type="file" />
      </FlexInline>
      <Truncate maxWidth="100%">{localValue ?? value}</Truncate>
    </StyledFileInput>
  );
});

InputFile.displayName = 'InputFile';

export { defaultProps, type InputFileProps } from './useInputFile';
