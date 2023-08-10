/* eslint-disable react-hooks/rules-of-hooks */
import { MouseEvent, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { defaultProps, Pagination } from 'src/components/Pagination';

import { disableControl, hideProps, spacingProps } from '../__helpers__';

type Story = StoryObj<typeof Pagination>;

export default {
  title: 'Components/Pagination',
  component: Pagination,
  args: {
    ...defaultProps,
    totalPages: 10,
  },
  argTypes: {
    ...hideProps(),
    ...spacingProps(),
    currentPage: disableControl(),
    onClick: disableControl(),
  },
} satisfies Meta<typeof Pagination>;

export const Basic: Story = {
  render: function Render(props) {
    const [currentPage, setCurrentPage] = useState(1);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      const { page = '' } = event.currentTarget.dataset;
      const pageNumber = parseInt(page, 10);

      setCurrentPage(pageNumber);
      action('onClick')(pageNumber);
    };

    return <Pagination {...props} currentPage={currentPage} onClick={handleClick} />;
  },
};
