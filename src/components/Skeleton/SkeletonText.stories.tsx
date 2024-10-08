import { useEffect } from 'react';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';

import { Paragraph } from '~';

import {
  addChromaticModes,
  colorProps,
  hideProps,
  layoutProps,
  PANGRAM,
  spacingProps,
} from '~/stories/__helpers__';

import { defaultProps, SkeletonText } from './SkeletonText';
import { SkeletonTextProps } from './useSkeleton';

type Story = StoryObj<typeof SkeletonText>;

export default {
  title: 'Components/Skeleton',
  // category: 'Feedback',
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
    ...addChromaticModes('desktop_light', 'desktop_dark'),
  },
} satisfies Meta<typeof SkeletonText>;

export const Text: Story = {
  args: {
    lines: 2,
  },
  render: function Render(props) {
    const [{ isLoaded }, updateArguments] = useArgs<SkeletonTextProps>();

    useEffect(() => {
      setTimeout(() => {
        updateArguments({ isLoaded: true });
      }, 2000);
    }, [updateArguments]);

    return (
      <>
        <SkeletonText {...props} isLoaded={isLoaded}>
          {PANGRAM}
        </SkeletonText>
        <Paragraph color="gray.300" mt="md">
          isLoaded: {isLoaded?.toString()}
        </Paragraph>
      </>
    );
  },
};
