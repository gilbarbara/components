import { ComponentMeta } from '@storybook/react';

import { H1, H2, H3, H4, H5, H6 } from 'src/Headings';
import { HeadingProps } from 'src/Headings/utils';

import { colorProps, hideProps, marginProps } from '../../__helpers__';

export default {
  title: 'Components/Headings',
  component: H1,
  args: {
    ...H1.defaultProps,
    align: 'center',
    children: 'The quick brown fox jumps over the lazy dog',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
    children: { control: 'text' },
  },
} as ComponentMeta<typeof H1>;

export const BasicH1 = (props: HeadingProps) => <H1 {...props} />;

BasicH1.storyName = 'H1';

export const BasicH2 = (props: HeadingProps) => <H2 {...props} />;

BasicH2.storyName = 'H2';

export const BasicH3 = (props: HeadingProps) => <H3 {...props} />;

BasicH3.storyName = 'H3';

export const BasicH4 = (props: HeadingProps) => <H4 {...props} />;

BasicH4.storyName = 'H4';

export const BasicH5 = (props: HeadingProps) => <H5 {...props} />;

BasicH5.storyName = 'H5';

export const BasicH6 = (props: HeadingProps) => <H6 {...props} />;

BasicH6.storyName = 'H6';
