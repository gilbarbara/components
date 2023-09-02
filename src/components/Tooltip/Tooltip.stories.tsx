import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Box, Button, ButtonUnstyled, Icon, Paragraph, Spacer } from '~';

import {
  colorProps,
  disableControl,
  hideNoControlsWarning,
  hideProps,
  hideTable,
  radiusProps,
  textOptionsProps,
} from '~/stories/__helpers__';

import { defaultProps, Tooltip } from './Tooltip';

type Story = StoryObj<typeof Tooltip>;

export default {
  title: 'Popups/Tooltip',
  component: Tooltip,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
    ...radiusProps(),
    ...textOptionsProps(),
    content: { control: 'text' },
  },
  parameters: {
    justify: 'center',
    minHeight: 200,
  },
} satisfies Meta<typeof Tooltip>;

export const Basic: Story = {
  args: {
    children: <Icon name="diamond" size={24} title={null} />,
    content: 'The quick brown fox jumps over the lazy dog',
  },
  argTypes: {
    children: hideTable(),
  },
};

export const Popconfirm: Story = {
  parameters: {
    controls: hideNoControlsWarning(),
  },
  render: function Render() {
    const [isOpen, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(!isOpen);
    };

    return (
      <Tooltip
        ariaLabel="Delete"
        bg="white"
        content={
          <Box open={isOpen} padding="sm">
            <Paragraph mb="md">Are you sure you want to delete this?</Paragraph>
            <Spacer distribution="end" gap="sm">
              <Button bg="black" invert onClick={handleClick} size="sm">
                Cancel
              </Button>
              <Button bg="red" onClick={handleClick} size="sm">
                Delete
              </Button>
            </Spacer>
          </Box>
        }
        open={isOpen}
        position="top"
        radius="md"
        shadow="low"
      >
        <ButtonUnstyled onClick={handleClick}>
          <Icon name="trash" size={24} title={null} />
        </ButtonUnstyled>
      </Tooltip>
    );
  },
};

export const Positions: Story = {
  argTypes: {
    align: disableControl(),
    content: disableControl(),
    position: disableControl(),
    size: disableControl(),
    wrap: disableControl(),
  },
  render: props => (
    <Spacer direction="vertical" gap="xxl" grow minWidth={480}>
      <Box display="flex" justify="space-between">
        <Tooltip
          {...props}
          align="start"
          content="Its me. I am a leftist with large text. Get it?"
          position="top"
          size="large"
        >
          <Button size="sm">Top Start</Button>
        </Tooltip>

        <Tooltip
          {...props}
          align="middle"
          content="I continue in single line unless you specify a size"
          position="top"
        >
          <Button size="sm">Top</Button>
        </Tooltip>

        <Tooltip {...props} align="end" content="Emoji? No problem 😎" position="top">
          <Button size="sm">Top End</Button>
        </Tooltip>
      </Box>
      <Box display="flex" justify="space-between">
        <Tooltip
          {...props}
          content={
            <Paragraph>
              I'm a tooltip with <b>wrap="lg"</b> and a Paragraph. I am who I am from my head to my
              toes. I tend to get loud when speaking my mind. Even a little crazy some of the time.
            </Paragraph>
          }
          position="left"
          wrap="lg"
        >
          <Button size="sm">Left</Button>
        </Tooltip>
        <Tooltip
          {...props}
          content="I'm using a medium wrap and regular size text. Use me for slightly longer messages"
          position="right"
          size="regular"
          wrap="md"
        >
          <Button size="sm">Right</Button>
        </Tooltip>
      </Box>
      <Box display="flex" justify="space-between">
        <Tooltip {...props} align="start" content="I am in the bottom left" position="bottom">
          <Button size="sm">Bottom Start</Button>
        </Tooltip>

        <Tooltip
          {...props}
          align="middle"
          content="I have a small wrap"
          position="bottom"
          wrap="sm"
        >
          <Button size="sm">Bottom</Button>
        </Tooltip>

        <Tooltip
          {...props}
          align="end"
          content="Look, its me at the bottom right"
          position="bottom"
        >
          <Button size="sm">Bottom End</Button>
        </Tooltip>
      </Box>
    </Spacer>
  ),
};
