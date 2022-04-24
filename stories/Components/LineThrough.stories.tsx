import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { LineThrough } from '../../src';
import { LineThroughProps } from '../../src/LineThrough';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/LineThrough',
  component: LineThrough,
  argTypes: {
    ...hideProps(),
    children: { control: 'text', defaultValue: 'or' },
    size: { control: 'select', defaultValue: 'regular' },
    bold: { control: 'boolean', defaultValue: false },
    gap: { defaultValue: 'xs' },
    line: { control: 'number', defaultValue: 1 },
    variant: { control: 'select' },
    shade: { control: 'select' },
  },
} as ComponentMeta<typeof LineThrough>;

const Template: Story<LineThroughProps> = (props: any) => {
  return <LineThrough {...props} />;
};

export const Basic = Template.bind({});
