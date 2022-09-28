import { ChangeEvent, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps } from '@gilbarbara/react-dropdown';
import { AnyObject, StringOrNumber } from '@gilbarbara/types';

import Add from './Add';

import { BoxInline } from '../Box';
import { getColorVariant, getTheme } from '../modules/helpers';
import { getStyledOptions, isDarkMode } from '../modules/system';
import { DropdownProps, Theme, WithColor } from '../types';

interface DropdownOptionsProps
  extends WithColor,
    ComponentProps,
    Pick<DropdownProps, 'allowCreate' | 'onCreate' | 'onSearch'> {}

const getSharedStyles = (spacing: Theme['spacing']) => css`
  align-items: center;
  display: flex;
  padding: ${spacing.xs} ${spacing.sm};
  width: 100%;
`;

const Centered = styled(
  'div',
  getStyledOptions(),
)<{ withBorder: boolean }>(props => {
  const { withBorder } = props;
  const { grayLight, spacing } = getTheme(props);

  return css`
    ${getSharedStyles(spacing)};
    border-top: ${withBorder ? `1px solid ${grayLight}` : 0};
    justify-content: center;
    padding: 0;
  `;
});

const Empty = styled(
  'div',
  getStyledOptions(),
)(props => {
  const { spacing } = getTheme(props);

  return css`
    ${getSharedStyles(spacing)};
    justify-content: center;
  `;
});

const Input = styled(
  'input',
  getStyledOptions(),
)<WithColor>(props => {
  const { shade, variant = 'primary' } = props;
  const { radius, variants } = getTheme(props);
  const { bg } = getColorVariant(variant, shade, variants);

  return css`
    border-radius: ${radius.xs};

    :focus {
      filter: drop-shadow(0 0 2px ${bg});
      outline: none;
    }
  `;
});

const Item = styled(
  'div',
  getStyledOptions(),
)<WithColor & { disabled?: boolean; hovered: boolean; selected: boolean }>(props => {
  const { disabled, hovered, selected, shade, variant = 'primary' } = props;
  const {
    darkMode,
    grayDark,
    grayDarker,
    grayLight,
    grayLighter,
    grayLightest,
    grayMid,
    spacing,
    variants,
    white,
  } = getTheme(props);
  const { bg, color } = getColorVariant(variant, shade, variants);
  const { bg: bgHoverLight, color: colorHoverLight } = getColorVariant(
    variant,
    'lightest',
    variants,
  );
  const { bg: bgHoverDark, color: colorHoverDark } = getColorVariant(variant, 'darker', variants);

  let itemBgColor = darkMode ? grayDarker : white;
  let itemColor = darkMode ? grayLighter : grayDarker;
  const bgHover = darkMode ? bgHoverDark : bgHoverLight;
  const colorHover = darkMode ? colorHoverDark : colorHoverLight;

  if (disabled) {
    itemBgColor = darkMode ? grayDark : grayLightest;
    itemColor = darkMode ? grayLight : grayMid;
  }

  return css`
    ${getSharedStyles(spacing)};
    background-color: ${itemBgColor};
    color: ${itemColor};
    cursor: pointer;
    pointer-events: ${disabled ? 'none' : undefined};
    ${selected &&
    css`
      background-color: ${bg};
      color: ${color};
    `};
    ${hovered &&
    !disabled &&
    css`
      background-color: ${bgHover};
      color: ${colorHover};
    `};

    &:hover {
      background-color: ${bgHover};
      color: ${colorHover};
    }
  `;
});

const List = styled(
  'div',
  getStyledOptions(),
)<{ maxHeight?: StringOrNumber }>(props => {
  const { maxHeight } = props;
  const { grayDark, grayDarker, grayLight, white } = getTheme(props);
  const darkMode = isDarkMode(props);

  return css`
    background-color: ${darkMode ? grayDarker : white};
    color: ${darkMode ? grayLight : grayDark};
    cursor: default;
    max-height: ${maxHeight || 'none'};
    overflow-y: auto;
  `;
});

const Items = styled(
  'div',
  getStyledOptions(),
)(props => {
  const { grayDark, grayDarker, grayLight, white } = getTheme(props);
  const darkMode = isDarkMode(props);

  return css`
    background-color: ${darkMode ? grayDarker : white};
    color: ${darkMode ? grayLight : grayDark};
  `;
});

const Search = styled(
  'div',
  getStyledOptions(),
)(props => {
  const { darkColor, grayDarker, grayLight, grayMid, lightColor, spacing, typography, white } =
    getTheme(props);
  const darkMode = isDarkMode(props);

  return css`
    ${getSharedStyles(spacing)};
    background-color: ${darkMode ? grayDarker : white};
    padding: ${spacing.sm};
    position: sticky;
    top: 0;

    input {
      background-color: ${darkMode ? grayDarker : white};
      border: 1px solid ${darkMode ? grayMid : grayLight};
      color: ${darkMode ? lightColor : darkColor};
      font-size: ${typography.regular.fontSize};
      line-height: 1.6;
      padding: ${spacing.xxs} ${spacing.sm};
      width: 100%;
    }
  `;
});

function DropdownOptions({
  methods,
  onCreate,
  onSearch,
  props,
  shade,
  state,
  variant,
}: DropdownOptionsProps) {
  const { addItem, getLabels, getStyles, removeItem, setSearch } = methods;
  const { autoFocus, create, options, searchable } = props;
  const { cursor, search, values } = state;

  const searchInput = useRef<HTMLInputElement>(null);

  let children;

  if (create) {
    children = (
      <Add
        methods={methods}
        onCreate={onCreate}
        props={props}
        shade={shade}
        state={state}
        variant={variant}
      />
    );
  }

  const regexp = new RegExp(search.replace(/[$()*+.?[\\\]^{|}]/g, '\\$&'), 'i');

  useEffect(() => {
    const { current } = searchInput;

    if (current && autoFocus) {
      current.focus();
    }
  }, [autoFocus]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearch(event);

    if (onSearch) {
      onSearch(value);
    }
  };

  const availableOptions = options
    .filter(item => regexp.test(`${item.label || item.value}`))
    .map((option, index) => {
      const { disabled, label, prefix, suffix, value } = option;
      const isSelected = values.includes(option);
      const isHovered = cursor === index;

      return (
        <Item
          key={option.value}
          data-component-name="DropdownItem"
          disabled={disabled}
          hovered={isHovered}
          onClick={() => (isSelected ? removeItem(null, option, false) : addItem(option))}
          role="listitem"
          selected={isSelected}
          shade={shade}
          variant={variant}
        >
          {prefix && (
            <BoxInline data-component-name="DropdownOptionPrefix" mr="xxs">
              {prefix}
            </BoxInline>
          )}
          <BoxInline flex="grow">{label || value}</BoxInline>
          {suffix && (
            <BoxInline data-component-name="DropdownOptionSuffix" ml="xxs">
              {suffix}
            </BoxInline>
          )}
        </Item>
      );
    });

  const output: AnyObject = {
    options: availableOptions,
  };

  if (children && !availableOptions.length) {
    output.create = <Centered withBorder={!!availableOptions.length}>{children}</Centered>;
  }

  if (!children && !availableOptions.length) {
    output.options = <Empty>{getLabels().noData}</Empty>;
  }

  return (
    <List data-component-name="DropdownOptions" maxHeight={getStyles().menuMaxHeight}>
      {searchable && (
        <Search data-component-name="DropdownOptionsSearch">
          <Input
            ref={searchInput}
            onChange={handleSearch}
            shade={shade}
            type="text"
            value={search}
            variant={variant}
          />
        </Search>
      )}
      <Items data-component-name="DropdownOptionsList">{output.options}</Items>
      {output.create}
    </List>
  );
}

export default DropdownOptions;
