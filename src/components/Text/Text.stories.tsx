import { Fragment } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Paragraph, Spacer } from '~';

import { textDefaultOptions, textSizes } from '~/modules/options';
import {
  colorProps,
  disableControl,
  flexItemProps,
  hideProps,
  textOptionsProps,
} from '~/stories/__helpers__';

import { Text } from './Text';

type Story = StoryObj<typeof Text>;

export default {
  title: 'Components/Text',
  // category: 'Content',
  component: Text,
  args: {
    ...textDefaultOptions,
    children:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...flexItemProps(),
    ...textOptionsProps(),
    children: { control: 'text' },
  },
} satisfies Meta<typeof Text>;

export const Basic: Story = {};

export const Sizes: Story = {
  argTypes: {
    children: disableControl(),
    size: disableControl(),
  },
  render: props => (
    <Spacer distribution="center" gap="lg" orientation="vertical">
      {textSizes.map(size => (
        <Fragment key={size}>
          <Paragraph align="center" size="lg">
            {size}
          </Paragraph>
          <Text {...props} size={size}>
            In the mountains far from the countries Vokalia and Consonantia, there live the blind
            texts.
          </Text>
        </Fragment>
      ))}
    </Spacer>
  ),
};
