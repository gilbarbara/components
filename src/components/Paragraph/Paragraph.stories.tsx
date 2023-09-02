import { Meta, StoryObj } from '@storybook/react';

import { Box, Text } from '~';

import {
  colorProps,
  disableControl,
  hideProps,
  marginProps,
  textOptionsProps,
} from '~/stories/__helpers__';

import { defaultProps, Paragraph } from './Paragraph';

type Story = StoryObj<typeof Paragraph>;

export default {
  title: 'Content/Paragraph',
  component: Paragraph,
  args: {
    ...defaultProps,
    align: 'left',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
    ...textOptionsProps(),
    children: disableControl(),
  },
} satisfies Meta<typeof Paragraph>;

export const Basic: Story = {
  render: props => (
    <Box>
      <Paragraph {...props}>
        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
        there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the
        Semantics, a large language ocean. A small river named Duden flows by their place and
        supplies it with the necessary regelialia. It is a paradisematic country, in which roasted
        parts of sentences fly into your mouth.
      </Paragraph>

      <Paragraph {...props}>
        Even the all-powerful Pointing has no control about the blind texts it is an almost
        unorthographic life One day however a small line of blind text by the name of Lorem Ipsum
        decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so,
        because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but
        the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the
        belt and made herself on the way.
      </Paragraph>

      <Paragraph {...props}>
        <Text>This paragraph uses a {`<Text />`} component so the size props has no effect...</Text>
      </Paragraph>
    </Box>
  ),
};
