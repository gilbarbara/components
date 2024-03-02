import { MouseEvent, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';

import { ButtonUnstyled, Icon, Spacer } from '~';

import { sizesAll } from '~/modules/options';

import {
  colorProps,
  disableControl,
  hideProps,
  hideStoryFromDocsPage,
} from '~/stories/__helpers__';

import {
  ButtonSplit,
  ButtonSplitItem,
  ButtonSplitProps,
  ButtonSplitSeparator,
  defaultProps,
} from './ButtonSplit';

type Story = StoryObj<typeof ButtonSplit>;

export default {
  title: 'Buttons/ButtonSplit',
  component: ButtonSplit,
  args: {
    ...defaultProps,
    label: 'Send',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
    children: disableControl(),
    label: { control: 'text' },
    onClick: disableControl(),
    size: { control: 'radio', options: sizesAll },
  },
  parameters: {
    minHeight: 250,
  },
} satisfies Meta<typeof ButtonSplit>;

function ButtonSplitWrapper(props: ButtonSplitProps) {
  const [actionName, setActionName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget.dataset;

    action('onClick')(id);
  };

  const handleClickClosure = (closeMenu: () => void, name?: string) => {
    return () => {
      setLoading(true);

      if (name) {
        setActionName(name);
        action('onClick')(name);
      }

      setTimeout(() => {
        setActionName('');
        setLoading(false);
        closeMenu();
      }, 1500);
    };
  };

  return (
    <ButtonSplit
      {...props}
      dataAttributes={{
        'data-origin': 'X',
        'data-value': 10,
      }}
      onClick={handleClick}
    >
      <ButtonSplitItem disabled>
        <ButtonUnstyled color="primary">
          <Icon mr="xxs" name="plus-o" />
          Sign up
        </ButtonUnstyled>
      </ButtonSplitItem>
      <ButtonSplitItem disableAutoClose>
        {({ closeMenu }) => (
          <ButtonUnstyled
            color="primary"
            onClick={handleClickClosure(closeMenu, 'Schedule for later')}
          >
            <Icon mr="xxs" name="calendar-due" />
            Schedule for later
            {loading && actionName === 'Schedule for later' && (
              <Icon ml="xxs" name="spinner" spin />
            )}
          </ButtonUnstyled>
        )}
      </ButtonSplitItem>
      <ButtonSplitItem disableAutoClose>
        {({ closeMenu }) => (
          <ButtonUnstyled color="primary" onClick={handleClickClosure(closeMenu, 'Save draft')}>
            <Icon mr="xxs" name="bookmark" />
            Save draft
            {loading && actionName === 'Save draft' && <Icon ml="xxs" name="spinner" spin />}
          </ButtonUnstyled>
        )}
      </ButtonSplitItem>
      <ButtonSplitItem disableAutoClose>
        {({ closeMenu }) => (
          <ButtonUnstyled color="primary" onClick={handleClickClosure(closeMenu, 'Snooze')}>
            <Icon mr="xxs" name="clock" />
            Snooze
            {loading && actionName === 'Snooze' && <Icon ml="xxs" name="spinner" spin />}
          </ButtonUnstyled>
        )}
      </ButtonSplitItem>
      <ButtonSplitSeparator />
      <ButtonSplitItem color="red">
        {({ closeMenu }) => (
          <ButtonUnstyled color="red" onClick={handleClickClosure(closeMenu, 'Delete')}>
            <Icon mr="xxs" name="trash" />
            Delete
            {loading && actionName === 'Delete' && <Icon ml="xxs" name="spinner" spin />}
          </ButtonUnstyled>
        )}
      </ButtonSplitItem>
    </ButtonSplit>
  );
}

export const Basic: Story = {
  render: props => <ButtonSplitWrapper {...props} />,
};

export const Sizes: Story = {
  argTypes: {
    bg: disableControl(),
  },
  render: props => (
    <Spacer>
      <ButtonSplitWrapper {...props} bg="red" size="xs" />
      <ButtonSplitWrapper {...props} bg="green" size="sm" />
      <ButtonSplitWrapper {...props} bg="blue" size="md" />
      <ButtonSplitWrapper {...props} bg="purple" size="lg" />
    </Spacer>
  ),
};

export const Disabled: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  argTypes: {
    disabled: disableControl(),
  },
  render: props => <ButtonSplitWrapper {...props} disabled />,
};

export const Tests: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  args: {
    onClick: fn(),
    onToggle: fn(),
  },
  render: Basic.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('ButtonSplit');

    await expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');

    await userEvent.click(canvas.getByTestId('MenuButton'));
    await waitFor(() => {
      expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'open');
    });

    await userEvent.click(canvas.getByTestId('MenuButton'));
    await waitFor(() => {
      expect(canvas.getByTestId('MenuItems')).toHaveAttribute('data-state', 'closed');
    });
  },
};
