import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { Box, Button, H3, Icon, Paragraph } from '~';

import {
  disableControl,
  hideProps,
  hideStoryFromDocsPage,
  spacingProps,
} from '~/stories/__helpers__';
import Code from '~/stories/components/Code';
import Description from '~/stories/components/Description';
import Info from '~/stories/components/Info';

import { Collapse, defaultProps } from './Collapse';

type Story = StoryObj<typeof Collapse>;

export default {
  title: 'Content/Collapse',
  component: Collapse,
  args: {
    ...defaultProps,
    children: `Fugiat exercitation cillum elit dolor aliquip amet minim ea tempor labore occaecat nisi. Et elit nisi velit duis esse in irure sit. Qui sunt elit sunt id cupidatat. Occaecat in exercitation officia deserunt irure sit ea amet labore aliqua. Nulla laboris reprehenderit ipsum cillum sit duis ea nulla enim labore adipisicing aute aliqua.`,
  },
  argTypes: {
    ...hideProps(),
    ...spacingProps(),
    children: { control: 'text' },
    maxHeight: { control: 'number' },
  },
  parameters: {
    layout: 'fullscreen',
    minHeight: 300,
    paddingDocs: 'md',
  },
} satisfies Meta<typeof Collapse>;

export const Basic: Story = {
  args: {
    title: 'Lorem ipsum dolor sit amet',
  },
};

export const Expanded: Story = {
  args: {
    defaultOpen: true,
    title: 'Lorem ipsum dolor sit amet',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    title: 'Lorem ipsum dolor sit amet',
  },
};

export const LoadMore: Story = {
  args: {
    initialHeight: 20,
    showBottomToggle: true,
  },
  argTypes: {
    showBottomToggle: disableControl(),
    initialHeight: disableControl(),
    title: disableControl(),
  },
  render: props => {
    return (
      <>
        <Box textAlign="left">
          <Collapse mb="md" {...props} />
        </Box>
        <Description>
          You can also show a toggle at the bottom of the content to open/close it.
          <br />
          <br />
          Set the <Code>showBottomToggle</Code> prop to <Code>true</Code> and the{' '}
          <Code>initialHeight</Code> prop to the height you want the content in its collapsed state.
          <Info icon="info" nested>
            You can customize the toggle with the <Code>bottomToggle</Code>
            prop.
          </Info>
        </Description>
      </>
    );
  },
};

export const LoadMoreWithTitle: Story = {
  args: {
    bottomToggle: ({ isOpen, toggleProps }) => (
      <Button bg="gray.200" size="xs" {...toggleProps}>
        {isOpen ? 'Close' : 'Open'}
      </Button>
    ),
    hideHeaderToggle: true,
    showBottomToggle: true,
    title: 'Lorem ipsum dolor sit amet',
  },
  argTypes: {
    title: disableControl(),
  },
  render: props => {
    return (
      <>
        <Box textAlign="left">
          <Collapse mb="md" {...props} />
        </Box>
        <Description>
          You can have a title with a bottom toggle by hiding the header toggle with the{' '}
          <Code>hideHeaderToggle: true</Code> prop.
          <br />
          And set a custom component in the <Code>bottomToggle</Code> prop.
        </Description>
      </>
    );
  },
};

export const Customized: Story = {
  args: {
    bg: 'red.100',
    color: 'red.700',
    headerToggle: ({ isOpen }) => (
      <Icon color={isOpen ? 'red.200' : 'red'} name="chevron-double-left-o" size={28} />
    ),
    padding: 'md',
    radius: 'md',
    title: (
      <Box>
        <H3 mb={0}>The title</H3>
        <Paragraph color="red.600" mb={0}>
          The Subtitle
        </Paragraph>
      </Box>
    ),
  },
};

export const DefaultOpen: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  args: {
    defaultOpen: true,
    title: 'Lorem ipsum dolor sit amet',
  },
};

export const Tests: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  args: {
    title: <p>Lorem ipsum dolor sit amet</p>,
    onToggle: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('Collapse');
    await expect(canvas.getByTestId('CollapseHeader')).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(canvas.getByTestId('CollapseHeader'));
    await expect(canvas.getByTestId('CollapseHeader')).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(canvas.getByTestId('CollapseHeader'));
    await expect(canvas.getByTestId('CollapseHeader')).toHaveAttribute('aria-expanded', 'false');
  },
};
