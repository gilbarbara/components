import { ReactNode } from 'react';

import { useTheme } from '~';

import { getColorTokens } from '~/modules/colors';

import { ColorVariantTones } from '~/types';

interface Props {
  bg?: ColorVariantTones;
  children: ReactNode;
  color?: ColorVariantTones;
}

export default function Code({ bg, children, color }: Props) {
  const { theme } = useTheme();

  const { darkMode, fontMonospace, grayScale } = theme;

  const { mainColor, textColor } = getColorTokens(
    bg ?? (darkMode ? grayScale['800'] : grayScale['100']),
    color ?? (darkMode ? grayScale['300'] : grayScale['800']),
    theme,
  );

  return (
    <code
      style={{
        backgroundColor: mainColor,
        color: textColor,
        fontFamily: fontMonospace,
        fontSize: '90%',
        margin: '0 4px',
        padding: '2px 6px',
        borderRadius: '6px',
      }}
    >
      {children}
    </code>
  );
}
