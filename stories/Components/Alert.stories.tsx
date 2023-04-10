import { Meta, StoryObj } from '@storybook/react';

import { Box, Paragraph } from 'src';
import { Alert, defaultProps } from 'src/Alert';

import { flexBoxProps, hideProps, hideTable, spacingProps } from '../__helpers__';

type Story = StoryObj<typeof Alert>;

export default {
  title: 'Components/Alert',
  component: Alert,
  args: {
    ...defaultProps,
    children: 'Registration completed!',
  },
  argTypes: {
    ...hideProps(),
    ...spacingProps(),
    align: flexBoxProps().align,
    children: { control: 'text' },
    type: { control: 'select' },
  },
} satisfies Meta<typeof Alert>;

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
      {(
        [
          { content: 'Registration completed!', type: 'success' },
          { content: 'Please fill in all the fields before proceeding.', type: 'warning' },
          {
            align: 'start',
            content: (
              <Box ml="xs">
                <Paragraph bold size="large">
                  Something went wrong!
                </Paragraph>
                <Paragraph mt="xxs">Your information could not be saved.</Paragraph>
              </Box>
            ),
            type: 'error',
          },
          { content: 'Please wait, loading...', type: 'info' },
          { content: 'Nothing too important, just letting you know.', type: 'neutral' },
        ] as const
      ).map(d => (
        <Alert
          key={d.type}
          {...props}
          align={('align' in d && d.align) || undefined}
          mb="md"
          type={d.type}
        >
          {d.content}
        </Alert>
      ))}
    </>
  ),
};
