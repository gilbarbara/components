import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { mergeProps } from '@gilbarbara/helpers';

import { useTheme } from '~/hooks/useTheme';

import { getStyledOptions } from '~/modules/system';

import { defaultProps, getStyles, HeadingProps } from './utils';

export const StyledH2 = styled(
  'h2',
  getStyledOptions(),
)<HeadingProps>(props => {
  return getStyles('h2', props);
});

export const H2 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const mergedProps = mergeProps(defaultProps, props);
  const { getDataAttributes } = useTheme();

  return <StyledH2 ref={ref} {...getDataAttributes('H2')} {...mergedProps} />;
});

H2.displayName = 'H2';
