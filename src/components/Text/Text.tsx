import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyledOptions, getStyles } from '~/modules/system';

import { TextProps, useText } from '~/components/Text/useText';

import { WithTheme } from '~/types';

export const StyledText = styled('span', getStyledOptions())<TextProps & WithTheme>(
  {
    display: 'inline-block',
    textDecoration: 'inherit',
  },
  props => getStyles(props, { skipSpacing: true, useFontSize: true }),
);

export const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useText(props);

  return <StyledText ref={ref} {...getDataAttributes('Text')} {...componentProps} />;
});

Text.displayName = 'Text';

export { type TextProps } from './useText';
