import { ComponentMeta } from '@storybook/react';
import { FlexCenter, Grid, Paragraph } from 'src';
import { Avatar, AvatarProps } from 'src/Avatar';

import { colorProps, disableControl, hideProps } from '../__helpers__';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    image: 'https://images.unsplash.com/photo-1564164841584-391b5c7b590c?w=800',
    name: 'Test User',
    shade: 'mid',
    size: 'md',
    variant: 'primary',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
  },
} as ComponentMeta<typeof Avatar>;

export const Basic = (props: AvatarProps) => <Avatar {...props} />;

export const Sizes = (props: AvatarProps) => (
  <Grid alignItems="center" gap={30} templateColumns="repeat(6, 1fr)">
    {(['xs', 'sm', 'md', 'lg', 'xl', 'jumbo'] as const).map(d => (
      <FlexCenter key={d}>
        <Avatar key={d} {...props} size={d} />
        <Paragraph mt="xs">{d}</Paragraph>
      </FlexCenter>
    ))}
  </Grid>
);

Sizes.argTypes = {
  size: disableControl(),
};

export const WithoutImage = (props: AvatarProps) => <Avatar {...props} />;

WithoutImage.args = {
  image: undefined,
};
