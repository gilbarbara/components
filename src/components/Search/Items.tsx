import { forwardRef, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { StringOrNumber } from '@gilbarbara/types';

import { getStyledOptions } from '~/modules/system';

import { Theme, WithTheme } from '~/types';

import Item from './Item';
import { SearchItemsProps } from './useSearch';

const StyledSearchItems = styled(
  'div',
  getStyledOptions(),
)<WithTheme & { active: boolean; height: StringOrNumber }>(props => {
  const { active, height, theme } = props;
  const { darkMode, grayScale, radius, shadow, spacing, white } = theme;

  return css`
    background-color: ${darkMode ? grayScale['800'] : white};
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
)<WithTheme>(props => {
  const { spacing } = props.theme;

  return css`
    ${getSharedStyles(spacing)};
    justify-content: center;
  `;
});

const SearchItems = forwardRef<HTMLDivElement, SearchItemsProps>((props, ref) => {
  const {
    accent,
    active,
    cursor,
    getDataAttributes,
    height,
    isBusy,
    items,
    noResultsLabel,
    onSelect,
    theme,
  } = props;
  const isActive = useRef(false);

  useEffect(() => {
    isActive.current = true;

    return () => {
      isActive.current = false;
    };
  }, []);

  const content =
    !items.length && !isBusy ? (
      <Empty theme={theme}>{noResultsLabel}</Empty>
    ) : (
      items.map((data, index) => (
        <Item
          key={data.value}
          accent={data.accent ?? accent}
          getDataAttributes={getDataAttributes}
          isSelected={cursor === index}
          onSelect={onSelect}
          theme={theme}
          value={data.value}
        >
          {data.label ?? data.value}
        </Item>
      ))
    );

  return (
    <StyledSearchItems
      ref={ref}
      active={active}
      {...getDataAttributes('SearchItems')}
      height={height}
      role="list"
      theme={theme}
    >
      {content}
    </StyledSearchItems>
  );
});

SearchItems.displayName = 'SearchItems';

export default SearchItems;
