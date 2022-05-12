import { ComponentMeta } from '@storybook/react';
import { FormGroup, Spacer } from 'src';
import { Checkbox, CheckboxProps } from 'src/CheckboxAndRadio';

import { disableControl, hideProps } from '../__helpers__';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    disabled: false,
    label: 'Skip Packaging',
    name: 'skipPackaging',
    size: 'md',
  },
  argTypes: {
    ...hideProps(),
    label: { control: 'text' },
    onChange: { action: 'onChange', ...disableControl() },
  },
} as ComponentMeta<typeof Checkbox>;

export const Basic = (props: CheckboxProps) => {
  return <Checkbox {...props} />;
};

export const Multiple = (props: CheckboxProps) => {
  return (
    <FormGroup label="Options" width={480}>
      <Spacer>
        <Checkbox {...props} label="Hide e-mail" name="hideEmail" />
        <Checkbox {...props} label="Hide picture" name="hidePicture" />
        <Checkbox {...props} label="Hide location" name="hideLocation" />
      </Spacer>
    </FormGroup>
  );
};

Multiple.args = {
  label: '',
  name: '',
};
Multiple.argTypes = {
  label: disableControl(),
  name: disableControl(),
};
