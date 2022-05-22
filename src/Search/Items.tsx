import { forwardRef, MouseEventHandler, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnyObject, StringOrNumber } from '@gilbarbara/types';

import Item from './Item';

import { getTheme, px } from '../modules/helpers';
import { getStyledOptions, isDarkMode } from '../modules/system';
import { SearchItem, SearchProps, Theme } from '../types';

interface SearchItemsProps extends Pick<SearchProps, 'noResultsLabel'> {
  active: boolean;
  cursor: number;
  height: StringOrNumber;
  items: SearchItem[];
  onSelect: MouseEventHandler;
}

const StyledSearchItems = styled(
  'div',
  getStyledOptions(),
)<{ active: boolean; height: StringOrNumber }>(props => {
  const { active, height } = props;
  const { grayDarker, radius, shadow, spacing, white } = getTheme(props);
  const darkMode = isDarkMode(props);

  return css`
    background-color: ${darkMode ? grayDarker : white};
    border-radius: ${radius.xxs};
    box-shadow: ${shadow.mid};
    left: 0;
    max-height: ${px(height)};
    margin-top: ${spacing.xs};
    overflow-y: auto;
    position: absolute;
    right: 0;
    top: 100%;
    transform-origin: top;
    transform: scaleY(0);
    transition: transform 0.3s;

    ${active &&
    css`
      transform: scaleY(1);
    `}
  `;
});

function getSharedStyles(spacing: Theme['spacing']) {
  return css`
    align-items: center;
    display: flex;
    padding: ${spacing.xs} ${spacing.sm};
    width: 100%;
  `;
}

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

const SearchItems = forwardRef<HTMLDivElement, SearchItemsProps>((props, ref) => {
  const { active, cursor, height, items, noResultsLabel, onSelect } = props;
  const isActive = useRef(false);

  useEffect(() => {
    isActive.current = true;

    return () => {
      isActive.current = false;
    };
  }, []);

  const content: AnyObject = {};

  content.items = !items.length ? (
    <Empty>{noResultsLabel}</Empty>
  ) : (
    items.map((data, index) => (
      <Item key={data.value} isSelected={cursor === index} onClick={onSelect} value={data.value}>
        {data.label || data.value}
      </Item>
    ))
  );

  return (
    <StyledSearchItems
      ref={ref}
      active={active}
      data-component-name="SearchItems"
      height={height}
      role="list"
      tabIndex={0}
    >
      {content.items}
    </StyledSearchItems>
  );
});

export default SearchItems;
