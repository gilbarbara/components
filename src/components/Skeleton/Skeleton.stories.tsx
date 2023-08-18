import { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Avatar, Box, H3, H6, Paragraph, Spacer } from '~';

import {
  colorProps,
  disableControl,
  hideProps,
  layoutProps,
  spacingProps,
} from '~/stories/__helpers__';

import { defaultProps, Skeleton } from './Skeleton';

type Story = StoryObj<typeof Skeleton>;

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent', 'bg']),
    ...layoutProps(),
    ...spacingProps(),
  },
} satisfies Meta<typeof Skeleton>;

export const Basic: Story = {
  argTypes: {
    isLoaded: disableControl(),
  },
  render: function Render(props) {
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        setLoaded(true);
      }, 2000);
    }, []);

    return (
      <>
        <Skeleton {...props} isLoaded={isLoaded}>
          <Box minWidth={200}>
            <Box>
              <H3 mb="xs">Users</H3>
            </Box>
            <Spacer border="top" mt="xs" pt="xs">
              <Avatar image="https://i.pravatar.cc/300?img=68" name="John Smith" />
              <Box>
                <H6 mb={0}>John Smith</H6>
                <Paragraph>Admin</Paragraph>
              </Box>
            </Spacer>
          </Box>
        </Skeleton>
        <Paragraph color="gray.300" mt="md">
          isLoaded: {isLoaded.toString()}
        </Paragraph>
      </>
    );
  },
};
