import { Meta, StoryObj } from '@storybook/react';

import { colorProps, disableControl, hideProps, marginProps } from '~/stories/__helpers__';

import { defaultProps, Radio } from './Radio';

type Story = StoryObj<typeof Radio>;

export default {
  title: 'Components/Radio',
  component: Radio,
  args: {
    ...defaultProps,
    label: 'Skip Packaging',
    name: 'skipPackaging',
    value: 'skipPackaging',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    ...marginProps(),
    label: { control: 'text' },
    onChange: { action: 'onChange', ...disableControl() },
    value: { control: 'text' },
  },
} satisfies Meta<typeof Radio>;

export const Basic: Story = {};
