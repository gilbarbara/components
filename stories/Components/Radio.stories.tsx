import { ComponentMeta } from '@storybook/react';

import { Radio, RadioProps } from 'src/CheckboxAndRadio';

import { disableControl, hideProps, marginProps } from '../__helpers__';

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
    ...marginProps(),
    label: { control: 'text' },
    onChange: { action: 'onChange', ...disableControl() },
    value: { control: 'text' },
  },
} as ComponentMeta<typeof Radio>;

export const Basic = (props: RadioProps) => <Radio {...props} />;
