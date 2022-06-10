import { ComponentMeta } from '@storybook/react';
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
} as ComponentMeta<typeof Anchor>;

export const Basic = (props: AnchorProps) => <Anchor {...props} />;

export const WithH1 = (props: AnchorProps) => (
  <H1>
    <Anchor {...props} />
  </H1>
);

WithH1.args = {
  children: 'Check our docs',
  iconBefore: undefined,
};
WithH1.storyName = 'With an H1 parent';
