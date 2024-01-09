import { ChangeEvent, ReactNode, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps } from '@gilbarbara/react-dropdown';
import { PlainObject, StringOrNumber } from '@gilbarbara/types';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { getStyledOptions, isDarkMode } from '~/modules/system';

import { BoxInline } from '~/components/Box';

import { Theme, WithAccent, WithDisabled } from '~/types';

import Add from './Add';
import { DropdownProps } from './types';

interface DropdownItemsProps
  extends WithAccent,
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
  const { grayScale, spacing } = getTheme(props);

  return css`
    ${getSharedStyles(spacing)};
    border-top: ${withBorder ? `1px solid ${grayScale['200']}` : 0};
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
)<WithAccent>(props => {
  const { accent = 'primary' } = props;
  const { radius, ...theme } = getTheme(props);
  const { mainColor } = getColorTokens(accent, null, theme);

  return css`
    border-radius: ${radius.xs};

    :focus {
      filter: drop-shadow(0 0 2px ${mainColor});
      outline: none;
    }
  `;
});

const Item = styled(
  'div',
  getStyledOptions(),
)<WithAccent & WithDisabled & { hovered: boolean; selected: boolean }>(props => {
  const { accent = 'primary', disabled, hovered, selected } = props;
  const { darkMode, grayScale, spacing, white, ...theme } = getTheme(props);
  const { mainColor, textColor } = getColorTokens(accent, null, theme);
  const { mainColor: bgHoverLight, textColor: colorHoverLight } = getColorTokens(
    `${accent}.50`,
    null,
    theme,
  );
  const { mainColor: bgHoverDark, textColor: colorHoverDark } = getColorTokens(
    `${accent}.800`,
    null,
    theme,
  );

  let itemBgColor = darkMode ? grayScale['800'] : white;
  let itemColor = darkMode ? grayScale['100'] : grayScale['800'];
  const bgHover = darkMode ? bgHoverDark : bgHoverLight;
  const colorHover = darkMode ? colorHoverDark : colorHoverLight;

  if (disabled) {
    itemBgColor = darkMode ? grayScale['700'] : grayScale['40'];
    itemColor = darkMode ? grayScale['200'] : grayScale['500'];
  }

  return css`
    ${getSharedStyles(spacing)};
    background-color: ${itemBgColor};
    color: ${itemColor};
    cursor: pointer;
    pointer-events: ${disabled ? 'none' : undefined};
    ${selected &&
    css`
      background-color: ${mainColor};
      color: ${textColor};
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
  const { grayScale, white } = getTheme(props);
  const darkMode = isDarkMode(props);

  return css`
    background-color: ${darkMode ? grayScale['800'] : white};
    color: ${darkMode ? grayScale['200'] : grayScale['700']};
    cursor: default;
    max-height: ${maxHeight ?? 'none'};
    overflow-y: auto;
  `;
});

const Items = styled(
  'div',
  getStyledOptions(),
)(props => {
  const { grayScale, white } = getTheme(props);
  const darkMode = isDarkMode(props);

  return css`
    background-color: ${darkMode ? grayScale['800'] : white};
    color: ${darkMode ? grayScale['200'] : grayScale['700']};
  `;
});

const Search = styled(
  'div',
  getStyledOptions(),
)(props => {
  const { darkColor, grayScale, lightColor, spacing, typography, white } = getTheme(props);
  const darkMode = isDarkMode(props);

  return css`
    ${getSharedStyles(spacing)};
    background-color: ${darkMode ? grayScale['800'] : white};
    padding: ${spacing.sm};
    position: sticky;
    top: 0;

    input {
      background-color: ${darkMode ? grayScale['800'] : white};
      border: 1px solid ${darkMode ? grayScale['500'] : grayScale['200']};
      color: ${darkMode ? lightColor : darkColor};
      font-size: ${typography.md.fontSize};
      line-height: 1.6;
      padding: ${spacing.xxs} ${spacing.sm};
      width: 100%;
    }
  `;
});

function DropdownItems({ accent, methods, onCreate, onSearch, props, state }: DropdownItemsProps) {
  const { addItem, getLabels, getStyles, removeItem, setSearch } = methods;
  const { autoFocus, create, options, searchable } = props;
  const { cursor, search, values } = state;

  const searchInput = useRef<HTMLInputElement>(null);

  let children;

  if (create) {
    children = (
      <Add accent={accent} methods={methods} onCreate={onCreate} props={props} state={state} />
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

    onSearch?.(value);
  };

  const availableOptions = options
    .filter(item => regexp.test(`${item.label ?? item.value}`))
    .map((option, index) => {
      const { disabled, label, prefix, suffix, value } = option;
      const isSelected = values.includes(option);
      const isHovered = cursor === index;

      return (
        <Item
          key={option.value}
          accent={accent}
          data-component-name="DropdownItem"
          disabled={disabled}
          hovered={isHovered}
          onClick={() => (isSelected ? removeItem(null, option, false) : addItem(option))}
          role="listitem"
          selected={isSelected}
        >
          {prefix && (
            <BoxInline data-component-name="DropdownOptionPrefix" mr="xxs">
              {prefix}
            </BoxInline>
          )}
          <BoxInline flex="grow">{label ?? value}</BoxInline>
          {suffix && (
            <BoxInline data-component-name="DropdownOptionSuffix" ml="xxs">
              {suffix}
            </BoxInline>
          )}
        </Item>
      );
    });

  const output: PlainObject<ReactNode> = {
    options: availableOptions,
  };

  if (children && !availableOptions.length) {
    output.create = <Centered withBorder={!!availableOptions.length}>{children}</Centered>;
  }

  if (!children && !availableOptions.length) {
    output.options = <Empty>{getLabels().noData}</Empty>;
  }

  return (
    <List data-component-name="DropdownItems" maxHeight={getStyles().menuMaxHeight}>
      {searchable && (
        <Search data-component-name="DropdownItemsSearch">
          <Input
            ref={searchInput}
            accent={accent}
            onChange={handleSearch}
            type="text"
            value={search}
          />
        </Search>
      )}
      <Items data-component-name="DropdownItemsList">{output.options}</Items>
      {output.create}
    </List>
  );
}

DropdownItems.displayName = 'DropdownItems';

export default DropdownItems;
