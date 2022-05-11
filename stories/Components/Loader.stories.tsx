import { ComponentMeta } from '@storybook/react';
import { Loader } from 'src/Loader';

import { colorProps, hideProps } from '../__helpers__';

export default {
  title: 'Components/Loader',
  component: Loader,
  args: {
    size: 128,
    type: 'pill',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
  },
} as ComponentMeta<typeof Loader>;

export const Basic = (props: any) => {
  return <Loader {...props} />;
};
