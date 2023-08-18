import { useArgs } from '@storybook/addons';
import { Meta, StoryObj } from '@storybook/react';

import { Button, FormGroup, Input, Spacer, Textarea } from '~';

import { disableControl, hideProps, paddingProps, radiusProps } from '~/stories/__helpers__';

import { defaultProps, Modal, ModalProps } from './Modal';

type Story = StoryObj<typeof Modal>;

export default {
  title: 'Components/Modal',
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
    maxWidth: { control: 'text' },
  },
} satisfies Meta<typeof Modal>;

export const Basic: Story = {
  render: function Render(props) {
    const [{ isActive }, updateArguments] = useArgs<ModalProps>();

    const handleClick = () => {
      updateArguments({ isActive: !isActive });
    };

    return (
      <div className="flex-center">
        {!isActive && <Button onClick={handleClick}>Open Modal</Button>}

        <Modal {...props} onClose={handleClick}>
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
              Enviar
            </Button>
          </Spacer>
        </Modal>
      </div>
    );
  },
};
