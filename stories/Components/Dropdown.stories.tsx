import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Button, Dropdown, Icon } from '../../src';
import { DropdownCreateProps, DropdownOption } from '../../src/types';
import { hideProps } from '../__helpers__';

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
  const [busy, setBusy] = React.useState(false);

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

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    actions: {
      argTypesRegex: '(?!^onDropdownCloseRequest)^on[A-Z].*',
    },
  },
  argTypes: {
    ...hideProps('additionalProps', 'createFn'),
    borderless: { defaultValue: false },
    showCreateAlways: { defaultValue: false },
    showCreateButton: { control: 'boolean', defaultValue: true },
    bigger: { defaultValue: false },
    multi: { control: 'boolean', defaultValue: false },
    onDropdownCloseRequest: { disabled: true },
  },
} as ComponentMeta<typeof Dropdown>;

export const Basic = (props: any) => {
  const { showCreateButton } = props;

  return <Dropdown createFn={showCreateButton && CreateButton} options={options} {...props} />;
};
