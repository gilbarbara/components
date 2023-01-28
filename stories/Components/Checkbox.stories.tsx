import { Meta } from '@storybook/react';

import { FormGroup, Spacer } from 'src';
import { Checkbox, CheckboxProps } from 'src/CheckboxAndRadio';

import { disableControl, hideProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    ...Checkbox.defaultProps,
    label: 'Skip Packaging',
    name: 'skipPackaging',
  },
  argTypes: {
    ...hideProps(),
    ...marginProps(),
    label: { control: 'text' },
    onChange: { action: 'onChange', ...disableControl() },
  },
} as Meta<typeof Checkbox>;

export const Basic = {};

export const Multiple = {
  args: {
    label: '',
    name: '',
  },
  argTypes: {
    label: disableControl(),
    name: disableControl(),
  },
  render: (props: CheckboxProps) => (
    <FormGroup label="Options" width={480}>
      <Spacer>
        <Checkbox {...props} label="Hide e-mail" name="hideEmail" />
        <Checkbox {...props} label="Hide picture" name="hidePicture" />
        <Checkbox {...props} label="Hide location" name="hideLocation" />
      </Spacer>
    </FormGroup>
  ),
};
