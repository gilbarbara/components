import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, within } from '@storybook/test';

import { Paragraph, Text } from '~';

import { colorProps, disableControl, hideProps, marginProps } from '~/stories/__helpers__';

import { defaultProps, RadioGroup } from './RadioGroup';

type Story = StoryObj<typeof RadioGroup>;

export default {
  title: 'Inputs/RadioGroup',
  component: RadioGroup,
  args: {
    ...defaultProps,
    defaultValue: 4,
    items: [
      { accent: 'red', label: 'First', value: 1 },
      { label: 'Second', value: 2 },
      { label: 'Third', value: 3, disabled: true },
      {
        label: (
          <div>
            <Text size="lg">Forth</Text>
            <Paragraph>Far far away, behind the word mountains.</Paragraph>
          </div>
        ),
        value: 4,
      },
    ],
    name: 'position',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    ...marginProps(),
    defaultValue: { control: 'number' },
    items: disableControl(),
  },
} satisfies Meta<typeof RadioGroup>;

export const Basic: Story = {};

export const Tests: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    onChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('RadioGroup');

    const [first, second, third, forth] = canvas.getAllByRole('radio');

    await expect(first).not.toBeChecked();
    await expect(second).not.toBeChecked();
    await expect(third).not.toBeChecked();
    await expect(forth).toBeChecked();

    await fireEvent.click(first);
    await expect(first).toBeChecked();
    await expect(forth).not.toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(1);

    await fireEvent.click(second);
    await expect(second).toBeChecked();
    await expect(first).not.toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(2);
  },
};
