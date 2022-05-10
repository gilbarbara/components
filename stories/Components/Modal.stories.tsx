import { useState } from 'react';
import { Button, FormGroup, Input, Spacer, Textarea } from 'src';
import { Modal, ModalProps } from 'src/Modal';

import { disableControl, hideProps } from '../__helpers__';

export default {
  title: 'Components/Modal',
  component: Modal,
  args: {
    closeOnClickOverlay: true,
    closeOnEsc: true,
    hideCloseButton: false,
    hideOverlay: false,
    maxHeight: '80vh',
    title: 'Add User',
    width: 600,
  },
  argTypes: {
    ...hideProps(),
    isActive: disableControl(),
    maxWidth: { control: 'text' },
  },
};

export function Basic(props: ModalProps) {
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
          <Button invert>Cancel</Button>
          <Button type="submit">Enviar</Button>
        </Spacer>
      </Modal>
    </div>
  );
}
