import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Pagination } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    ...hideProps('currentPage', 'onClick'),
    totalPages: { defaultValue: 10 },
    edgeNavigationLimit: { defaultValue: 3 },
    hideEdgeNavigation: { defaultValue: false },
  },
} as ComponentMeta<typeof Pagination>;

export function Basic(props: any) {
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { page = '' } = event.currentTarget.dataset;

    setCurrentPage(parseInt(page, 10));
  };

  return <Pagination {...props} currentPage={currentPage} onClick={handleClick} />;
}
