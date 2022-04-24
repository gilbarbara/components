import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { ButtonBase } from '../../src';
import { ButtonBaseProps } from '../../src/ButtonBase';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/ButtonBase',
  component: ButtonBase,
  argTypes: {
    ...hideProps(),
    children: { control: 'text', defaultValue: 'Button' },
    busy: { defaultValue: false },
    disabled: { control: 'boolean', defaultValue: false },
    bold: { defaultValue: false },
    size: { defaultValue: 'regular' },
    variant: { control: 'select' },
    shade: { control: 'select' },
    type: {
      table: { disable: true },
    },
  },
} as ComponentMeta<typeof ButtonBase>;

const Template: Story<ButtonBaseProps> = props => {
  return <ButtonBase {...props} />;
};

export const Basic = Template.bind({});
