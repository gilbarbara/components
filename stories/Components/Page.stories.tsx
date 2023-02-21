import { Meta } from '@storybook/react';

import { Box, Button, H4, Jumbo, Paragraph } from 'src';
import { Page, PageProps } from 'src/Page';

import {
  colorProps,
  disableControl,
  flexContent,
  flexItems,
  hideProps,
  paddingProps,
} from '../__helpers__';

export default {
  title: 'Components/Page',
  component: Page,
  args: {
    ...Page.defaultProps,
    name: 'About',
    maxWidth: 1280,
    shade: 'lightest',
    variant: 'primary',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...paddingProps(),
    align: { control: 'select', options: ['', ...flexItems] },
    justify: { control: 'select', options: ['', ...flexContent] },
    children: disableControl(),
    textAlign: { control: 'inline-radio' },
  },
  parameters: {
    maxWidth: '100%',
    minHeight: 400,
    withoutPadding: true,
  },
} as Meta<typeof Page>;

export const Basic = {
  render: (props: PageProps) => (
    <Page {...props}>
      <Box>
        <H4 light mb={0} variant="gray">
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