import { Meta, StoryObj } from '@storybook/react';

import { Box, BoxCenter, Grid, Icon, Paragraph } from '~';

import { sizes } from '~/modules/options';

import {
  colorProps,
  disableControl,
  hideProps,
  radiusProps,
  spacingProps,
  VARIANTS,
} from '~/stories/__helpers__';

import { defaultProps, Snippet } from './Snippet';

type Story = StoryObj<typeof Snippet>;

export default {
  title: 'Content/Snippet',
  component: Snippet,
  args: {
    ...defaultProps,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
    ...radiusProps(),
    ...spacingProps(),
    children: { control: 'text' },
  },
} satisfies Meta<typeof Snippet>;

export const Basic: Story = {
  args: {
    children: 'npm install @gilbarbara/components',
  },
};

export const Customized: Story = {
  args: {
    bg: 'white',
    border: { color: 'red' },
    checkIcon: '✅',
    children: 'Check the docs for more info.',
    copyValue: 'https://components.gilbarbara.dev',
    copyIcon: '📋',
    gap: 'sm',
    radius: 'xl',
    removeFormatting: true,
    size: 'lg',
    tooltipCopiedText: 'Copied!',
    tooltipText: 'Copy Documentation URL',
    tooltipProps: {
      bg: 'red',
      size: 'md',
    },
    symbol: <Icon name="info" />,
  },
};

export const Code: Story = {
  args: {
    children: `export function noop() {
  return;
}`,
    hideSymbol: true,
    maxWidth: 500,
    size: 'lg',
  },
};

export const Sizes: Story = {
  argTypes: {
    size: disableControl(),
  },
  render: props => (
    <Box align="start" direction="column" flexBox gap={20}>
      {sizes.map(d => (
        <Snippet key={d} {...props} size={d}>
          npm install @gilbarbara/components
        </Snippet>
      ))}
    </Box>
  ),
};

export const Colors: Story = {
  args: {
    children: 'npm install -g npm',
    size: 'sm',
  },
  argTypes: {
    bg: disableControl(),
  },
  render: props => (
    <Grid gap={20} templateColumns="repeat(3, 1fr)">
      {VARIANTS.map(d => (
        <BoxCenter key={d}>
          <Snippet key={d} {...props} bg={d} />
          <Paragraph mt="xs">{d}</Paragraph>
        </BoxCenter>
      ))}
    </Grid>
  ),
};

export const Multilines: Story = {
  args: {
    children: [
      <div>npm install @gilbarbara/components</div>,
      <div>yarn add @gilbarbara/components</div>,
      <div>pnpm add @gilbarbara/components</div>,
    ],
  },
};
