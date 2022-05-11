import { capitalize } from '@gilbarbara/helpers';
import { action } from '@storybook/addon-actions';
import { ComponentMeta } from '@storybook/react';
import { Paragraph } from 'src';
import { Text, TextProps } from 'src/Text';

import { textSizes } from 'src/modules/options';

import { colorProps, hideProps, hideTable } from '../__helpers__';

export default {
  title: 'Components/Text',
  component: Text,
  args: {
    bold: false,
    children:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.',
    size: 'regular',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    children: { control: 'text' },
    size: { control: 'select' },
  },
} as ComponentMeta<typeof Text>;

export function Basic(props: TextProps) {
  return <Text {...props} />;
}

export function Sizes(props: TextProps) {
  return (
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
  );
}

Sizes.argTypes = {
  children: hideTable(),
  size: hideTable(),
};
