import { MouseEvent, useState } from 'react';
import { ComponentMeta } from '@storybook/react';
import { Pagination, PaginationProps } from 'src/Pagination';

import { disableControl, hideProps } from '../__helpers__';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  args: {
    edgeNavigationLimit: 3,
    hideEdgeNavigation: false,
    totalPages: 10,
  },
  argTypes: {
    ...hideProps(),
    onClick: disableControl(),
  },
} as ComponentMeta<typeof Pagination>;

export function Basic(props: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const { page = '' } = event.currentTarget.dataset;

    setCurrentPage(parseInt(page, 10));
  };

  return <Pagination {...props} currentPage={currentPage} onClick={handleClick} />;
}
