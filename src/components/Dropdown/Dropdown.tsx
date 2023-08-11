import { useState } from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import ReactDropdown, { ComponentProps, Option } from '@gilbarbara/react-dropdown';
import { SetRequired } from 'type-fest';

import { getColorVariant, getTheme } from '~/modules/helpers';
import { getStyledOptions, isDarkMode, marginStyles } from '~/modules/system';

import { DropdownProps } from '~/types';

import Content from './Content';
import Items from './Items';

export const defaultProps = {
  allowCreate: false,
  autoFocus: false,
  borderless: false,
  closeOnScroll: false,
  closeMultiOnSelect: false,
  direction: 'ltr',
  disabled: false,
  keepSelectedInList: true,
  labels: {
    create: 'Create {search}',
    noData: 'Nothing found',
  },
  large: false,
  loading: false,
  menuMaxHeight: 260,
  multi: false,
  placeholder: 'Select an option',
  searchBy: 'label',
  searchable: true,
  showClearButton: false,
  showSeparator: false,
  shade: 'mid',
  variant: 'primary',
  width: 260,
} satisfies Omit<DropdownProps, 'items'>;

export const StyledDropdown = styled(
  'div',
  getStyledOptions('placeholder', 'onSearch'),
)<
  SetRequired<Omit<DropdownProps, 'items' | 'large' | 'onChange' | 'values'>, 'variant'> & {
    isFilled: boolean;
  }
>(props => {
  const { borderless, isFilled, multi, shade, variant, width } = props;
  const { grayDark, grayMid, radius, spacing, variants } = getTheme(props);
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
        border: 1px solid ${borderColor};
        border-radius: ${radius.xs};
        padding-left: ${multi ? 0 : spacing.xs} !important;
      `;

  return css`
    min-width: ${px(width ?? 260)};
    width: ${px(width) ?? 'auto'};
    ${marginStyles(props)};

    .react-dropdown {
      ${styles};

      &:focus,
      &:focus-within {
        border-color: ${bg} !important;
        box-shadow: ${borderless ? 'none' : `0 0 8px 1px ${bg}`} !important;

        .react-dropdown-separator {
          background-color: ${bg};
        }
      }

      &[disabled] {
        opacity: 1 !important;

        .react-dropdown-content {
          color: ${grayMid};
        }
      }

      &-clear {
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

      &-menu {
        border: 0 !important;
        border-radius: ${radius.xs};
        overflow: hidden;
        width: 100% !important;
        z-index: 100;

        &:empty {
          display: none;
        }
      }

      &-loading {
        padding: 0 ${spacing.xs};

        &:after {
          margin: 0;
        }
      }

      &-separator {
        background-color: ${borderColor};
      }
    }
  `;
});

function getDropdownComponent(
  props: Pick<DropdownProps, 'allowCreate' | 'onSearch' | 'shade' | 'variant'>,
) {
  return function DropdownRenderer(renderer: ComponentProps) {
    return <Items {...renderer} {...props} />;
  };
}

export function Dropdown(props: DropdownProps) {
  const {
    allowCreate,
    closeMultiOnSelect,
    inputOptions,
    items,
    large,
    menuMaxHeight = 260,
    onChange,
    onClear,
    open,
    showClearButton,
    values = [],
    ...rest
  } = {
    ...defaultProps,
    ...props,
  };
  const [isFilled, setFilled] = useState(!!values.length);

  const { darkMode, grayDarker, inputHeight, variants, white } = getTheme({ theme: useTheme() });
  const { bg } = getColorVariant(rest.variant ?? 'primary', rest.shade, variants);

  const handleChange = (value: Option[]) => {
    setFilled(!!value.length);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <StyledDropdown data-component-name="Dropdown" isFilled={isFilled} {...rest}>
      <ReactDropdown
        closeOnSelect={closeMultiOnSelect}
        contentComponent={Content}
        create={allowCreate}
        hiddenInput={inputOptions}
        menuComponent={getDropdownComponent({ allowCreate, ...rest })}
        onChange={handleChange}
        onClearAll={onClear}
        open={open}
        options={items}
        showClearButton={showClearButton}
        styles={{
          bgColor: darkMode ? grayDarker : white,
          color: bg,
          gap: 0,
          minHeight: parseInt(large ? inputHeight.large : inputHeight.normal, 10),
          menuMaxHeight,
          width: rest.width,
        }}
        values={values}
        {...rest}
      />
    </StyledDropdown>
  );
}

Dropdown.displayName = 'Dropdown';