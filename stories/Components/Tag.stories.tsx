import { useTheme } from '@emotion/react';
import { capitalize } from '@gilbarbara/helpers';
import { ComponentMeta } from '@storybook/react';
import { Grid, Spacer } from 'src';
import { Tag, TagProps } from 'src/Tag';

import { getTheme } from 'src/modules/helpers';
import { textSizes } from 'src/modules/options';

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
} as ComponentMeta<typeof Tag>;

export const Basic = (props: TagProps) => <Tag {...props} />;

Basic.args = {
  children: 'Tag',
};

export const Variants = (props: TagProps) => {
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
};

Variants.argTypes = {
  variant: disableControl(),
};

export const Shades = (props: TagProps) => {
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
};

Shades.argTypes = {
  color: disableControl(),
  shade: disableControl(),
};

export const Sizes = (props: TagProps) => (
  <Spacer>
    {textSizes.map(d => (
      <Tag key={d} {...props} size={d}>
        {capitalize(d)}
      </Tag>
    ))}
  </Spacer>
);

Sizes.argTypes = {
  size: disableControl(),
};

export const WithIcons = (props: TagProps) => (
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
);
