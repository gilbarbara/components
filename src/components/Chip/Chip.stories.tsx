import { MouseEvent } from 'react';
import { useTheme } from '@emotion/react';
import { objectKeys } from '@gilbarbara/helpers';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { Grid, Icon, Spacer } from '~';

import { getTheme } from '~/modules/helpers';
import { textSizes } from '~/modules/options';

import {
  colorProps,
  dimensionProps,
  disableControl,
  flexItemProps,
  hideProps,
  radiusProps,
  spacingProps,
  textOptionsProps,
  TONES,
} from '~/stories/__helpers__';

import { Chip, defaultProps } from './Chip';

type Story = StoryObj<typeof Chip>;

export default {
  title: 'Feedback/Chip',
  component: Chip,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
    ...dimensionProps(),
    ...flexItemProps(),
    ...spacingProps(),
    ...radiusProps(),
    ...textOptionsProps(),
    children: { control: 'text' },
  },
} satisfies Meta<typeof Chip>;

export const Basic: Story = {
  args: {
    children: 'Chip',
  },
};

export const Colors: Story = {
  argTypes: {
    bg: disableControl(),
  },
  render: function Render(props) {
    const { variants } = getTheme({ theme: useTheme() });

    return (
      <Grid gap={30} justifyItems="center" templateColumns="repeat(3, 1fr)">
        {objectKeys(variants).map(variant => (
          <div key={variant}>
            <Chip {...props} bg={variant}>
              {variant}
            </Chip>
          </div>
        ))}
      </Grid>
    );
  },
};

export const Tones: Story = {
  argTypes: {
    ...colorProps(['bg', 'color'], true),
  },
  render: function Render({ bg, ...props }) {
    const [variant] = bg?.split('.') ?? [];

    return (
      <Spacer gapVertical="sm">
        {TONES.map(d => (
          <Chip key={d} {...props} bg={`${variant}.${d}`}>
            {d}
          </Chip>
        ))}
      </Spacer>
    );
  },
};

export const Sizes: Story = {
  argTypes: {
    size: disableControl(),
  },
  render: props => (
    <Spacer gapVertical="sm">
      {textSizes.map(d => (
        <Chip key={d} {...props} size={d}>
          {d}
        </Chip>
      ))}
    </Spacer>
  ),
};

export const WithIcons: Story = {
  render: props => {
    const handleStartContentClick = (event: MouseEvent<HTMLButtonElement>) => {
      action('startContentOnClick')(event.currentTarget.parentElement?.dataset.name);
    };

    const handleEndContentClick = (event: MouseEvent<HTMLButtonElement>) => {
      action('endContentOnClick')(event.currentTarget.parentElement?.dataset.name);
    };

    return (
      <Spacer gap="md">
        <Chip
          {...props}
          bg="secondary.50"
          data-name="count"
          endContent={<Icon name="plus" size={12} />}
          endContentOnClick={handleStartContentClick}
          size="xs"
          startContent={<Icon name="minus" size={12} />}
          startContentOnClick={handleStartContentClick}
        >
          count
        </Chip>
        <Chip
          {...props}
          data-name="add"
          size="sm"
          startContent={<Icon name="plus-heavy" size={12} />}
          startContentOnClick={handleStartContentClick}
        >
          add
        </Chip>
        <Chip
          {...props}
          bg="blue"
          data-name="remove"
          size="md"
          startContent={<Icon name="trash" size={14} />}
          startContentOnClick={handleStartContentClick}
          variant="bordered"
        >
          remove
        </Chip>
        <Chip
          {...props}
          bg="red.500"
          color="white"
          data-name="continue"
          endContent={<Icon name="chevron-right" />}
          endContentOnClick={handleEndContentClick}
          size="lg"
        >
          continue
        </Chip>
      </Spacer>
    );
  },
};
