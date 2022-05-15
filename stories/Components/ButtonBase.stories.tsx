import { ComponentMeta } from '@storybook/react';
import { ButtonBase, ButtonBaseProps } from 'src/ButtonBase';

import { colorProps, hideProps, spacingProps } from '../__helpers__';

export default {
  title: 'Components/ButtonBase',
  component: ButtonBase,
  args: {
    bold: false,
    busy: false,
    children: 'Button',
    disabled: false,
    size: 'regular',
    type: 'button',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...spacingProps(),
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `A button without styling`,
      },
    },
  },
} as ComponentMeta<typeof ButtonBase>;

export const Basic = (props: ButtonBaseProps) => <ButtonBase {...props} />;
