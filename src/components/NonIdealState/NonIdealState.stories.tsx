import { Meta, StoryObj } from '@storybook/react';

import {
  colorProps,
  disableControl,
  flexItemProps,
  hideProps,
  layoutProps,
  radiusProps,
  spacingProps,
} from '~/stories/__helpers__';

import { defaultProps, NonIdealState } from './NonIdealState';

import { Box } from '../..';

type Story = StoryObj<typeof NonIdealState>;

export default {
  title: 'Feedback/NonIdealState',
  component: NonIdealState,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
    ...flexItemProps(),
    ...layoutProps(),
    ...radiusProps(),
    ...spacingProps(),
    children: { control: 'text' },
    description: { control: 'text' },
    title: { control: 'text' },
    type: { control: 'select' },
  },
} satisfies Meta<typeof NonIdealState>;

export const Basic: Story = {};

export const Sizes: Story = {
  args: {
    icon: 'size',
  },
  argTypes: {
    size: disableControl(),
  },
  render: function Render(props) {
    return (
      <Box>
        <NonIdealState {...props} description="The smallest size" size="sm" title="sm" />
        <NonIdealState {...props} description="The medium size" size="md" title="md (default)" />
        <NonIdealState {...props} description="The larger size" size="lg" title="lg" />
      </Box>
    );
  },
};

export const Types: Story = {
  args: {
    direction: 'horizontal',
  },
  argTypes: {
    type: disableControl(),
  },
  render: function Render(props) {
    return (
      <Box>
        <NonIdealState {...props} title="error" type="error" />
        <NonIdealState {...props} title="no-results" type="no-results" />
        <NonIdealState {...props} title="not-found (default)" type="not-found" />
        <NonIdealState {...props} title="offline" type="offline" />
      </Box>
    );
  },
};
