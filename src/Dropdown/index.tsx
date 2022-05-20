import { useState } from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import ReactDropdown, { SelectRenderer } from '@gilbarbara/react-dropdown';

import Content from './Content';
import Handle from './Handle';
import Items from './Items';

import { getColorVariant, getTheme, px } from '../modules/helpers';
import { getStyledOptions, isDarkMode, marginStyles } from '../modules/system';
import { DropdownItem, DropdownProps } from '../types';

export const StyledDropdown = styled(
  'div',
  getStyledOptions('direction', 'placeholder', 'onSearch'),
)<
  Omit<DropdownProps<any>, 'items' | 'onChange' | 'values'> & {
    isFilled: boolean;
  }
>(props => {
  const { borderless, isFilled, large, separator, shade, variant = 'primary', width } = props;
  const { grayDark, grayDarker, grayMid, inputHeight, radius, spacing, variants, white } =
    getTheme(props);
  const { bg } = getColorVariant(variant, shade, variants);

  const darkMode = isDarkMode(props);
  let borderColor = darkMode ? grayDark : grayMid;

  if (isFilled) {
    borderColor = bg;
  }

  const styles = borderless
    ? css`
        border: 0 !important;
        border-bottom: 1px solid ${borderColor} !important;
        border-radius: 0 !important;
        padding: 0 !important;
      `
    : css`
        background-color: ${darkMode ? grayDarker : white};
        border: 1px solid ${borderColor};
        border-radius: ${radius.xs};
        padding: 0 0 0 ${spacing.md} !important;
      `;

  return css`
    min-width: ${px(width || 260)};
    width: ${width ? px(width) : 'auto'};
    ${marginStyles(props)};

    .react-dropdown-select {
      min-height: ${large ? inputHeight.large : inputHeight.normal};
      ${styles};

      &:hover,
      &:focus,
      &:focus-within {
        border-color: ${bg} !important;
        box-shadow: ${borderless ? 'none' : `0 0 8px 1px ${bg}`} !important;

        .react-dropdown-select-separator {
          border-color: ${bg};
        }
      }

      &[disabled] {
        opacity: 1 !important;

        .react-dropdown-select-content {
          color: ${grayMid};
        }
      }

      &-clear {
        align-items: center;
        align-self: stretch;
        color: ${grayMid};
        display: flex;
        font-size: 20px;
        line-height: 1;
        margin: 0;
        padding-left: ${spacing.xs};
        padding-right: ${separator ? spacing.xs : spacing.xxs};
        transition: color 0.2s;

        &:hover {
          color: ${variants.red.mid.bg};
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

      &-dropdown-handle {
        align-items: center;
        align-self: stretch;
        display: flex;
      }

      &-loading {
        padding: 0 ${spacing.xs};
        &:after {
          margin: 0;
        }
      }

      &-separator {
        align-self: stretch;
        border-left-color: ${borderColor};
        height: auto;
      }
    }
  `;
});

function getDropdownRenderer<T extends DropdownItem>(
  props: Pick<DropdownProps<T>, 'allowCreate' | 'onSearch' | 'shade' | 'variant'>,
) {
  return function DropdownRenderer(renderer: SelectRenderer<T>) {
    return <Items {...renderer} {...props} />;
  };
}

export function Dropdown<T extends DropdownItem>(props: DropdownProps<T>) {
  const {
    allowCreate,
    clearable,
    closeMultiOnSelect,
    inputOptions,
    height = 260,
    items,
    onClear,
    onChange,
    open,
    values = [],
    ...rest
  } = props;
  const [currentValues, setCurrentValues] = useState<T[]>([]);
  const [isFilled, setFilled] = useState(!!values.length);

  const { variants } = getTheme({ theme: useTheme() });
  const { bg } = getColorVariant(rest.variant || 'primary', rest.shade, variants);

  const handleChange = (value: T[]) => {
    setFilled(!!value.length);

    setCurrentValues(value);

    if (onChange) {
      onChange(value);
    }
  };

  let input;

  if (inputOptions) {
    const { name, property = 'value', required, separator = ',' } = inputOptions;

    input = (
      <input
        name={name}
        required={required}
        type="hidden"
        value={currentValues.map(d => d[property] || d.value).join(separator)}
      />
    );
  }

  return (
    <StyledDropdown data-component-name="Dropdown" isFilled={isFilled} {...rest}>
      <ReactDropdown
        className=""
        clearable={clearable && isFilled}
        closeOnSelect={closeMultiOnSelect}
        color={bg}
        contentRenderer={Content}
        create={allowCreate}
        dropdownHandleRenderer={Handle}
        dropdownHeight={px(height)}
        dropdownRenderer={getDropdownRenderer<T>({ allowCreate, ...rest })}
        keepOpen={open}
        onChange={handleChange}
        onClearAll={onClear}
        options={items}
        values={values}
        {...rest}
      />
      {input}
    </StyledDropdown>
  );
}

Dropdown.defaultProps = {
  allowCreate: false,
  autoFocus: true,
  backspaceDelete: true,
  borderless: false,
  clearable: false,
  closeOnScroll: false,
  closeMultiOnSelect: false,
  createLabel: 'Create {search}',
  direction: 'ltr',
  disabled: false,
  dropdownGap: 0,
  dropdownPosition: 'auto',
  height: 260,
  keepSelectedInList: true,
  large: false,
  loading: false,
  multi: false,
  noDataLabel: 'Nothing found',
  placeholder: 'Select an option',
  searchable: true,
  separator: false,
  shade: 'mid',
  variant: 'primary',
  width: 260,
};
