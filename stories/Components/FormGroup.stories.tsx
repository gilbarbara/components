import { Meta } from '@storybook/react';

import { Input, Select, Textarea } from 'src';
import { FormGroup, FormGroupProps } from 'src/FormGroup';

import { disableControl, hideProps, layoutProps, spacingProps } from '../__helpers__';

export default {
  title: 'Components/FormGroup',
  component: FormGroup,
  args: {
    ...FormGroup.defaultProps,
    assistiveText: 'Required',
    label: 'Name',
    maxWidth: 640,
  },
  argTypes: {
    ...hideProps(),
    ...layoutProps(),
    ...spacingProps(),
    assistiveText: { control: 'text' },
    error: { control: 'text' },
    label: { control: 'text' },
    labelInfo: { control: 'text' },
  },
} as Meta<typeof FormGroup>;

export const Basic = {
  render: (props: FormGroupProps) => (
    <FormGroup {...props} required>
      <Input name="name" placeholder="User Name" />
    </FormGroup>
  ),
};

export const Elements = {
  args: {
    assistiveText: '',
  },
  argTypes: {
    assistiveText: disableControl(),
    label: disableControl(),
    labelId: disableControl(),
    labelInfo: disableControl(),
    required: disableControl(),
    valid: disableControl(),
  },
  render: (props: FormGroupProps) => (
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
  ),
};
