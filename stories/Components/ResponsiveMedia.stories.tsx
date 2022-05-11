import { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';
import { ComponentMeta } from '@storybook/react';
import { ResponsiveMedia, ResponsiveMediaProps } from 'src/ResponsiveMedia';

import { grayMid } from 'src/modules/theme';

import { hideProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/ResponsiveMedia',
  component: ResponsiveMedia,
  args: {
    height: 103,
    maxWidth: 400,
    width: 512,
  },
  argTypes: {
    ...hideProps(),
    ...marginProps(),
  },
} as ComponentMeta<typeof ResponsiveMedia>;

export const Basic = (props: ResponsiveMediaProps) => {
  const [showMedia, setShowMedia] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowMedia(true);
    }, 2000);
  }, []);

  return (
    <ResponsiveMedia {...props} style={{ border: `1px dashed ${grayMid}` }}>
      {showMedia ? (
        <SVG src="https://cdn.svgporn.com/logos/storybook.svg" />
      ) : (
        <span>Loading...</span>
      )}
    </ResponsiveMedia>
  );
};
