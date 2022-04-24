import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { FormGroup, Input, Select, Textarea } from '../../src';
import { hideProps, hideTable } from '../__helpers__';

export default {
  title: 'Components/FormGroup',
  component: FormGroup,
  argTypes: {
    ...hideProps(),
    label: {
      defaultValue: 'Name',
    },
    labelId: {
      control: 'text',
      name: 'Label Id',
    },
    labelInfo: { control: 'text', name: 'Label Info', defaultValue: '*' },
    labelStyles: {
      table: { disable: true },
    },
    assistiveText: { control: 'text', name: 'Assistive Text', defaultValue: 'Required' },
    error: { control: 'text' },
    inline: { control: 'boolean', defaultValue: false },
  },
} as ComponentMeta<typeof FormGroup>;

export const Basic = (props: any) => {
  return (
    <FormGroup {...props}>
      <Input name="name" placeholder="User Name" />
    </FormGroup>
  );
};

export const Elements = (props: any) => {
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

export const ElementsWithoutBorder = (props: any) => {
  return (
    <>
      <FormGroup {...props} assistiveText="Required" label={undefined} labelInfo={undefined}>
        <Input borderless name="name" placeholder="Name" />
      </FormGroup>
      <FormGroup {...props} assistiveText="" label={undefined} labelInfo={undefined}>
        <Select borderless name="gender">
          <option value="">Select your gender...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Select>
      </FormGroup>
      <FormGroup {...props} assistiveText="" label={undefined} labelInfo={undefined}>
        <Textarea borderless name="description" placeholder="Tell us about yourself" />
      </FormGroup>
    </>
  );
};

ElementsWithoutBorder.argTypes = {
  label: hideTable(),
  labelId: hideTable(),
  labelInfo: hideTable(),
  assistiveText: hideTable(),
};
