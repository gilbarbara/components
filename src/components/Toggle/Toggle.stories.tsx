import { useTheme } from '@emotion/react';
import { objectKeys } from '@gilbarbara/helpers';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, waitFor, within } from '@storybook/test';

import { Grid } from '~';

import { getTheme } from '~/modules/helpers';

import {
  colorProps,
  disableControl,
  hideProps,
  hideStoryFromDocsPage,
} from '~/stories/__helpers__';

import { defaultProps, Toggle, ToggleProps } from './Toggle';

type Story = StoryObj<typeof Toggle>;

export default {
  title: 'Inputs/Toggle',
  component: Toggle,
  args: {
    ...defaultProps,
    label: 'Toggle',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    label: { control: 'text' },
    onToggle: { action: 'onToggle' },
  },
} satisfies Meta<typeof Toggle>;

export const Basic: Story = {};

export const Controlled: Story = {
  args: {
    checked: false,
    label: 'Controlled',
  },
  render: function Render(props) {
    const [{ checked }, updateArguments] = useArgs<ToggleProps>();

    const handleToggle = () => {
      updateArguments({ checked: !checked });
    };

    return <Toggle {...props} onToggle={handleToggle} />;
  },
};

export const Sizes: Story = {
  argTypes: {
    label: disableControl(),
    name: disableControl(),
    size: disableControl(),
  },
  render: props => (
    <Grid gap={30} templateColumns="repeat(3, 1fr)">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <Toggle key={size} {...props} defaultChecked label={size} size={size} />
      ))}
    </Grid>
  ),
};

export const Colors: Story = {
  argTypes: {
    accent: disableControl(),
    label: disableControl(),
    name: disableControl(),
  },
  render: function Render(props) {
    const { variants } = getTheme({ theme: useTheme() });

    return (
      <Grid gap={30} templateColumns="repeat(3, 1fr)">
        {([...objectKeys(variants), 'black', 'white'] as const).map(color => (
          <Toggle key={color} {...props} accent={color} defaultChecked label={color} name={color} />
        ))}
      </Grid>
    );
  },
};

const mockOnChange = fn();
const mockOnToggle = fn();

export const Tests: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  args: {
    onChange: mockOnChange,
    onToggle: mockOnToggle,
  },
  play: async ({ canvasElement }) => {
    mockOnChange.mockClear();
    mockOnToggle.mockClear();

    const canvas = within(canvasElement);

    await canvas.findByTestId('Toggle');

    await fireEvent.click(canvas.getByTestId('Toggle'));
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
    await expect(mockOnToggle).toHaveBeenCalledTimes(1);

    await fireEvent.keyDown(canvas.getByTestId('ToggleElement'), { code: 'Space' });
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(2);
    });
    await expect(mockOnToggle).toHaveBeenCalledTimes(2);
  },
};

export const TestsControlled: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  args: {
    checked: false,
    onChange: mockOnChange,
    onToggle: mockOnToggle,
  },
  render: Controlled.render,
  play: async ({ canvasElement }) => {
    mockOnChange.mockClear();
    mockOnToggle.mockClear();

    const canvas = within(canvasElement);

    await canvas.findByTestId('Toggle');

    await fireEvent.click(canvas.getByTestId('Toggle'));
    await expect(mockOnChange).toHaveBeenCalledTimes(0);
    await expect(mockOnToggle).toHaveBeenCalledTimes(0);

    await fireEvent.keyDown(canvas.getByTestId('ToggleElement'), { code: 'Enter' });
    await expect(mockOnChange).toHaveBeenCalledTimes(0);
    await expect(mockOnToggle).toHaveBeenCalledTimes(0);
  },
};
