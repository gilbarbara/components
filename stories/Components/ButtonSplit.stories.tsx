import * as React from 'react';
import { GenericFunction } from '@gilbarbara/types';
import { action } from '@storybook/addon-actions';
import { ComponentMeta } from '@storybook/react';

import { ButtonBase, Icon } from '../../src';
import {
  ButtonSplit,
  ButtonSplitDivider,
  ButtonSplitItem,
  ButtonSplitProps,
} from '../../src/ButtonSplit';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/ButtonSplit',
  component: ButtonSplit,
  subcomponents: { ButtonSplitItem, ButtonSplitDivider },
  argTypes: {
    ...hideProps(),
    block: { defaultValue: false },
    busy: { defaultValue: false },
    disabled: { control: 'boolean', defaultValue: false },
    label: { defaultValue: 'Send', control: 'text' },
    onClick: { action: 'onClick' },
    onToggle: { action: 'onToggle' },
    positionX: { defaultValue: 'right', control: 'inline-radio', options: ['left', 'right'] },
    positionY: { defaultValue: 'bottom', control: 'inline-radio', options: ['top', 'bottom'] },
    shade: { defaultValue: 'mid' },
    size: { defaultValue: 'md' },
    variant: { defaultValue: 'primary', control: 'select' },
  },
  parameters: {
    minHeight: 250,
  },
} as ComponentMeta<typeof ButtonSplit>;

export function Basic(props: ButtonSplitProps) {
  const [actionName, setActionName] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        <ButtonBase disabled variant="primary">
          <Icon mr="xxs" name="add" />
          Sign up
        </ButtonBase>
      </ButtonSplitItem>
      <ButtonSplitItem>
        {({ closeMenu }) => (
          <ButtonBase
            onClick={handleClickClosure(closeMenu, 'Schedule for later')}
            variant="primary"
          >
            <Icon mr="xxs" name="calendar-due" />
            Schedule for later
            {loading && actionName === 'Schedule for later' && (
              <Icon ml="xxs" name="spinner" spin />
            )}
          </ButtonBase>
        )}
      </ButtonSplitItem>
      <ButtonSplitItem>
        {({ closeMenu }) => (
          <ButtonBase onClick={handleClickClosure(closeMenu, 'Save draft')} variant="primary">
            <Icon mr="xxs" name="bookmark" />
            Save draft
            {loading && actionName === 'Save draft' && <Icon ml="xxs" name="spinner" spin />}
          </ButtonBase>
        )}
      </ButtonSplitItem>
      <ButtonSplitItem>
        {({ closeMenu }) => (
          <ButtonBase onClick={handleClickClosure(closeMenu, 'Snooze')} variant="primary">
            <Icon mr="xxs" name="time" />
            Snooze
            {loading && actionName === 'Snooze' && <Icon ml="xxs" name="spinner" spin />}
          </ButtonBase>
        )}
      </ButtonSplitItem>
      <ButtonSplitDivider />
      <ButtonSplitItem shade="mid" variant="red">
        {({ closeMenu }) => (
          <ButtonBase onClick={handleClickClosure(closeMenu, 'Delete')} variant="red">
            <Icon mr="xxs" name="trash" />
            Delete
            {loading && actionName === 'Delete' && <Icon ml="xxs" name="spinner" spin />}
          </ButtonBase>
        )}
      </ButtonSplitItem>
    </ButtonSplit>
  );
}
