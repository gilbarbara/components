/* eslint-disable react-hooks/rules-of-hooks */
import { useTheme } from '@emotion/react';
import { capitalize } from '@gilbarbara/helpers';
import { Meta } from '@storybook/react';

import { Grid, Spacer } from 'src';
import { getTheme } from 'src/modules/helpers';
import { textSizes } from 'src/modules/options';
import { Tag, TagProps } from 'src/Tag';
import * as Types from 'src/types';

import { colorProps, disableControl, hideProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/Tag',
  component: Tag,
  args: Tag.defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
    children: { control: 'text' },
    size: { control: 'select' },
  },
} as Meta<typeof Tag>;

export const Basic = {
  args: {
    children: 'Tag',
  },
};

export const Variants = {
  argTypes: {
    variant: disableControl(),
  },
  render: (props: TagProps) => {
    const { variants } = getTheme({ theme: useTheme() }) as Types.Theme;

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

export const Shades = {
  argTypes: {
    color: disableControl(),
    shade: disableControl(),
  },
  render: (props: TagProps) => {
    const { variants } = getTheme({ theme: useTheme() }) as Types.Theme;

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

export const Sizes = {
  argTypes: {
    size: disableControl(),
  },
  render: (props: TagProps) => (
    <Spacer>
      {textSizes.map(d => (
        <Tag key={d} {...props} size={d}>
          {capitalize(d)}
        </Tag>
      ))}
    </Spacer>
  ),
};

export const WithIcons = {
  render: (props: TagProps) => (
    <Grid gap={20} templateColumns="repeat(4, 1fr)">
      <div>
        <Tag {...props} iconBefore="assign" variant="secondary">
          add
        </Tag>
      </div>
      <div>
        <Tag {...props} iconBefore="math-plus">
          add
        </Tag>
      </div>
      <div>
        <Tag {...props} colorShade="mid" iconAfter="close" invert variant="blue">
          remove
        </Tag>
      </div>
      <div>
        <Tag
          {...props}
          color="white"
          iconAfter="chevron-right"
          shade="dark"
          size="regular"
          variant="red"
        >
          continue
        </Tag>
      </div>
    </Grid>
  ),
};
