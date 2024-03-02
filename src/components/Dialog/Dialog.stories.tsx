import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, screen, userEvent, waitFor, within } from '@storybook/test';

import { Button } from '~';

import {
  colorProps,
  disableControl,
  hideProps,
  hideStoryFromDocsPage,
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
    title: 'Do you really want to add it?',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    ...paddingProps(),
    ...radiusProps(),
    isActive: disableControl(),
    onClickCancel: disableControl(),
    onClickConfirmation: disableControl(),
  },
} satisfies Meta<typeof Dialog>;

export const Basic: Story = {
  render: function Render(props) {
    const [isActive, setActive] = useState(false);

    const handleClicks = () => {
      setActive(previousState => !previousState);
    };

    return (
      <div className="flex-center">
        <Button data-component-name="OpenDialog" onClick={handleClicks}>
          Open Dialog
        </Button>

        <Dialog
          {...props}
          isActive={isActive}
          onClickCancel={handleClicks}
          onClickConfirmation={handleClicks}
        />
      </div>
    );
  },
};

export const Tests: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
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
