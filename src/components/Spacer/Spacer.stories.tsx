import { Meta, StoryObj } from '@storybook/react';

import { Box, Button, Chip, H2, Icon, Input } from '~';

import {
  disableControl,
  flexItemProps,
  hideProps,
  layoutProps,
  radiusProps,
  SPACING,
  spacingProps,
} from '~/stories/__helpers__';

import { defaultProps, Spacer } from './Spacer';

type Story = StoryObj<typeof Spacer>;

export default {
  title: 'Layout/Spacer',
  component: Spacer,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...flexItemProps(),
    ...layoutProps({ display: 'flex' }),
    ...radiusProps(),
    ...spacingProps(),
    gap: { control: 'select', options: SPACING },
    children: disableControl(),
  },
} satisfies Meta<typeof Spacer>;

export const Basic: Story = {
  render: props => (
    <Spacer {...props}>
      <Button>Yes, add it</Button>
      <Button variant="bordered">No, cancel</Button>
    </Spacer>
  ),
};

export const Vertical: Story = {
  args: {
    distribution: 'center',
    fill: true,
    gap: 'lg',
    orientation: 'vertical',
  },
  render: props => (
    <Spacer {...props}>
      <Button size="sm">Yes, add it</Button>
      <Button bg="orange" size="sm">
        Maybe?
      </Button>
      <Button bg="red" size="sm" variant="bordered">
        No, cancel
      </Button>
    </Spacer>
  ),
};

export const WithTwoValueGap: Story = {
  args: {
    gap: ['xs', 'md'],
  },
  argTypes: {
    gap: disableControl(),
  },
  render: props => (
    <Box width={480}>
      <Spacer {...props}>
        {['react', 'react-component', 'react-mixin', 'joyride', 'walkthroughs', 'tour'].map(tag => (
          <Chip key={tag}>{tag}</Chip>
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
    gap: 'xxs',
  },
  render: props => (
    <Spacer {...props}>
      <Input name="name" placeholder="Type your name" width={200} />
      <Button shape="round">
        <Icon name="check" />
      </Button>
    </Spacer>
  ),
};
