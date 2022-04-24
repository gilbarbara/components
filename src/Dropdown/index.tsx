import * as React from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import ReactDropdown, { SelectRenderer } from '@gilbarbara/react-dropdown';

import Content from './Content';
import Options from './Options';

import { getTheme, px } from '../modules/helpers';
import { isDarkMode, marginStyles, styledOptions } from '../modules/system';
import { DropdownOption, DropdownProps } from '../types';

export const StyledDropdown = styled(
  'div',
  styledOptions,
)<
  Omit<DropdownProps<any>, 'onChange' | 'options' | 'values'> & {
    isFilled: boolean;
  }
>(props => {
  const { colors, grayDark, grayDarker, grayMid, inputHeight, radius, spacing, white } =
    getTheme(props);

  const darkMode = isDarkMode(props);
  const { bigger, borderless, isFilled, width } = props;
  let borderColor = darkMode ? grayDark : grayMid;

  if (isFilled) {
    borderColor = colors.primary;
  }

  const styles = borderless
    ? css`
        border: 0 !important;
        border-bottom: 1px solid ${borderColor} !important;
        border-radius: 0 !important;
        padding: ${spacing.xxs} 0 !important;
      `
    : css`
        background-color: ${darkMode ? grayDarker : white};
        border: 1px solid ${borderColor};
        border-radius: ${radius.xs};
        padding: ${spacing.xxs} ${spacing.md} !important;
      `;

  return css`
    ${marginStyles(props)}
    min-width: ${px(width || 260)};
    width: ${width ? px(width) : 'auto'};

    .react-dropdown-select {
      ${styles};
      box-shadow: none !important;
      min-height: ${bigger ? inputHeight.md : inputHeight.sm};

      &[disabled] {
        opacity: 1 !important;

        .react-dropdown-select-content {
          color: ${grayMid};
        }

        .react-dropdown-select-dropdown-handle {
          display: none;
        }
      }

      &-content {
        align-items: center;
        width: calc(100% - 16px);

        span {
          max-width: 100%;

          + input {
            margin-left: 5px;
          }
        }
      }

      &-dropdown-handle {
        margin: 0;

        svg {
          vertical-align: inherit !important;
        }
      }

      &-dropdown {
        border: 0 !important;
        border-radius: ${radius.xs};
        overflow: hidden;
        width: 100% !important;
        z-index: 100;

        &:empty {
          display: none;
        }
      }
    }
  `;
});

function getDropdownRenderer<T extends DropdownOption>({
  createFn,
  showCreateAlways,
}: Pick<DropdownProps<T>, 'createFn' | 'showCreateAlways'>) {
  return function DropdownRenderer({ methods, props, state }: SelectRenderer<T>) {
    return (
      <Options<T>
        createFn={createFn}
        methods={methods}
        props={props}
        showCreateAlways={showCreateAlways}
        state={state}
      />
    );
  };
}

export function Dropdown<T extends DropdownOption>(props: DropdownProps<T>) {
  const { createFn, clearable, onChange, showCreateAlways, values = [], ...rest } = props;
  const [isFilled, setFilled] = React.useState(!!values.length);

  const { colors } = getTheme({ theme: useTheme() });

  const handleChange = (value: T[]) => {
    setFilled(!!value.length);

    if (onChange) {
      onChange(value);
    }
  };

  const [value] = values;

  return (
    <StyledDropdown data-component-name="Dropdown" {...rest} isFilled={isFilled}>
      <ReactDropdown
        key={value?.value}
        autoFocus={false}
        clearable={clearable && isFilled}
        color={colors.primary}
        contentRenderer={Content}
        create={!!createFn}
        dropdownGap={0}
        dropdownHeight="256px"
        dropdownPosition="auto"
        dropdownRenderer={getDropdownRenderer<T>({ createFn, showCreateAlways })}
        onChange={handleChange}
        searchable
        values={values}
        {...rest}
      />
    </StyledDropdown>
  );
}

Dropdown.defaultProps = {
  bigger: false,
  borderless: false,
  createNewLabel: '+ Add {search}',
  placeholder: 'Select an option',
  showCreateAlways: false,
  width: 260,
};
