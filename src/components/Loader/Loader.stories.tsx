import { Meta, StoryObj } from '@storybook/react';

import { Box, Flex, FlexCenter, Grid, H3 } from '~';

import { colorProps, disableControl, hideProps } from '~/stories/__helpers__';
import Code from '~/stories/components/Code';
import Description from '~/stories/components/Description';

import { defaultProps, Loader } from './Loader';

type Story = StoryObj<typeof Loader>;

export default {
  title: 'Components/Loader',
  // category: 'Feedback',
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
  render: props => (
    <>
      <FlexCenter height={128}>
        <Loader {...props} />
      </FlexCenter>
      <Description>
        You can change the the <Code>type</Code> props to render a different loader.
      </Description>
    </>
  ),
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
    <Grid align="center" gap={60} templateColumns="repeat(3, 1fr)">
      <Box>
        <Flex align="center" height={128} width={128}>
          <Loader {...props} size={128} type="pill" />
        </Flex>
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
