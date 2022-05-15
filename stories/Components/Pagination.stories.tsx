import { MouseEvent, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { ComponentMeta } from '@storybook/react';
import { Pagination, PaginationProps } from 'src/Pagination';

import { disableControl, hideProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  args: {
    disableEdgeNavigation: false,
    edgeNavigationLimit: 3,
    totalPages: 10,
  },
  argTypes: {
    ...hideProps(),
    ...marginProps(),
    currentPage: disableControl(),
    onClick: disableControl(),
  },
} as ComponentMeta<typeof Pagination>;

export const Basic = (props: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const { page = '' } = event.currentTarget.dataset;
    const pageNumber = parseInt(page, 10);

    setCurrentPage(pageNumber);
    action('onClick')(pageNumber);
  };

  return <Pagination {...props} currentPage={currentPage} onClick={handleClick} />;
};
