import { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';
import { Meta, StoryObj } from '@storybook/react';

import { grayScale } from '~/modules/theme';
import { hideProps, hideTable, marginProps } from '~/stories/__helpers__';
import Info from '~/stories/components/Info';

import { AspectRatio } from './AspectRatio';

type Story = StoryObj<typeof AspectRatio>;

export default {
  title: 'Components/AspectRatio',
  // category: 'Media',
  component: AspectRatio,
  argTypes: {
    ...hideProps(),
    ...marginProps(),
    children: hideTable(),
  },
} satisfies Meta<typeof AspectRatio>;

export const Basic: Story = {
  args: {
    maxWidth: 400,
    ratio: 512 / 103,
  },
  render: function Render(props) {
    const [showMedia, setShowMedia] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        setShowMedia(true);
      }, 1000);
    }, []);

    return (
      <>
        <AspectRatio {...props} style={{ border: `1px dashed ${grayScale['500']}` }}>
          {showMedia ? (
            <SVG src="https://cdn.svgporn.com/logos/storybook.svg" />
          ) : (
            <span>Loading...</span>
          )}
        </AspectRatio>
        <Info color="gray.400" icon="info" mt="lg">
          The border and loader are visual guides
        </Info>
      </>
    );
  },
};

export const WithImage: Story = {
  args: {
    children: (
      <img
        alt="test"
        src="https://app.requestly.io/delay/2000/https://images.unsplash.com/photo-1552120476-9ee56c8611f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080&q=80"
      />
    ),
    ratio: 16 / 9,
  },
  render: props => (
    <>
      <AspectRatio {...props} style={{ border: `1px dashed ${grayScale['500']}` }} />
      <Info color="gray.400" icon="info" mt="lg">
        The border is a visual guide
      </Info>
    </>
  ),
};

export const WithVideo: Story = {
  args: {
    children: (
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        frameBorder="0"
        height="315"
        src="https://www.youtube.com/embed/8pDqJVdNa44"
        title="YouTube video player"
        width="560"
      />
    ),
    ratio: 16 / 9,
  },
  render: props => (
    <>
      <AspectRatio {...props} style={{ border: `1px dashed ${grayScale['500']}` }} />
      <Info color="gray.400" icon="info" mt="lg">
        The border is a visual guide
      </Info>
    </>
  ),
};
