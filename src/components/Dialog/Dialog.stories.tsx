import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '~';

import { colorProps, disableControl, hideProps, paddingProps } from '~/stories/__helpers__';

import { defaultProps, Dialog } from './Dialog';

type Story = StoryObj<typeof Dialog>;

export default {
  title: 'Components/Dialog',
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
    isActive: disableControl(),
  },
} satisfies Meta<typeof Dialog>;

export const Basic: Story = {
  render: function Render(props) {
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
