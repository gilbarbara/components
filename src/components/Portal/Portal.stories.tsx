import { useState } from 'react';
import { sleep } from '@gilbarbara/helpers';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, screen, userEvent, waitFor, within } from '@storybook/test';

import { Box, Button, PortalProps } from '~';

import { colorProps, disableControl, hideProps } from '~/stories/__helpers__';

import { defaultProps, Portal } from './Portal';

type Story = StoryObj<typeof Portal>;

export default {
  title: 'Components/Portal',
  // category: 'Popups',
  component: Portal,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg']),
    children: disableControl(),
    isOpen: disableControl(),
  },
} satisfies Meta<typeof Portal>;

function Component(props: PortalProps) {
  const { onClose } = props;
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(previousState => !previousState);
  };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <>
      <Button data-testid="OpenModal" onClick={handleClick} size="sm">
        Open Portal
      </Button>
      <Portal {...props} isOpen={isOpen} onClose={handleClose}>
        <Box bg="white" minWidth={290} p="xxl" textAlign="center">
          Portal content
        </Box>
      </Portal>
    </>
  );
}

export const Basic: Story = {
  render: props => Component(props),
};

export const Customized: Story = {
  args: {
    animationEnterDuration: 1,
    animationExitDuration: 0.2,
    bg: 'red',
    overlayBlur: true,
    overlayBlurAmount: '4px',
    overlayOpacity: 0.5,
  },
  parameters: {
    padding: 0,
  },
  render: props => {
    return (
      <div
        style={{
          backgroundColor: '#fff',
          backgroundImage:
            'linear-gradient(135deg, #999 25%, transparent 25%), linear-gradient(225deg, #999 25%, transparent 25%), linear-gradient(45deg, #999 25%, transparent 25%), linear-gradient(315deg, #999 25%, #e5e5f7 25%)',
          backgroundSize: '20px 20px',
          backgroundPosition: '10px 0, 10px 0, 0 0, 0 0',
          backgroundRepeat: 'repeat',
          display: 'flex',
          placeItems: 'center',
          placeContent: 'center',
          height: '100vh',
          opacity: 0.8,
          width: '100vw',
        }}
      >
        <Component {...props} />
      </div>
    );
  },
};

export const WithCloseButton: Story = {
  args: {
    disableAnimation: true,
    disableCloseOnClickOverlay: true,
    disableCloseOnEsc: true,
    showCloseButton: true,
  },
  render: props => Component(props),
};

export const TestsBasic: Story = {
  // tags: ['!dev', '!autodocs'],
  args: {
    onClose: fn(),
    onOpen: fn(),
  },
  render: props => Component(props),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await fireEvent.click(canvas.getByTestId('OpenModal'));

    await waitFor(() => {
      expect(args.onOpen).toHaveBeenCalledTimes(1);
    });

    await sleep(0.2);

    await expect(screen.getByTestId('PortalContent')).toBeInTheDocument();
    await expect(screen.getByTestId('PortalOverlay')).toHaveStyle('opacity: 1');
    await expect(screen.getByTestId('PortalOverlay')).not.toHaveStyle('backdrop-filter: blur(8px)');
    await expect(screen.queryByTestId('PortalCloseButton')).not.toBeInTheDocument();

    await fireEvent.click(screen.getByTestId('PortalOverlay'));

    await waitFor(() => {
      expect(args.onClose).toHaveBeenCalledTimes(1);
    });

    await expect(screen.queryByTestId('PortalOverlay')).not.toBeInTheDocument();
    await expect(screen.queryByTestId('PortalContent')).not.toBeInTheDocument();
  },
};

export const TestsWithBlur: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    onClose: fn(),
    onOpen: fn(),
    ...Customized.args,
  },
  parameters: Customized.parameters,
  render: Customized.render,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await fireEvent.click(canvas.getByTestId('OpenModal'));

    await expect(args.onOpen).toHaveBeenCalledTimes(1);

    await screen.findByTestId('Portal');

    await expect(screen.getByTestId('PortalOverlay')).toHaveStyle('backdrop-filter: blur(4px)');
    await expect(screen.queryByTestId('PortalCloseButton')).not.toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(args.onClose).toHaveBeenCalledTimes(1);
    });

    await expect(screen.queryByTestId('PortalOverlay')).not.toBeInTheDocument();
    await expect(screen.queryByTestId('PortalContent')).not.toBeInTheDocument();
  },
};

export const TestsWithCloseButtonAndNoAnimation: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    onClose: fn(),
    onOpen: fn(),
    ...WithCloseButton.args,
  },
  render: WithCloseButton.render,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await fireEvent.click(canvas.getByTestId('OpenModal'));

    await expect(args.onOpen).toHaveBeenCalledTimes(1);

    await screen.findByTestId('Portal');

    await expect(screen.getByTestId('PortalOverlay')).not.toHaveStyle('transition: opacity 0.5s');
    await expect(screen.getByTestId('PortalCloseButton')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await expect(args.onClose).toHaveBeenCalledTimes(0);

    await fireEvent.click(screen.getByTestId('PortalOverlay'));
    await expect(args.onClose).toHaveBeenCalledTimes(0);

    await fireEvent.click(screen.getByTestId('PortalCloseButton'));
    await expect(args.onClose).toHaveBeenCalledTimes(1);

    await expect(screen.queryByTestId('PortalOverlay')).not.toBeInTheDocument();
    await expect(screen.queryByTestId('PortalContent')).not.toBeInTheDocument();
  },
};
