import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { mergeProps } from '@gilbarbara/helpers';

import { useTheme } from '~/hooks/useTheme';

import { getStyledOptions } from '~/modules/system';

import { defaultProps, getStyles, HeadingProps } from './utils';

export const StyledH1 = styled(
  'h1',
  getStyledOptions(),
)<HeadingProps>(props => {
  return getStyles('h1', props);
});

export const H1 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const mergedProps = mergeProps(defaultProps, props);
  const { getDataAttributes } = useTheme();

  return <StyledH1 ref={ref} {...getDataAttributes('H1')} {...mergedProps} />;
});

H1.displayName = 'H1';
