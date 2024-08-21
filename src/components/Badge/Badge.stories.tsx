import { useToggle } from '@gilbarbara/hooks';
import { Meta, StoryObj } from '@storybook/react';

import { Avatar, ButtonUnstyled, Grid, Icon, Paragraph, Spacer, Toggle } from '~';

import users from '~/stories/__fixtures__/users.json';
import {
  colorProps,
  disableControl,
  hideProps,
  radiusProps,
  spacingProps,
  VARIANTS,
} from '~/stories/__helpers__';
import Code from '~/stories/components/Code';
import Description from '~/stories/components/Description';
import Info from '~/stories/components/Info';

import { Badge, defaultProps } from './Badge';

type Story = StoryObj<typeof Badge>;

export default {
  title: 'Content/Badge',
  component: Badge,
  args: {
    ...defaultProps,
    children: <Avatar image={users[0].avatar} name={users[0].name} radius="xs" size="md" />,
    content: '5',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'borderColor', 'color']),
    ...radiusProps(),
    ...spacingProps(),
    children: disableControl(),
    content: { control: 'text' },
  },
} satisfies Meta<typeof Badge>;

export const Basic: Story = {};

export const Sizes: Story = {
  argTypes: {
    size: disableControl(),
  },
  render: props => (
    <Spacer distribution="center" gap="lg">
      <Badge {...props} size="sm">
        <Avatar image={users[0].avatar} name={users[0].name} radius="xs" size="md" />
      </Badge>
      <Badge {...props} size="md">
        <Avatar image={users[1].avatar} name={users[1].name} radius="md" size="md" />
      </Badge>
      <Badge {...props} shape="circle" size="lg">
        <Avatar image={users[2].avatar} name={users[2].name} radius="round" size="md" />
      </Badge>
    </Spacer>
  ),
};

export const Colors: Story = {
  argTypes: {
    bg: disableControl(),
  },
  render: props => {
    const { color, ...rest } = props;

    return (
      <>
        <Grid gap="lg" templateColumns="repeat(4, 1fr)">
          {VARIANTS.map((d, index) => (
            <Badge
              key={d}
              {...rest}
              bg={d}
              borderColor={d === 'white' ? 'red' : undefined}
              color={color ?? (!['yellow', 'white'].includes(d) ? 'white' : undefined)}
            >
              <Avatar image={users[index].avatar} name={users[index].name} radius="md" size="md" />
            </Badge>
          ))}
        </Grid>
        <Description>
          You can control the background color with <Code>bg</Code>, text color with{' '}
          <Code>color</Code>, and border color with <Code>borderColor</Code> props.
        </Description>
      </>
    );
  },
};

export const Placements: Story = {
  argTypes: {
    placement: disableControl(),
  },
  render: props => (
    <Spacer gap="lg">
      <Badge {...props} placement="top-right">
        <Avatar image={users[0].avatar} name={users[0].name} radius="xs" />
      </Badge>
      <Badge {...props} placement="bottom-right">
        <Avatar image={users[2].avatar} name={users[2].name} radius="md" />
      </Badge>
      <Badge {...props} placement="top-left">
        <Avatar image={users[1].avatar} name={users[1].name} radius="md" />
      </Badge>
      <Badge {...props} placement="bottom-left">
        <Avatar image={users[3].avatar} name={users[3].name} radius="md" />
      </Badge>
    </Spacer>
  ),
};

export const Shapes: Story = {
  argTypes: {
    shape: disableControl(),
  },
  render: props => (
    <>
      <Spacer gap="lg">
        <Badge {...props} shape="rectangle">
          <Avatar image={users[1].avatar} name={users[1].name} radius="md" />
        </Badge>
        <Badge {...props} shape="circle">
          <Avatar image={users[0].avatar} name={users[0].name} radius="round" />
        </Badge>
        <Badge {...props} offsetX={8} offsetY={8}>
          <Avatar image={users[0].avatar} name={users[0].name} radius="round" />
        </Badge>
      </Spacer>
      <Description>
        <Paragraph>
          For a better positioning with rounded elements, you can use the <Code>shape</Code> prop
          with the <strong>circle</strong> value.
        </Paragraph>
        <Paragraph>
          You can also use the <Code>offsetX</Code> and <Code>offsetY</Code> for complete control,
          as shown in the last example.
        </Paragraph>
      </Description>
    </>
  ),
};

export const ContentExamples: Story = {
  render: props => (
    <Spacer gap="lg">
      <Badge {...props} bg="red" color="white">
        <Avatar image={users[0].avatar} name={users[0].name} radius="md" />
      </Badge>
      <Badge {...props} bg="green" dot placement="top-left" size="lg">
        <Avatar image={users[1].avatar} name={users[1].name} radius="round" />
      </Badge>
      <Badge {...props} bg="orange" color="white" content="new" hideBorder>
        <Avatar
          borderColor="orange"
          bordered
          image={users[6].avatar}
          name={users[6].name}
          radius="md"
        />
      </Badge>
      <Badge
        {...props}
        bg="white"
        borderColor="green"
        content={<Icon color="green" name="check-heavy" size={10} />}
        placement="bottom-right"
        px={0}
      >
        <Avatar
          borderColor="green"
          bordered
          image={users[11].avatar}
          name={users[11].name}
          radius="md"
        />
      </Badge>
      <Badge {...props} bg="red" color="white" content="99+" hideBorder shape="circle">
        <ButtonUnstyled>
          <Icon name="bell-o" size={48} />
        </ButtonUnstyled>
      </Badge>
    </Spacer>
  ),
};

export const BadgeVisibility: Story = {
  argTypes: {
    hideBadge: disableControl(),
  },
  render: function Render(props) {
    const [isVisible, { toggle }] = useToggle(true);

    return (
      <>
        <Spacer gap="lg">
          <Badge {...props} hideBadge={!isVisible}>
            <Avatar image={users[1].avatar} name={users[1].name} radius="md" />
          </Badge>
          <Badge {...props} hideBadge={!isVisible}>
            <Avatar image={users[0].avatar} name={users[0].name} radius="round" />
          </Badge>
          <Toggle checked={isVisible} label="Show Badge" onToggle={toggle} />
        </Spacer>
        <Description>
          You can control the visibility of the badge by using the <Code>hideBadge</Code> prop.
        </Description>
      </>
    );
  },
};

export const hideBorder: Story = {
  args: {
    hideBorder: true,
  },
  argTypes: {
    hideBorder: disableControl(),
  },
  render: props => (
    <>
      <Spacer gap="lg">
        <Badge {...props} hideBorder>
          <Avatar image={users[1].avatar} name={users[1].name} radius="xs" />
        </Badge>
        <Badge {...props} hideBorder>
          <Avatar image={users[3].avatar} name={users[3].name} radius="round" />
        </Badge>
        <Badge {...props} dot hideBorder>
          <Avatar image={users[2].avatar} name={users[2].name} radius="md" />
        </Badge>
      </Spacer>
      <Info icon="info">
        You can disable the badge border with the <Code>hideBorder</Code> prop.
      </Info>
    </>
  ),
};
