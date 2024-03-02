import { useEffect } from 'react';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';

import { Avatar, Box, H3, H6, Paragraph, Spacer } from '~';

import {
  addChromaticModes,
  colorProps,
  hideProps,
  layoutProps,
  radiusProps,
  spacingProps,
} from '~/stories/__helpers__';

import { defaultProps, Skeleton } from './Skeleton';
import { SkeletonProps } from './utils';

type Story = StoryObj<typeof Skeleton>;

export default {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent', 'bg']),
    ...layoutProps(),
    ...radiusProps(),
    ...spacingProps(),
  },
  parameters: {
    ...addChromaticModes('desktop_light', 'desktop_dark'),
  },
} satisfies Meta<typeof Skeleton>;

export const Basic: Story = {
  render: function Render(props) {
    const [{ isLoaded }, updateArguments] = useArgs<SkeletonProps>();

    useEffect(() => {
      setTimeout(() => {
        updateArguments({ isLoaded: true });
      }, 2000);
    }, [updateArguments]);

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
          isLoaded: {isLoaded?.toString()}
        </Paragraph>
      </>
    );
  },
};
