import { objectKeys } from '@gilbarbara/helpers';
import { Meta, StoryObj } from '@storybook/react';

import { Flex, Grid, Icon, Spacer } from '~';

import { colors } from '~/modules/theme';
import { disableControl, hideProps, marginProps, VARIANTS } from '~/stories/__helpers__';

import { defaultProps, StatusIndicator } from './StatusIndicator';

type Story = StoryObj<typeof StatusIndicator>;

export default {
  title: 'Components/StatusIndicator',
  // category: 'Feedback',
  component: StatusIndicator,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...marginProps(),
    color: { control: 'select', options: objectKeys(colors) },
  },
} satisfies Meta<typeof StatusIndicator>;

export const Basic: Story = {};

export const WithLabelAndIcon: Story = {
  name: 'With label and icon',
  args: {
    labelPosition: 'right',
    borderRatio: 0.9,
    tone: '500',
  },
  render: props => (
    <Spacer orientation="vertical">
      <StatusIndicator
        {...props}
        color="green.300"
        icon={<Icon color="white" name="check-o" />}
        label="Website"
      />
      <StatusIndicator
        {...props}
        color="orange.300"
        icon={<Icon color="white" name="info-o" />}
        label="API"
      />
      <StatusIndicator
        {...props}
        color="red.300"
        icon={<Icon color="white" name="danger-o" />}
        label="Cache"
      />
    </Spacer>
  ),
};

export const Colors: Story = {
  argTypes: {
    color: disableControl(),
  },
  render: props => (
    <Grid align="center" gap="lg" templateColumns="repeat(6, 1fr)">
      {VARIANTS.map(d => (
        <StatusIndicator key={d} {...props} color={d} label={d} />
      ))}
    </Grid>
  ),
};

export const Customized: Story = {
  args: {
    borderRatio: 1,
    color: 'white',
    gap: 'xs',
    icon: <Icon color="#ff0000" name="times-heavy" size={28} />,
    label: 'Infrastructure',
    size: 64,
    tone: '50',
  },
  render: props => (
    <Flex
      align="center"
      bg="red.500"
      color="white"
      height={160}
      justify="center"
      radius="xl"
      width={160}
    >
      <StatusIndicator {...props} />
    </Flex>
  ),
};
