/* eslint-disable react-hooks/rules-of-hooks */
import { MouseEvent, useState } from 'react';
import { GenericFunction } from '@gilbarbara/types';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';

import { ButtonUnstyled, Icon } from 'src';
import {
  ButtonSplit,
  ButtonSplitDivider,
  ButtonSplitItem,
  ButtonSplitProps,
} from 'src/ButtonSplit';

import { colorProps, disableControl, hideProps } from '../__helpers__';

export default {
  title: 'Components/ButtonSplit',
  component: ButtonSplit,
  subcomponents: { ButtonSplitItem, ButtonSplitDivider },
  args: {
    ...ButtonSplit.defaultProps,
    label: 'Send',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    children: disableControl(),
    label: { control: 'text' },
    onClick: disableControl(),
  },
  parameters: {
    minHeight: 250,
  },
} as Meta<typeof ButtonSplit>;

export const Basic = {
  render: (props: ButtonSplitProps) => {
    const [actionName, setActionName] = useState('');
    const [loading, setLoading] = useState(false);

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      const { id } = event.currentTarget.dataset;

      action('onClick')(id);
    };

    const handleClickClosure = (closeMenu: GenericFunction, name?: string) => {
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
      <ButtonSplit {...props} onClick={handleClick}>
        <ButtonSplitItem>
          <ButtonUnstyled disabled variant="primary">
            <Icon mr="xxs" name="plus-o" />
            Sign up
          </ButtonUnstyled>
        </ButtonSplitItem>
        <ButtonSplitItem>
          {({ closeMenu }) => (
            <ButtonUnstyled
              onClick={handleClickClosure(closeMenu, 'Schedule for later')}
              variant="primary"
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
            <ButtonUnstyled onClick={handleClickClosure(closeMenu, 'Save draft')} variant="primary">
              <Icon mr="xxs" name="bookmark" />
              Save draft
              {loading && actionName === 'Save draft' && <Icon ml="xxs" name="spinner" spin />}
            </ButtonUnstyled>
          )}
        </ButtonSplitItem>
        <ButtonSplitItem>
          {({ closeMenu }) => (
            <ButtonUnstyled onClick={handleClickClosure(closeMenu, 'Snooze')} variant="primary">
              <Icon mr="xxs" name="time" />
              Snooze
              {loading && actionName === 'Snooze' && <Icon ml="xxs" name="spinner" spin />}
            </ButtonUnstyled>
          )}
        </ButtonSplitItem>
        <ButtonSplitDivider />
        <ButtonSplitItem shade="mid" variant="red">
          {({ closeMenu }) => (
            <ButtonUnstyled onClick={handleClickClosure(closeMenu, 'Delete')} variant="red">
              <Icon mr="xxs" name="trash" />
              Delete
              {loading && actionName === 'Delete' && <Icon ml="xxs" name="spinner" spin />}
            </ButtonUnstyled>
          )}
        </ButtonSplitItem>
      </ButtonSplit>
    );
  },
};
