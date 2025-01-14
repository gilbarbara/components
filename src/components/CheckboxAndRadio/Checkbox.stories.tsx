import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, within } from '@storybook/test';

import { Spacer } from '~';

import { sizes } from '~/modules/options';
import { colorProps, disableControl, hideProps, marginProps } from '~/stories/__helpers__';

import { Checkbox, defaultProps } from './Checkbox';

type Story = StoryObj<typeof Checkbox>;

export default {
  title: 'Components/Checkbox',
  // category: 'Inputs',
  component: Checkbox,
  args: {
    ...defaultProps,
    label: 'Label',
    name: 'checkbox',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    ...marginProps(),
    label: { control: 'text' },
  },
} satisfies Meta<typeof Checkbox>;

export const Basic: Story = {};

export const Sizes: Story = {
  argTypes: {
    label: disableControl(),
    name: disableControl(),
    size: disableControl(),
  },
  render: props => (
    <Spacer distribution="center" gap="lg">
      {sizes.map(size => (
        <Checkbox key={size} {...props} label={size} name={size} size={size} />
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

    await canvas.findByTestId('Checkbox');

    await expect(canvas.getByRole('checkbox')).not.toBeChecked();

    await fireEvent.keyDown(canvas.getByTestId('CheckboxElement'), { code: 'Tab' });
    await expect(canvas.getByRole('checkbox')).not.toBeChecked();

    await fireEvent.keyDown(canvas.getByTestId('CheckboxElement'), { code: 'Enter' });
    await expect(canvas.getByRole('checkbox')).toBeChecked();

    await fireEvent.keyDown(canvas.getByTestId('CheckboxElement'), { code: 'Space' });
    await expect(canvas.getByRole('checkbox')).not.toBeChecked();
  },
};
