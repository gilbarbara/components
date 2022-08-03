import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import is from 'is-lite';

import PaginationButton from './Button';

import { Icon } from '../Icon';
import { borderStyles, getStyledOptions, marginStyles, paddingStyles } from '../modules/system';
import { WithBorder, WithMargin, WithPadding } from '../types';

export interface PaginationProps extends WithBorder, WithMargin, WithPadding {
  /** @default end */
  align?: 'start' | 'center' | 'end';
  currentPage: number;
  /**
   * Hide First/Last links
   * @default false
   */
  disableEdgeNavigation?: boolean;
  /**
   * Limit to show the First/Last buttons
   * @default 3
   */
  edgeNavigationLimit?: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
  totalPages: number;
}

interface Item {
  content?: ReactNode;
  disabled?: boolean;
  key?: string;
  page?: number;
}

const StyledPagination = styled(
  'div',
  getStyledOptions(),
)<Omit<PaginationProps, 'currentPage' | 'onClick' | 'totalPages'>>(props => {
  const { align } = props;

  return css`
    align-items: center;
    display: flex;
    justify-content: ${align};
    ${borderStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
  `;
});

export function Pagination(props: PaginationProps): JSX.Element | null {
  const {
    currentPage,
    disableEdgeNavigation,
    edgeNavigationLimit = 3,
    onClick,
    totalPages,
    ...rest
  } = props;
  const items: Item[] = [];

  if (totalPages <= 1) {
    return null;
  }

  if (!disableEdgeNavigation && totalPages > edgeNavigationLimit) {
    items.push({
      key: 'first',
      disabled: currentPage === 1,
      page: 1,
      content: <Icon name="chevron-double-left" size={24} />,
    });
  }

  items.push({
    key: 'previous',
    disabled: currentPage === 1,
    page: currentPage - 1,
    content: <Icon name="chevron-left" size={24} />,
  });

  if (disableEdgeNavigation && totalPages > 6) {
    items.push({ key: 'back', page: 1 });

    if (currentPage > 3) {
      items.push({ key: 'between-1', content: '...' });
    }

    if (currentPage === totalPages) {
      items.push({ page: currentPage - 2 });
    }

    if (currentPage > 2) {
      items.push({ page: currentPage - 1 });
    }

    if (currentPage !== 1 && currentPage !== totalPages) {
      items.push({ page: currentPage });
    }

    if (currentPage < totalPages - 1) {
      items.push({ page: currentPage + 1 });
    }

    if (currentPage === 1) {
      items.push({ page: currentPage + 2 });
    }

    if (currentPage < totalPages - 2) {
      items.push({ key: 'between-2', content: '...' });
    }

    items.push({ page: totalPages });
  } else {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter(p => {
      const limit = currentPage + 2 <= totalPages ? currentPage - 1 : totalPages - 2;

      return (
        p >= limit &&
        p < currentPage + (currentPage === 1 || currentPage === totalPages - 1 ? 3 : 2)
      );
    });

    pages.forEach(d => {
      items.push({ page: d });
    });
  }

  items.push({
    key: 'next',
    disabled: currentPage === totalPages,
    page: currentPage + 1,
    content: <Icon name="chevron-right" size={24} />,
  });

  if (!disableEdgeNavigation && totalPages > edgeNavigationLimit) {
    items.push({
      key: 'last',
      disabled: currentPage === totalPages,
      page: totalPages,
      content: <Icon name="chevron-double-right" size={24} />,
    });
  }

  return (
    <StyledPagination data-component-name="Pagination" {...rest}>
      {items.map((d, index) =>
        !is.undefined(d.page) ? (
          <PaginationButton
            key={d.key || d.page || index}
            currentPage={currentPage}
            disabled={d.disabled || false}
            onClick={onClick}
            page={d.page}
          >
            {d.content || d.page}
          </PaginationButton>
        ) : (
          <span key={d.key}>...</span>
        ),
      )}
    </StyledPagination>
  );
}

Pagination.defaultProps = {
  align: 'end',
  disableEdgeNavigation: false,
  edgeNavigationLimit: 3,
};
