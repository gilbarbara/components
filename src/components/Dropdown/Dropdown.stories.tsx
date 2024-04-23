import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { Icon } from '~';

import {
  colorProps,
  disableControl,
  hideProps,
  hideStoryFromDocsPage,
  marginProps,
} from '~/stories/__helpers__';
import { DropdownOption } from '~/types';

import { defaultProps, Dropdown } from './Dropdown';

type Story = StoryObj<typeof Dropdown>;

export default {
  title: 'Inputs/Dropdown',
  component: Dropdown,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    ...marginProps(),
    inputOptions: disableControl(),
    items: disableControl(),
  },
  parameters: {
    layout: 'fullscreen',
    minHeight: 350,
    paddingDocs: 'md',
  },
} satisfies Meta<typeof Dropdown>;

const items: DropdownOption[] = [
  { value: 1, label: 'One', prefix: <Icon name="chevron-right" /> },
  { value: 2, label: 'Two', prefix: <Icon name="anchor" />, suffix: <Icon name="asterisk" /> },
  { value: 3, label: 'Three', disabled: true, prefix: <Icon name="award" /> },
  { value: 4, label: 'Four', prefix: <Icon name="image" />, suffix: <Icon name="asterisk" /> },
  { value: 5, label: 'Five', prefix: <Icon name="flash" /> },
];

export const Basic: Story = {
  render: props => <Dropdown {...props} items={items} />,
};

export const WithCreate: Story = {
  args: {
    allowCreate: true,
    borderless: true,
  },
  render: function Render(props) {
    const [controlledItems, setItems] = useState(items);
    const [values, setValues] = useState<DropdownOption[]>([]);

    const handleCreate = (value: string, close: () => void) => {
      const newItem = {
        prefix: <Icon name="plus" />,
        label: value,
        value,
      };

      setItems([...controlledItems, newItem]);
      setValues([...values, newItem]);
      close();
    };

    return <Dropdown {...props} items={controlledItems} onCreate={handleCreate} values={values} />;
  },
};

export const Tests: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  args: {
    allowCreate: true,
    borderless: false,
    onSearch: fn(),
  },
  render: WithCreate.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('DropdownWrapper');

    await userEvent.click(canvas.getByLabelText('Toggle'));
    await expect(await canvas.findByTestId('DropdownItems')).toBeInTheDocument();

    await userEvent.click(canvas.getAllByRole('listitem')[0]);
    await expect(canvas.queryByTestId('DropdownItems')).not.toBeInTheDocument();
    await expect(canvas.getByTestId('ContentItem')).toHaveTextContent('One');

    await userEvent.click(canvas.getByTestId('ContentItem'));
    await userEvent.click(canvas.getAllByRole('listitem')[0]);
    await expect(canvas.getByText('Select an option')).toBeInTheDocument();

    await userEvent.type(canvas.getByRole('textbox'), 'Twenty');
    await userEvent.click(canvas.getByRole('button', { name: 'Create "Twenty"' }));

    await expect(canvas.getByTestId('ContentItem')).toHaveTextContent('Twenty');
  },
};
