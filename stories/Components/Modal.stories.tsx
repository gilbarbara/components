import * as React from 'react';

import { Button, FormGroup, Group, Input, Modal, Textarea } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Modal',
  component: Modal,
  subcomponents: { Button },
  argTypes: {
    ...hideProps('content', 'isActive', 'onClose', 'onOpen'),
    title: {
      control: 'text',
      defaultValue: 'Add User',
    },
    maxHeight: {
      control: 'text',
      defaultValue: '80vh',
    },
    maxWidth: {
      control: 'text',
    },
    width: {
      control: 'number',
      defaultValue: 600,
    },
    closeOnEsc: { defaultValue: true },
    closeOnClickOverlay: { defaultValue: false },
    hideOverlay: { defaultValue: false },
  },
};

export function Basic(props: any) {
  const [isActive, setActive] = React.useState(false);

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
        <Group distribution="flex-end">
          <Button invert>Cancel</Button>
          <Button type="submit">Enviar</Button>
        </Group>
      </Modal>
    </div>
  );
}
