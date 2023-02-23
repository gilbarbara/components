/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Box, Button, ButtonUnstyled, Icon, Paragraph, Spacer } from 'src';
import { Tooltip } from 'src/Tooltip';

import {
  colorProps,
  hideNoControlsWarning,
  hideProps,
  hideTable,
  textOptionsProps,
} from '../__helpers__';

type Story = StoryObj<typeof Tooltip>;

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    ...Tooltip.defaultProps,
    content: 'The quick brown fox jumps over the lazy dog',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
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
    children: <Icon name="shape-rhombus" size={24} title={null} />,
  },
  argTypes: {
    children: hideTable(),
  },
};

export const Popconfirm: Story = {
  parameters: {
    controls: hideNoControlsWarning(),
  },
  render: () => {
    const [isOpen, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(!isOpen);
    };

    return (
      <Tooltip
        ariaLabel="Delete"
        content={
          <Box open={isOpen} padding="sm">
            <Paragraph mb="md">Are you sure you want to delete this?</Paragraph>
            <Spacer distribution="end" gap="sm">
              <Button invert onClick={handleClick} size="sm" variant="black">
                Cancel
              </Button>
              <Button onClick={handleClick} size="sm" variant="red">
                Delete
              </Button>
            </Spacer>
          </Box>
        }
        open={isOpen}
        position="top"
        radius="md"
        shadow="low"
        variant="white"
      >
        <ButtonUnstyled onClick={handleClick}>
          <Icon name="trash" size={24} title={null} />
        </ButtonUnstyled>
      </Tooltip>
    );
  },
};

export const Positions: Story = {
  args: {
    content: undefined,
  },
  parameters: {
    controls: hideNoControlsWarning(),
  },
  render: () => (
    <Spacer direction="vertical" gap="xxl" grow minWidth={480}>
      <Box display="flex" justify="space-between">
        <Tooltip
          align="start"
          content="Its me. I am a leftist with large text. Get it?"
          position="top"
          size="large"
        >
          <Button size="sm">Top Start</Button>
        </Tooltip>

        <Tooltip
          align="middle"
          content="I continue in single line unless you specify a size"
          position="top"
        >
          <Button size="sm">Top</Button>
        </Tooltip>

        <Tooltip align="end" content="Emoji? No problem 😎" position="top">
          <Button size="sm">Top End</Button>
        </Tooltip>
      </Box>
      <Box display="flex" justify="space-between">
        <Tooltip
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
          content="I'm using a medium wrap and regular size text. Use me for slightly longer messages"
          position="right"
          size="regular"
          wrap="md"
        >
          <Button size="sm">Right</Button>
        </Tooltip>
      </Box>
      <Box display="flex" justify="space-between">
        <Tooltip align="start" content="I am in the bottom left" position="bottom">
          <Button size="sm">Bottom Start</Button>
        </Tooltip>

        <Tooltip align="middle" content="I have a small wrap" position="bottom" wrap="sm">
          <Button size="sm">Bottom</Button>
        </Tooltip>

        <Tooltip align="end" content="Look, its me at the bottom right" position="bottom">
          <Button size="sm">Bottom End</Button>
        </Tooltip>
      </Box>
    </Spacer>
  ),
};
