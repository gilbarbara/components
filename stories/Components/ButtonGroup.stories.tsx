import { MouseEvent, useState } from 'react';
import { Button } from 'src';
import { ButtonGroup, ButtonGroupProps } from 'src/ButtonGroup';

import { colorProps, hideProps } from '../__helpers__';

export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  args: {
    shade: 'mid',
    size: 'md',
    variant: 'primary',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
  },
};

export function Basic(props: ButtonGroupProps) {
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
}
