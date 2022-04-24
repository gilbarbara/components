import * as React from 'react';
import SVG from 'react-inlinesvg';
import { useTheme } from '@emotion/react';
import { ComponentMeta } from '@storybook/react';

import { ResponsiveMedia } from '../../src';
import { grayMid } from '../../src/modules/theme';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/ResponsiveMedia',
  component: ResponsiveMedia,
  argTypes: {
    ...hideProps(),
    height: { defaultValue: 279 },
    width: { defaultValue: 512 },
    maxWidth: { defaultValue: 400 },
  },
} as ComponentMeta<typeof ResponsiveMedia>;

export const Basic = (props: any) => {
  const [showMedia, setShowMedia] = React.useState(false);
  const { darkMode } = useTheme() as { darkMode: boolean };

  React.useEffect(() => {
    setTimeout(() => {
      setShowMedia(true);
    }, 2000);
  }, []);

  return (
    <ResponsiveMedia {...props} style={{ border: `1px dashed ${grayMid}` }}>
      {showMedia ? (
        <SVG src={`https://cdn.byintera.com/inhire/404-${darkMode ? 'light' : 'dark'}.svg`} />
      ) : (
        <span>Loading...</span>
      )}
    </ResponsiveMedia>
  );
};
