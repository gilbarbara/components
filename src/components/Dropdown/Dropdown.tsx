import { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import ReactDropdown, { ComponentProps, Option } from '@gilbarbara/react-dropdown';
import { SetRequired } from '@gilbarbara/types';
import { opacify } from 'colorizr';

import { getColorTokens } from '~/modules/colors';
import {
  getDisableStyles,
  getOutlineStyles,
  getStyledOptions,
  marginStyles,
} from '~/modules/system';

import { WithTheme } from '~/types';

import Content from './Content';
import Items from './Items';
import { DropdownProps, useDropdown } from './useDropdown';

export const StyledDropdown = styled(
  'div',
  getStyledOptions('placeholder', 'onSearch'),
)<
  SetRequired<Omit<DropdownProps, 'items' | 'large' | 'onChange' | 'values'>, 'accent'> &
    WithTheme & {
      isFilled: boolean;
    }
>(props => {
  const { accent, borderless, isFilled, multi, theme, width } = props;
  const { darkMode, grayScale, radius, spacing, white } = theme;
  const { mainColor } = getColorTokens(accent, null, theme);

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
              box-shadow: 0 3px 0 0 ${opacify(mainColor, 0.5)};
            `
          : getOutlineStyles(mainColor, theme)};
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

function getDropdownComponent(
  props: Pick<DropdownProps, 'accent' | 'allowCreate' | 'onSearch' | 'theme'>,
) {
  return function DropdownRenderer(renderer: ComponentProps) {
    return <Items {...renderer} {...props} />;
  };
}

export function Dropdown(props: DropdownProps) {
  const { componentProps, getDataAttributes } = useDropdown(props);
  const {
    allowCreate,
    closeMultiOnSelect,
    height = 'md',
    inputOptions,
    items,
    menuMaxHeight = 260,
    onChange,
    onClear,
    open,
    showClearButton,
    values = [],
    ...rest
  } = componentProps;
  const { darkMode, grayScale, inputHeight, white } = rest.theme;
  const [isFilled, setFilled] = useState(!!values.length);

  const { mainColor } = getColorTokens(rest.accent ?? 'primary', null, rest.theme);

  const handleChange = (value: Option[]) => {
    setFilled(!!value.length);

    onChange?.(value);
  };

  return (
    <StyledDropdown {...getDataAttributes('DropdownWrapper')} isFilled={isFilled} {...rest}>
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
          minHeight: parseInt(inputHeight[height], 10),
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

export type DropdownOption = Option;

export { defaultProps, type DropdownProps } from './useDropdown';
