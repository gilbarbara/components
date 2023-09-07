import { Meta, StoryObj } from '@storybook/react';

import { Box, Paragraph } from '~';

import {
  flexBoxProps,
  hideProps,
  hideTable,
  radiusProps,
  spacingProps,
} from '~/stories/__helpers__';

import { Alert, AlertProps, defaultProps } from './Alert';

type Story = StoryObj<typeof Alert>;

export default {
  title: 'Feedback/Alert',
  component: Alert,
  args: {
    ...defaultProps,
    children: 'Registration completed!',
  },
  argTypes: {
    ...hideProps(),
    ...radiusProps(),
    ...spacingProps(),
    align: flexBoxProps().align,
    children: { control: 'text' },
    type: { control: 'select' },
  },
} satisfies Meta<typeof Alert>;

const types: AlertProps[] = [
  { children: 'Registration completed!', type: 'success' },
  { children: 'Please fill in all the fields before proceeding.', type: 'warning' },
  {
    align: 'start',
    children: (
      <Box ml="xs">
        <Paragraph bold size="large">
          Something went wrong!
        </Paragraph>
        <Paragraph mt="xxs">Your information could not be saved.</Paragraph>
      </Box>
    ),
    type: 'error',
  },
  { children: 'Please wait, loading...', type: 'info' },
  { children: 'Nothing too important, just letting you know.', type: 'neutral' },
];

export const Basic: Story = {};

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
        <Alert
          key={d.type}
          {...props}
          align={('align' in d && d.align) || undefined}
          mb="md"
          type={d.type}
        >
          {d.children}
        </Alert>
      ))}
    </>
  ),
};

export const TypesInverted: Story = {
  argTypes: {
    align: hideTable(),
    children: hideTable(),
    icon: hideTable(),
    invert: hideTable(),
    type: hideTable(),
  },
  render: props => (
    <>
      {types.map(d => (
        <Alert
          key={d.type}
          {...props}
          align={('align' in d && d.align) || undefined}
          invert
          mb="md"
          type={d.type}
        >
          {d.children}
        </Alert>
      ))}
    </>
  ),
};
