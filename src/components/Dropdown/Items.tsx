import { ChangeEvent, ReactNode, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps } from '@gilbarbara/react-dropdown';
import { PlainObject, StringOrNumber } from '@gilbarbara/types';

import { useTheme } from '~/hooks/useTheme';

import { getColorTokens } from '~/modules/colors';
import { getStyledOptions } from '~/modules/system';

import { FlexInline } from '~/components/Flex';

import { Theme, WithAccent, WithDisabled, WithTheme } from '~/types';

import Add from './Add';
import { DropdownProps } from './useDropdown';

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
)<WithTheme & { withBorder: boolean }>(props => {
  const { theme, withBorder } = props;
  const { grayScale, spacing } = theme;

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
)<WithTheme>(props => {
  const { spacing } = props.theme;

  return css`
    ${getSharedStyles(spacing)};
    justify-content: center;
  `;
});

const Input = styled(
  'input',
  getStyledOptions(),
)<WithAccent & WithTheme>(props => {
  const { accent = 'primary', theme } = props;
  const { radius } = theme;
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
)<WithAccent & WithDisabled & WithTheme & { hovered: boolean; selected: boolean }>(props => {
  const { accent = 'primary', disabled, hovered, selected, theme } = props;
  const { darkMode, grayScale, spacing, white } = theme;
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
)<WithTheme & { maxHeight?: StringOrNumber }>(props => {
  const { maxHeight, theme } = props;
  const { darkMode, grayScale, white } = theme;

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
)<WithTheme>(props => {
  const { darkMode, grayScale, white } = props.theme;

  return css`
    background-color: ${darkMode ? grayScale['800'] : white};
    color: ${darkMode ? grayScale['200'] : grayScale['700']};
  `;
});

const Search = styled(
  'div',
  getStyledOptions(),
)<WithTheme>(props => {
  const { darkColor, darkMode, grayScale, lightColor, spacing, typography, white } = props.theme;

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
  const { getDataAttributes, theme } = useTheme();

  const searchInput = useRef<HTMLInputElement>(null);

  let children;

  if (create) {
    children = (
      <Add
        accent={accent}
        methods={methods}
        onCreate={onCreate}
        props={props}
        state={state}
        theme={theme}
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
          {...getDataAttributes('DropdownItem')}
          disabled={disabled}
          hovered={isHovered}
          onClick={() => (isSelected ? removeItem(null, option, false) : addItem(option))}
          role="listitem"
          selected={isSelected}
          theme={theme}
        >
          {prefix && (
            <FlexInline {...getDataAttributes('DropdownOptionPrefix')} mr="xxs">
              {prefix}
            </FlexInline>
          )}
          <FlexInline flex="grow">{label ?? value}</FlexInline>
          {suffix && (
            <FlexInline {...getDataAttributes('DropdownOptionSuffix')} ml="xxs">
              {suffix}
            </FlexInline>
          )}
        </Item>
      );
    });

  const output: PlainObject<ReactNode> = {
    options: availableOptions,
  };

  if (children && !availableOptions.length) {
    output.create = (
      <Centered theme={theme} withBorder={!!availableOptions.length}>
        {children}
      </Centered>
    );
  }

  if (!children && !availableOptions.length) {
    output.options = <Empty theme={theme}>{getLabels().noData}</Empty>;
  }

  return (
    <List
      {...getDataAttributes('DropdownItems')}
      maxHeight={getStyles().menuMaxHeight}
      theme={theme}
    >
      {searchable && (
        <Search {...getDataAttributes('DropdownItemsSearch')} theme={theme}>
          <Input
            ref={searchInput}
            accent={accent}
            onChange={handleSearch}
            theme={theme}
            type="text"
            value={search}
          />
        </Search>
      )}
      <Items {...getDataAttributes('DropdownItemsList')} theme={theme}>
        {output.options}
      </Items>
      {output.create}
    </List>
  );
}

DropdownItems.displayName = 'DropdownItems';

export default DropdownItems;
