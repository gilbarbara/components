import { Meta, StoryObj } from '@storybook/react';

import { FlexCenter, Grid, Icon, Paragraph, Spacer } from '~';

import { sizes } from '~/modules/options';
import {
  colorProps,
  disableControl,
  flexBoxProps,
  hideProps,
  radiusProps,
  spacingProps,
  VARIANTS,
} from '~/stories/__helpers__';

import { defaultProps, Snippet } from './Snippet';

type Story = StoryObj<typeof Snippet>;

export default {
  title: 'Components/Snippet',
  // category: 'Content',
  component: Snippet,
  args: {
    ...defaultProps,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
    ...flexBoxProps(),
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
    copyIcon: '📋',
    copyValue: 'https://components.gilbarbara.dev',
    gap: 'sm',
    justify: 'space-between',
    radius: 'xl',
    removeFormatting: true,
    size: 'lg',
    symbol: <Icon name="info" />,
    tooltipCopiedText: 'Copied!',
    tooltipProps: {
      bg: 'red',
      size: 'md',
    },
    tooltipText: 'Copy Documentation URL',
    width: '100%',
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
    <Spacer distribution="center" gap="lg" orientation="vertical">
      {sizes.map(size => (
        <div key={size}>
          <Paragraph align="center" mb="xs" size="lg">
            {size}
          </Paragraph>
          <Snippet key={size} {...props} size={size}>
            npm install @gilbarbara/components
          </Snippet>
        </div>
      ))}
    </Spacer>
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
        <FlexCenter key={d}>
          <Snippet key={d} {...props} bg={!['black', 'white'].includes(d) ? `${d}.100` : d} />
          <Paragraph mt="xs">{d}</Paragraph>
        </FlexCenter>
      ))}
    </Grid>
  ),
};

export const Multilines: Story = {
  args: {
    children: [
      <div key="npm">npm install @gilbarbara/components</div>,
      <div key="yarn">yarn add @gilbarbara/components</div>,
      <div key="pnpm">pnpm add @gilbarbara/components</div>,
    ],
  },
};
