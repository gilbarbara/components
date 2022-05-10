import { ComponentMeta } from '@storybook/react';
import { Emoji, EmojiProps } from 'src/Emoji';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Emoji',
  component: Emoji,
  args: {
    label: 'Unicorn',
    size: 64,
    symbol: '🦄',
  },
  argTypes: hideProps(),
} as ComponentMeta<typeof Emoji>;

export const Basic = (props: EmojiProps) => {
  return <Emoji {...props} />;
};
