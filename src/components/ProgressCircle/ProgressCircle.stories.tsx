import { useEffect, useState } from 'react';
import { capitalize } from '@gilbarbara/helpers';
import { Meta, StoryObj } from '@storybook/react';

import { Box, Grid, Paragraph } from '~';

import { sizes } from '~/modules/options';

import {
  addChromaticModes,
  colorProps,
  disableControl,
  hideProps,
  marginProps,
  VARIANTS,
} from '~/stories/__helpers__';

import { defaultProps, ProgressCircle } from './ProgressCircle';

type Story = StoryObj<typeof ProgressCircle>;

export default {
  title: 'Feedback/ProgressCircle',
  component: ProgressCircle,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent', 'backgroundColor']),
    ...marginProps(),
    size: { control: 'radio', options: sizes },
  },
  parameters: {
    ...addChromaticModes('desktop_light', 'desktop_dark'),
  },
} satisfies Meta<typeof ProgressCircle>;

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

    return <ProgressCircle {...props} value={value} />;
  },
};

export const WithValueFormatting: Story = {
  args: {
    accent: 'green',
    label: 'Speed',
    maxValue: 200,
    formatOptions: { style: 'unit', unit: 'kilometer' },
    size: 'lg',
    showValueLabel: true,
    strokeWidth: 4,
    value: 70,
  },
};

export const Sizes: Story = {
  argTypes: {
    size: disableControl(),
    value: disableControl(),
  },
  render: props => (
    <Grid gap={30} templateColumns="repeat(3, 1fr)">
      <ProgressCircle {...props} label="SM" size="sm" value={13} />
      <ProgressCircle {...props} label="MD" size="md" value={50} />
      <ProgressCircle {...props} label="LG" size="lg" value={75} />
    </Grid>
  ),
};

export const Colors: Story = {
  args: {
    value: 50,
  },
  argTypes: {
    accent: disableControl(),
  },
  render: props => (
    <Grid gap={30} templateColumns="repeat(4, 1fr)">
      {VARIANTS.map(d => (
        <ProgressCircle key={d} {...props} accent={d} label={capitalize(d)} />
      ))}
    </Grid>
  ),
};

export const Busy: Story = {
  args: {
    busy: true,
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
      <Paragraph bold size="lg">
        Available Space
      </Paragraph>
    ),
    showValueLabel: true,
    size: 192,
    strokeWidth: 5,
    textSize: 32,
    value: 72.5,
  },
  render: props => (
    <Box bg="red" color="white" flexBox justify="center" padding="xl" radius="xl">
      <ProgressCircle {...props} />
    </Box>
  ),
};
