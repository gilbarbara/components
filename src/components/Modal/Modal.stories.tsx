import { useState } from 'react';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { screen, userEvent, within } from '@storybook/testing-library';

import { Button, FormGroup, Input, Spacer, Textarea } from '~';

import {
  disableControl,
  hideProps,
  hideStoryFromDocsPage,
  paddingProps,
  radiusProps,
} from '~/stories/__helpers__';

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
    isActive: disableControl(),
    maxWidth: { control: 'text' },
  },
} satisfies Meta<typeof Modal>;

export const Basic: Story = {
  render: function Render(props) {
    const [isActive, setActive] = useState(false);

    const handleClick = () => {
      setActive(previousState => !previousState);
    };

    return (
      <div className="flex-center">
        <Button data-component-name="OpenModal" onClick={handleClick}>
          Open Modal
        </Button>

        <Modal {...props} isActive={isActive} onClose={handleClick}>
          <FormGroup label="Name" required>
            <Input name="name" placeholder="Name" />
          </FormGroup>
          <FormGroup label="Description">
            <Textarea name="description" placeholder="Tell us about yourself" />
          </FormGroup>
          <Spacer distribution="end">
            <Button invert onClick={handleClick}>
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
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  render: Basic.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('OpenModal');

    await userEvent.click(canvas.getByTestId('OpenModal'));
    expect(await screen.findByTestId('Modal')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(screen.queryByTestId('Dialog')).not.toBeInTheDocument();

    await userEvent.click(canvas.getByTestId('OpenModal'));
    expect(await screen.findByTestId('Modal')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByTestId('Modal')).not.toBeInTheDocument();
  },
};
