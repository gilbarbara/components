import { sleep } from '@gilbarbara/helpers';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';

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

const mockOnCopy = fn();

export const Tests: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  args: {
    onCopy: mockOnCopy,
  },
  play: async ({ args, canvasElement }) => {
    mockOnCopy.mockClear();

    const canvas = within(canvasElement);

    await sleep(0.5);

    await userEvent.hover(canvas.getByTestId('Tooltip'));
    await expect(canvas.getByTestId('TooltipBody')).toBeInTheDocument();

    await userEvent.click(canvas.getByTestId('CopyToClipboard'));
    await waitFor(() => {
      expect(args.onCopy).toHaveBeenCalledTimes(1);
    });
  },
};
