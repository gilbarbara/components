import { ComponentMeta } from '@storybook/react';

import { Box, Button, H4, Jumbo, Paragraph } from 'src';
import { Main, MainProps } from 'src/Main';

import {
  colorProps,
  disableControl,
  flexContent,
  flexItems,
  hideProps,
  paddingProps,
} from '../__helpers__';

export default {
  title: 'Components/Main',
  component: Main,
  args: {
    ...Main.defaultProps,
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
} as ComponentMeta<typeof Main>;

export const Basic = (props: MainProps) => (
  <Main {...props}>
    <Box>
      <H4 light mb={0} variant="gray">
        ABOUT
      </H4>
      <Jumbo mb="lg">How it works</Jumbo>
    </Box>
    <Paragraph mb="md">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id suscipit ex. Suspendisse
      rhoncus laoreet purus . Phasellus sed efficitur dolor, et ultricies sapien. Quisque fringilla
      sit amet dolor commodo efficitur. Aliquam et sem odio. In ullamcorper nisi nunc, et molestie
      ipsum iaculis sit amet.
    </Paragraph>
    <Button>Learn More</Button>
  </Main>
);
