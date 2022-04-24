import * as React from 'react';
import { capitalize } from '@gilbarbara/helpers';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, Story } from '@storybook/react';

import { Paragraph, Text } from '../../src';
import { TextProps } from '../../src/Text';
import * as Types from '../../src/types';
import { hideProps, textSizes } from '../__helpers__';

export default {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    ...hideProps(),
    children: { control: 'text' },
    size: { control: 'select', defaultValue: 'regular' },
    bold: { control: 'boolean', defaultValue: false },
    variant: { control: 'select' },
    shade: { control: 'select' },
  },
} as ComponentMeta<typeof Text>;

const Template: Story<TextProps> = (props: any) => {
  return <Text {...props} />;
};

export const Basic = Template.bind({});

Basic.args = {
  children:
    'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.',
};

export function Sizes(props: any) {
  return (
    <div>
      {textSizes.map(d => (
        <Paragraph key={d}>
          <Text onClick={action('clicked')} {...props} size={d as Types.Sizes}>
            {capitalize(d)} mountains, far from the countries Vokalia and Consonantia, there live
            the blind texts.
          </Text>
        </Paragraph>
      ))}
    </div>
  );
}

Sizes.argTypes = {
  children: {
    table: { disable: true },
  },
  size: {
    table: { disable: true },
  },
};
