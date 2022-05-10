import { useState } from 'react';
import { ComponentMeta } from '@storybook/react';
import { Button, Icon } from 'src';
import { Dropdown } from 'src/Dropdown';

import { DropdownCreateProps, DropdownOption, DropdownProps } from 'src/types';

import { disableControl, hideProps } from '../__helpers__';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  args: {
    borderless: false,
    large: false,
    multi: false,
    showCreateAlways: false,
    showCreateButton: true,
  },
  argTypes: {
    ...hideProps(),
    options: disableControl(),
    showCreateButton: { description: 'Storybook only' },
  },
  parameters: {
    actions: {
      argTypesRegex: '(?!^onDropdownCloseRequest)^on[A-Z].*',
    },
    minHeight: 350,
  },
} as ComponentMeta<typeof Dropdown>;

const options: DropdownOption[] = [
  { value: 1, label: 'One', content: <Icon name="abstract" /> },
  { value: 2, label: 'Two', content: <Icon name="anchor" /> },
  { value: 3, label: 'Three', disabled: true, content: <Icon name="awards" /> },
  { value: 4, label: 'Four', content: <Icon name="check-r" /> },
  { value: 5, label: 'Five', content: <Icon name="bolt" /> },
  { value: 6, label: 'Six', content: <Icon name="user-list" /> },
];

function CreateButton(props: DropdownCreateProps) {
  const { close, select, value } = props;
  const [busy, setBusy] = useState(false);

  const handleClick = () => {
    setBusy(true);
    const nextValue = value || `Empty-${options.length}`;

    const item = { value: nextValue, label: `${nextValue}`, content: <Icon name="headset" /> };

    setTimeout(() => {
      setBusy(false);
      select(item);
      options.push(item);

      close();
    }, 600);
  };

  return (
    <Button busy={busy} onClick={handleClick} size="sm" transparent>
      Create item "{value}"
    </Button>
  );
}

export const Basic = (props: DropdownProps & { showCreateButton: boolean }) => {
  const { showCreateButton } = props;

  return (
    <Dropdown createFn={showCreateButton ? CreateButton : undefined} {...props} options={options} />
  );
};
