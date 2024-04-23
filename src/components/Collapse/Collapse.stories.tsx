import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { Button } from '~';

import {
  disableControl,
  hideProps,
  hideStoryFromDocsPage,
  marginProps,
} from '~/stories/__helpers__';

import { Collapse, defaultProps } from './Collapse';

type Story = StoryObj<typeof Collapse>;

export default {
  title: 'Display/Collapse',
  component: Collapse,
  args: {
    ...defaultProps,
    children: `Fugiat exercitation cillum elit dolor aliquip amet minim ea tempor labore occaecat nisi. Et elit nisi velit duis esse in irure sit. Qui sunt elit sunt id cupidatat. Occaecat in exercitation officia deserunt irure sit ea amet labore aliqua. Nulla laboris reprehenderit ipsum cillum sit duis ea nulla enim labore adipisicing aute aliqua.`,
    title: 'Lorem ipsum dolor sit amet',
  },
  argTypes: {
    ...hideProps(),
    ...marginProps(),
    children: { control: 'text' },
    maxHeight: { control: 'number' },
  },
  parameters: {
    align: 'start',
    layout: 'fullscreen',
    minHeight: 300,
    paddingDocs: 'md',
  },
} satisfies Meta<typeof Collapse>;

export const Basic: Story = {};

export const LoadMore: Story = {
  args: {
    initialHeight: 20,
    title: undefined,
  },
  argTypes: {
    defaultOpen: disableControl(),
    hideToggle: disableControl(),
    initialHeight: disableControl(),
    title: disableControl(),
  },
  render: function Render(props) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(!open);
    };

    return (
      <>
        <Collapse mb="md" {...props} open={open} />
        <Button onClick={handleClick} size="sm">
          {open ? 'Hide' : 'Load more'}
        </Button>
      </>
    );
  },
};

export const Open: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  args: {
    defaultOpen: true,
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
    await expect(canvas.getByTestId('Collapse')).toHaveAttribute('data-state', 'closed');

    await userEvent.click(canvas.getByTestId('CollapseHeader'));
    await expect(canvas.getByTestId('Collapse')).toHaveAttribute('data-state', 'open');

    await userEvent.click(canvas.getByTestId('CollapseHeader'));
    await expect(canvas.getByTestId('Collapse')).toHaveAttribute('data-state', 'closed');
  },
};
