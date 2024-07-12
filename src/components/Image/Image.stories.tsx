import { useState } from 'react';
import { objectKeys } from '@gilbarbara/helpers';
import { Meta, StoryObj } from '@storybook/react';

import { Box, BoxCenter, Paragraph } from '~';

import { radius } from '~/modules/theme';

import users from '~/stories/__fixtures__/users.json';
import { hideProps, radiusProps } from '~/stories/__helpers__';
import Code from '~/stories/components/Code';
import Description from '~/stories/components/Description';
import Info from '~/stories/components/Info';

import { defaultProps, Image } from './Image';

type Story = StoryObj<typeof Image>;

const width = 400;
const height = Math.round(width * 0.666);

export default {
  title: 'Media/Image',
  component: Image,
  args: {
    ...defaultProps,
    height,
    width,
  },
  argTypes: {
    ...hideProps(),
    ...radiusProps(),
  },
} satisfies Meta<typeof Image>;

export const Basic: Story = {
  args: {
    alt: 'Tools',
    src: 'https://plus.unsplash.com/premium_photo-1677700375016-efecc99bc526?q=80&w=1280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
};

export const Loading: Story = {
  args: {
    alt: 'Nebula',
    src: 'https://app.requestly.io/delay/2000/https://plus.unsplash.com/premium_photo-1663047540698-12e93c082dda?q=80&w=1280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },

  render: props => (
    <BoxCenter>
      <Image {...props} />
      <Description>
        <Paragraph>
          Image component has a skeleton animation to indicate the image is loading and an opacity
          animation when the image loads.
        </Paragraph>
        <Paragraph>
          You can disable it with the <Code>disableSkeleton</Code> prop.
        </Paragraph>
        <Info nested>
          Note: The URL uses https://app.requestly.io/delay to simulate a slow network.
        </Info>
      </Description>
    </BoxCenter>
  ),
};

export const ZoomOnHover: Story = {
  args: {
    alt: 'Fruits',
    src: 'https://images.unsplash.com/photo-1533893662125-43c54ffa3b41?q=80&w=1280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    zoomOnHover: true,
  },
  render: props => (
    <BoxCenter>
      <Image {...props} />
      <Description>
        You can use the <Code>zoomOnHover</Code> prop make the image zoomed when hovered.
      </Description>
    </BoxCenter>
  ),
};

export const Fallback: Story = {
  args: {
    alt: 'Aurora Borealis',
    fallbackSrc:
      'https://images.unsplash.com/photo-1517928260182-5688aead3066?q=80&w=1280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    src: 'https://app.requestly.io/delay/2000/https://example.com/aurora.jpg',
  },

  render: function Render(props) {
    const { src } = props;
    const [error, setError] = useState(false);

    return (
      <BoxCenter>
        <Image {...props} onError={() => setError(true)} />
        <Info
          bg="white"
          color={error ? 'red.600' : undefined}
          justify="center"
          opacity={0.5}
          width={350}
        >
          {error
            ? `${src?.replace('https://app.requestly.io/delay/2000/', '')} not found`
            : 'Loading...'}
        </Info>
        <Description mt="sm">
          You can use the <Code>fallbackSrc</Code> prop to display a fallback image when the image
          provided in <Code>src</Code> fails to load or it's not found.
          <Info nested>
            Note: The URL uses https://app.requestly.io/delay to simulate a slow network.
          </Info>
        </Description>
      </BoxCenter>
    );
  },
};

export const Radius: Story = {
  args: {
    height: 150,
    width: 150,
  },
  render: props => (
    <>
      <Box flexBox gap={24} maxWidth={768} wrap="wrap">
        {objectKeys(radius).map((d, index) => (
          <BoxCenter key={d} width={150}>
            <Image
              key={d}
              {...props}
              alt={users[index].name}
              radius={d}
              src={users[index].avatar}
            />
            <Paragraph mt="xs">{d}</Paragraph>
          </BoxCenter>
        ))}
      </Box>
      <Info icon="paintbrush">
        You can update the theme <Code>image.radius</Code> to customize the default.
      </Info>
    </>
  ),
};
