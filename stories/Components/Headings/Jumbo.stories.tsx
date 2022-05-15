import { ComponentMeta } from '@storybook/react';
import { Jumbo } from 'src/Headings';
import { HeadingLargeProps } from 'src/Headings/utils';

import { hideProps, marginProps } from '../../__helpers__';

export default {
  title: 'Components/Headings',
  component: Jumbo,
  args: {
    align: 'center',
    children: 'The quick brown fox jumps over the lazy dog',
    large: false,
    light: false,
  },
  argTypes: {
    ...hideProps(),
    ...marginProps(),
  },
} as ComponentMeta<typeof Jumbo>;

export const BasicJumbo = (props: HeadingLargeProps) => <Jumbo {...props} />;

BasicJumbo.storyName = 'Jumbo';
