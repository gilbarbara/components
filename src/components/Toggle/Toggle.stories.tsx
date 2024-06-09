import { useTheme } from '@emotion/react';
import { objectKeys, sleep } from '@gilbarbara/helpers';
import { SetRequired } from '@gilbarbara/types';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { clearAllMocks, expect, fireEvent, fn, waitFor, within } from '@storybook/test';

import { Box, Grid, Icon, Paragraph, Tooltip } from '~';

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
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    label: { control: 'text' },
    onToggle: { action: 'onToggle' },
  },
} satisfies Meta<typeof Toggle>;

export const Basic: Story = {
  args: {
    'aria-label': 'Toggle',
    defaultChecked: true,
    title: 'Toggle',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Notifications',
  },
};

export const WithColors: Story = {
  args: {
    accent: 'orange.500',
    colorButton: ['orange.500', 'yellow'],
    colorTrack: 'yellow',
    label: 'Notifications',
  },
};

export const WithThumbIcon: Story = {
  args: {
    label: 'Notifications',
    thumbIconChecked: <Icon name="check-o" size={18} />,
    thumbIconUnchecked: <Icon name="block-o" size={18} />,
  },
};

export const WithTrackIcon: Story = {
  args: {
    accent: 'gray.700',
    colorTrack: 'yellow',
    label: 'Dark Mode',
    iconEnd: <Icon name="moon" />,
    iconStart: <Icon name="sun" />,
  },
};

export const WithTooltip: Story = {
  render: function Render(props) {
    return (
      <Tooltip content="Notifications">
        <Toggle {...props} />
      </Tooltip>
    );
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

export const Controlled: Story = {
  args: {
    checked: false,
    label: 'Controlled',
  },
  render: function Render(props) {
    const [{ checked }, updateArguments] = useArgs<SetRequired<ToggleProps, 'checked'>>();

    const handleToggle = () => {
      updateArguments({ checked: !checked });
    };

    return (
      <Box direction="column" flexBox justify="start">
        <Toggle {...props} onToggle={handleToggle} title={props.label as string} />
        <Paragraph mt="xs">Selected: {checked?.toString()}</Paragraph>
      </Box>
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
    clearAllMocks();

    const canvas = within(canvasElement);

    await sleep(0.5);

    const toggle = canvas.getByTestId('Toggle');

    await fireEvent.click(toggle);
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
    clearAllMocks();

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
