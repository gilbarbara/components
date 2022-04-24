import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Paragraph, RadioGroup, Text } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {
    ...hideProps(),
    defaultValue: {
      table: { disable: true },
    },
    name: { defaultValue: 'position ' },
    onChange: {
      action: 'onChange',
      table: { disable: true },
    },
    options: {
      table: { disable: true },
    },
    value: {
      table: { disable: true },
    },
  },
} as ComponentMeta<typeof RadioGroup>;

const options = [
  {
    label: 'First',
    value: 1,
  },
  {
    label: 'Second',
    value: 2,
  },
  {
    label: 'Third',
    value: 3,
    disabled: true,
  },
  {
    label: (
      <div>
        <Text size="large">Forth</Text>
        <Paragraph>
          Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
          there live the blind texts.
        </Paragraph>
      </div>
    ),
    value: 4,
  },
];

export const Basic = (props: any) => {
  return <RadioGroup defaultValue={4} options={options} {...props} />;
};
