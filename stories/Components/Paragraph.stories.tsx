import { Meta } from '@storybook/react';

import { Box, Text } from 'src';
import { Paragraph, ParagraphProps } from 'src/Paragraph';

import {
  colorProps,
  disableControl,
  hideProps,
  marginProps,
  textOptionsProps,
} from '../__helpers__';

export default {
  title: 'Components/Paragraph',
  component: Paragraph,
  args: {
    ...Paragraph.defaultProps,
    align: 'left',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
    ...textOptionsProps(),
    children: disableControl(),
  },
} as Meta<typeof Paragraph>;

export const Basic = {
  render: (props: ParagraphProps) => (
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
