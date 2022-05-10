import { ComponentMeta } from '@storybook/react';
import { H3, HeadingProps } from 'src/Headings';

import { hideProps } from '../../__helpers__';

export default {
  title: 'Components/Headings',
  component: H3,
  args: {
    light: false,
  },
  argTypes: hideProps(),
} as ComponentMeta<typeof H3>;

export const HeadingH3 = (props: HeadingProps) => {
  return <H3 {...props}>H3 title</H3>;
};

HeadingH3.storyName = 'H3';
