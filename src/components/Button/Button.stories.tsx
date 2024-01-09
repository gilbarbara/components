import { MouseEvent, useRef } from 'react';
import { capitalize } from '@gilbarbara/helpers';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { Grid, Icon, Spacer } from '~';

import { sizesAll } from '~/modules/options';

import {
  colorProps,
  disableControl,
  hideProps,
  paddingProps,
  tones,
  variants,
} from '~/stories/__helpers__';

import { Button, defaultProps } from './Button';

type Story = StoryObj<typeof Button>;

export default {
  title: 'Buttons/Button',
  component: Button,
  args: {
    ...defaultProps,
    children: 'Button',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
    ...paddingProps(),
    children: { control: 'text' },
    onClick: { action: 'onClick' },
    size: { control: 'radio', options: sizesAll },
  },
} satisfies Meta<typeof Button>;

export const Basic: Story = {};

export const Sizes: Story = {
  argTypes: {
    size: disableControl(),
  },
  render: props => (
    <Spacer>
      {sizesAll.map(d => (
        <Button key={d} {...props} size={d}>
          Button {capitalize(d)}
        </Button>
      ))}
    </Spacer>
  ),
};

export const Colors: Story = {
  argTypes: {
    bg: disableControl(),
  },
  render: props => (
    <Grid gap={30} templateColumns="repeat(3, 1fr)">
      {variants.map(d => (
        <Button key={d} {...props} bg={d}>
          Button {capitalize(d)}
        </Button>
      ))}
    </Grid>
  ),
};

export const Tones: Story = {
  argTypes: {
    bg: disableControl(),
  },
  render: props => (
    <Grid gap={30} templateColumns="repeat(3, 1fr)">
      {tones.map(d => (
        <Button key={d} {...props} bg={`primary.${d}`}>
          Button {capitalize(d)}
        </Button>
      ))}
    </Grid>
  ),
};

export const Shapes: Story = {
  argTypes: {
    shape: disableControl(),
  },
  render: props => (
    <Grid gap={20} templateColumns="repeat(4, 1fr)">
      <Button {...props} shape="round">
        <Icon name="arrow-down" size={18} />
      </Button>
      <Button {...props} shape="circle">
        <Icon name="check" size={18} />
      </Button>
      <Button {...props} busy shape="circle">
        <Icon name="trash" size={18} />
      </Button>
      <Button {...props} shape="square">
        <Icon name="trash" size={18} />
      </Button>
    </Grid>
  ),
};

export const AsLink: Story = {
  args: {
    as: 'a',
  },
  render: function Render(props) {
    const ref = useRef<HTMLAnchorElement>(null);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      action('clicked')(event);
    };

    return (
      <Button ref={ref} href="https://example.com" onClick={handleClick} {...props}>
        Link
      </Button>
    );
  },
};
