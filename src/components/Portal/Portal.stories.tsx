import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Box, Button } from '~';

import { disableControl, hideProps } from '~/stories/__helpers__';

import { defaultProps, Portal } from './Portal';

type Story = StoryObj<typeof Portal>;

export default {
  title: 'Popups/Portal',
  component: Portal,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    children: disableControl(),
  },
} satisfies Meta<typeof Portal>;

export const Basic: Story = {
  render: function Render(props) {
    const [isOpen, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(previousState => !previousState);
    };

    return (
      <div className="flex-center">
        <Button data-testid="OpenModal" onClick={handleClick} size="sm">
          Open Portal
        </Button>
        <Portal {...props} isOpen={isOpen} onClose={handleClick}>
          <Box bg="white" p="lg">
            Portal content
          </Box>
        </Portal>
      </div>
    );
  },
};

export const WithCloseButton: Story = {
  args: {
    showCloseButton: true,
    disableCloseOnEsc: true,
    disableCloseOnClickOverlay: true,
  },
  render: Basic.render,
};
