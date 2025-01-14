import { useEffect, useState } from 'react';
import { capitalize } from '@gilbarbara/helpers';
import { Meta, StoryObj } from '@storybook/react';

import { Box, H4, Spacer } from '~';

import { sizes } from '~/modules/options';
import {
  addChromaticModes,
  colorProps,
  disableControl,
  flexContent,
  hideProps,
  marginProps,
  VARIANTS,
} from '~/stories/__helpers__';

import { defaultProps, ProgressBar } from './ProgressBar';

type Story = StoryObj<typeof ProgressBar>;

export default {
  title: 'Components/ProgressBar',
  // category: 'Feedback',
  component: ProgressBar,
  args: {
    ...defaultProps,
    width: 400,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent', 'backgroundColor']),
    ...marginProps(),
    headerJustify: { control: 'select', options: ['', ...flexContent] },
    size: { control: 'radio', options: sizes },
  },
  parameters: {
    ...addChromaticModes('desktop_light', 'desktop_dark'),
  },
} satisfies Meta<typeof ProgressBar>;

export const Basic: Story = {
  args: {
    'aria-label': 'Loading...',
    value: 50,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Step 2 of 4',
    value: 50,
  },
};

export const WithValue: Story = {
  args: {
    accent: 'red',
    showValueLabel: true,
    headerJustify: 'center',
    value: 50,
  },
  render: function Render(props) {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue(v => (v >= 100 ? 0 : v + 10));
      }, 500);

      return () => clearInterval(interval);
    }, []);

    return <ProgressBar {...props} value={value} />;
  },
};

export const WithValueFormatting: Story = {
  args: {
    accent: 'green',
    label: 'Monthly Expenses',
    maxValue: 7000,
    formatOptions: { style: 'currency', currency: 'EUR' },
    showValueLabel: true,
    value: 4731,
  },
};

export const Sizes: Story = {
  argTypes: {
    size: disableControl(),
    value: disableControl(),
  },
  render: props => (
    <Spacer distribution="center" gap="lg" orientation="vertical">
      <ProgressBar {...props} label="sm" size="sm" value={13} />
      <ProgressBar {...props} label="md" size="md" value={50} />
      <ProgressBar {...props} label="lg" size="lg" value={75} />
    </Spacer>
  ),
};

export const Colors: Story = {
  args: {
    value: 70,
    width: 290,
  },
  argTypes: {
    accent: disableControl(),
  },
  render: props => (
    <Spacer distribution="center" gap="md">
      {VARIANTS.map(d => (
        <ProgressBar key={d} {...props} accent={d} label={capitalize(d)} />
      ))}
    </Spacer>
  ),
};

export const Busy: Story = {
  args: {
    busy: true,
    label: 'Loading...',
    headerJustify: 'center',
    headerPosition: 'bottom',
  },
  argTypes: {
    busy: disableControl(),
    value: disableControl(),
  },
};

export const Customized: Story = {
  args: {
    accent: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    label: (
      <H4 color="white" mb={0}>
        Current weight
      </H4>
    ),
    formatOptions: { style: 'unit', unit: 'kilogram' },
    headerPosition: 'bottom',
    maxValue: 180,
    showValueLabel: true,
    value: 112,
  },
  render: props => (
    <Box bg="red" color="white" padding="md" radius="md">
      <ProgressBar {...props} />
    </Box>
  ),
};
