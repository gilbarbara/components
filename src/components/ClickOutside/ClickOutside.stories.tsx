import { useState } from 'react';
import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { fireEvent, userEvent, within } from '@storybook/testing-library';

import { Box, ButtonUnstyled, Paragraph } from '~';

import { hideStoryFromDocsPage } from '~/stories/__helpers__';

import { ClickOutside, ClickOutsideProps } from './ClickOutside';

type Story = StoryObj<typeof ClickOutside>;

export default {
  title: 'Display/ClickOutside',
  component: ClickOutside,
  args: {
    active: true,
  },
} satisfies Meta<typeof ClickOutside>;

function Render(props: ClickOutsideProps) {
  const [isActive, setActive] = useState(true);

  const handleClick = () => {
    setActive(!isActive);
  };

  return (
    <ClickOutside {...props} onClick={handleClick}>
      <Box border padding="md" width={400}>
        <ButtonUnstyled color="primary" disabled={isActive} onClick={handleClick}>
          {isActive ? 'Content is visible' : 'Click to show'}
        </ButtonUnstyled>

        <Paragraph bold mt="md" size="large">
          Culpa incididunt cillum aliquip dolore
        </Paragraph>
        {isActive && (
          <Box data-component-name="Content" mt="md">
            <Paragraph>
              Culpa exercitation magna cupidatat veniam irure sit mollit et est aliquip nulla
              officia. Exercitation sint ea mollit esse proident eu sint qui duis et officia commodo
              id dolore consectetur. Eu eu occaecat officia laborum laboris duis enim ex deserunt.
            </Paragraph>
            <Paragraph bold size="mid">
              Click outside the border to hide it
            </Paragraph>
          </Box>
        )}
      </Box>
    </ClickOutside>
  );
}

export const Basic: Story = {
  render: props => <Render {...props} />,
};

export const Tests: Story = {
  ...hideStoryFromDocsPage(),
  tags: ['hidden'],
  render: props => <Render {...props} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('ClickOutside');

    expect(canvas.getByTestId('Content')).toBeInTheDocument();

    await userEvent.click(document.body);
    expect(canvas.queryByTestId('Content')).not.toBeInTheDocument();

    fireEvent.touchEnd(canvas.getByTestId('ButtonUnstyled'));
    await userEvent.click(canvas.getByTestId('ButtonUnstyled'));
    expect(canvas.getByTestId('Content')).toBeInTheDocument();
  },
};
