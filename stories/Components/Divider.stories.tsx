import { ComponentMeta, StoryContext } from '@storybook/react';
import { Divider, DividerProps } from 'src/Divider';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Divider',
  component: Divider,
  args: {
    size: 'md',
    type: 'solid',
  },
  argTypes: hideProps(),
} as ComponentMeta<typeof Divider>;

export const Basic = ({ width, ...props }: DividerProps, { viewMode }: StoryContext) => {
  return <Divider width={viewMode === 'docs' ? width || 320 : '100%'} {...props} />;
};
