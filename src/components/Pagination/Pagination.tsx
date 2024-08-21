import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';
import is from 'is-lite';

import { getStyledOptions, getStyles } from '~/modules/system';

import { Icon } from '~/components/Icon';

import { WithTheme } from '~/types';

import PaginationButton from './Button';
import { PaginationItem, PaginationProps, usePagination } from './usePagination';

const StyledPagination = styled('div', getStyledOptions())<
  Omit<PaginationProps, 'currentPage' | 'onClick' | 'totalPages'> & WithTheme
>(
  {
    alignItems: 'center',
    display: 'flex',
  },
  props => {
    const { align } = props;

    return css`
      justify-content: ${align};
      ${getStyles(omit(props, 'align'))};
    `;
  },
);

export function Pagination(props: PaginationProps) {
  const { componentProps, getDataAttributes } = usePagination(props);
  const {
    accent,
    currentPage,
    disableEdgeNavigation,
    edgeNavigationLimit = 3,
    onClick,
    totalPages,
    ...rest
  } = componentProps;

  const items: PaginationItem[] = [];

  if (totalPages <= 1) {
    return null;
  }

  if (!disableEdgeNavigation && totalPages > edgeNavigationLimit) {
    items.push({
      type: 'first',
      disabled: currentPage === 1,
      page: 1,
      content: <Icon name="chevron-double-left" />,
    });
  }

  items.push({
    type: 'previous',
    disabled: currentPage === 1,
    page: currentPage - 1,
    content: <Icon name="chevron-left" />,
  });

  if (disableEdgeNavigation && totalPages > 6) {
    items.push({ type: 'page', page: 1 });

    if (currentPage > 3) {
      items.push({ type: 'between-1', content: '...' });
    }

    if (currentPage === totalPages) {
      items.push({ type: 'page', page: currentPage - 2 });
    }

    if (currentPage > 2) {
      items.push({ type: 'page', page: currentPage - 1 });
    }

    if (currentPage !== 1 && currentPage !== totalPages) {
      items.push({ type: 'page', page: currentPage });
    }

    if (currentPage < totalPages - 1) {
      items.push({ type: 'page', page: currentPage + 1 });
    }

    if (currentPage === 1) {
      items.push({ type: 'page', page: currentPage + 2 });
    }

    if (currentPage < totalPages - 2) {
      items.push({ type: 'between-2', content: '...' });
    }

    items.push({ type: 'page', page: totalPages });
  } else {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter(p => {
      const limit = currentPage + 2 <= totalPages ? currentPage - 1 : totalPages - 2;

      return (
        p >= limit &&
        p < currentPage + (currentPage === 1 || currentPage === totalPages - 1 ? 3 : 2)
      );
    });

    pages.forEach(d => {
      items.push({ type: 'page', page: d });
    });
  }

  items.push({
    type: 'next',
    disabled: currentPage === totalPages,
    page: currentPage + 1,
    content: <Icon name="chevron-right" />,
  });

  if (!disableEdgeNavigation && totalPages > edgeNavigationLimit) {
    items.push({
      type: 'last',
      disabled: currentPage === totalPages,
      page: totalPages,
      content: <Icon name="chevron-double-right" />,
    });
  }

  return (
    <StyledPagination {...getDataAttributes('Pagination')} {...rest}>
      {items.map((d, index) =>
        is.number(d.page) ? (
          <PaginationButton
            key={`${d.type}-${d.page ?? index}`}
            accent={accent}
            currentPage={currentPage}
            disabled={d.disabled ?? false}
            onClick={onClick}
            page={d.page}
            type={d.type}
          >
            {d.content ?? d.page}
          </PaginationButton>
        ) : (
          <span key={d.type}>...</span>
        ),
      )}
    </StyledPagination>
  );
}

Pagination.displayName = 'Pagination';

export { defaultProps, type PaginationProps } from './usePagination';
