import { Meta, StoryObj } from '@storybook/react';

import { Box, Paragraph } from '~';

import {
  colorProps,
  dimensionProps,
  flexBoxProps,
  hideProps,
  hideTable,
  radiusProps,
  spacingProps,
} from '~/stories/__helpers__';

import { Alert, AlertProps, defaultProps } from './Alert';

type Story = StoryObj<typeof Alert>;

export default {
  title: 'Components/Alert',
  // category: 'Feedback',
  component: Alert,
  args: {
    ...defaultProps,
    children: 'Registration completed!',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
    ...flexBoxProps({ exclude: ['alignContent', 'justifyItems'] }),
    ...dimensionProps(),
    ...radiusProps(),
    ...spacingProps(),
    children: { control: 'text' },
    type: { control: 'select' },
  },
} satisfies Meta<typeof Alert>;

const types: AlertProps[] = [
  { children: 'Registration completed!', type: 'success' },
  { children: 'Please fill in all the fields before proceeding.', type: 'warning' },
  {
    children: (
      <Box>
        <Paragraph bold size="lg">
          Something went wrong!
        </Paragraph>
        <Paragraph mt="xxs">Your information could not be saved.</Paragraph>
      </Box>
    ),
    type: 'error',
  },
  { children: 'Please wait, loading...', type: 'info' },
  {
    children: 'Nothing too important, just letting you know.',
    type: 'neutral',
  },
];

export const Basic: Story = {};

export const Vertical: Story = {
  args: {
    direction: 'column',
    iconSize: 48,
    maxWidth: 400,
  },
};

export const Types: Story = {
  argTypes: {
    align: hideTable(),
    children: hideTable(),
    icon: hideTable(),
    type: hideTable(),
  },
  render: props => (
    <>
      {types.map(d => (
        <Alert key={d.type} align={d.align} mb="md" {...props} type={d.type}>
          {d.children}
        </Alert>
      ))}
    </>
  ),
};

export const Tests: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    hideIcon: true,
    padding: 'xxl',
    justify: 'center',
    variant: 'light',
  },
  render: Basic.render,
};
