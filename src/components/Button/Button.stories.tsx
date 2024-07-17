import { objectKeys } from '@gilbarbara/helpers';
import { Meta, StoryObj } from '@storybook/react';

import { Grid, Icon, Spacer } from '~';

import { radius } from '~/modules/theme';

import {
  colorProps,
  COMPONENT_SIZES,
  disableControl,
  flexItemProps,
  hideProps,
  paddingProps,
  radiusProps,
  TONES,
  VARIANTS,
} from '~/stories/__helpers__';
import Code from '~/stories/components/Code';
import Description from '~/stories/components/Description';
import Info from '~/stories/components/Info';

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
    ...flexItemProps(),
    ...paddingProps(),
    ...radiusProps(),
    children: { control: 'text' },
    onClick: { action: 'onClick' },
    size: { control: 'radio', options: COMPONENT_SIZES },
  },
} satisfies Meta<typeof Button>;

export const Basic: Story = {};

export const Busy: Story = {
  render: props => (
    <>
      <Spacer gap="lg">
        <Button {...props} busy>
          Submit
        </Button>

        <Button {...props} busy spinner={<Icon name="clock" spin />} spinnerPosition="start">
          Save (with custom spinner)
        </Button>
      </Spacer>
      <Description>
        Setting the <Code>busy</Code> prop to true adds a spinner and the button will ignore clicks.
        <br />
        You can change the its position with the <Code>spinnerPosition</Code> prop.
      </Description>
    </>
  ),
};

export const WithIcon: Story = {
  render: props => (
    <Spacer gap="lg">
      <Button {...props} bg="green" endContent={<Icon name="image" />}>
        Take a photo
      </Button>

      <Button {...props} bg="red" color="white" startContent={<Icon name="user" />}>
        Delete user
      </Button>
    </Spacer>
  ),
};

export const IconOnly: Story = {
  argTypes: {
    iconOnly: disableControl(),
    radius: disableControl(),
  },
  args: {
    iconOnly: true,
    size: 'sm',
  },
  render: props => (
    <>
      <Grid gap={20} templateColumns="repeat(4, 1fr)">
        <Button {...props} radius="xxs">
          <Icon name="arrow-down" size={18} />
        </Button>
        <Button {...props} radius="sm">
          <Icon name="check" size={18} />
        </Button>
        <Button {...props} busy radius="round">
          <Icon name="trash" size={18} />
        </Button>
        <Button {...props} radius="none">
          <Icon name="trash" size={18} />
        </Button>
      </Grid>
      <Description>
        Setting the <Code>iconOnly</Code> prop removes the padding and center the content.
      </Description>
    </>
  ),
};

export const Sizes: Story = {
  argTypes: {
    size: disableControl(),
  },
  render: props => (
    <Spacer>
      {COMPONENT_SIZES.map(d => (
        <Button key={d} {...props} size={d}>
          Button ({d})
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
      {VARIANTS.map(d => (
        <Button key={d} {...props} bg={d}>
          Button ({d})
        </Button>
      ))}
    </Grid>
  ),
};

export const Tones: Story = {
  argTypes: {
    ...colorProps(['bg', 'color'], true),
  },
  render: ({ bg, ...props }) => {
    const [variant] = bg?.split('.') ?? [];

    return (
      <Grid gap={30} templateColumns="repeat(3, 1fr)">
        {TONES.map(d => (
          <Button key={d} {...props} bg={`${variant}.${d}`}>
            Button ({d})
          </Button>
        ))}
      </Grid>
    );
  },
};

export const Variants: Story = {
  argTypes: {
    variant: disableControl(),
  },
  render: props => {
    return (
      <Spacer>
        <Button {...props} variant="solid">
          solid
        </Button>
        <Button {...props} variant="bordered">
          bordered
        </Button>
        <Button {...props} variant="clean">
          clean
        </Button>
        <Button {...props} variant="shadow">
          shadow
        </Button>
      </Spacer>
    );
  },
};

export const Radius: Story = {
  argTypes: {
    radius: disableControl(),
  },
  render: props => {
    return (
      <>
        <Grid gap={30} templateColumns="repeat(3, 1fr)">
          {objectKeys(radius).map(d => (
            <Button key={d} {...props} radius={d}>
              {d}
            </Button>
          ))}
        </Grid>
        <Info icon="paintbrush" mt="xl">
          You can update the theme <Code>button[size].radius</Code> to customize the default.
        </Info>
      </>
    );
  },
};
