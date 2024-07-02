import { Meta, StoryObj } from '@storybook/react';

import { Box, Grid, H3 } from '~';

import { colorProps, disableControl, hideProps } from '~/stories/__helpers__';

import { defaultProps, Loader } from './Loader';

type Story = StoryObj<typeof Loader>;

export default {
  title: 'Feedback/Loader',
  component: Loader,
  args: {
    ...defaultProps,
    size: 128,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    label: { control: 'text' },
  },
} satisfies Meta<typeof Loader>;

export const Basic: Story = {
  args: {
    type: 'pill',
  },
};

export const Types: Story = {
  args: {
    size: 128,
  },
  argTypes: {
    size: disableControl(),
    type: disableControl(),
  },
  render: ({ size, ...props }) => (
    <Grid alignItems="center" gap={60} templateColumns="repeat(3, 1fr)">
      <Box>
        <Box align="center" flexBox height={128} width={128}>
          <Loader {...props} size={128} type="pill" />
        </Box>
        <H3 align="center" mt="xs">
          Pill
        </H3>
      </Box>
      <Box>
        <Loader {...props} size={128} type="grow" />
        <H3 align="center" mt="xs">
          Grow
        </H3>
      </Box>
      <Box>
        <Loader {...props} size={128} type="pride" />
        <H3 align="center" mt="xs">
          Pride
        </H3>
      </Box>
      <Box>
        <Loader {...props} size={128} type="pulse" />
        <H3 align="center" mt="xs">
          Pulse
        </H3>
      </Box>
      <Box>
        <Loader {...props} size={128} type="rotate" />
        <H3 align="center" mt="xs">
          Rotate
        </H3>
      </Box>
    </Grid>
  ),
};

export const WithLabel: Story = {
  args: {
    label: 'Loading...',
    labelPosition: 'middle',
    type: 'rotate',
  },
};
