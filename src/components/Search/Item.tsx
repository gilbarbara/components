import { memo } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getColorTokens } from '~/modules/colors';
import { getStyledOptions } from '~/modules/system';

import { WithTheme } from '~/types';

import { SearchItemProps } from './useSearch';

export const StyledSearchItem = styled(
  'div',
  getStyledOptions(),
)<Pick<SearchItemProps, 'accent' | 'isSelected'> & WithTheme>(props => {
  const { accent, isSelected, theme } = props;
  const { darkMode, grayScale, spacing, typography, white } = theme;

  const { mainColor, textColor } = getColorTokens(accent, null, theme);

  const selected = css`
    background-color: ${mainColor};
    color: ${textColor};

    a {
      color: ${textColor};
    }
  `;

  return css`
    color: ${darkMode ? white : grayScale['700']};
    cursor: pointer;
    font-size: ${typography.md.fontSize};
    padding: ${spacing.sm} ${spacing.md};
    transition: background-color 0.3s;

    &:focus-visible,
    &:hover,
    &:active {
      ${selected};
    }

    ${isSelected && selected},

    a {
      color: ${grayScale['700']};
      text-decoration: none;
    }
  `;
});

function SearchItemComponent(props: SearchItemProps) {
  const { accent, children, getDataAttributes, isSelected, onSelect, theme, value } = props;

  return (
    <StyledSearchItem
      accent={accent}
      {...getDataAttributes('SearchItem')}
      data-value={value}
      isSelected={isSelected}
      onClick={onSelect}
      onKeyDown={onSelect}
      role="listitem"
      tabIndex={0}
      theme={theme}
    >
      {children}
    </StyledSearchItem>
  );
}

SearchItemComponent.displayName = 'SearchItem';

export default memo(SearchItemComponent);
