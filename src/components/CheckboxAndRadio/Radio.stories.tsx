import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, within } from '@storybook/test';

import { Spacer } from '~';

import { sizes } from '~/modules/options';

import { colorProps, disableControl, hideProps, marginProps } from '~/stories/__helpers__';

import { Radio, radioDefaultProps } from './Radio';

type Story = StoryObj<typeof Radio>;

export default {
  title: 'Inputs/Radio',
  component: Radio,
  args: {
    ...radioDefaultProps,
    label: 'Label',
    name: 'radio',
    value: 'radio',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    ...marginProps(),
    label: { control: 'text' },
    value: { control: 'text' },
  },
} satisfies Meta<typeof Radio>;

export const Basic: Story = {
  argTypes: {
    name: disableControl(),
    value: disableControl(),
  },
};

export const Sizes: Story = {
  argTypes: {
    label: disableControl(),
    name: disableControl(),
    size: disableControl(),
    value: disableControl(),
  },
  render: props => (
    <Spacer distribution="center" gap="lg">
      {sizes.map(size => (
        <Radio key={size} {...props} label={size} name="sizes" size={size} value={size} />
      ))}
    </Spacer>
  ),
};

export const Disabled: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    disabled: true,
  },
  argTypes: {
    disabled: disableControl(),
  },
};

export const Tests: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('Radio');

    await expect(canvas.getByRole('radio')).not.toBeChecked();

    await fireEvent.keyDown(canvas.getByTestId('RadioElement'), { code: 'Tab' });
    await expect(canvas.getByRole('radio')).not.toBeChecked();

    await fireEvent.keyDown(canvas.getByTestId('RadioElement'), { code: 'Enter' });
    await expect(canvas.getByRole('radio')).toBeChecked();
  },
};
