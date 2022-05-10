import { ComponentMeta } from '@storybook/react';
import { H1, H2, H3, H4, H5, H6 } from 'src/Headings';
import { HeadingProps } from 'src/Headings/utils';

import { hideProps } from '../../__helpers__';

export default {
  title: 'Components/Headings',
  component: H1,
  args: {
    align: 'left',
    children: 'The quick brown fox jumps over the lazy dog',
    light: false,
  },
  argTypes: hideProps(),
} as ComponentMeta<typeof H1>;

export const BasicH1 = (props: HeadingProps) => {
  return <H1 {...props} />;
};

BasicH1.storyName = 'H1';

export const BasicH2 = (props: HeadingProps) => {
  return <H2 {...props} />;
};

BasicH2.storyName = 'H2';

export const BasicH3 = (props: HeadingProps) => {
  return <H3 {...props} />;
};

BasicH3.storyName = 'H3';

export const BasicH4 = (props: HeadingProps) => {
  return <H4 {...props} />;
};

BasicH4.storyName = 'H4';

export const BasicH5 = (props: HeadingProps) => {
  return <H5 {...props} />;
};

BasicH5.storyName = 'H5';

export const BasicH6 = (props: HeadingProps) => {
  return <H6 {...props} />;
};

BasicH6.storyName = 'H6';
