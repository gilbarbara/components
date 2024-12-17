import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, waitFor, within } from '@storybook/test';

import { colorProps, hideProps, positioningProps } from '~/stories/__helpers__';
import Description from '~/stories/components/Description';

import { MenuToggle, MenuToggleProps } from './MenuToggle';
import { defaultProps } from './useMenuToggle';

type Story = StoryObj<typeof MenuToggle>;

export default {
  title: 'Components/MenuToggle',
  // category: 'Content',
  component: MenuToggle,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['color']),
    ...positioningProps(),
  },
} satisfies Meta<typeof MenuToggle>;

function Render(props: MenuToggleProps) {
  const { onToggle } = props;
  const [isOpen, setOpen] = useState(false);

  const handleToggle = (isActive: boolean) => {
    setOpen(isActive);
    onToggle?.(isActive);
  };

  return <MenuToggle {...props} isOpen={isOpen} onToggle={handleToggle} />;
}

export const Basic: Story = {
  render: Render,
};

export const Customized: Story = {
  args: {
    border: 12,
    color: 'primary',
    radius: 8,
    size: 64,
  },
  render: Render,
};

export const WithHideBreakpoint: Story = {
  args: {
    hideBreakpoint: 'lg',
  },
  render: props => (
    <>
      <Render {...props} />
      <Description>
        The toggle button is hidden on desktop screens.
        <br />
        Resize the window to see the button.
      </Description>
    </>
  ),
};

export const Tests: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    onToggle: fn(),
  },
  render: Basic.render,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('MenuToggle');
    await expect(canvas.getByTestId('MenuToggle')).toHaveAttribute('data-open', 'false');

    await fireEvent.click(canvas.getByTestId('MenuToggle'));

    await waitFor(() => {
      expect(args.onToggle).toHaveBeenCalledWith(true);
    });

    await fireEvent.click(canvas.getByTestId('MenuToggle'));

    await waitFor(() => {
      expect(args.onToggle).toHaveBeenCalledWith(false);
    });
  },
};
