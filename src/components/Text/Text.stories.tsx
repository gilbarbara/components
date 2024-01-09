import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { Paragraph, Tag } from '~';

import { sizesAll, textDefaultOptions } from '~/modules/options';

import { colorProps, disableControl, hideProps, textOptionsProps } from '~/stories/__helpers__';

import { Text } from './Text';

type Story = StoryObj<typeof Text>;

export default {
  title: 'Content/Text',
  component: Text,
  args: {
    ...textDefaultOptions,
    children:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
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
    <div>
      {sizesAll.map(size => (
        <Paragraph key={size}>
          <Text onClick={action('clicked')} {...props} size={size}>
            <Tag size={size}>{size}</Tag> In the mountains far from the countries Vokalia and
            Consonantia, there live the blind texts.
          </Text>
        </Paragraph>
      ))}
    </div>
  ),
};
