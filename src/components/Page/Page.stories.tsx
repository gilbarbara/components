import { Meta, StoryObj } from '@storybook/react';

import { Box, Button, H4, Jumbo, Paragraph } from '~';

import {
  colorProps,
  disableControl,
  flexContent,
  flexItems,
  hideProps,
  paddingProps,
} from '~/stories/__helpers__';

import { defaultProps, Page } from './Page';

type Story = StoryObj<typeof Page>;

export default {
  title: 'Layout/Page',
  component: Page,
  args: {
    ...defaultProps,
    bg: 'primary.50',
    name: 'About',
    maxWidth: 1280,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
    ...paddingProps(),
    align: { control: 'select', options: ['', ...flexItems] },
    justify: { control: 'select', options: ['', ...flexContent] },
    children: disableControl(),
    textAlign: { control: 'inline-radio' },
  },
  parameters: {
    maxWidth: '100%',
    minHeight: 400,
    padding: 0,
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export const Basic: Story = {
  render: props => (
    <Page {...props}>
      <Box>
        <H4 color="gray" light mb={0}>
          ABOUT
        </H4>
        <Jumbo mb="lg">How it works</Jumbo>
      </Box>
      <Paragraph mb="md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id suscipit ex.
        Suspendisse rhoncus laoreet purus . Phasellus sed efficitur dolor, et ultricies sapien.
        Quisque fringilla sit amet dolor commodo efficitur. Aliquam et sem odio. In ullamcorper nisi
        nunc, et molestie ipsum iaculis sit amet.
      </Paragraph>
      <Button>Learn More</Button>
    </Page>
  ),
};
