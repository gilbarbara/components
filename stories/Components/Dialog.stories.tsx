/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from 'src';
import { Dialog } from 'src/Dialog';

import { disableControl, hideProps, paddingProps } from '../__helpers__';

type Story = StoryObj<typeof Dialog>;

export default {
  title: 'Components/Dialog',
  component: Dialog,
  args: {
    ...Dialog.defaultProps,
    content: 'You are adding a partner',
    title: 'Do you really want to add it?',
  },
  argTypes: {
    ...hideProps(),
    ...paddingProps(),
    isActive: disableControl(),
  },
} satisfies Meta<typeof Dialog>;

export const Basic: Story = {
  render: props => {
    const [isActive, setActive] = useState(false);

    const handleClicks = () => {
      setActive(v => !v);
    };

    return (
      <div className="flex-center">
        <Button onClick={handleClicks}>Open Dialog</Button>

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
