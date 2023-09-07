import { useState } from 'react';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { screen, userEvent, within } from '@storybook/testing-library';

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
  },
  render: Basic.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('OpenDialog');

    await userEvent.click(canvas.getByTestId('OpenDialog'));
    expect(await screen.findByTestId('Dialog')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(screen.queryByTestId('Dialog')).not.toBeInTheDocument();

    await userEvent.click(canvas.getByTestId('OpenDialog'));
    expect(await screen.findByTestId('Dialog')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByTestId('Dialog')).not.toBeInTheDocument();
  },
};
