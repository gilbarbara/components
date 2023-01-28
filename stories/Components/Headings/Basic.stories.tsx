import { Meta } from '@storybook/react';

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
} as Meta<typeof H1>;

export const BasicH1 = {
  name: 'H1',
};

export const BasicH2 = {
  name: 'H2',
  render: (props: HeadingProps) => <H2 {...props} />,
};

export const BasicH3 = {
  name: 'H3',
  render: (props: HeadingProps) => <H3 {...props} />,
};

export const BasicH4 = {
  name: 'H4',
  render: (props: HeadingProps) => <H4 {...props} />,
};

export const BasicH5 = {
  name: 'H5',
  render: (props: HeadingProps) => <H5 {...props} />,
};

export const BasicH6 = {
  name: 'H6',
  render: (props: HeadingProps) => <H6 {...props} />,
};
