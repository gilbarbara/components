import { Meta, StoryObj } from '@storybook/react';

import { Icon, Spacer } from '~';

import {
  colorProps,
  COMPONENT_SIZES,
  disableControl,
  flexContent,
  flexItemProps,
  flexItems,
  hideProps,
  layoutProps,
  radiusProps,
  spacingProps,
  textOptionsProps,
} from '~/stories/__helpers__';

import { ButtonUnstyled, defaultProps } from './ButtonUnstyled';

type Story = StoryObj<typeof ButtonUnstyled>;

export default {
  title: 'Components/ButtonUnstyled',
  // category: 'Buttons',
  component: ButtonUnstyled,
  args: {
    ...defaultProps,
    children: 'Button',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...flexItemProps(),
    ...layoutProps(),
    ...radiusProps(),
    ...spacingProps(),
    ...textOptionsProps(),
    align: { control: 'select', options: ['', ...flexItems] },
    justify: { control: 'select', options: ['', ...flexContent] },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `A button without styling`,
      },
    },
  },
} satisfies Meta<typeof ButtonUnstyled>;

export const Basic: Story = {};

export const Sizes: Story = {
  argTypes: {
    size: disableControl(),
  },
  render: props => (
    <Spacer distribution="center" gap="lg">
      {COMPONENT_SIZES.map(size => (
        <ButtonUnstyled key={size} {...props} size={size}>
          Button ({size})
        </ButtonUnstyled>
      ))}
    </Spacer>
  ),
};

export const Customized: Story = {
  args: {
    border: { size: 4, color: 'primary' },
    children: <Icon name="flash" size={48} />,
    color: 'primary',
    height: 64,
    justify: 'center',
    radius: 'round',
    width: 64,
  },
  argTypes: {
    children: disableControl(),
  },
};
