import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { useTheme } from '~/hooks/useTheme';

import { getStyledOptions } from '~/modules/system';

import { getStyles, HeadingLargeProps, jumboDefaultProps } from './utils';

export const StyledJumbo = styled(
  'h1',
  getStyledOptions(),
)<HeadingLargeProps>(props => {
  const { large } = props;

  return getStyles(large ? 'jumboLarge' : 'jumbo', props);
});

export const Jumbo = forwardRef<HTMLHeadingElement, HeadingLargeProps>((props, ref) => {
  const { getDataAttributes } = useTheme();

  return (
    <StyledJumbo ref={ref} {...getDataAttributes('Jumbo')} {...jumboDefaultProps} {...props} />
  );
});

Jumbo.displayName = 'Jumbo';
