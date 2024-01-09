import { memo } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { getStyledOptions } from '~/modules/system';

import { SearchItemProps } from './types';

export const StyledSearchItem = styled(
  'div',
  getStyledOptions(),
)<Pick<SearchItemProps, 'accent' | 'isSelected'>>(props => {
  const { accent, isSelected } = props;
  const { darkMode, grayScale, spacing, typography, white, ...theme } = getTheme(props);

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

function SearchItemComponent({ accent, children, isSelected, onSelect, value }: SearchItemProps) {
  return (
    <StyledSearchItem
      accent={accent}
      data-component-name="SearchItem"
      data-value={value}
      isSelected={isSelected}
      onClick={onSelect}
      onKeyDown={onSelect}
      role="listitem"
      tabIndex={0}
    >
      {children}
    </StyledSearchItem>
  );
}

SearchItemComponent.displayName = 'SearchItem';

export default memo(SearchItemComponent);
