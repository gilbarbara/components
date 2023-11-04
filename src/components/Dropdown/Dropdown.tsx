import { useState } from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import ReactDropdown, { ComponentProps, Option } from '@gilbarbara/react-dropdown';
import { SetRequired } from '@gilbarbara/types';
import { transparentize } from 'polished';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import {
  getDisableStyles,
  getOutlineStyles,
  getStyledOptions,
  isDarkMode,
  marginStyles,
} from '~/modules/system';

import Content from './Content';
import Items from './Items';
import { DropdownProps } from './types';

export const defaultProps = {
  accent: 'primary',
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
  width: 260,
} satisfies Omit<DropdownProps, 'items'>;

export const StyledDropdown = styled(
  'div',
  getStyledOptions('placeholder', 'onSearch'),
)<
  SetRequired<Omit<DropdownProps, 'items' | 'large' | 'onChange' | 'values'>, 'accent'> & {
    isFilled: boolean;
  }
>(props => {
  const { accent, borderless, isFilled, multi, width } = props;
  const { grayScale, radius, spacing, white, ...theme } = getTheme(props);
  const { mainColor } = getColorTokens(accent, null, theme);

  const darkMode = isDarkMode(props);
  let borderColor = darkMode ? grayScale['700'] : grayScale['500'];

  if (isFilled) {
    borderColor = mainColor;
  }

  const styles = borderless
    ? css`
        border: 0 !important;
        border-bottom: 1px solid ${borderColor} !important;
        border-radius: 0 !important;
        padding: 0 !important;
      `
    : css`
        background-color: ${darkMode ? grayScale['800'] : white};
        border: 1px solid ${borderColor};
        border-radius: ${radius.xs};
        padding-left: ${multi ? 0 : spacing.xs} !important;
      `;

  return css`
    min-width: ${px(width ?? 260)};
    width: ${px(width) ?? 'auto'};
    ${marginStyles(props)};

    .react-dropdown {
      background-color: transparent;
      ${styles};

      &:focus,
      &:focus-within {
        ${borderless
          ? css`
              box-shadow: 0 3px 0 0 ${transparentize(0.5, mainColor)};
            `
          : getOutlineStyles(mainColor)};

        .react-dropdown-separator {
          background-color: ${mainColor};
        }
      }

      &[disabled] {
        opacity: 1 !important;
        ${getDisableStyles(props)};

        .react-dropdown-content {
          color: ${grayScale['500']};
        }
      }

      &-clear {
        &:hover {
          color: ${theme.colors.red};
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

function getDropdownComponent(props: Pick<DropdownProps, 'accent' | 'allowCreate' | 'onSearch'>) {
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

  const { darkMode, grayScale, inputHeight, white, ...theme } = getTheme({ theme: useTheme() });
  const { mainColor } = getColorTokens(rest.accent ?? 'primary', null, theme);

  const handleChange = (value: Option[]) => {
    setFilled(!!value.length);

    onChange?.(value);
  };

  return (
    <StyledDropdown data-component-name="DropdownWrapper" isFilled={isFilled} {...rest}>
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
          bgColor: darkMode ? grayScale['700'] : white,
          color: mainColor,
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
