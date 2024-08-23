import { Meta, StoryObj } from '@storybook/react';

import { Paragraph, Spacer } from '~';

import { inputTypes, sizes } from '~/modules/options';

import { colorProps, disableControl, hideProps, PANGRAM } from '~/stories/__helpers__';

import { defaultProps, Input } from './Input';

type Story = StoryObj<typeof Input>;

export default {
  title: 'Components/Input',
  // category: 'Inputs',
  component: Input,
  args: {
    ...defaultProps,
    name: 'name',
    placeholder: 'Your name here...',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    type: { control: 'select', options: inputTypes },
    width: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export const Basic: Story = {};

export const Sizes: Story = {
  args: {
    placeholder: '',
  },
  argTypes: {
    name: disableControl(),
    height: disableControl(),
  },
  render: props => (
    <Spacer distribution="center" gap="lg" orientation="vertical">
      {sizes.map(size => (
        <div key={size}>
          <Paragraph align="center" mb="xs" size="lg">
            {size}
          </Paragraph>
          <Input {...props} height={size} name={size} placeholder={PANGRAM} width="90vw" />
        </div>
      ))}
    </Spacer>
  ),
};

export const Types: Story = {
  args: {
    placeholder: '',
  },
  argTypes: {
    borderless: disableControl(),
    disabled: disableControl(),
    name: disableControl(),
  },
  render: props => (
    <>
      <Input {...props} name="normal" placeholder="normal" />
      <br />
      <Input {...props} disabled name="normal-disabled" placeholder="normal (disabled)" />
      <br />
      <Input {...props} borderless name="borderless" placeholder="borderless" />
      <br />
      <Input
        {...props}
        borderless
        disabled
        name="borderless-disabled"
        placeholder="borderless (disabled)"
      />
      <br />
    </>
  ),
};
