import * as React from 'react';
import { useTheme } from '@emotion/react';
import { capitalize } from '@gilbarbara/helpers';
import { ComponentMeta, Story } from '@storybook/react';

import { Grid, Group, Tag } from '../../src';
import { getTheme } from '../../src/modules/helpers';
import { TagProps } from '../../src/Tag';
import * as Types from '../../src/types';
import { hideProps, hideTable, textSizes } from '../__helpers__';

export default {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    ...hideProps('style'),
    children: { control: 'text' },
    color: { control: 'select' },
    colorShade: { control: 'select' },
    invert: { control: 'boolean', defaultValue: false },
    size: { control: 'select', defaultValue: 'small' },
    variant: { control: 'select' },
    shade: { control: 'select' },
  },
} as ComponentMeta<typeof Tag>;

const Template: Story<TagProps> = (props: any) => {
  return <Tag {...props} />;
};

export const Basic = Template.bind({});

Basic.args = {
  children: 'Tag',
};

export function Colors(props: any) {
  const { variants } = getTheme({ theme: useTheme() }) as Types.Theme;

  return (
    <Grid gap={30} justifyItems="center" templateColumns="repeat(3, 1fr)">
      {[...Object.keys(variants), 'black', 'white'].map(d => (
        <div key={d}>
          <Tag {...props} variant={d as Types.Colors}>
            {capitalize(d)}
          </Tag>
        </div>
      ))}
    </Grid>
  );
}

Colors.argTypes = {
  variant: hideTable(),
};

export function Shades(props: any) {
  const { variants } = getTheme({ theme: useTheme() }) as Types.Theme;

  return (
    <Group>
      {Object.keys(variants.primary).map(d => (
        <Tag
          key={d}
          {...props}
          color={d.startsWith('light') ? 'primary' : 'white'}
          shade={d as keyof Types.Shades}
        >
          {capitalize(d)}
        </Tag>
      ))}
    </Group>
  );
}

Shades.argTypes = {
  color: hideTable(),
  shade: hideTable(),
};

export function Sizes(props: any) {
  return (
    <Group>
      {textSizes.map(d => (
        <Tag key={d} {...props} size={d}>
          {capitalize(d)}
        </Tag>
      ))}
    </Group>
  );
}

Sizes.argTypes = {
  size: hideTable(),
};

export function WithIcons(props: any) {
  return (
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
}
