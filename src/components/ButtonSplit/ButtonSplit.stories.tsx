import { MouseEvent, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { ButtonUnstyled, Icon, Spacer } from '~';

import { sizesButton } from '~/modules/options';

import { colorProps, disableControl, hideProps } from '~/stories/__helpers__';

import {
  ButtonSplit,
  ButtonSplitDivider,
  ButtonSplitItem,
  ButtonSplitProps,
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
    size: { control: 'radio', options: sizesButton },
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
        action('onClickItem')(name);
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
      <ButtonSplitItem>
        <ButtonUnstyled color="primary" disabled>
          <Icon mr="xxs" name="plus-o" />
          Sign up
        </ButtonUnstyled>
      </ButtonSplitItem>
      <ButtonSplitItem>
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
      <ButtonSplitItem>
        {({ closeMenu }) => (
          <ButtonUnstyled color="primary" onClick={handleClickClosure(closeMenu, 'Save draft')}>
            <Icon mr="xxs" name="bookmark" />
            Save draft
            {loading && actionName === 'Save draft' && <Icon ml="xxs" name="spinner" spin />}
          </ButtonUnstyled>
        )}
      </ButtonSplitItem>
      <ButtonSplitItem>
        {({ closeMenu }) => (
          <ButtonUnstyled color="primary" onClick={handleClickClosure(closeMenu, 'Snooze')}>
            <Icon mr="xxs" name="clock" />
            Snooze
            {loading && actionName === 'Snooze' && <Icon ml="xxs" name="spinner" spin />}
          </ButtonUnstyled>
        )}
      </ButtonSplitItem>
      <ButtonSplitDivider />
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
  render: props => (
    <Spacer>
      <ButtonSplitWrapper {...props} size="xs" />
      <ButtonSplitWrapper {...props} size="sm" />
      <ButtonSplitWrapper {...props} size="md" />
      <ButtonSplitWrapper {...props} size="lg" />
    </Spacer>
  ),
};
