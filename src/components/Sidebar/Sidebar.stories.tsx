import { useState } from 'react';
import { useSetState } from '@gilbarbara/hooks';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, screen, waitFor, within } from '@storybook/test';

import { Anchor, Box, Button, ButtonUnstyled, Flex, H1, H3, Icon, MenuToggle } from '~';

import {
  colorProps,
  dimensionProps,
  disableControl,
  hideProps,
  portalProps,
  positioningProps,
  spacingProps,
} from '~/stories/__helpers__';
import Content from '~/stories/components/Content';

import { defaultProps, Sidebar, SidebarProps } from './Sidebar';

type Story = StoryObj<typeof Sidebar>;

export default {
  title: 'Components/Sidebar',
  // category: 'Content',
  component: Sidebar,
  args: defaultProps,
  argTypes: {
    ...hideProps('isActive'),
    ...colorProps(['bg', 'color']),
    ...dimensionProps(),
    ...positioningProps(),
    ...portalProps(),
    ...spacingProps(),
    isOpen: disableControl(),
    width: { control: 'text' },
  },
  parameters: {
    layout: 'fullscreen',
    maxWidth: 'none',
    justify: 'space-between',
    padding: 0,
  },
} satisfies Meta<typeof Sidebar>;

function SidebarContent(props: SidebarProps & { hideButton?: boolean; onToggle: () => void }) {
  const { color, hideButton = false, onToggle, ...rest } = props;
  const links = ['Dashboard', 'About Us', 'News', 'Contact'];

  return (
    <Sidebar {...rest}>
      <Box mb="md">
        <Flex align="flex-start" justify="space-between">
          <H3>Sidebar</H3>
          {!hideButton && (
            <ButtonUnstyled data-testid="CloseSidebar" onClick={onToggle}>
              <Icon name="close-heavy" />
            </ButtonUnstyled>
          )}
        </Flex>
        {links.map(d => (
          <Anchor
            key={d}
            bold={d === 'Dashboard'}
            color={color}
            display="block"
            href="#"
            mb="xs"
            onClick={onToggle}
          >
            {d}
          </Anchor>
        ))}
      </Box>
    </Sidebar>
  );
}

export const Basic: Story = {
  render: function Render(props) {
    const { isOpen } = props;
    const [isActive, setActive] = useState(isOpen);

    const handleClickToggle = () => {
      setActive(!isActive);
    };

    const handleDismiss = () => {
      setActive(false);
    };

    return (
      <Box>
        <Flex align="center" height={64} justify="center" position="relative" textAlign="center">
          <H1 mb={0}>Sidebar Example</H1>
          <MenuToggle
            data-testid="ToggleSidebar"
            isOpen={isActive}
            left={16}
            onToggle={handleClickToggle}
            position="absolute"
            top={25}
          />
        </Flex>
        <Content p="md" />
        <SidebarContent
          {...props}
          isOpen={isActive}
          onDismiss={handleDismiss}
          onToggle={handleClickToggle}
        />
      </Box>
    );
  },
};

export const Sides: Story = {
  argTypes: {
    origin: disableControl(),
    side: disableControl(),
  },
  parameters: {
    align: 'stretch',
    direction: 'row',
    justify: 'space-between',
    minHeight: '100vh',
    padding: 'md',
  },
  name: 'Side/Origin',
  render: function Render(props) {
    const [
      {
        isOpenLeft,
        isOpenLeftBottom,
        isOpenLeftTop,
        isOpenRight,
        isOpenRightBottom,
        isOpenRightTop,
      },
      setOpen,
    ] = useSetState({
      isOpenLeft: false,
      isOpenLeftBottom: false,
      isOpenLeftTop: false,
      isOpenRight: false,
      isOpenRightBottom: false,
      isOpenRightTop: false,
    });

    const handleClickToggleLeft = () => {
      setOpen({ isOpenLeft: !isOpenLeft });
    };

    const handleClickToggleLeftTop = () => {
      setOpen({ isOpenLeftTop: !isOpenLeftTop });
    };

    const handleClickToggleLeftBottom = () => {
      setOpen({ isOpenLeftBottom: !isOpenLeftBottom });
    };

    const handleClickToggleRight = () => {
      setOpen({ isOpenRight: !isOpenRight });
    };

    const handleClickToggleRightTop = () => {
      setOpen({ isOpenRightTop: !isOpenRightTop });
    };

    const handleClickToggleRightBottom = () => {
      setOpen({ isOpenRightBottom: !isOpenRightBottom });
    };

    return (
      <>
        <Flex direction="column" justify="space-between">
          <Button onClick={handleClickToggleLeftTop} size="xs">
            LEFT TOP
          </Button>
          <SidebarContent
            {...props}
            isOpen={isOpenLeftTop}
            onDismiss={() => setOpen({ isOpenLeftTop: false })}
            onToggle={handleClickToggleLeftTop}
            origin="top"
          />

          <Button onClick={handleClickToggleLeft} size="xs">
            LEFT
          </Button>
          <SidebarContent
            {...props}
            isOpen={isOpenLeft}
            onDismiss={() => setOpen({ isOpenLeft: false })}
            onToggle={handleClickToggleLeft}
          />

          <Button onClick={handleClickToggleLeftBottom} size="xs">
            LEFT BOTTOM
          </Button>
          <SidebarContent
            {...props}
            isOpen={isOpenLeftBottom}
            onDismiss={() => setOpen({ isOpenLeftBottom: false })}
            onToggle={handleClickToggleLeftBottom}
            origin="bottom"
          />
        </Flex>

        <Flex direction="column" justify="space-between">
          <Button onClick={handleClickToggleRightTop} size="xs">
            RIGHT TOP
          </Button>
          <SidebarContent
            {...props}
            isOpen={isOpenRightTop}
            onDismiss={() => setOpen({ isOpenRightTop: false })}
            onToggle={handleClickToggleRightTop}
            origin="top"
            side="right"
          />

          <Button onClick={handleClickToggleRight} size="xs">
            RIGHT
          </Button>
          <SidebarContent
            {...props}
            isOpen={isOpenRight}
            onDismiss={() => setOpen({ isOpenRight: false })}
            onToggle={handleClickToggleRight}
            side="right"
          />

          <Button onClick={handleClickToggleRightBottom} size="xs">
            RIGHT BOTTOM
          </Button>
          <SidebarContent
            {...props}
            isOpen={isOpenRightBottom}
            onDismiss={() => setOpen({ isOpenRightBottom: false })}
            onToggle={handleClickToggleRightBottom}
            origin="bottom"
            side="right"
          />
        </Flex>
      </>
    );
  },
};

export const Customized: Story = {
  args: {
    bg: 'black',
    blurred: true,
    color: 'white',
    height: '40vh',
    hideOverlay: true,
    m: 'md',
    maxWidth: 200,
    opacity: 0.8,
    radius: 'md',
    shadow: 'high',
    top: 64,
  },
  render: Basic.render,
};

export const DisableAnimation: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    ...Customized.args,
    disableAnimation: true,
  },
  render: Basic.render,
};

export const Tests: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    ...Customized.args,
    onClose: fn(),
    onDismiss: fn(),
    onOpen: fn(),
  },
  render: Customized.render,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await fireEvent.click(canvas.getByTestId('ToggleSidebar'));

    await waitFor(() => {
      expect(args.onOpen).toHaveBeenCalledTimes(1);
    });

    await expect(screen.getByTestId('Sidebar')).toHaveAttribute('data-open', 'true');
    await expect(screen.getByTestId('Sidebar')).toHaveStyle('width: 200px;');

    await fireEvent.click(screen.getByTestId('CloseSidebar'));

    await waitFor(
      () => {
        expect(args.onClose).toHaveBeenCalledTimes(1);
      },
      { timeout: 2000 },
    );
  },
};

export const TestsRight: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    ...Customized.args,
    side: 'right',
    onClose: fn(),
    onDismiss: fn(),
    onOpen: fn(),
  },
  render: Customized.render,
  play: Tests.play,
};
