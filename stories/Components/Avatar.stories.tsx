import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Avatar, Grid } from '../../src';
import { hideTable } from '../__helpers__';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: { control: 'select', defaultValue: 'md' },
    name: { defaultValue: 'Test User' },
    image: hideTable(),
    withImage: { control: 'boolean', defaultValue: false },
    shade: { defaultValue: 'mid' },
    variant: { defaultValue: 'primary' },
  },
} as ComponentMeta<typeof Avatar>;

export const Basic = (props: any) => {
  const { withImage, ...rest } = props;

  return (
    <Avatar
      image={withImage && 'https://images.unsplash.com/photo-1564164841584-391b5c7b590c?w=800'}
      {...rest}
    />
  );
};

export const Sizes = (props: any) => {
  const { withImage, ...rest } = props;

  return (
    <Grid alignItems="center" gap={30} templateColumns="repeat(6, 1fr)">
      {['xs', 'sm', 'md', 'lg', 'xl', 'jumbo'].map(d => (
        <Avatar
          key={d}
          {...rest}
          image={withImage && 'https://images.unsplash.com/photo-1564164841584-391b5c7b590c?w=800'}
          size={d}
        />
      ))}
    </Grid>
  );
};

Sizes.argTypes = {
  size: hideTable(),
};
