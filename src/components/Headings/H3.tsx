import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { mergeProps } from '@gilbarbara/helpers';

import { useTheme } from '~/hooks/useTheme';

import { getStyledOptions } from '~/modules/system';

import { defaultProps, getStyles, HeadingProps } from './utils';

export const StyledH3 = styled(
  'h3',
  getStyledOptions(),
)<HeadingProps>(props => {
  return getStyles('h3', props);
});

export const H3 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const mergedProps = mergeProps(defaultProps, props);
  const { getDataAttributes } = useTheme();

  return <StyledH3 ref={ref} {...getDataAttributes('H3')} {...mergedProps} />;
});

H3.displayName = 'H3';
