import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { Anchor } from '../../src';
import { AnchorProps } from '../../src/Anchor';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Anchor',
  component: Anchor,
  argTypes: {
    ...hideProps(),
    href: { control: 'text', defaultValue: 'https://github.com/facebook/react' },
    children: { control: 'text', defaultValue: 'Open in GitHub' },
    display: { control: 'text', defaultValue: 'inline-flex' },
    target: { control: 'text', defaultValue: '_blank' },
    iconBefore: { defaultValue: 'github' },
    bold: { defaultValue: false },
    size: { defaultValue: 'regular' },
    variant: { control: 'select', defaultValue: 'primary' },
    shade: { control: 'select' },
  },
} as ComponentMeta<typeof Anchor>;

const Template: Story<AnchorProps> = props => {
  return <Anchor {...props} />;
};

export const Basic = Template.bind({});
