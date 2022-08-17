import { ComponentMeta } from '@storybook/react';

import { Radio, RadioProps } from 'src/CheckboxAndRadio';

import { disableControl, hideProps } from '../__helpers__';

export default {
  title: 'Components/Radio',
  component: Radio,
  args: {
    ...Radio.defaultProps,
    label: 'Skip Packaging',
    name: 'skipPackaging',
    value: 'skipPackaging',
  },
  argTypes: {
    ...hideProps(),
    label: { control: 'text' },
    onChange: { action: 'onChange', ...disableControl() },
    value: { control: 'text' },
  },
} as ComponentMeta<typeof Radio>;

export const Basic = (props: RadioProps) => <Radio {...props} />;
