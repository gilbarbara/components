import { ComponentMeta } from '@storybook/react';
import { Jumbo } from 'src/Headings';
import { HeadingLargeProps } from 'src/Headings/utils';

import { hideProps } from '../../__helpers__';

export default {
  title: 'Components/Headings',
  component: Jumbo,
  args: {
    align: 'center',
    children: 'The quick brown fox jumps over the lazy dog',
    large: false,
    light: false,
  },
  argTypes: hideProps(),
} as ComponentMeta<typeof Jumbo>;

export const BasicJumbo = (props: HeadingLargeProps) => {
  return <Jumbo {...props} />;
};

BasicJumbo.storyName = 'Jumbo';
