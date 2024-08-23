import { sleep } from '@gilbarbara/helpers';
import { Meta, StoryObj } from '@storybook/react';
import { clearAllMocks, expect, fn, userEvent, waitFor, within } from '@storybook/test';

import { Icon } from '~';

import { colorProps, hideProps, spacingProps } from '~/stories/__helpers__';

import { CopyToClipboard, defaultProps } from './CopyToClipboard';

type Story = StoryObj<typeof CopyToClipboard>;

export default {
  title: 'Components/CopyToClipboard',
  // category: 'Content',
  component: CopyToClipboard,
  args: {
    ...defaultProps,
    value: 'user@example.com',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...spacingProps(),
  },
} satisfies Meta<typeof CopyToClipboard>;

export const Basic: Story = {};

export const Customized: Story = {
  args: {
    copyIcon: <Icon name="mail" />,
    color: 'green',
    size: 32,
    tooltipCopiedText: 'Email copied',
    tooltipProps: {
      bg: 'green',
      color: 'white',
      size: 'md',
    },
    tooltipText: 'Copy email',
  },
};

const mockOnCopy = fn();
const mockOnError = fn();

export const Tests: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    onCopy: mockOnCopy,
    onError: mockOnError,
  },
  play: async ({ args, canvasElement }) => {
    clearAllMocks();

    const element = (window.frameElement ?? document.body) as HTMLElement;

    if (element) {
      element.focus();
    }

    const canvas = within(canvasElement);

    await sleep(0.5);

    await userEvent.hover(canvas.getByTestId('Tooltip'));
    await expect(canvas.getByTestId('TooltipBody')).toBeInTheDocument();

    await userEvent.click(canvas.getByTestId('CopyToClipboard'));
    let mock;
    let response;

    await waitFor(async () => {
      return new Promise<void>((resolve, reject) => {
        if (!mockOnCopy.mock.calls.length && !mockOnError.mock.calls.length) {
          reject();

          return;
        }

        mock = mockOnCopy.mock.calls.length ? mockOnCopy : mockOnError;
        response = mockOnCopy.mock.calls.length ? args.value : mockOnError.mock.calls[0][0];

        resolve();
      });
    });

    await expect(mock).toHaveBeenNthCalledWith(1, response);
  },
};
