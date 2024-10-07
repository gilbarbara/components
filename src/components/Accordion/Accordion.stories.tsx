import { cloneElement, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { Avatar, Box, Icon, Paragraph, Spacer, Text } from '~';

import users from '~/stories/__fixtures__/users.json';
import {
  colorProps,
  disableControl,
  flexItems,
  hideProps,
  layoutProps,
  radiusProps,
  spacingProps,
} from '~/stories/__helpers__';
import Code from '~/stories/components/Code';
import Description from '~/stories/components/Description';
import Info from '~/stories/components/Info';

import { Accordion, defaultProps } from './Accordion';
import { AccordionItem, type AccordionItemProps } from './AccordionItem';

type Story = StoryObj<typeof Accordion>;

const defaultContent =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const defaultSubtitle = 'Click to expand';
const defaultChildren = [
  <AccordionItem key="1" id="1" title="Accordion Item 1">
    {defaultContent}
  </AccordionItem>,
  <AccordionItem key="2" id="2" title="Accordion Item 2">
    {defaultContent}
  </AccordionItem>,
  <AccordionItem key="3" id="3" title="Accordion Item 3">
    {defaultContent}
  </AccordionItem>,
];

function getChildren(
  props?: Partial<AccordionItemProps>,
  options: { customToggle?: boolean; startContent?: boolean } = {},
) {
  const { customToggle, startContent } = options;

  return defaultChildren.map((child, index) => {
    const additionalProps: Partial<AccordionItemProps> = {};

    if (customToggle) {
      const customToggles: AccordionItemProps['headerToggle'][] = [
        <Icon name="link" />,
        <Icon name="delta" />,
        ({ isOpen }) => <Icon color={isOpen ? 'red' : undefined} name="moon" />,
      ] as const;

      additionalProps.headerToggle = customToggles[index];
    }

    if (startContent) {
      const avatarProps = [
        {
          borderColor: 'orange',
          count: 4,
        },
        {
          borderColor: 'green',
          count: 2,
        },
        {
          borderColor: 'red',
          count: 12,
        },
      ];

      additionalProps.startContent = (
        <Avatar
          borderColor={avatarProps[index].borderColor}
          bordered
          image={users[index].avatar}
          name={users[index].name}
          radius="sm"
        />
      );
      additionalProps.title = users[index].name;
      additionalProps.subtitle = `${avatarProps[index].count} unread messages`;
    }

    return cloneElement(child, { ...props, ...additionalProps });
  });
}

export default {
  title: 'Components/Accordion',
  // category: 'Content',
  component: Accordion,
  args: {
    ...defaultProps,
    children: getChildren(),
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
    ...layoutProps(),
    ...radiusProps(),
    ...spacingProps(),
    children: disableControl(),
    headerAlign: { control: 'select', options: ['', ...flexItems] },
  },
} satisfies Meta<typeof Accordion>;

export const Basic: Story = {};

export const WithSubtitle: Story = {
  args: {
    children: getChildren({ subtitle: defaultSubtitle }),
  },
};

export const MultipleSelection: Story = {
  args: {
    children: getChildren({ subtitle: defaultSubtitle }),
    selectionMode: 'multiple',
  },
  argTypes: {
    selectionMode: disableControl(),
  },
  render: props => (
    <>
      <Accordion {...props} />
      <Description>
        If you set <Code>selectionMode</Code> prop to "multiple", it will allow multiple items to be
        expanded at the same time.
      </Description>
    </>
  ),
};

export const InitialSelectedIds: Story = {
  args: {
    children: getChildren({
      subtitle: defaultSubtitle,
    }),
    initialSelectedIds: ['1'],
  },
  argTypes: {
    initialSelectedIds: disableControl(),
  },
  render: props => (
    <>
      <Accordion {...props} />
      <Description>
        If you want to expand some items by default, you can set the <Code>initialSelectedIds</Code>{' '}
        prop to an array of ids.
      </Description>
    </>
  ),
};

export const Compact: Story = {
  args: {
    children: getChildren(),
    compact: true,
  },
  argTypes: {
    compact: disableControl(),
  },
};

export const Variants: Story = {
  args: {
    children: getChildren({
      subtitle: defaultSubtitle,
    }),
  },
  argTypes: {
    variant: disableControl(),
  },
  render: props => (
    <>
      <Description intro>
        Accordion has 4 variants: <Code>clean</Code>, <Code>bordered</Code>, <Code>shadow</Code> and{' '}
        <Code>split</Code>.{' '}
      </Description>
      <Spacer gap="xxxl" orientation="vertical">
        <Box>
          <Paragraph mb="lg" size="lg">
            clean
          </Paragraph>
          <Accordion {...props} variant="clean" />
        </Box>
        <Box>
          <Paragraph mb="md" size="lg">
            bordered
          </Paragraph>
          <Accordion {...props} variant="bordered" />
        </Box>
        <Box>
          <Paragraph mb="md" size="lg">
            shadow
          </Paragraph>
          <Accordion {...props} variant="shadow" />
        </Box>
        <Box>
          <Paragraph mb="md" size="lg">
            split
          </Paragraph>
          <Accordion {...props} variant="split" />
        </Box>
      </Spacer>
    </>
  ),
};

export const StartContent: Story = {
  args: {
    children: getChildren(
      { subtitle: defaultSubtitle },
      {
        startContent: true,
      },
    ),
  },
  render: props => (
    <>
      <Accordion {...props} />
      <Description>
        If you want to display some content before the accordion items, you can set the{' '}
        <Code>startContent</Code> prop.
      </Description>
    </>
  ),
};

export const CustomToggle: Story = {
  args: {
    children: getChildren(
      { subtitle: defaultSubtitle },
      {
        customToggle: true,
      },
    ),
  },
  render: props => (
    <>
      <Accordion {...props} />
      <Info icon="info">
        You can use customize the toggle with the <Code>headerToggle</Code> prop.
      </Info>
    </>
  ),
};

export const Customized: Story = {
  args: {
    compact: true,
    hideDivider: true,
    variant: 'shadow',
    width: 330,
  },
  render: function Render(props) {
    return (
      <Accordion {...props}>
        <AccordionItem
          headerToggle={<Icon name="chevron-double-left" />}
          id="1"
          startContent={<Icon color="blue" name="devices" size={24} />}
          subtitle={
            <span>
              2 issues to <Text color="blue">fix now</Text>
            </span>
          }
          title="Connected devices"
        >
          {defaultContent}
        </AccordionItem>
        <AccordionItem
          id="2"
          startContent={<Icon name="shield" size={24} />}
          subtitle="3 apps have read permissions"
          title="Apps Permissions"
        >
          {defaultContent}
        </AccordionItem>
        <AccordionItem
          id="3"
          startContent={<Icon color="orange" name="info-o" size={24} />}
          subtitle={<Text color="orange">Complete your profile</Text>}
          title="Pending tasks"
        >
          {defaultContent}
        </AccordionItem>
        <AccordionItem
          id="4"
          startContent={<Icon color="red" name="credit-card" size={24} />}
          subtitle={<Text color="red">Please, update now</Text>}
          title={
            <span>
              Card expired <Text color="gray">*4812</Text>
            </span>
          }
        >
          {defaultContent}
        </AccordionItem>
      </Accordion>
    );
  },
};

export const Controlled: Story = {
  args: {
    children: getChildren({
      subtitle: defaultSubtitle,
    }),
    selectedIds: ['1'],
  },
  argTypes: {
    selectedIds: disableControl(),
  },
  render: function Render(props) {
    const { selectedIds } = props;
    const [ids, setIds] = useState(selectedIds as string[]);

    return (
      <>
        <Description intro>
          You can control the selected items by passing the <Code>selectedIds</Code> prop and
          updating it with the <Code>onChange</Code> callback.
        </Description>
        <Accordion {...props} onChange={setIds} selectedIds={ids} />
        <Info nested>Selected ids: {ids.join(', ')}</Info>
      </>
    );
  },
};

export const DisabledIds: Story = {
  args: {
    disabledIds: ['2'],
    children: getChildren({
      subtitle: defaultSubtitle,
    }),
  },
  argTypes: {
    disabledIds: disableControl(),
  },
  render: props => (
    <>
      <Accordion {...props} />
      <Description>
        You can disabled some items with the <Code>disabledIds</Code> prop.
      </Description>
    </>
  ),
};

export const Tests: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    onChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('Accordion');

    const [first, second, third] = canvas.getAllByRole('region');

    await expect(first).toHaveAttribute('aria-expanded', 'false');
    await expect(second).toHaveAttribute('aria-expanded', 'false');
    await expect(third).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(first);
    await expect(first).toHaveAttribute('aria-expanded', 'true');
    await expect(second).toHaveAttribute('aria-expanded', 'false');
    await expect(third).toHaveAttribute('aria-expanded', 'false');
    await expect(args.onChange).toHaveBeenCalledWith(['1']);

    await userEvent.click(second);
    await expect(second).toHaveAttribute('aria-expanded', 'true');
    await expect(first).toHaveAttribute('aria-expanded', 'false');
    await expect(third).toHaveAttribute('aria-expanded', 'false');
    await expect(args.onChange).toHaveBeenCalledWith(['2']);

    await userEvent.click(third);
    await expect(third).toHaveAttribute('aria-expanded', 'true');
    await expect(first).toHaveAttribute('aria-expanded', 'false');
    await expect(second).toHaveAttribute('aria-expanded', 'false');
    await expect(args.onChange).toHaveBeenCalledWith(['3']);
  },
};

export const TestsWithMultiple: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    selectionMode: 'multiple',
    onChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('Accordion');

    const [first, second, third] = canvas.getAllByRole('region');

    await expect(first).toHaveAttribute('aria-expanded', 'false');
    await expect(second).toHaveAttribute('aria-expanded', 'false');
    await expect(third).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(first);
    await expect(first).toHaveAttribute('aria-expanded', 'true');
    await expect(second).toHaveAttribute('aria-expanded', 'false');
    await expect(third).toHaveAttribute('aria-expanded', 'false');
    await expect(args.onChange).toHaveBeenCalledWith(['1']);

    await userEvent.click(second);
    await expect(second).toHaveAttribute('aria-expanded', 'true');
    await expect(first).toHaveAttribute('aria-expanded', 'true');
    await expect(third).toHaveAttribute('aria-expanded', 'false');
    await expect(args.onChange).toHaveBeenCalledWith(['1', '2']);

    await userEvent.click(third);
    await expect(third).toHaveAttribute('aria-expanded', 'true');
    await expect(first).toHaveAttribute('aria-expanded', 'true');
    await expect(second).toHaveAttribute('aria-expanded', 'true');
    await expect(args.onChange).toHaveBeenCalledWith(['1', '2', '3']);
  },
};
