import { useTheme } from '@emotion/react';

import { getTheme } from '~/modules/helpers';

import LoaderGrow from './Grow';
import LoaderPill from './Pill';
import LoaderPride from './Pride';
import LoaderPulse from './Pulse';
import LoaderRotate from './Rotate';
import { LoaderProps } from './types';

export const defaultProps = {
  color: 'primary',
  block: false,
  type: 'pill',
} satisfies LoaderProps;

export function Loader(props: LoaderProps) {
  const { type, ...rest } = { ...defaultProps, ...props };
  const theme = getTheme({ theme: useTheme() });

  switch (type) {
    case 'grow': {
      return <LoaderGrow theme={theme} {...rest} />;
    }
    case 'pride': {
      return <LoaderPride theme={theme} {...rest} />;
    }
    case 'pulse': {
      return <LoaderPulse theme={theme} {...rest} />;
    }
    case 'rotate': {
      return <LoaderRotate theme={theme} {...rest} />;
    }

    case 'pill':
    default: {
      return <LoaderPill theme={theme} {...rest} />;
    }
  }
}

Loader.displayName = 'Loader';
