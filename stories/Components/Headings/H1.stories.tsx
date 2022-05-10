import { ComponentMeta } from '@storybook/react';
import { H1, HeadingProps } from 'src/Headings';

import { hideProps } from '../../__helpers__';

export default {
  title: 'Components/Headings',
  component: H1,
  argTypes: hideProps(),
} as ComponentMeta<typeof H1>;

export const HeadingH1 = (props: HeadingProps) => {
  return <H1 {...props}>H1 title</H1>;
};

HeadingH1.storyName = 'H1';
