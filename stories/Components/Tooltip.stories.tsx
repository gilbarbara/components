import { ComponentMeta } from '@storybook/react';
import { Button, Flex, Icon, Paragraph, Spacer } from 'src';
import { Tooltip, TooltipProps } from 'src/Tooltip';

import { colorProps, hideNoControlsWarning, hideProps } from '../__helpers__';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    align: 'middle',
    bold: false,
    content: 'The quick brown fox jumps over the lazy dog',
    position: 'bottom',
    shade: 'dark',
    size: 'mid',
    variant: 'gray',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    content: { control: 'text' },
    size: { control: 'select' },
  },
} as ComponentMeta<typeof Tooltip>;

export function Basic(props: TooltipProps) {
  return (
    <Tooltip {...props}>
      <Icon name="bullseye" size={24} title={null} />
    </Tooltip>
  );
}

export function Positions() {
  return (
    <Spacer direction="vertical" gap="xxl" grow minWidth={480}>
      <Flex justifyContent="space-between">
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
      </Flex>
      <Flex justifyContent="space-between">
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
      </Flex>
      <Flex justifyContent="space-between">
        <Tooltip align="start" content="I am in the bottom left" position="bottom">
          <Button size="sm">Bottom Start</Button>
        </Tooltip>

        <Tooltip align="middle" content="I have a small wrap" position="bottom" wrap="sm">
          <Button size="sm">Bottom</Button>
        </Tooltip>

        <Tooltip align="end" content="Look, its me at the bottom right" position="bottom">
          <Button size="sm">Bottom End</Button>
        </Tooltip>
      </Flex>
    </Spacer>
  );
}

Positions.args = {
  content: undefined,
};

Positions.parameters = {
  controls: hideNoControlsWarning(),
};
