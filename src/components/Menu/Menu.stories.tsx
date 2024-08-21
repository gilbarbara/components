import { KeyboardEvent, MouseEvent, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';

import { Avatar, Box, ButtonUnstyled, Icon, Paragraph } from '~';

import { colorProps, disableControl, hideProps, VARIANTS } from '~/stories/__helpers__';

import { Menu, MenuItem, MenuSeparator, MenuTitle } from './index';
import { defaultProps } from './useMenu';

type Story = StoryObj<typeof Menu>;

export default {
  title: 'Navigation/Menu',
  component: Menu,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    button: disableControl(),
    children: disableControl(),
  },
  parameters: {
    minHeight: 550,
    justify: 'center',
  },
} satisfies Meta<typeof Menu>;

const Toggle = styled.div<{ isOpen: boolean }>`
  & label {
    cursor: pointer;
    display: block;
    height: 30px;
    position: relative;
    width: 35px;
  }

  & span {
    border-bottom: 5px solid currentcolor;
    display: block;
    padding-top: 10px;
    transition-delay: 0.125s;

    &:before,
    &:after {
      border-top: 5px solid currentcolor;
      content: '';
      left: 0;
      position: absolute;
      right: 0;
      transform-origin: center;
      transition-delay: 0s;
    }

    &:before {
      top: 0;
    }

    &:after {
      bottom: 4px;
    }
  }

  & span,
  & span:before,
  & span:after {
    transition-duration: 0.25s;
    transition-property: transform, border-color;
    transition-timing-function: cubic-bezier(0.5, -0.5, 0.5, 1.5);
  }

  ${props =>
    props.isOpen &&
    css`
      & span {
        border-color: transparent;
        transition-delay: 0s;

        &:before,
        &:after {
          transition-delay: 0.125s;
        }

        &:before {
          transform: translateY(8px) rotate(135deg);
        }

        &:after {
          transform: translateY(-13px) rotate(-135deg);
        }
      }
    `};
`;

export const Basic: Story = {
  args: {
    button: <Avatar image="https://i.pravatar.cc/300?img=68" name="John Smith" size="sm" />,
  },
  render: props => {
    return (
      <Menu {...props}>
        <MenuTitle bg="gray.100">
          <Box>
            <Paragraph bold>John Smith</Paragraph>
            <Paragraph mt="xxs">Admin</Paragraph>
          </Box>
        </MenuTitle>
        <MenuItem onToggle={action('Profile')}>Profile</MenuItem>
        <MenuItem onToggle={action('Configuration')}>Configuration</MenuItem>
        <MenuSeparator margin={0} />
        <MenuTitle>Documentation</MenuTitle>
        <MenuItem accent="purple" onToggle={action('Help')}>
          Help
        </MenuItem>
        <MenuItem accent="green" onToggle={action('Guide')}>
          Usage Guide
        </MenuItem>
        <MenuSeparator />
        <MenuItem accent="red" onToggle={action('Logout')}>
          Logout
        </MenuItem>
      </Menu>
    );
  },
};

export const Horizontal: Story = {
  args: {
    accent: 'gray.100',
    bg: 'gray.50',
    minWidth: 192,
    orientation: 'horizontal',
  },
  render: function Render(props) {
    const [selectedColor, setColor] = useState('primary');

    const handleToggle = (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
      const { color = '' } = event.currentTarget.dataset;

      setColor(color);

      action('onClick')(color);
    };

    return (
      <Menu {...props} button={<Icon color={selectedColor} name="palette" size={32} />}>
        {VARIANTS.map(variant => (
          <MenuItem
            key={variant}
            accent="gray.200"
            data-color={variant}
            onToggle={handleToggle}
            p="xs"
          >
            <ButtonUnstyled bg={variant} height={32} width={32} />
          </MenuItem>
        ))}
      </Menu>
    );
  },
};

export const WithAnimatedButton: Story = {
  args: {
    button: isOpen => (
      <Toggle isOpen={isOpen}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label aria-label="Toggle Menu">
          <span />
        </label>
      </Toggle>
    ),
    position: 'bottom-left',
  },
  render: Basic.render,
};

export const WithHover: Story = {
  args: {
    button: (
      <>
        Create
        <Icon ml="xxs" name="chevron-right" title={null} />
      </>
    ),
    disableKeyboardNavigation: true,
    position: 'right-top',
    trigger: 'hover',
  },
  argTypes: {
    trigger: disableControl(),
  },
  render: props => (
    <Menu {...props}>
      <MenuItem onToggle={action('file')}>New File</MenuItem>
      <MenuItem onToggle={action('video')}>New Video</MenuItem>
      <MenuItem onToggle={action('audio')}>New Audio</MenuItem>
      <MenuItem disabled onToggle={action('presentation')}>
        New Presentation
      </MenuItem>
      <MenuSeparator />
      <MenuItem bg="blue" onToggle={action('directory')}>
        New Directory
      </MenuItem>
    </Menu>
  ),
};

export const TestMouseInteractions: Story = {
  tags: ['!dev', '!autodocs'],
  name: 'Test > Mouse',
  args: {
    onToggle: fn(),
  },
  render: WithHover.render,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('Menu');

    await expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');

    await step('Open the menu', async () => {
      await userEvent.click(canvas.getByTestId('MenuButton'));
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
      });
    });

    await step('Close the menu', async () => {
      await userEvent.click(canvas.getByTestId('MenuButton'));
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');
      });
    });

    await step('Open the menu again', async () => {
      await userEvent.click(canvas.getByTestId('MenuButton'));
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
      });
    });

    await step('Select the first item', async () => {
      await userEvent.click(canvas.getByText('New File'));
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');
      });
    });

    await step('Open the menu one more time', async () => {
      await userEvent.click(canvas.getByTestId('MenuButton'));
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
      });
    });

    await step('Click a disabled item', async () => {
      await userEvent.click(canvas.getByText('New Presentation'));
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
      });
    });

    await step('Close the menu by clicking outside', async () => {
      await userEvent.click(document.body);
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');
      });
    });
  },
};

export const TestKeyboardInteractions: Story = {
  tags: ['!dev', '!autodocs'],
  name: 'Test > Keyboard',
  args: {
    onToggle: fn(),
  },
  render: WithHover.render,
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('Menu');

    await expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');

    await step('Open the menu by typing Tab to the button and pressing Enter', async () => {
      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Enter}');
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
      });
      await expect(args.onToggle).toHaveBeenLastCalledWith(true);
    });

    await step('Close the menu by typing Escape', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');
      });
      await expect(args.onToggle).toHaveBeenLastCalledWith(false);
    });

    await step('Re-open the menu by typing Enter', async () => {
      await userEvent.keyboard('{Enter}');
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
      });
      await expect(args.onToggle).toHaveBeenLastCalledWith(true);
    });

    await step('Select the first item by typing ArrowDown and Enter', async () => {
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{Enter}');
      await waitFor(() => {
        expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');
      });
      await expect(args.onToggle).toHaveBeenLastCalledWith(false);
    });
  },
};

export const TestDisabledKeyboardAndBlur: Story = {
  tags: ['!dev', '!autodocs'],
  name: 'Test > Disabled Keyboard and Blur',
  args: {
    disableCloseOnBlur: true,
    disableKeyboardNavigation: true,
    onToggle: fn(),
  },
  render: WithHover.render,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('Menu');

    await expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');

    // Open the menu by tabbing to the button and pressing enter
    await userEvent.keyboard('{Tab}');
    await userEvent.keyboard('{Enter}');
    await waitFor(() => {
      expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');
    });
    await expect(args.onToggle).toHaveBeenCalledTimes(0);

    // Close the menu by typing escape
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');
    });
    await expect(args.onToggle).toHaveBeenCalledTimes(0);

    await userEvent.click(canvas.getByTestId('MenuButton'));
    await waitFor(() => {
      expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
    });

    await expect(args.onToggle).toHaveBeenCalledTimes(1);

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');
    await waitFor(() => {
      expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
    });
    await expect(args.onToggle).toHaveBeenCalledTimes(1);

    await userEvent.click(document.body);
    await waitFor(() => {
      expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
    });
    await expect(args.onToggle).toHaveBeenCalledTimes(1);
  },
};
