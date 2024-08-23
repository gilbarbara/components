import { MouseEvent, useState } from 'react';
import { capitalize } from '@gilbarbara/helpers';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { Button, Paragraph, Spacer } from '~';

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
  title: 'Components/ButtonGroup',
  // category: 'Buttons',
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

export const Sizes: Story = {
  args: Basic.args,
  argTypes: {
    size: disableControl(),
  },
  render: props => (
    <Spacer distribution="center" gap="lg" orientation="vertical">
      {COMPONENT_SIZES.map(d => (
        <>
          <Paragraph align="center" mb="xs" size="xl">
            {d}
          </Paragraph>
          <ButtonGroup key={d} {...props} size={d} />
        </>
      ))}
    </Spacer>
  ),
};

export const Tests: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    items: ['One', { children: 'Two', defaultSelected: true }, 'Three', 'Four'],
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('ButtonGroup');

    await expect(canvas.getByText('One')).toHaveAttribute('data-selected', 'false');
    await userEvent.click(canvas.getByText('One'));
    await expect(canvas.getByText('One')).toHaveAttribute('data-selected', 'true');
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    await expect(canvas.getByText('Four')).toHaveAttribute('data-selected', 'false');
    await userEvent.click(canvas.getByText('Four'));
    await expect(canvas.getByText('Four')).toHaveAttribute('data-selected', 'true');
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};
