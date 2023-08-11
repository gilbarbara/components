import { Meta, StoryObj } from '@storybook/react';

import { FormGroup, Spacer } from '~';

import { disableControl, hideProps, marginProps } from '~/stories/__helpers__';

import { Checkbox, defaultProps } from './Checkbox';

type Story = StoryObj<typeof Checkbox>;

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    ...defaultProps,
    label: 'Skip Packaging',
    name: 'skipPackaging',
  },
  argTypes: {
    ...hideProps(),
    ...marginProps(),
    label: { control: 'text' },
    onChange: { action: 'onChange', ...disableControl() },
  },
} satisfies Meta<typeof Checkbox>;

export const Basic: Story = {};

export const Multiple: Story = {
  args: {
    label: '',
    name: '',
  },
  argTypes: {
    label: disableControl(),
    name: disableControl(),
  },
  render: props => (
    <FormGroup label="Options" width={480}>
      <Spacer>
        <Checkbox {...props} label="Hide e-mail" name="hideEmail" />
        <Checkbox {...props} label="Hide picture" name="hidePicture" />
        <Checkbox {...props} label="Hide location" name="hideLocation" />
      </Spacer>
    </FormGroup>
  ),
};