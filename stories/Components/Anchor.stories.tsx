import { Meta } from '@storybook/react';

import { H1 } from 'src';
import { Anchor, AnchorProps } from 'src/Anchor';

import { colorProps, hideProps, spacingProps } from '../__helpers__';

export default {
  title: 'Components/Anchor',
  component: Anchor,
  args: {
    ...Anchor.defaultProps,
    children: 'Open in GitHub',
    external: true,
    href: 'https://github.com/gilbarbara/components',
    iconBefore: 'github',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...spacingProps(),
    children: { control: 'text' },
    display: { control: 'text' },
  },
} as Meta<typeof Anchor>;

export const Basic = {};

export const WithH1 = {
  name: 'With an H1 parent',
  args: {
    children: 'Check our docs',
    iconBefore: undefined,
  },
  render: (props: AnchorProps) => (
    <H1>
      <Anchor {...props} />
    </H1>
  ),
};
