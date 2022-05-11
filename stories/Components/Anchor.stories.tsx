import { ComponentMeta } from '@storybook/react';
import { H1 } from 'src';
import { Anchor, AnchorProps } from 'src/Anchor';

import { colorProps, hideProps, spacingProps } from '../__helpers__';

export default {
  title: 'Components/Anchor',
  component: Anchor,
  args: {
    bold: false,
    children: 'Open in GitHub',
    external: true,
    hideDecoration: false,
    href: 'https://github.com/gilbarbara/components',
    iconBefore: 'github',
    shade: 'mid',
    variant: 'primary',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...spacingProps(),
  },
} as ComponentMeta<typeof Anchor>;

export function Basic(props: AnchorProps) {
  return <Anchor {...props} />;
}

export function WithH1(props: AnchorProps) {
  return (
    <H1>
      <Anchor {...props} />
    </H1>
  );
}

WithH1.args = {
  children: 'Check our docs',
  iconBefore: undefined,
};
WithH1.storyName = 'With an H1 parent';
