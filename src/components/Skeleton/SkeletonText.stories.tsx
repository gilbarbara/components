import { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Paragraph } from '~';

import {
  colorProps,
  disableControl,
  hideProps,
  layoutProps,
  spacingProps,
} from '~/stories/__helpers__';

import { defaultProps, SkeletonText } from './SkeletonText';

type Story = StoryObj<typeof SkeletonText>;

export default {
  title: 'Components/Skeleton',
  component: SkeletonText,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent', 'bg']),
    ...layoutProps(),
    ...spacingProps(),
  },
  parameters: {
    align: 'stretch',
  },
} satisfies Meta<typeof SkeletonText>;

export const Text: Story = {
  args: {
    lines: 2,
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
        <SkeletonText {...props} isLoaded={isLoaded}>
          The quick brown fox jumps over the lazy dog
        </SkeletonText>
        <Paragraph color="gray.300" mt="md">
          isLoaded: {isLoaded.toString()}
        </Paragraph>
      </>
    );
  },
};
