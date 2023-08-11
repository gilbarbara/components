/* eslint-disable react-hooks/rules-of-hooks */
import { MouseEvent } from 'react';
import { useTheme } from '@emotion/react';
import { capitalize } from '@gilbarbara/helpers';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { Grid, Spacer } from '~';

import { getTheme } from '~/modules/helpers';
import { textSizes } from '~/modules/options';

import {
  colorProps,
  disableControl,
  hideProps,
  marginProps,
  textOptionsProps,
} from '~/stories/__helpers__';
import * as Types from '~/types';

import { defaultProps, Tag } from './Tag';

type Story = StoryObj<typeof Tag>;

export default {
  title: 'Components/Tag',
  component: Tag,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(),
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

export const Variants: Story = {
  argTypes: {
    variant: disableControl(),
  },
  render: function Render(props) {
    const { variants } = getTheme({ theme: useTheme() });

    return (
      <Grid gap={30} justifyItems="center" templateColumns="repeat(3, 1fr)">
        {[...Object.keys(variants), 'black', 'white'].map(color => (
          <div key={color}>
            <Tag {...props} variant={color as Types.Colors}>
              {capitalize(color)}
            </Tag>
          </div>
        ))}
      </Grid>
    );
  },
};

export const Shades: Story = {
  argTypes: {
    color: disableControl(),
    shade: disableControl(),
  },
  render: function Render(props) {
    const { variants } = getTheme({ theme: useTheme() });

    return (
      <Spacer>
        {(Object.keys(variants.primary) as Types.Shades[]).map(d => (
          <Tag key={d} {...props} color={d.startsWith('light') ? 'primary' : 'white'} shade={d}>
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
    <Spacer>
      {textSizes.map(d => (
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
            data-name="assign"
            iconBefore="focus"
            onClickBefore={handleClickBefore}
            size="small"
            variant="secondary"
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
            size="mid"
          >
            add
          </Tag>
        </div>
        <div>
          <Tag
            {...props}
            colorShade="mid"
            data-name="remove"
            iconAfter="close"
            invert
            onClickAfter={handleClickAfter}
            size="regular"
            variant="blue"
          >
            remove
          </Tag>
        </div>
        <div>
          <Tag
            {...props}
            color="white"
            data-name="continue"
            iconAfter="chevron-right"
            onClickAfter={handleClickAfter}
            shade="dark"
            size="large"
            variant="red"
          >
            continue
          </Tag>
        </div>
      </Grid>
    );
  },
};
