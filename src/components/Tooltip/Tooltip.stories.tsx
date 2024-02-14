/* eslint-disable no-await-in-loop */
import { useState } from 'react';
import { sleep } from '@gilbarbara/helpers';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, waitFor, within } from '@storybook/test';

import { Box, Button, ButtonUnstyled, Icon, Paragraph, Spacer } from '~';

import {
  colorProps,
  disableControl,
  hideNoControlsWarning,
  hideProps,
  hideStoryFromDocsPage,
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
        placement="top-middle"
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
    content: disableControl(),
    placement: disableControl(),
    size: disableControl(),
    wrap: disableControl(),
  },
  render: props => (
    <Spacer direction="vertical" gap="xl" grow minWidth={480}>
      <Box display="flex" justify="space-between">
        <Tooltip
          {...props}
          content="placement: top-align — size: xs"
          placement="top-start"
          size="xs"
        >
          <Button size="sm">Top Start</Button>
        </Tooltip>

        <Tooltip
          {...props}
          content="placement: top-middle — size: regular"
          placement="top-middle"
          size="md"
        >
          <Button size="sm">Top</Button>
        </Tooltip>

        <Tooltip
          {...props}
          content="placement: top-end — size: large"
          placement="top-end"
          size="lg"
        >
          <Button size="sm">Top End</Button>
        </Tooltip>
      </Box>
      <Box display="flex" justify="space-between">
        <Tooltip {...props} content="placement: left-start" placement="left-start">
          <Button size="sm">Left Start</Button>
        </Tooltip>
        <Tooltip
          {...props}
          content="placement: right-start — size: xs — wrap: sm"
          placement="right-start"
          size="xs"
          wrap="sm"
        >
          <Button size="sm">Right Start</Button>
        </Tooltip>
      </Box>
      <Box display="flex" justify="space-between">
        <Tooltip
          {...props}
          content={
            <Paragraph>placement: right-middle — wrap: lg — using a Paragraph component.</Paragraph>
          }
          placement="left-middle"
          wrap="lg"
        >
          <Button size="sm">Left</Button>
        </Tooltip>
        <Tooltip
          {...props}
          content="placement: right-middle — size: regular — wrap: md"
          placement="right-middle"
          size="md"
          wrap="md"
        >
          <Button size="sm">Right</Button>
        </Tooltip>
      </Box>
      <Box display="flex" justify="space-between">
        <Tooltip {...props} content="placement: left-end" placement="left-end">
          <Button size="sm">Left End</Button>
        </Tooltip>
        <Tooltip {...props} content="placement: right-end" placement="right-end">
          <Button size="sm">Right End</Button>
        </Tooltip>
      </Box>
      <Box display="flex" justify="space-between">
        <Tooltip {...props} content="placement: bottom-start" placement="bottom-start">
          <Button size="sm">Bottom Start</Button>
        </Tooltip>

        <Tooltip {...props} content="placement: bottom-middle" placement="bottom-middle">
          <Button size="sm">Bottom</Button>
        </Tooltip>

        <Tooltip {...props} content="placement: bottom-end" placement="bottom-end">
          <Button size="sm">Bottom End</Button>
        </Tooltip>
      </Box>
    </Spacer>
  ),
};

export const Tests: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  argTypes: Positions.argTypes,
  render: Positions.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const tooltips = await canvas.findAllByTestId('Tooltip');

    await sleep(0.5);

    for (const tooltip of tooltips) {
      await fireEvent.mouseOver(tooltip);
      await expect(await canvas.findByTestId('TooltipBody')).toHaveTextContent(
        tooltip.getAttribute('aria-label') ?? '',
      );

      await fireEvent.mouseOut(tooltip);
      await waitFor(() => {
        expect(canvas.queryByTestId('TooltipBody')).not.toBeInTheDocument();
      });
    }
  },
};
