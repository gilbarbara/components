import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, screen, userEvent, within } from '@storybook/test';

import {
  colorProps,
  disableControl,
  hideProps,
  hideStoryFromDocsPage,
  spacingProps,
} from '~/stories/__helpers__';

import { defaultProps, Pagination } from './Pagination';

type Story = StoryObj<typeof Pagination>;

export default {
  title: 'Navigation/Pagination',
  component: Pagination,
  args: {
    ...defaultProps,
    totalPages: 10,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    ...spacingProps(),
    currentPage: disableControl(),
    onClick: disableControl(),
  },
} satisfies Meta<typeof Pagination>;

export const Basic: Story = {
  render: function Render(props) {
    const [currentPage, setCurrentPage] = useState(1);

    const handleClick = (page: number, type?: string) => {
      setCurrentPage(page);
      props?.onClick?.(page, type);
    };

    return <Pagination {...props} currentPage={currentPage} onClick={handleClick} />;
  },
};

function getButtons(filter: string) {
  return screen
    .getAllByTestId('PaginationButton')
    .filter(d => d.getAttribute('data-type') === filter);
}

function getButton(attribute: number | string, type = 'data-page') {
  const getValue = (d: HTMLElement) => d.getAttribute(type);

  return (
    (screen
      .getAllByTestId('PaginationButton')
      .find(
        d => (type === 'data-page' ? Number(getValue(d)) : getValue(d)) === attribute,
      ) as HTMLElement) || null
  );
}

export const Tests: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  args: {
    disableEdgeNavigation: true,
    onClick: fn(),
  },
  render: Basic.render,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('Pagination');

    await expect(getButtons('page')).toHaveLength(4);

    await step('Click the next button', async () => {
      await userEvent.click(getButton('next', 'data-type'));
      await expect(getButton(2)).toHaveAttribute('data-current', 'true');

      await expect(getButtons('page')).toHaveLength(4);
    });

    await step('Click the button 3', async () => {
      await userEvent.click(getButton(3));
      await expect(getButton(3)).toHaveAttribute('data-current', 'true');

      await expect(getButtons('page')).toHaveLength(5);
    });

    await step('Click the button 4', async () => {
      await userEvent.click(getButton(4));
      await expect(getButton(4)).toHaveAttribute('data-current', 'true');

      await expect(getButtons('page')).toHaveLength(5);
    });

    await step('Click the button 5', async () => {
      await userEvent.click(getButton(5));
      await expect(getButton(5)).toHaveAttribute('data-current', 'true');

      await expect(getButtons('page')).toHaveLength(5);
    });

    await step('Click the button 6', async () => {
      await userEvent.click(getButton(6));
      await expect(getButton(6)).toHaveAttribute('data-current', 'true');

      await expect(getButtons('page')).toHaveLength(5);
    });

    await step('Click the button 7', async () => {
      await userEvent.click(getButton(7));
      await expect(getButton(7)).toHaveAttribute('data-current', 'true');

      await expect(getButtons('page')).toHaveLength(5);
    });

    await step('Click the button 8', async () => {
      await userEvent.click(getButton(8));
      await expect(getButton(8)).toHaveAttribute('data-current', 'true');

      await expect(getButtons('page')).toHaveLength(5);
    });

    await step('Click the button 9', async () => {
      await userEvent.click(getButton(9));
      await expect(getButton(9)).toHaveAttribute('data-current', 'true');

      await expect(getButtons('page')).toHaveLength(4);
    });

    await step('Click the button 10', async () => {
      await userEvent.click(getButton(10));
      await expect(getButton(10)).toHaveAttribute('data-current', 'true');

      await expect(getButtons('page')).toHaveLength(4);
    });

    await step('Click the previous button', async () => {
      await userEvent.click(getButton('previous', 'data-type'));
      await expect(getButton(9)).toHaveAttribute('data-current', 'true');

      await expect(getButtons('page')).toHaveLength(4);
    });

    await step('Click the previous button again', async () => {
      await userEvent.click(getButton('previous', 'data-type'));
      await expect(getButton(8)).toHaveAttribute('data-current', 'true');

      await expect(getButtons('page')).toHaveLength(5);
    });
  },
};
