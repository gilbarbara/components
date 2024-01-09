import { MouseEvent } from 'react';
import { useTheme } from '@emotion/react';
import { capitalize, objectKeys } from '@gilbarbara/helpers';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { Grid, Spacer } from '~';

import { getTheme } from '~/modules/helpers';
import { sizesAll } from '~/modules/options';

import {
  colorProps,
  disableControl,
  hideProps,
  marginProps,
  textOptionsProps,
} from '~/stories/__helpers__';

import { defaultProps, Tag } from './Tag';

type Story = StoryObj<typeof Tag>;

export default {
  title: 'Feedback/Tag',
  component: Tag,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
    ...marginProps(),
    ...textOptionsProps(),
    children: { control: 'text' },
  },
} satisfies Meta<typeof Tag>;

export const Basic: Story = {
  args: {
    children: 'Tag',
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
            <Tag {...props} bg={`${variant}.50`}>
              {capitalize(variant)}
            </Tag>
          </div>
        ))}
      </Grid>
    );
  },
};

export const Tones: Story = {
  argTypes: {
    bg: disableControl(),
  },
  render: function Render(props) {
    const { variants } = getTheme({ theme: useTheme() });

    return (
      <Spacer gapVertical="sm">
        {objectKeys(variants.primary).map(d => (
          <Tag key={d} {...props} bg={`primary.${d}`}>
            {capitalize(d)}
          </Tag>
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
      {sizesAll.map(d => (
        <Tag key={d} {...props} size={d}>
          {capitalize(d)}
        </Tag>
      ))}
    </Spacer>
  ),
};

export const WithIcons: Story = {
  render: props => {
    const handleClickBefore = (event: MouseEvent<HTMLButtonElement>) => {
      action('onClickBefore')(event.currentTarget.parentElement?.dataset.name);
    };

    const handleClickAfter = (event: MouseEvent<HTMLButtonElement>) => {
      action('onClickBefore')(event.currentTarget.parentElement?.dataset.name);
    };

    return (
      <Grid gap={20} templateColumns="repeat(4, 1fr)">
        <div>
          <Tag
            {...props}
            bg="secondary.50"
            data-name="assign"
            iconBefore="focus"
            onClickBefore={handleClickBefore}
            size="xs"
          >
            assign
          </Tag>
        </div>
        <div>
          <Tag
            {...props}
            data-name="add"
            iconBefore="plus"
            onClickBefore={handleClickBefore}
            size="sm"
          >
            add
          </Tag>
        </div>
        <div>
          <Tag
            {...props}
            bg="blue"
            data-name="remove"
            iconAfter="close"
            invert
            onClickAfter={handleClickAfter}
            size="md"
          >
            remove
          </Tag>
        </div>
        <div>
          <Tag
            {...props}
            bg="red.500"
            color="white"
            data-name="continue"
            iconAfter="chevron-right"
            onClickAfter={handleClickAfter}
            size="lg"
          >
            continue
          </Tag>
        </div>
      </Grid>
    );
  },
};
