import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, screen, userEvent, waitFor, within } from '@storybook/test';

import { Button, FormGroup, Input, Spacer, Textarea } from '~';

import { disableControl, hideProps, paddingProps, radiusProps } from '~/stories/__helpers__';

import { defaultProps, Modal } from './Modal';

type Story = StoryObj<typeof Modal>;

export default {
  title: 'Popups/Modal',
  component: Modal,
  args: {
    ...defaultProps,
    title: 'Add User',
    width: 600,
  },
  argTypes: {
    ...hideProps(),
    ...paddingProps(),
    ...radiusProps(),
    children: disableControl(),
    isOpen: disableControl(),
    maxWidth: { control: 'text' },
  },
} satisfies Meta<typeof Modal>;

export const Basic: Story = {
  render: function Render(props) {
    const [isOpen, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(previousState => !previousState);
    };

    return (
      <div className="flex-center">
        <Button data-testid="OpenModal" onClick={handleClick} size="sm">
          Open Modal
        </Button>

        <Modal {...props} isOpen={isOpen} onClose={handleClick}>
          <FormGroup data-testid="Dialog" label="Name" required>
            <Input name="name" placeholder="Name" />
          </FormGroup>
          <FormGroup label="Description">
            <Textarea name="description" placeholder="Tell us about yourself" />
          </FormGroup>
          <Spacer distribution="end">
            <Button onClick={handleClick} variant="bordered">
              Cancel
            </Button>
            <Button onClick={handleClick} type="submit">
              Save
            </Button>
          </Spacer>
        </Modal>
      </div>
    );
  },
};

export const Tests: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    onClose: fn(),
    onOpen: fn(),
  },
  render: Basic.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('OpenModal'));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    await expect(screen.queryByTestId('Dialog')).not.toBeInTheDocument();

    await userEvent.click(canvas.getByTestId('OpenModal'));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    await userEvent.keyboard('{Escape}');
    await expect(screen.queryByTestId('Dialog')).not.toBeInTheDocument();
  },
};
