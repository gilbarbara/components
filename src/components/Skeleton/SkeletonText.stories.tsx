import { useEffect } from 'react';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';

import { Paragraph } from '~';

import {
  addChromaticModes,
  colorProps,
  hideProps,
  layoutProps,
  spacingProps,
} from '~/stories/__helpers__';

import { defaultProps, SkeletonText } from './SkeletonText';
import { SkeletonTextProps } from './utils';

type Story = StoryObj<typeof SkeletonText>;

export default {
  title: 'Feedback/Skeleton',
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
          The quick brown fox jumps over the lazy dog
        </SkeletonText>
        <Paragraph color="gray.300" mt="md">
          isLoaded: {isLoaded?.toString()}
        </Paragraph>
      </>
    );
  },
};
