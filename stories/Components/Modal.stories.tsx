import { useState } from 'react';

import { Button, FormGroup, Input, Spacer, Textarea } from 'src';
import { Modal, ModalProps } from 'src/Modal';

import { disableControl, hideProps, paddingProps } from '../__helpers__';

export default {
  title: 'Components/Modal',
  component: Modal,
  args: {
    ...Modal.defaultProps,
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
};

export const Basic = (props: ModalProps) => {
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
};
