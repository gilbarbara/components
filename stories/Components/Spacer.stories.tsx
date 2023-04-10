import { Meta, StoryObj } from '@storybook/react';

import { Box, Button, H2, Icon, Input, Tag } from 'src';
import { defaultProps, Spacer } from 'src/Spacer';

import {
  disableControl,
  flexItemProps,
  hideProps,
  layoutProps,
  spacingProps,
} from '../__helpers__';

type Story = StoryObj<typeof Spacer>;

export default {
  title: 'Components/Spacer',
  component: Spacer,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...flexItemProps(),
    ...layoutProps({ display: 'flex' }),
    ...spacingProps(),
    children: disableControl(),
  },
} satisfies Meta<typeof Spacer>;

export const Basic: Story = {
  render: props => (
    <Spacer {...props}>
      <Button>Yes, add it</Button>
      <Button invert>No, cancel</Button>
    </Spacer>
  ),
};

export const Vertical: Story = {
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
  render: props => (
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

export const WithGapVertical: Story = {
  args: {
    gapVertical: 'sm',
  },
  render: props => (
    <Box width={480}>
      <Spacer {...props}>
        {['react', 'react-component', 'react-mixin', 'joyride', 'walkthroughs', 'tour'].map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Spacer>
    </Box>
  ),
};

export const WithDifferentHeights: Story = {
  render: props => (
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

export const WithInput: Story = {
  args: {
    distribution: 'center',
  },
  render: props => (
    <Spacer {...props}>
      <Input name="name" placeholder="Type your name" width={200} />
      <Button shape="round">
        <Icon name="check" size={24} />
      </Button>
    </Spacer>
  ),
};
