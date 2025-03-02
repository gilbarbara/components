/* eslint-disable no-await-in-loop */
import { useRef, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, waitFor, within } from '@storybook/test';

import { Box, Button, Flex, FlyoutProps, H3, MenuToggle, Page, Paragraph } from '~';

import { disableControl, hideProps, layoutProps, spacingProps } from '~/stories/__helpers__';
import Code from '~/stories/components/Code';
import Description from '~/stories/components/Description';

import { defaultProps, Flyout } from './Flyout';

type Story = StoryObj<typeof Flyout>;

export default {
  title: 'Components/Flyout',
  // category: 'Animation',
  component: Flyout,
  args: {
    ...defaultProps,
    onHide: action('onHide'),
    onShow: action('onShow'),
  },
  argTypes: {
    ...hideProps(),
    ...spacingProps(),
    ...layoutProps(),
    children: { control: 'text' },
    open: disableControl(),
  },
} satisfies Meta<typeof Flyout>;

function FlyoutItem(props: FlyoutProps & { buttonText?: string; contentType?: 'short' | 'long' }) {
  const { buttonText, contentType = 'short', direction, placement } = props;
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const content =
    contentType === 'short' ? (
      <Box bg="primary.100" padding="md" radius="lg" w={240}>
        <Paragraph>
          <strong>Placement:</strong> {placement}
        </Paragraph>
        {direction && (
          <Paragraph>
            <strong>Direction:</strong> {direction}
          </Paragraph>
        )}
        <Flex mt="md">
          <Button onClick={() => setOpen(false)} size="sm" variant="bordered">
            Got it!
          </Button>
        </Flex>
      </Box>
    ) : (
      <Box bg="gray.700" color="white" padding="md" radius="lg" w={300}>
        <H3 mb="lg">Need More Details?</H3>
        <Paragraph>
          This panel slides in smoothly and adjusts its position based on available space. Use it
          for popovers or inline messages that don’t need to stay on screen permanently.
        </Paragraph>
        <Flex justify="end" mt="md">
          <Button bg="white" onClick={() => setOpen(false)} size="sm" variant="bordered">
            Got it!
          </Button>
        </Flex>
      </Box>
    );

  return (
    <Box position="relative">
      <Button ref={buttonRef} data-testid="ButtonFlyout" onClick={() => setOpen(!open)}>
        {buttonText ?? placement}
      </Button>
      <Flyout {...props} open={open} triggerRef={buttonRef}>
        {content}
      </Flyout>
    </Box>
  );
}

export const Basic: Story = {
  argTypes: {
    children: disableControl(),
  },
  render: props => {
    return (
      <Flex align="center" direction="column" justify="center">
        <FlyoutItem {...props} buttonText="Toogle" contentType="long" />

        <Description>
          If <Code>triggerRef</Code> is provided, the component may reposition itself automatically
          when there isn’t enough space for the preferred placement.
          <br />
          The <Code>direction</Code> prop controls only the animation movement and does not affect
          positioning.
        </Description>
      </Flex>
    );
  },
};

export const Types: Story = {
  argTypes: {
    animationType: disableControl(),
    children: disableControl(),
  },
  render: props => {
    return (
      <Flex align="center" justify="space-between" maxW={500} width="100%">
        <FlyoutItem {...props} animationType="grow" buttonText="Toogle Grow" contentType="long" />
        <FlyoutItem {...props} animationType="scale" buttonText="Toogle Scale" contentType="long" />
        <FlyoutItem {...props} animationType="slide" buttonText="Toogle Slide" contentType="long" />
      </Flex>
    );
  },
};

export const Sidebar: Story = {
  args: {
    distance: 0,
    placement: 'right',
  },
  argTypes: {
    direction: disableControl(),
    placement: disableControl(),
  },
  parameters: {
    maxWidth: '100%',
    minHeight: 400,
    padding: 0,
    layout: 'fullscreen',
  },
  render: function Render(props) {
    const [open, setOpen] = useState(false);

    return (
      <Page>
        <Flex>
          <Box bottom={0} left={0} position="absolute" top={0}>
            <Flyout {...props} open={open}>
              <Box bg="gray.100" height="100vh" p="md" shadow="high" width={290}>
                Inside the flyout you can put any content you want. Like this text, or even a form.
              </Box>
            </Flyout>
          </Box>
          <Box position="absolute" right={20} top={20}>
            <MenuToggle border={6} isOpen={open} onToggle={() => setOpen(!open)} size={32} />
          </Box>
          <Description mx="auto">
            You can control the <Code>Flyout</Code> component by using a shared state.
            <br />
            Just click the menu icon to open and close the sidebar.
          </Description>
        </Flex>
      </Page>
    );
  },
};

export const Positions: Story = {
  argTypes: {
    children: disableControl(),
    direction: disableControl(),
    initialSize: disableControl(),
    placement: disableControl(),
    triggerRef: disableControl(),
  },
  render: props => {
    return (
      <Flex direction="column" gap="xl" minWidth={480}>
        <Flex justify="space-between">
          <FlyoutItem {...props} placement="top-start" />
          <FlyoutItem {...props} placement="top" />
          <FlyoutItem {...props} placement="top-end" />
        </Flex>
        <Flex justify="space-between">
          <FlyoutItem {...props} placement="left-start" />
          <FlyoutItem {...props} placement="right-start" />
        </Flex>
        <Flex justify="space-between">
          <FlyoutItem {...props} placement="left" />
          <FlyoutItem {...props} placement="right" />
        </Flex>
        <Flex justify="space-between">
          <FlyoutItem {...props} placement="left-end" />
          <FlyoutItem {...props} placement="right-end" />
        </Flex>
        <Flex justify="space-between">
          <FlyoutItem {...props} placement="bottom-start" />
          <FlyoutItem {...props} placement="bottom" />
          <FlyoutItem {...props} placement="bottom-end" />
        </Flex>
      </Flex>
    );
  },
};

export const Tests: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    onShow: fn(),
    onHide: fn(),
  },
  argTypes: Positions.argTypes,
  render: Positions.render,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const transtions = await canvas.findAllByTestId('ButtonFlyout');

    // Adding a slight delay to prevent the test from running too fast in the UI
    await new Promise(requestAnimationFrame);

    for (const [index, transition] of transtions.entries()) {
      await fireEvent.click(transition);

      await expect(args.onShow).toHaveBeenNthCalledWith(index + 1);

      await fireEvent.click(transition);
      await waitFor(() => {
        expect(args.onHide).toHaveBeenNthCalledWith(index + 1);
      });
    }
  },
};
