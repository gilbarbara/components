import { ComponentMeta } from '@storybook/react';
import { HeadingLargeProps, Jumbo } from 'src/Headings';

import { hideProps } from '../../__helpers__';

export default {
  title: 'Components/Headings',
  component: Jumbo,
  args: {
    align: 'left',
    large: false,
    light: false,
  },
  argTypes: hideProps(),
} as ComponentMeta<typeof Jumbo>;

export const BasicJumbo = (props: HeadingLargeProps) => {
  return <Jumbo {...props}>Jumbo title</Jumbo>;
};

BasicJumbo.storyName = 'Jumbo';
