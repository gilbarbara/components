/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';

import { Icon } from 'src';
import { Dropdown } from 'src/Dropdown';
import { DropdownOption, DropdownProps } from 'src/types';

import { colorProps, disableControl, hideProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  args: Dropdown.defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
    inputOptions: disableControl(),
    items: disableControl(),
    onChange: { action: 'onChange' },
    onCreate: { action: 'onCreate' },
  },
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    minHeight: 350,
  },
} as Meta<typeof Dropdown>;

const items: DropdownOption[] = [
  { value: 1, label: 'One', prefix: <Icon name="chevron-right" /> },
  { value: 2, label: 'Two', prefix: <Icon name="anchor" />, suffix: <Icon name="asterisk" /> },
  { value: 3, label: 'Three', disabled: true, prefix: <Icon name="awards" /> },
  { value: 4, label: 'Four', prefix: <Icon name="image" />, suffix: <Icon name="asterisk" /> },
  { value: 5, label: 'Five', prefix: <Icon name="bolt" /> },
];

export const Basic = {
  render: (props: DropdownProps) => <Dropdown {...props} items={items} />,
};

export const WithCreate = {
  args: {
    allowCreate: true,
    borderless: true,
  },
  render: (props: DropdownProps) => {
    const [controlledItems, setItems] = useState(items);
    const [values, setValues] = useState<DropdownOption[]>([]);

    const handleCreate = (value: string, close: () => void) => {
      const newItem = {
        prefix: <Icon name="math-plus" />,
        label: value,
        value,
      };

      action('onCreate')(value);
      setItems([...controlledItems, newItem]);
      setValues([...values, newItem]);
      close();
    };

    return <Dropdown {...props} items={controlledItems} onCreate={handleCreate} values={values} />;
  },
};
