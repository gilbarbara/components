import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, within } from '@storybook/test';

import { Spacer } from '~';

import {
  colorProps,
  disableControl,
  hideProps,
  hideStoryFromDocsPage,
  marginProps,
} from '~/stories/__helpers__';

import { defaultProps, Radio } from './Radio';

type Story = StoryObj<typeof Radio>;

export default {
  title: 'Inputs/Radio',
  component: Radio,
  args: {
    ...defaultProps,
    label: 'Label',
    name: 'radio',
    value: 'radio',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    ...marginProps(),
    label: { control: 'text' },
    onChange: { action: 'onChange', ...disableControl() },
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
    <Spacer>
      <Radio {...props} defaultChecked label="Small" name="sizes" size="sm" value="sm" />
      <Radio {...props} label="Medium" name="sizes" size="md" value="md" />
      <Radio {...props} label="Large" name="sizes" size="lg" value="lg" />
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

    await canvas.findByTestId('Radio');

    await expect(canvas.getByRole('radio')).not.toBeChecked();

    await fireEvent.keyDown(canvas.getByTestId('RadioElement'), { code: 'Tab' });
    await expect(canvas.getByRole('radio')).not.toBeChecked();

    await fireEvent.keyDown(canvas.getByTestId('RadioElement'), { code: 'Enter' });
    await expect(canvas.getByRole('radio')).toBeChecked();
  },
};
