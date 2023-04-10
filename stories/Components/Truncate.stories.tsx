import { Meta, StoryObj } from '@storybook/react';

import { defaultProps, Truncate } from 'src/Truncate';

import { hideProps } from '../__helpers__';

type Story = StoryObj<typeof Truncate>;

export default {
  title: 'Components/Truncate',
  component: Truncate,
  args: {
    ...defaultProps,
    children:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
  },
  argTypes: {
    ...hideProps(),
    maxWidth: { control: 'text' },
  },
} satisfies Meta<typeof Truncate>;

export const Basic: Story = {};
