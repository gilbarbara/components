import { useCallback, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, userEvent, waitFor, within } from '@storybook/test';

import { Box, Button, Paragraph } from '~';

import { hideStoryFromDocsPage, layoutProps } from '~/stories/__helpers__';

import { ClickOutside, ClickOutsideProps } from './ClickOutside';

type Story = StoryObj<typeof ClickOutside>;

export default {
  title: 'Display/ClickOutside',
  component: ClickOutside,
  args: {
    active: true,
    width: 400,
  },
  argTypes: {
    ...layoutProps(),
  },
} satisfies Meta<typeof ClickOutside>;

function Render(props: ClickOutsideProps) {
  const [isActive, setActive] = useState(true);

  const handleClick = useCallback(() => {
    setActive(!isActive);
  }, [isActive]);

  return (
    <ClickOutside {...props} onClick={handleClick}>
      <Box border padding="md">
        <Button disabled={isActive} onClick={handleClick} size="xs">
          {isActive ? 'Content is visible' : 'Click to show'}
        </Button>

        <Paragraph bold mt="md" size="lg">
          Culpa incididunt cillum aliquip dolore
        </Paragraph>
        {isActive && (
          <Box data-component-name="Content" mt="md">
            <Paragraph>
              Culpa exercitation magna cupidatat veniam irure sit mollit et est aliquip nulla
              officia. Exercitation sint ea mollit esse proident eu sint qui duis et officia commodo
              id dolore consectetur. Eu eu occaecat officia laborum laboris duis enim ex deserunt.
            </Paragraph>
            <Paragraph bold size="sm">
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

    await waitFor(() => {
      expect(canvas.getByTestId('ClickOutside')).toHaveAttribute('data-ready', 'true');
    });

    await expect(canvas.getByTestId('Content')).toBeInTheDocument();

    await userEvent.click(document.body);
    await expect(canvas.queryByTestId('Content')).not.toBeInTheDocument();

    await fireEvent.touchEnd(canvas.getByTestId('Button'));
    await userEvent.click(canvas.getByTestId('Button'));
    await expect(canvas.getByTestId('Content')).toBeInTheDocument();
  },
};
