import { useState } from 'react';
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
  title: 'Popups/Dialog',
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

    const handleClicks = () => {
      setOpen(previousState => !previousState);
    };

    return (
      <div className="flex-center">
        <Button data-testid="OpenDialog" onClick={handleClicks} size="sm">
          Open Dialog
        </Button>

        <Dialog
          {...props}
          isOpen={isOpen}
          onClickCancel={handleClicks}
          onClickConfirmation={handleClicks}
        />
      </div>
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('OpenDialog'));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    await expect(screen.queryByTestId('Dialog')).not.toBeInTheDocument();

    await userEvent.click(canvas.getByTestId('OpenDialog'));

    await waitFor(() => {
      expect(screen.getByTestId('Dialog')).toBeInTheDocument();
    });

    await userEvent.keyboard('{Escape}');
    await expect(screen.queryByTestId('Dialog')).not.toBeInTheDocument();
  },
};
