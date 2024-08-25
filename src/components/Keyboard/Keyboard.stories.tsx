import { Meta, StoryObj } from '@storybook/react';

import { Flex, Grid } from '~';

import { colorProps, disableControl, hideProps, radiusProps } from '~/stories/__helpers__';
import Code from '~/stories/components/Code';
import Description from '~/stories/components/Description';

import { defaultProps, Keyboard } from './Keyboard';
import { keyboardKeysMap } from './useKeyboard';

type Story = StoryObj<typeof Keyboard>;

export default {
  title: 'Components/Keyboard',
  // category: 'Content',
  component: Keyboard,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
    ...radiusProps(),
  },
} satisfies Meta<typeof Keyboard>;

export const Basic: Story = {
  args: {
    children: 'P',
    keys: ['command'],
  },
};

export const Keys: Story = {
  argTypes: {
    keys: disableControl(),
  },
  render: props => {
    return (
      <>
        <Flex gap="lg">
          <Keyboard {...props} keys={['command', 'shift']}>
            F
          </Keyboard>
          <Keyboard {...props} keys={['option', 'shift']}>
            4
          </Keyboard>
          <Keyboard {...props} keys={['control', 'shift', 'up']} />
        </Flex>
        <Description>
          The <Code>keys</Code> prop can be an array of keys or a single key.
          <Grid mt="sm" templateColumns="repeat(3, 1fr)">
            {Object.entries(keyboardKeysMap).map(([key, value]) => (
              <div key={key}>
                <code>{key}</code>: {value}
              </div>
            ))}
          </Grid>
        </Description>
      </>
    );
  },
};

export const TextOnly: Story = {
  args: {
    children: 'Q',
    keys: ['control', 'alt'],
    separator: '+',
    textOnly: true,
  },
};
