import { Meta } from '@storybook/react';

import { Box, Button, H2, Icon, Input, Tag } from 'src';
import { Spacer, SpacerProps } from 'src/Spacer';

import {
  disableControl,
  flexItemProps,
  hideProps,
  layoutProps,
  spacingProps,
} from '../__helpers__';

export default {
  title: 'Components/Spacer',
  component: Spacer,
  args: Spacer.defaultProps,
  argTypes: {
    ...hideProps(),
    ...flexItemProps(),
    ...layoutProps({ display: 'flex' }),
    ...spacingProps(),
    children: disableControl(),
  },
} as Meta<typeof Spacer>;

export const Basic = {
  render: (props: SpacerProps) => (
    <Spacer {...props}>
      <Button>Yes, add it</Button>
      <Button invert>No, cancel</Button>
    </Spacer>
  ),
};

export const Vertical = {
  args: {
    direction: 'vertical',
    distribution: 'center',
    fill: true,
    gap: 'xl',
  },
  argTypes: {
    direction: disableControl(),
    gap: disableControl(),
  },
  render: (props: SpacerProps) => (
    <Spacer {...props}>
      <Button size="sm">Yes, add it</Button>
      <Button size="sm" variant="orange">
        Maybe?
      </Button>
      <Button invert size="sm" variant="red">
        No, cancel
      </Button>
    </Spacer>
  ),
};

export const WithGapVertical = {
  args: {
    gapVertical: 'sm',
  },
  render: (props: SpacerProps) => (
    <Box width={480}>
      <Spacer {...props}>
        {['react', 'react-component', 'react-mixin', 'joyride', 'walkthroughs', 'tour'].map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Spacer>
    </Box>
  ),
};

export const WithDifferentHeights = {
  render: (props: SpacerProps) => (
    <Box width={600}>
      <Spacer {...props}>
        <H2 mb={0}>My Big Title</H2>
        <Box data-flex="1">
          Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
          there live the blind texts. Separated they live in Bookmarksgrove right at the coast of
          the Semantics, a large language ocean.
        </Box>
      </Spacer>
    </Box>
  ),
};

export const WithInput = {
  args: {
    distribution: 'center',
  },
  render: (props: SpacerProps) => (
    <Spacer {...props}>
      <Input name="name" placeholder="Type your name" width={200} />
      <Button shape="round">
        <Icon name="check" size={24} />
      </Button>
    </Spacer>
  ),
};
