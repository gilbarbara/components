import { useEffect } from 'react';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';

import { Avatar, Paragraph } from '~';

import {
  addChromaticModes,
  colorProps,
  hideProps,
  hideTable,
  layoutProps,
  spacingProps,
} from '~/stories/__helpers__';

import { defaultProps, SkeletonCircle } from './SkeletonCircle';
import { SkeletonCircleProps } from './utils';

type Story = StoryObj<typeof SkeletonCircle>;

export default {
  title: 'Feedback/Skeleton',
  component: SkeletonCircle,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent', 'bg']),
    ...layoutProps(),
    ...spacingProps(),
    radius: hideTable(),
  },
  parameters: {
    ...addChromaticModes('desktop_light', 'desktop_dark'),
  },
} satisfies Meta<typeof SkeletonCircle>;

export const Circle: Story = {
  args: {
    size: 64,
    width: 64,
  },
  render: function Render(props) {
    const [{ isLoaded }, updateArguments] = useArgs<SkeletonCircleProps>();

    useEffect(() => {
      setTimeout(() => {
        updateArguments({ isLoaded: true });
      }, 2000);
    }, [updateArguments]);

    return (
      <>
        <SkeletonCircle {...props} isLoaded={isLoaded}>
          <Avatar
            image="https://images.unsplash.com/photo-1564164841584-391b5c7b590c?w=800"
            name="User"
            size="lg"
          />
        </SkeletonCircle>
        <Paragraph color="gray.300" mt="md">
          isLoaded: {isLoaded?.toString()}
        </Paragraph>
      </>
    );
  },
};
