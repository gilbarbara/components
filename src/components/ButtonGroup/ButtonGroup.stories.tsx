/* eslint-disable react-hooks/rules-of-hooks */
import { MouseEvent, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '~';

import { sizesButton } from '~/modules/options';

import { colorProps, disableControl, hideProps } from '~/stories/__helpers__';

import { ButtonGroup, defaultProps } from './ButtonGroup';

type Story = StoryObj<typeof ButtonGroup>;

export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    children: disableControl(),
    size: { control: 'radio', options: sizesButton },
  },
} satisfies Meta<typeof ButtonGroup>;

export const Basic: Story = {
  render: function Render(props) {
    const [active, setActive] = useState('two');

    const handleClick = ({ target }: MouseEvent<HTMLButtonElement>) => {
      if (target instanceof HTMLButtonElement) {
        setActive(target.dataset.name || '');
      }
    };

    return (
      <ButtonGroup {...props}>
        <Button data-name="one" invert={active !== 'one'} onClick={handleClick}>
          First
        </Button>
        <Button data-name="two" invert={active !== 'two'} onClick={handleClick}>
          Second
        </Button>
        <Button data-name="three" invert={active !== 'three'} onClick={handleClick}>
          Third
        </Button>
        <Button data-name="four" invert={active !== 'four'} onClick={handleClick}>
          Forth
        </Button>
      </ButtonGroup>
    );
  },
};
