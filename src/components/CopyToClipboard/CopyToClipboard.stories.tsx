import { sleep } from '@gilbarbara/helpers';
import { expect, jest } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { colorProps, hideProps, hideStoryFromDocsPage, marginProps } from '~/stories/__helpers__';

import { CopyToClipboard, defaultProps } from './CopyToClipboard';

type Story = StoryObj<typeof CopyToClipboard>;

export default {
  title: 'Content/CopyToClipboard',
  component: CopyToClipboard,
  args: {
    ...defaultProps,
    text: 'test-user@example.com',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
  },
} satisfies Meta<typeof CopyToClipboard>;

export const Basic: Story = {};

const mockOnCopy = jest.fn();

export const Tests: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  args: {
    onCopy: mockOnCopy,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    mockOnCopy.mockClear();
    await canvas.findByTestId('CopyToClipboard');

    await sleep(0.5);

    await userEvent.hover(canvas.getByTestId('Tooltip'));

    expect(canvas.getByTestId('TooltipBody')).toBeInTheDocument();

    await userEvent.click(canvas.getByTestId('CopyToClipboard'));
    await expect(mockOnCopy).toHaveBeenCalledTimes(1);
  },
};
