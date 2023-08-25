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
    font-size: ${typography.regular.fontSize};
    padding: ${spacing.sm} ${spacing.md};
    transition: background-color 0.3s;

    &:hover,
    &:active {
      ${selected};
    }

    ${isSelected && selected},

    a {
      color: ${grayScale['700']};
      text-decoration: none;
    }

    > * {
      white-space: nowrap;
    }
  `;
});

function SearchItem({ accent, children, isSelected, onClick, value }: SearchItemProps) {
  return (
    <StyledSearchItem
      accent={accent}
      data-component-name="SearchItem"
      data-value={value}
      isSelected={isSelected}
      onClick={onClick}
      role="listitem"
    >
      {children}
    </StyledSearchItem>
  );
}

SearchItem.displayName = 'SearchItem';

export default SearchItem;
