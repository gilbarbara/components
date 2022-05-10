import { ComponentMeta } from '@storybook/react';
import { Radio, RadioProps } from 'src/CheckboxAndRadio';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Radio',
  component: Radio,
  args: {
    label: 'Skip Packaging',
    name: 'radio',
  },
  argTypes: {
    ...hideProps(),
    onChange: { action: 'onChange' },
  },
} as ComponentMeta<typeof Radio>;

export const Basic = (props: RadioProps) => {
  return <Radio {...props} />;
};
