import { ComponentMeta } from '@storybook/react';
import { Box, Button, H2, Icon, Input } from 'src';
import { Spacer, SpacerProps } from 'src/Spacer';

import {
  disableControl,
  flexItemProps,
  hideProps,
  layoutProps,
  spacingProps,
} from '../__helpers__';

export default {
  title: 'Components/Spacer',
  component: Spacer,
  args: Spacer.defaultProps,
  argTypes: {
    ...hideProps(),
    ...flexItemProps(),
    ...layoutProps({ display: 'flex' }),
    ...spacingProps(),
    children: disableControl(),
  },
} as ComponentMeta<typeof Spacer>;

export const Basic = (props: SpacerProps) => (
  <Box padding="xl" shadow="high" width={600}>
    <Spacer {...props}>
      <Button size="sm">Yes, add it</Button>
      <Button invert size="sm">
        No, cancel
      </Button>
    </Spacer>
  </Box>
);

export const Vertical = (props: SpacerProps) => (
  <Box padding="xl" shadow="high" width={600}>
    <Spacer {...props} direction="vertical" gap="xl">
      <Button size="sm">Yes, add it</Button>
      <Button size="sm" variant="orange">
        Maybe?
      </Button>
      <Button invert size="sm" variant="red">
        No, cancel
      </Button>
    </Spacer>
  </Box>
);

Vertical.argTypes = {
  direction: disableControl(),
  gap: disableControl(),
};

export const WithDifferentHeights = (props: SpacerProps) => (
  <Box padding="xl" shadow="high" width={600}>
    <Spacer {...props}>
      <H2 mb={0}>My Big Title</H2>
      <Box data-flex="1">
        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
        there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the
        Semantics, a large language ocean.
      </Box>
    </Spacer>
  </Box>
);

export const WithInput = (props: SpacerProps) => (
  <Box padding="xl" shadow="high" width={600}>
    <Spacer {...props}>
      <Input name="name" placeholder="Type your name" width={200} />
      <Button shape="round">
        <Icon name="check" size={24} />
      </Button>
    </Spacer>
  </Box>
);

WithInput.args = {
  distribution: 'center',
};
