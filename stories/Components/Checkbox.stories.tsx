import { ComponentMeta } from '@storybook/react';
import { FormGroup, Group } from 'src';
import { Checkbox, CheckboxProps } from 'src/CheckboxAndRadio';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    label: 'Skip Packaging',
    name: 'check',
  },
  argTypes: {
    ...hideProps(),
    onChange: {
      action: 'onChange',
    },
  },
} as ComponentMeta<typeof Checkbox>;

export const Basic = (props: CheckboxProps) => {
  return <Checkbox {...props} />;
};

export const Multiple = (props: CheckboxProps) => {
  return (
    <FormGroup label="Options">
      <Group>
        <Checkbox {...props} label="Show e-mail" name="showEmail" />
        <Checkbox {...props} label="Show picture" name="showPicture" />
        <Checkbox {...props} label="Show location" name="showLocation" />
      </Group>
    </FormGroup>
  );
};
