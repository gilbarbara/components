import { useState } from 'react';
import { sleep } from '@gilbarbara/helpers';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, screen, userEvent, waitFor, within } from '@storybook/test';

import { Button } from '~';

import {
  colorProps,
  disableControl,
  hideProps,
  paddingProps,
  radiusProps,
} from '~/stories/__helpers__';

import { defaultProps, Dialog } from './Dialog';

type Story = StoryObj<typeof Dialog>;

export default {
  title: 'Components/Dialog',
  // category: 'Popups',
  component: Dialog,
  args: {
    ...defaultProps,
    content: 'You are adding a partner',
    title: <strong>Do you really want to add it?</strong>,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    ...paddingProps(),
    ...radiusProps(),
    isOpen: disableControl(),
    onClickCancel: disableControl(),
    onClickConfirmation: disableControl(),
  },
} satisfies Meta<typeof Dialog>;

export const Basic: Story = {
  render: function Render(props) {
    const [isOpen, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClickClose = () => {
      setOpen(false);
    };

    return (
      <>
        <Button data-testid="OpenDialog" onClick={handleClickOpen} size="sm">
          Open Dialog
        </Button>

        <Dialog
          {...props}
          isOpen={isOpen}
          onClickCancel={handleClickClose}
          onClickConfirmation={handleClickClose}
        />
      </>
    );
  },
};

export const Tests: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    buttonOrder: 'rtl',
    hideOverlay: true,
    onClickCancel: fn(),
    onClickConfirmation: fn(),
    onClose: fn(),
    onOpen: fn(),
  },
  render: Basic.render,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('OpenDialog'));

    await expect(args.onOpen).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    await waitFor(() => {
      expect(args.onClose).toHaveBeenCalledTimes(1);
    });

    await userEvent.click(canvas.getByTestId('OpenDialog'));
    await waitFor(() => {
      expect(args.onOpen).toHaveBeenCalledTimes(2);
    });
    await expect(screen.getByTestId('Dialog')).toBeInTheDocument();

    await sleep(0.3);

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(args.onClose).toHaveBeenCalledTimes(2);
    });
  },
};
