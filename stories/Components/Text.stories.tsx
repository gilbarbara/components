import { capitalize } from '@gilbarbara/helpers';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';

import { Paragraph } from 'src';
import { textSizes } from 'src/modules/options';
import { Text, TextProps } from 'src/Text';

import { colorProps, disableControl, hideProps, textOptionsProps } from '../__helpers__';

export default {
  title: 'Components/Text',
  component: Text,
  args: {
    ...Text.defaultProps,
    children:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...textOptionsProps(),
    children: { control: 'text' },
  },
} as Meta<typeof Text>;

export const Basic = {};

export const Sizes = {
  argTypes: {
    children: disableControl(),
    size: disableControl(),
  },
  render: (props: TextProps) => (
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
