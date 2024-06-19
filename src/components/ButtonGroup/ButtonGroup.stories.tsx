import { MouseEvent, useState } from 'react';
import { capitalize } from '@gilbarbara/helpers';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '~';

import { colorProps, COMPONENT_SIZES, disableControl, hideProps } from '~/stories/__helpers__';

import { ButtonGroup, defaultProps } from './ButtonGroup';

type Story = StoryObj<typeof ButtonGroup>;

export default {
  title: 'Buttons/ButtonGroup',
  component: ButtonGroup,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
    children: disableControl(),
    size: { control: 'radio', options: COMPONENT_SIZES },
  },
} satisfies Meta<typeof ButtonGroup>;

export const Basic: Story = {
  render: function Render(props) {
    const [active, setActive] = useState('two');

    const handleClick = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
      if (currentTarget instanceof HTMLButtonElement) {
        setActive(currentTarget.dataset.name ?? '');
      }
    };

    return (
      <ButtonGroup {...props}>
        {['one', 'two', 'three', 'four'].map(name => (
          <Button
            key={name}
            data-name={name}
            onClick={handleClick}
            variant={active === name ? 'solid' : 'bordered'}
          >
            {capitalize(name)}
          </Button>
        ))}
      </ButtonGroup>
    );
  },
};
