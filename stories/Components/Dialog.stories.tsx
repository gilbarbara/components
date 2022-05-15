import { useState } from 'react';
import { Button } from 'src';
import { Dialog, DialogProps } from 'src/Dialog';

import { disableControl, hideProps } from '../__helpers__';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  args: {
    buttonOrder: 'ltr',
    closeOnClickOverlay: false,
    closeOnEsc: true,
    content: 'You are adding a partner',
    hideOverlay: false,
    textAlign: 'left',
    title: 'Do you really want to add it?',
    width: 400,
  },
  argTypes: {
    ...hideProps(),
    isActive: disableControl(),
  },
};

export const Basic = (props: DialogProps) => {
  const [isActive, setActive] = useState(false);

  const handleClicks = () => {
    setActive(v => !v);
  };

  return (
    <div className="flex-center">
      <Button onClick={handleClicks}>Open Dialog</Button>

      <Dialog
        {...props}
        isActive={isActive}
        onClickCancel={handleClicks}
        onClickConfirmation={handleClicks}
      />
    </div>
  );
};
