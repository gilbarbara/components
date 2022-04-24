import * as React from 'react';

import { Button, Dialog } from '../../src';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  subcomponents: { Button },
  argTypes: {
    content: {
      control: 'text',
      defaultValue: 'You are adding a partner',
    },
    isActive: {
      table: { disable: true },
    },
    onClickCancel: {
      table: { disable: true },
    },
    onClickConfirmation: {
      table: { disable: true },
    },
    onClose: {
      table: { disable: true },
    },
    onOpen: {
      table: { disable: true },
    },
    title: {
      control: 'text',
      defaultValue: 'Do you really want to add it?',
    },
    width: {
      control: 'number',
      defaultValue: 400,
    },
    buttonOrder: { defaultValue: 'ltr' },
    textAlign: { defaultValue: 'left' },
    closeOnEsc: { defaultValue: true },
    closeOnClickOverlay: { defaultValue: false },
    hideOverlay: { defaultValue: false },
  },
};

export function Basic({ inline, ...rest }: any) {
  const [isActive, setActive] = React.useState(true);

  const handleClicks = () => {
    setActive(v => !v);
  };

  return (
    <div className="flex-center">
      {!inline && <Button onClick={handleClicks}>Open Dialog</Button>}

      <Dialog
        {...rest}
        isActive={inline || isActive}
        onClickCancel={handleClicks}
        onClickConfirmation={handleClicks}
      />
    </div>
  );
}
