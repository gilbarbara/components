import { useState } from 'react';
import { sleep } from '@gilbarbara/helpers';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, screen, userEvent, waitFor, within } from '@storybook/test';

import { Button, FormGroup, Input, Spacer, Textarea } from '~';

import { disableControl, hideProps, paddingProps, radiusProps } from '~/stories/__helpers__';

import { defaultProps, Modal } from './Modal';

type Story = StoryObj<typeof Modal>;

export default {
  title: 'Components/Modal',
  // category: 'Popups',
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
    const { onClose } = props;
    const [isOpen, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClickClose = () => {
      setOpen(false);
      onClose?.();
    };

    return (
      <>
        <Button data-testid="OpenModal" onClick={handleClickOpen} size="sm">
          Open Modal
        </Button>

        <Modal {...props} isOpen={isOpen} onClose={handleClickClose}>
          <FormGroup data-testid="Form" label="Name" required>
            <Input name="name" placeholder="Name" />
          </FormGroup>
          <FormGroup label="Description">
            <Textarea name="description" placeholder="Tell us about yourself" />
          </FormGroup>
          <Spacer distribution="end">
            <Button onClick={handleClickClose} variant="bordered">
              Cancel
            </Button>
            <Button onClick={handleClickClose} type="submit">
              Save
            </Button>
          </Spacer>
        </Modal>
      </>
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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('OpenModal'));
    await waitFor(() => {
      expect(args.onOpen).toHaveBeenCalledTimes(1);
    });

    await sleep(0.2);

    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => {
      expect(args.onClose).toHaveBeenCalledTimes(1);
    });

    await userEvent.click(canvas.getByTestId('OpenModal'));
    await waitFor(() => {
      expect(args.onOpen).toHaveBeenCalledTimes(2);
    });

    await sleep(0.2);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    await sleep(0.2);

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(args.onClose).toHaveBeenCalledTimes(2);
    });
  },
};
