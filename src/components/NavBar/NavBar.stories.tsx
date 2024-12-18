import { MouseEvent } from 'react';
import { sleep } from '@gilbarbara/helpers';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import {
  expect,
  fireEvent,
  fn,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@storybook/test';

import { Anchor, Button, Flex, Icon } from '~';

import { scrollTo } from '~/modules/animations';

import { colorProps, hideProps } from '~/stories/__helpers__';
import Content from '~/stories/components/Content';

import { NavBar, NavBarContent, NavBarMenu, NavBarMenuToggle } from './index';
import { defaultProps } from './useNavBar';

type Story = StoryObj<typeof NavBar>;

export default {
  title: 'Components/NavBar',
  // category: 'Content',
  component: NavBar,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
  },
  parameters: {
    align: 'start',
    padding: 0,
    maxWidth: 'none',
  },
} satisfies Meta<typeof NavBar>;

const links = ['Dashboard', 'About Us', 'News', 'Contact'];

function handleClick(event: MouseEvent) {
  event.preventDefault();

  action('click')(event.currentTarget.textContent);
}

export const Basic: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'none',
    },
  },
  render: function Render(props) {
    return (
      <>
        <NavBar {...props}>
          <NavBarContent>
            <NavBarMenuToggle hideBreakpoint="md" />
            <Flex gap="xs">
              <Icon name="storybook" />
              Storybook
            </Flex>
          </NavBarContent>
          <NavBarContent justify="center" showBreakpoint="md">
            {links.map(d => (
              <Flex key={d}>
                <Anchor bold={d === 'Dashboard'} href="#" onClick={handleClick}>
                  {d}
                </Anchor>
              </Flex>
            ))}
          </NavBarContent>
          <NavBarContent justify="end">
            <Button onClick={handleClick} size="sm">
              Sign up
            </Button>
          </NavBarContent>
          <NavBarMenu gap="md">
            {links.map(d => (
              <div key={d} data-testid="NavBarMenuItem">
                <Anchor bold={d === 'Dashboard'} href="#" onClick={handleClick}>
                  {d}
                </Anchor>
              </div>
            ))}
          </NavBarMenu>
        </NavBar>
        <Content p="md" />
      </>
    );
  },
};

export const SmallScreen: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  render: Basic.render,
};

export const BottomRight: Story = {
  args: {
    bg: 'primary',
    placement: 'bottom',
  },
  parameters: {
    viewport: {
      defaultViewport: 'none',
    },
  },
  render: function Render(props) {
    return (
      <>
        <NavBar {...props}>
          <NavBarContent>
            <Flex gap="xs">
              <Icon name="react" size={24} />
              React
            </Flex>
          </NavBarContent>
          <NavBarContent justify="center" showBreakpoint="md">
            {links.map(d => (
              <Flex key={d}>
                <Anchor bold={d === 'Dashboard'} color="white" href="#" onClick={handleClick}>
                  {d}
                </Anchor>
              </Flex>
            ))}
          </NavBarContent>
          <NavBarContent justify="end">
            <Button bg="secondary" onClick={handleClick} size="sm">
              Sign up
            </Button>
          </NavBarContent>
          <NavBarContent hideBreakpoint="md" justify="end" minWidth={100}>
            <NavBarMenuToggle />
          </NavBarContent>
          <NavBarMenu bg="secondary" origin="bottom" side="right">
            <Flex gap="xs" mb="md" size="xl">
              <Icon name="react" size={24} />
              React
            </Flex>
            <Flex direction="column" gap="xs">
              {links.map(d => (
                <div key={d} data-testid="NavBarMenuItem">
                  <Anchor
                    bold={d === 'Dashboard'}
                    color="white"
                    href="#"
                    lineHeight={1.4}
                    onClick={handleClick}
                  >
                    {d}
                  </Anchor>
                </div>
              ))}
            </Flex>
          </NavBarMenu>
        </NavBar>
        <Content p="md" style={{ paddingBottom: 80 }} />
      </>
    );
  },
};

export const Tests: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    bg: 'pink.200',
    hideOnScroll: true,
    onToggleMenu: fn(),
    onScrollPosition: fn(),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  render: Basic.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('NavBar');

    // Scroll
    await expect(canvas.getByTestId('NavBar')).toHaveAttribute('data-hidden', 'false');

    await scrollTo(300);

    await waitFor(() => {
      expect(canvas.getByTestId('NavBar')).toHaveAttribute('data-hidden', 'true');
    });

    await scrollTo(-100);

    await waitFor(() => {
      expect(canvas.getByTestId('NavBar')).toHaveAttribute('data-hidden', 'false');
    });

    await expect(canvas.getByTestId('NavBarMenuToggle')).toHaveAttribute('data-open', 'false');

    await fireEvent.click(canvas.getByTestId('NavBarMenuToggle'));

    await waitFor(() => {
      expect(canvas.getByTestId('NavBarMenuToggle')).toHaveAttribute('data-open', 'true');
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('NavBarMenuItem')).toHaveLength(4);
    });

    await sleep(0.5);

    await fireEvent.click(canvas.getByTestId('NavBarMenuToggle'));

    await waitFor(() => {
      expect(canvas.getByTestId('NavBarMenuToggle')).toHaveAttribute('data-open', 'false');
    });

    await waitForElementToBeRemoved(() => screen.queryByTestId('NavBarMenu'));
  },
};
