import { ComponentMeta } from '@storybook/react';
import { H2, HeadingProps } from 'src/Headings';

import { hideProps } from '../../__helpers__';

export default {
  title: 'Components/Headings',
  component: H2,
  argTypes: hideProps(),
} as ComponentMeta<typeof H2>;

export const HeadingH2 = (props: HeadingProps) => {
  return <H2 {...props}>H2 title</H2>;
};

HeadingH2.storyName = 'H2';
