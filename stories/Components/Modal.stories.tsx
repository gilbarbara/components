/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Button, FormGroup, Input, Spacer, Textarea } from 'src';
import { defaultProps, Modal } from 'src/components/Modal';

import { disableControl, hideProps, paddingProps } from '../__helpers__';

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
    children: disableControl(),
    isActive: disableControl(),
    maxWidth: { control: 'text' },
  },
} satisfies Meta<typeof Modal>;

export const Basic: Story = {
  render: function Render(props) {
    const [isActive, setActive] = useState(false);

    const handleClick = () => {
      setActive(v => !v);
    };

    return (
      <div className="flex-center">
        {!isActive && <Button onClick={handleClick}>Open Modal</Button>}

        <Modal {...props} isActive={isActive} onClose={handleClick}>
          <FormGroup label="Name *">
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
