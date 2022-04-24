import * as React from 'react';

import { Button, ButtonGroup } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    ...hideProps(),
    variant: { control: 'select', defaultValue: 'primary' },
    shade: { control: 'select', defaultValue: 'mid' },
    size: { control: 'select', defaultValue: 'md' },
  },
};

export function Basic(props: any) {
  const [active, setActive] = React.useState('two');

  const handleClick = ({ target }: React.MouseEvent<HTMLButtonElement>) => {
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
}
