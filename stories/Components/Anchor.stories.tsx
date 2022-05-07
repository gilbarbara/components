import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { H1 } from '../../src';
import { Anchor, AnchorProps } from '../../src/Anchor';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Anchor',
  component: Anchor,
  argTypes: {
    ...hideProps(),
    bold: { defaultValue: false },
    children: { control: 'text', defaultValue: 'Open in GitHub' },
    display: { control: 'text', defaultValue: 'inline-flex' },
    hideDecoration: { defaultValue: false },
    href: { control: 'text', defaultValue: 'https://github.com/gilbarbara/components' },
    iconBefore: { defaultValue: 'github' },
    shade: { control: 'select' },
    target: { control: 'text', defaultValue: '_blank' },
    variant: { control: 'select', defaultValue: 'primary' },
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
