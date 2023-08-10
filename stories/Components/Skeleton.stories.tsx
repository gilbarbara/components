import { Meta, StoryObj } from '@storybook/react';

import { defaultProps, Skeleton } from 'src/components/Skeleton/Skeleton';

import { Avatar, Box, H3, H6, Paragraph, Spacer } from '../../src';
import { hideProps, layoutProps, spacingProps } from '../__helpers__';

type Story = StoryObj<typeof Skeleton>;

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...layoutProps(),
    ...spacingProps(),
  },
} satisfies Meta<typeof Skeleton>;

export const Basic: Story = {
  args: {
    children: (
      <Box>
        <Box key="1">
          <H3 mb="xs">Users</H3>
          <Paragraph>The users inside this group</Paragraph>
        </Box>
        ,
        <Spacer key="2">
          <Avatar image="https://i.pravatar.cc/300?img=68" name="John Smith" />
          <Box>
            <H6 mb={0}>John Smith</H6>
            <Paragraph>Admin</Paragraph>
          </Box>
        </Spacer>
      </Box>
    ),
  },
};
