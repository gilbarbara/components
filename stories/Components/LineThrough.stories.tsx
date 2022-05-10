import { ComponentMeta } from '@storybook/react';
import { LineThrough, LineThroughProps } from 'src/LineThrough';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/LineThrough',
  component: LineThrough,
  args: {
    bold: false,
    children: 'or',
    gap: 'xs',
    lineHeight: 1,
    size: 'regular',
  },
  argTypes: {
    ...hideProps(),
    children: { control: 'text', defaultValue: 'or' },
    size: { control: 'select' },
  },
} as ComponentMeta<typeof LineThrough>;

export function Basic(props: LineThroughProps) {
  return <LineThrough {...props} />;
}
