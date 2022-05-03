import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SelectRenderer } from '@gilbarbara/react-dropdown';
import { AnyObject, StringOrNumber } from '@gilbarbara/types';
import is from 'is-lite';

import Add from './Add';

import { FlexInline } from '../Flex';
import { getTheme } from '../modules/helpers';
import { isDarkMode, styledOptions } from '../modules/system';
import { DropdownOption, DropdownProps, Theme } from '../types';

const { useEffect, useRef } = React;

interface DropdownOptionsProps<T extends DropdownOption>
  extends SelectRenderer<T>,
    Pick<DropdownProps<T>, 'createFn' | 'showCreateAlways'> {}

const getSharedStyles = (spacing: Theme['spacing']) => css`
  align-items: center;
  display: flex;
  padding: ${spacing.xs} ${spacing.sm};
  width: 100%;
`;

const Centered = styled(
  'div',
  styledOptions,
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
  styledOptions,
)(props => {
  const { spacing } = getTheme(props);

  return css`
    ${getSharedStyles(spacing)};
    justify-content: center;
  `;
});

const Input = styled(
  'input',
  styledOptions,
)(props => {
  const { colors, radius } = getTheme(props);

  return css`
    border-radius: ${radius.xs};

    :focus {
      outline-color: ${colors.primary};
    }
  `;
});

const Item = styled(
  'div',
  styledOptions,
)<{ disabled?: boolean; selected: boolean }>(props => {
  const { color, disabled, selected } = props;
  const { grayDark, grayDarker, grayLight, grayMid, grayScale, spacing, white } = getTheme(props);

  const darkMode = isDarkMode(props);
  let itemColor = darkMode ? grayScale['20'] : grayDarker;

  if (disabled) {
    itemColor = grayMid;
  }

  return css`
    ${getSharedStyles(spacing)};
    color: ${itemColor};
    cursor: pointer;
    pointer-events: ${disabled ? 'none' : undefined};
    ${selected &&
    css`
      background-color: ${color};
      color: ${white};
    `};

    img {
      height: px(20);
      margin-right: ${spacing.sm};
      width: px(20);
    }

    &:hover {
      background-color: ${grayLight};
      color: ${grayDark};
    }
  `;
});

const List = styled(
  'div',
  styledOptions,
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

const Options = styled(
  'div',
  styledOptions,
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
  styledOptions,
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

function DropdownOptions<T extends DropdownOption = DropdownOption>({
  createFn: Create,
  methods,
  props,
  showCreateAlways,
  state,
}: DropdownOptionsProps<T>) {
  const { addItem, dropDown, removeItem, setSearch } = methods;
  const { additionalProps, color, create, dropdownHeight, options, searchable } = props;
  const { search, values } = state;

  const searchInput = useRef<HTMLInputElement>(null);

  const close = () => dropDown('close');
  let children;

  if (create) {
    children = Create ? (
      <Create close={close} select={addItem} value={search} />
    ) : (
      <Add methods={methods} props={props} state={state} />
    );
  }

  const regexp = new RegExp(search, 'i');

  useEffect(() => {
    const { current } = searchInput;

    /* istanbul ignore else */
    if (current) {
      current.focus();
    }
  }, []);

  const availableOptions = options
    .filter(item => regexp.test(`${item.label}`))
    .map(option => {
      const { content, disabled, label } = option;
      const isSelected = values.includes(option);

      return (
        <Item
          key={is.string(option) ? option : option.value}
          color={color}
          data-component-name="DropdownOption"
          disabled={disabled}
          onClick={() => (isSelected ? removeItem(null, option, false) : addItem(option))}
          selected={isSelected}
        >
          <FlexInline mr="xxs">{content}</FlexInline>
          <FlexInline>{label || option}</FlexInline>
        </Item>
      );
    });

  const output: AnyObject = {
    options: availableOptions,
  };

  if (children && (showCreateAlways || !availableOptions.length)) {
    output.create = <Centered withBorder={!!availableOptions.length}>{children}</Centered>;
  }

  if (!children && !availableOptions.length) {
    output.options = <Empty>Nothing found</Empty>;
  }

  return (
    <List data-component-name="DropdownOptions" maxHeight={dropdownHeight} role="list">
      {searchable && (
        <Search data-component-name="DropdownOptionsSearch">
          <Input
            ref={searchInput}
            onChange={setSearch}
            type="text"
            value={search}
            {...additionalProps}
          />
        </Search>
      )}
      <Options data-component-name="DropdownOptionsList">{output.options}</Options>
      {output.create}
    </List>
  );
}

export default DropdownOptions;
