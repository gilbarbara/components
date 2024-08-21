import { KeyboardEvent, MouseEvent, useState } from 'react';
import { objectKeys } from '@gilbarbara/helpers';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';

import { Anchor, Box, FlexInline, Grid, Icon, Paragraph, Spacer } from '~';

import {
  colorProps,
  COMPONENT_SIZES,
  disableControl,
  hideProps,
  VARIANTS,
} from '~/stories/__helpers__';
import { MenuItemProps } from '~/types/props';

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
    size: { control: 'radio', options: COMPONENT_SIZES },
  },
  parameters: {
    minHeight: 550,
    justify: 'center',
  },
} satisfies Meta<typeof ButtonSplit>;

function ButtonSplitWrapper(props: ButtonSplitProps) {
  const [actionName, setActionName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    action('onClick')(event.currentTarget.textContent);
  };

  const handleClickItem: MenuItemProps['onToggle'] = (event, closeMenu) => {
    const { name } = event.currentTarget.dataset;

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

  return (
    <ButtonSplit
      {...props}
      buttonProps={{
        'data-origin': 'X',
        'data-value': 10,
      }}
      onClick={handleClick}
    >
      <ButtonSplitItem disabled>
        <FlexInline color="primary">
          <Icon mr="xxs" name="plus-o" />
          Add recipient
        </FlexInline>
      </ButtonSplitItem>
      <ButtonSplitItem
        data-name="Schedule for later"
        disableAutoClose
        disabled={loading && actionName !== 'Schedule for later'}
        onToggle={handleClickItem}
      >
        <Icon mr="xxs" name="calendar-due" />
        Schedule for later
        {loading && actionName === 'Schedule for later' && <Icon ml="auto" name="spinner" spin />}
      </ButtonSplitItem>
      <ButtonSplitItem
        data-name="Save draft"
        disableAutoClose
        disabled={loading && actionName !== 'Save draft'}
        onToggle={handleClickItem}
      >
        <Icon mr="xxs" name="bookmark" />
        Save draft
        {loading && actionName === 'Save draft' && <Icon ml="auto" name="spinner" spin />}
      </ButtonSplitItem>
      <ButtonSplitItem>
        <Anchor color="black" href="#">
          <Icon mr="xxs" name="external" />
          Open in a new window
        </Anchor>
      </ButtonSplitItem>
      <ButtonSplitSeparator />
      <ButtonSplitItem
        bg="red"
        data-name="Delete"
        disableAutoClose
        disabled={loading && actionName !== 'Delete'}
        onToggle={handleClickItem}
      >
        <Icon mr="xxs" name="trash" />
        Delete
        {loading && actionName === 'Delete' && <Icon ml="auto" name="spinner" spin />}
      </ButtonSplitItem>
    </ButtonSplit>
  );
}

const descriptionsMap = {
  merge:
    'All commits from the source branch are added to the destination branch via a merge commit.',
  squash:
    'All commits from the source branch are added to the destination branch as a single commit.',
  rebase: 'All commits from the source branch are added to the destination branch individually.',
};

const labelsMap = {
  merge: 'Create a merge commit',
  squash: 'Squash and merge',
  rebase: 'Rebase and merge',
} as const;

type SelectorKeys = keyof typeof labelsMap;

function ButtonSplitSelector(props: {
  onClick: MenuItemProps['onToggle'];
  selected: SelectorKeys;
  type: string;
}) {
  const { onClick, selected, type } = props;

  return (
    <ButtonSplitItem
      bg="gray.100"
      data-title={labelsMap[selected]}
      data-type={selected}
      onToggle={onClick}
      wrap
    >
      <Box bg={type === selected ? 'gray.200' : undefined} padding="xs" radius="xs" width={290}>
        <Paragraph bold>{labelsMap[selected]}</Paragraph>
        <Paragraph mt="xxs" size="sm">
          {descriptionsMap[selected]}
        </Paragraph>
      </Box>
    </ButtonSplitItem>
  );
}

export const Basic: Story = {
  render: props => <ButtonSplitWrapper {...props} />,
};

export const Selector: Story = {
  args: {
    bg: 'gray.100',
    buttonProps: {
      bold: false,
    },
    size: 'sm',
  },
  render: function Render(props) {
    const [title, setTitle] = useState<string>(labelsMap.merge);
    const [type, setType] = useState('merge');

    const handleClickItem = (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
      const { title: dataTitle = '', type: dataType = '' } = event.currentTarget.dataset;

      setTitle(dataTitle);
      setType(dataType);
    };

    const handleClick = () => {
      action('onClick')(type);
    };

    return (
      <ButtonSplit {...props} label={title} onClick={handleClick}>
        {objectKeys(labelsMap).map(key => (
          <ButtonSplitSelector key={key} onClick={handleClickItem} selected={key} type={type} />
        ))}
      </ButtonSplit>
    );
  },
};

export const Sizes: Story = {
  argTypes: {
    size: disableControl(),
  },
  render: props => (
    <Spacer distribution="center" gap="lg">
      {COMPONENT_SIZES.map(size => (
        <ButtonSplitWrapper key={size} {...props} label={`Send (${size})`} size={size} />
      ))}
    </Spacer>
  ),
};

export const Colors: Story = {
  argTypes: {
    bg: disableControl(),
  },
  render: props => (
    <Grid gap="lg" templateColumns="repeat(3, 1fr)">
      {VARIANTS.map(d => (
        <ButtonSplitWrapper key={d} {...props} bg={d} label={d} />
      ))}
    </Grid>
  ),
};

export const Disabled: Story = {
  tags: ['!dev', '!autodocs'],
  argTypes: {
    disabled: disableControl(),
  },
  render: props => <ButtonSplitWrapper {...props} disabled />,
};

export const Tests: Story = {
  tags: ['!dev', '!autodocs'],
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
