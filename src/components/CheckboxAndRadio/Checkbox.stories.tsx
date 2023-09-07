import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { fireEvent, within } from '@storybook/testing-library';

import { Spacer } from '~';

import {
  colorProps,
  disableControl,
  hideProps,
  hideStoryFromDocsPage,
  marginProps,
} from '~/stories/__helpers__';

import { Checkbox, defaultProps } from './Checkbox';

type Story = StoryObj<typeof Checkbox>;

export default {
  title: 'Inputs/Checkbox',
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
    onChange: { action: 'onChange', ...disableControl() },
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
    <Spacer>
      <Checkbox {...props} defaultChecked label="Small" name="sm" size="sm" />
      <Checkbox {...props} label="Medium" name="md" size="md" />
      <Checkbox {...props} label="Large" name="lg" size="lg" />
    </Spacer>
  ),
};

export const Disabled: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  args: {
    disabled: true,
  },
  argTypes: {
    disabled: disableControl(),
  },
};

export const Tests: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('Checkbox');

    expect(canvas.getByRole('checkbox')).not.toBeChecked();

    fireEvent.keyDown(canvas.getByTestId('CheckboxElement'), { code: 'Tab' });
    expect(canvas.getByRole('checkbox')).not.toBeChecked();

    fireEvent.keyDown(canvas.getByTestId('CheckboxElement'), { code: 'Enter' });
    expect(canvas.getByRole('checkbox')).toBeChecked();

    fireEvent.keyDown(canvas.getByTestId('CheckboxElement'), { code: 'Space' });
    expect(canvas.getByRole('checkbox')).not.toBeChecked();
  },
};
