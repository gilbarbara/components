import { MouseEventHandler } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme } from '../modules/helpers';
import { getStyledOptions } from '../modules/system';
import { WithChildren } from '../types';

export interface SearchItemProps extends WithChildren {
  isSelected: boolean;
  onClick: MouseEventHandler;
  value: string;
}

export const StyledSearchItem = styled(
  'div',
  getStyledOptions(),
)<{ isSelected: boolean }>(props => {
  const { isSelected } = props;
  const { darkMode, grayDark, spacing, typography, variants, white } = getTheme(props);

  const selected = css`
    background-color: ${variants.primary.mid.bg};
    color: ${variants.primary.mid.color};

    a {
      color: ${variants.primary.mid.color};
    }
  `;

  return css`
    color: ${darkMode ? white : grayDark};
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
      color: ${grayDark};
      text-decoration: none;
    }

    > * {
      white-space: nowrap;
    }
  `;
});

export default function SearchItem({ children, isSelected, onClick, value }: SearchItemProps) {
  return (
    <StyledSearchItem
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
