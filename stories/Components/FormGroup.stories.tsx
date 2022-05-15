import { ComponentMeta } from '@storybook/react';
import { Input, Select, Textarea } from 'src';
import { FormGroup, FormGroupProps } from 'src/FormGroup';

import { disableControl, hideProps, layoutProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/FormGroup',
  component: FormGroup,
  args: {
    assistiveText: 'Required',
    hideAssistiveText: false,
    inline: false,
    label: 'Name',
    maxWidth: 640,
    required: false,
  },
  argTypes: {
    ...hideProps(),
    ...layoutProps(),
    ...marginProps(),
    assistiveText: { control: 'text' },
    error: { control: 'text' },
    label: { control: 'text' },
    labelInfo: { control: 'text' },
  },
} as ComponentMeta<typeof FormGroup>;

export const Basic = (props: FormGroupProps) => (
  <FormGroup {...props} required>
    <Input name="name" placeholder="User Name" />
  </FormGroup>
);

export const Elements = (props: FormGroupProps) => (
  <>
    <FormGroup {...props} assistiveText="The name is required..." required valid>
      <Input defaultValue="Test User" name="name" placeholder="Name" />
    </FormGroup>
    <FormGroup {...props} label="Gender">
      <Select name="gender">
        <option value="">Select your gender...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </Select>
    </FormGroup>
    <FormGroup {...props} label="Description">
      <Textarea name="description" placeholder="Tell us about yourself" />
    </FormGroup>
  </>
);

Elements.args = {
  assistiveText: '',
};

Elements.argTypes = {
  assistiveText: disableControl(),
  label: disableControl(),
  labelId: disableControl(),
  labelInfo: disableControl(),
  required: disableControl(),
  valid: disableControl(),
};
