import { capitalize } from '@gilbarbara/helpers';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { Paragraph } from 'src';
import { Text } from 'src/components/Text';
import { textDefaultOptions, textSizes } from 'src/modules/options';

import { colorProps, disableControl, hideProps, textOptionsProps } from '../__helpers__';

type Story = StoryObj<typeof Text>;

export default {
  title: 'Components/Text',
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
      {textSizes.map(size => (
        <Paragraph key={size}>
          <Text onClick={action('clicked')} {...props} size={size}>
            {capitalize(size)} mountains, far from the countries Vokalia and Consonantia, there live
            the blind texts.
          </Text>
        </Paragraph>
      ))}
    </div>
  ),
};
