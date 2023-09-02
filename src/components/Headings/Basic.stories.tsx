import { Meta, StoryObj } from '@storybook/react';

import { colorProps, hideProps, marginProps } from '~/stories/__helpers__';

import { H1, H2, H3, H4, H5, H6 } from './index';
import { defaultProps } from './utils';

export default {
  title: 'Content/Headings',
  component: H1,
  args: {
    ...defaultProps,
    align: 'center',
    children: 'The quick brown fox jumps over the lazy dog',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
    children: { control: 'text' },
  },
} satisfies Meta<typeof H1>;

export const BasicH1: StoryObj<typeof H1> = {
  name: 'H1',
};

export const BasicH2: StoryObj<typeof H2> = {
  name: 'H2',
  render: props => <H2 {...props} />,
};

export const BasicH3: StoryObj<typeof H3> = {
  name: 'H3',
  render: props => <H3 {...props} />,
};

export const BasicH4: StoryObj<typeof H4> = {
  name: 'H4',
  render: props => <H4 {...props} />,
};

export const BasicH5: StoryObj<typeof H5> = {
  name: 'H5',
  render: props => <H5 {...props} />,
};

export const BasicH6: StoryObj<typeof H6> = {
  name: 'H6',
  render: props => <H6 {...props} />,
};
