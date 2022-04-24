import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme } from '../modules/helpers';
import { isDarkMode, styledOptions } from '../modules/system';

export interface SearchItemProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
  value: string;
}

export const StyledSearchItem = styled(
  'div',
  styledOptions,
)(props => {
  const { grayDark, spacing, typography, variants, white } = getTheme(props);
  const darkMode = isDarkMode(props);

  return css`
    color: ${darkMode ? white : grayDark};
    cursor: pointer;
    font-size: ${typography.regular.fontSize};
    padding: ${spacing.sm} ${spacing.md};
    transition: background-color 0.3s;

    &:hover,
    &:active {
      background-color: ${variants.primary.mid.bg};
      color: ${variants.primary.mid.color};

      a {
        color: ${variants.primary.mid.color};
      }
    }

    a {
      color: ${grayDark};
      text-decoration: none;
    }

    > * {
      white-space: nowrap;
    }
  `;
});

export default function SearchItem({ children, onClick, value }: SearchItemProps) {
  return (
    <StyledSearchItem
      data-component-name="SearchItem"
      data-value={value}
      onClick={onClick}
      role="presentation"
    >
      {children}
    </StyledSearchItem>
  );
}
