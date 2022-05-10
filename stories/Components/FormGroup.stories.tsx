import { ComponentMeta } from '@storybook/react';
import { Input, Select, Textarea } from 'src';
import { FormGroup, FormGroupProps } from 'src/FormGroup';

import { hideProps, hideTable, layoutParameters } from '../__helpers__';

export default {
  title: 'Components/FormGroup',
  component: FormGroup,
  args: {
    assistiveText: 'Required',
    inline: false,
    label: 'Name',
    labelInfo: '*',
  },
  argTypes: {
    ...hideProps(),
    ...layoutParameters(),
    error: { control: 'text' },
    labelId: { control: 'text' },
  },
} as ComponentMeta<typeof FormGroup>;

export const Basic = (props: FormGroupProps) => {
  return (
    <FormGroup {...props}>
      <Input name="name" placeholder="User Name" />
    </FormGroup>
  );
};

export const Elements = (props: FormGroupProps) => {
  return (
    <>
      <FormGroup {...props} assistiveText="">
        <Input name="name" placeholder="Name" />
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
};

Elements.argTypes = {
  label: hideTable(),
  labelId: hideTable(),
  labelInfo: hideTable(),
  assistiveText: hideTable(),
};
