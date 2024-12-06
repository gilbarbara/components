import { useState } from 'react';
import { sleep } from '@gilbarbara/helpers';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, screen, userEvent, waitFor, within } from '@storybook/test';

import { Box, Button, H3, Paragraph, PortalProps } from '~';

import { colorProps, disableControl, hideProps } from '~/stories/__helpers__';
import Code from '~/stories/components/Code';
import Description from '~/stories/components/Description';

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

function Component(props: PortalProps & { showDescription?: boolean }) {
  const { isOpen, onDismiss, showDescription = false, ...rest } = props;
  const [isActive, setActive] = useState(isOpen);

  const handleClick = () => {
    setActive(previousState => !previousState);
  };

  const handleDismiss = () => {
    setActive(false);
    onDismiss();
  };

  return (
    <>
      <Button data-testid="OpenModal" onClick={handleClick} size="sm">
        Open Portal
      </Button>
      {showDescription && (
        <Description maxWidth={480}>
          <Paragraph>
            The portal is a component that renders its children in a separate container in the DOM
            and can be used to create modals, popovers, and other overlays.
          </Paragraph>
          <Paragraph>
            You need to use the <Code>onDismiss</Code> callback to change the <Code>isOpen</Code>{' '}
            prop and/or prevent closing if required.
          </Paragraph>
        </Description>
      )}
      <Portal {...rest} isOpen={isActive} onDismiss={handleDismiss}>
        <Box
          bg="white"
          maxWidth={480}
          minWidth={290}
          p="xxl"
          radius="md"
          shadow="high"
          textAlign="center"
        >
          <H3>This is the content of the portal.</H3>
          <Paragraph>You can customize it any way you want.</Paragraph>
        </Box>
      </Portal>
    </>
  );
}

export const Basic: Story = {
  render: props => <Component {...props} showDescription />,
};

export const Customized: Story = {
  args: {
    animationEnterDuration: 1,
    animationExitDuration: 0.2,
    bg: 'red',
    overlayBlur: true,
    overlayBlurAmount: 4,
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
  render: Component,
};

export const Tests: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    onClose: fn(),
    onDismiss: fn(),
    onOpen: fn(),
  },
  render: props => Component(props),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await fireEvent.click(canvas.getByTestId('OpenModal'));

    await waitFor(() => {
      expect(args.onOpen).toHaveBeenCalledTimes(1);
    });

    await expect(screen.getByTestId('Portal')).toHaveAttribute('data-open', 'true');
    await expect(screen.getByTestId('PortalContent')).toBeInTheDocument();
    await expect(screen.getByTestId('PortalOverlay')).toHaveStyle('opacity: 1');
    await expect(screen.getByTestId('PortalOverlay')).not.toHaveStyle('backdrop-filter: blur(8px)');
    await expect(screen.queryByTestId('PortalCloseButton')).not.toBeInTheDocument();

    await fireEvent.click(screen.getByTestId('PortalOverlay'));

    await expect(args.onDismiss).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(args.onClose).toHaveBeenCalledTimes(1);
    });

    await expect(screen.queryByTestId('PortalOverlay')).not.toBeInTheDocument();
    await expect(screen.queryByTestId('PortalContent')).not.toBeInTheDocument();
  },
};

export const TestsWithContainerAndMultiplePortals: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    onClose: fn(),
    onDismiss: fn(),
    onOpen: fn(),
  },
  render: props => (
    <>
      <div id="portal-element" />
      <Component {...props} bottom="50vh" container="#portal-element" />
      <br />
      <Component {...props} container="#portal-element" top="50vh" />
    </>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await fireEvent.click(canvas.getAllByTestId('OpenModal')[0]);

    await waitFor(() => {
      expect(args.onOpen).toHaveBeenCalledTimes(1);
    });

    await fireEvent.click(canvas.getAllByTestId('OpenModal')[1]);

    await waitFor(() => {
      expect(args.onOpen).toHaveBeenCalledTimes(2);
    });

    await fireEvent.click(screen.getAllByTestId('PortalOverlay')[1]);

    await expect(args.onDismiss).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(args.onClose).toHaveBeenCalledTimes(1);
    });

    await fireEvent.click(screen.getAllByTestId('PortalOverlay')[0]);

    await expect(args.onDismiss).toHaveBeenCalledTimes(2);

    await waitFor(() => {
      expect(args.onClose).toHaveBeenCalledTimes(2);
    });
  },
};

export const TestsWithBlur: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    onClose: fn(),
    onDismiss: fn(),
    onOpen: fn(),
    ...Customized.args,
  },
  parameters: Customized.parameters,
  render: Customized.render,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await fireEvent.click(canvas.getByTestId('OpenModal'));

    await waitFor(
      () => {
        expect(args.onOpen).toHaveBeenCalledTimes(1);
      },
      { timeout: 1500 },
    );

    await expect(screen.getByTestId('PortalOverlay')).toHaveStyle('backdrop-filter: blur(4px)');
    await expect(screen.queryByTestId('PortalCloseButton')).not.toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    await expect(args.onDismiss).toHaveBeenCalledTimes(1);

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
    onDismiss: fn(),
    onOpen: fn(),
    ...WithCloseButton.args,
  },
  render: WithCloseButton.render,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await fireEvent.click(canvas.getByTestId('OpenModal'));

    await waitFor(() => {
      expect(args.onOpen).toHaveBeenCalledTimes(1);
    });

    await screen.findByTestId('Portal');

    await expect(screen.getByTestId('PortalOverlay')).not.toHaveStyle('transition: opacity 0.5s');
    await expect(screen.getByTestId('PortalCloseButton')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await expect(args.onClose).toHaveBeenCalledTimes(0);

    await fireEvent.click(screen.getByTestId('PortalOverlay'));
    await expect(args.onClose).toHaveBeenCalledTimes(0);

    await fireEvent.click(screen.getByTestId('PortalCloseButton'));

    await waitFor(() => {
      expect(args.onClose).toHaveBeenCalledTimes(1);
    });

    // Wait for the state changes to be reflected in the DOM.
    await sleep(0.1);

    await expect(screen.queryByTestId('PortalOverlay')).not.toBeInTheDocument();
    await expect(screen.queryByTestId('PortalContent')).not.toBeInTheDocument();
  },
};
