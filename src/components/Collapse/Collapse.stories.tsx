import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '~';

import { disableControl, hideProps, marginProps } from '~/stories/__helpers__';

import { Collapse, defaultProps } from './Collapse';

type Story = StoryObj<typeof Collapse>;

export default {
  title: 'Components/Collapse',
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
