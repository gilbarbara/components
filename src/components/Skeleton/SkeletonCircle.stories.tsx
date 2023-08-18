import { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Avatar, Paragraph } from '~';

import {
  colorProps,
  disableControl,
  hideProps,
  hideTable,
  layoutProps,
  spacingProps,
} from '~/stories/__helpers__';

import { defaultProps, SkeletonCircle } from './SkeletonCircle';

type Story = StoryObj<typeof SkeletonCircle>;

export default {
  title: 'Components/Skeleton',
  component: SkeletonCircle,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent', 'bg']),
    ...layoutProps(),
    ...spacingProps(),
    radius: hideTable(),
  },
} satisfies Meta<typeof SkeletonCircle>;

export const Circle: Story = {
  args: {
    size: 64,
    width: 64,
  },
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
        <SkeletonCircle {...props} isLoaded={isLoaded}>
          <Avatar
            image="https://images.unsplash.com/photo-1564164841584-391b5c7b590c?w=800"
            name="User"
            size="lg"
          />
        </SkeletonCircle>
        <Paragraph color="gray.300" mt="md">
          isLoaded: {isLoaded.toString()}
        </Paragraph>
      </>
    );
  },
};
