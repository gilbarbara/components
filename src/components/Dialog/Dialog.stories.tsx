import { useArgs } from '@storybook/addons';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '~';

import { colorProps, hideProps, paddingProps, radiusProps } from '~/stories/__helpers__';

import { defaultProps, Dialog, DialogProps } from './Dialog';

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
    ...radiusProps(),
  },
} satisfies Meta<typeof Dialog>;

export const Basic: Story = {
  render: function Render(props) {
    const [{ isActive }, updateArguments] = useArgs<DialogProps>();

    const handleClicks = () => {
      updateArguments({ isActive: !isActive });
    };

    return (
      <div className="flex-center">
        <Button onClick={handleClicks}>Open Dialog</Button>

        <Dialog {...props} onClickCancel={handleClicks} onClickConfirmation={handleClicks} />
      </div>
    );
  },
};
