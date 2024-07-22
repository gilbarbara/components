import { MouseEvent, useState } from 'react';
import { capitalize } from '@gilbarbara/helpers';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '~';

import {
  colorProps,
  COMPONENT_SIZES,
  disableControl,
  hideProps,
  marginProps,
} from '~/stories/__helpers__';
import Code from '~/stories/components/Code';
import Description from '~/stories/components/Description';

import { ButtonGroup, defaultProps } from './ButtonGroup';

type Story = StoryObj<typeof ButtonGroup>;

export default {
  title: 'Buttons/ButtonGroup',
  component: ButtonGroup,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
    ...marginProps(),
    children: disableControl(),
    size: { control: 'radio', options: COMPONENT_SIZES },
  },
} satisfies Meta<typeof ButtonGroup>;

export const Basic: Story = {
  args: {
    items: ['One', { children: 'Two', defaultSelected: true }, 'Three', 'Four'],
    onClick: event => action('onClick')(event.currentTarget.textContent),
  },
  render: props => (
    <>
      <ButtonGroup {...props} />
      <Description>
        Use the <Code>items</Code> prop to define the buttons.
        <br />
        It can be an array of strings or an object of <Code>Button</Code> props.
        <br />
        To set an initial selected button, use the <Code>defaultSelected</Code> prop.
      </Description>
    </>
  ),
};

export const WithChildren: Story = {
  args: {
    bg: 'red',
    size: 'sm',
  },
  render: function Render(props) {
    const [active, setActive] = useState('two');

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      const { name = '' } = event.currentTarget.dataset;

      setActive(name);
      action('onClick')(name);
    };

    return (
      <>
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
        <Description>
          Alternatively, you can use set a collection of <Code>Button</Code> as children and handle
          the selection by yourself.
        </Description>
      </>
    );
  },
};
