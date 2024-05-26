import { Meta, StoryObj } from '@storybook/react';

import {
  addChromaticModes,
  colorProps,
  disableControl,
  hideProps,
  marginProps,
} from '~/stories/__helpers__';

import { defaultProps, ProgressBar } from './ProgressBar';

type Story = StoryObj<typeof ProgressBar>;

export default {
  title: 'Feedback/ProgressBar',
  component: ProgressBar,
  args: {
    ...defaultProps,
    step: 1,
    steps: 4,
    width: 400,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent', 'backgroundColor']),
    ...marginProps(),
  },
  parameters: {
    ...addChromaticModes('desktop_light', 'desktop_dark'),
  },
} satisfies Meta<typeof ProgressBar>;

export const Basic: Story = {};

export const Sizes: Story = {
  argTypes: {
    size: disableControl(),
  },
  render: props => (
    <>
      <ProgressBar {...props} size="sm" />
      <br />
      <ProgressBar {...props} size="md" />
      <br />
      <ProgressBar {...props} size="lg" />
    </>
  ),
};
