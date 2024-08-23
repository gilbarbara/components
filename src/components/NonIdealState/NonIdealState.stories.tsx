import { Meta, StoryObj } from '@storybook/react';

import { Spacer } from '~';

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

type Story = StoryObj<typeof NonIdealState>;

export default {
  title: 'Components/NonIdealState',
  // category: 'Feedback',
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

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
};

export const Sizes: Story = {
  args: {
    icon: 'size',
  },
  argTypes: {
    size: disableControl(),
  },
  render: function Render(props) {
    return (
      <Spacer distribution="center" gap="lg" orientation="vertical">
        <NonIdealState {...props} description="The smallest size" size="sm" title="sm" />
        <NonIdealState {...props} description="The medium size" size="md" title="md (default)" />
        <NonIdealState {...props} description="The larger size" size="lg" title="lg" />
      </Spacer>
    );
  },
};

export const Types: Story = {
  args: {
    orientation: 'horizontal',
  },
  argTypes: {
    type: disableControl(),
  },
  render: function Render(props) {
    return (
      <Spacer distribution="start" gap="lg" orientation="vertical">
        <NonIdealState {...props} title="error" type="error" />
        <NonIdealState {...props} title="no-results" type="no-results" />
        <NonIdealState {...props} title="not-found (default)" type="not-found" />
        <NonIdealState {...props} title="offline" type="offline" />
      </Spacer>
    );
  },
};
