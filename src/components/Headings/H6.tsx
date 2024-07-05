import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { mergeProps } from '@gilbarbara/helpers';

import { useTheme } from '~/hooks/useTheme';

import { getStyledOptions } from '~/modules/system';

import { defaultProps, getStyles, HeadingProps } from './utils';

export const StyledH6 = styled(
  'h6',
  getStyledOptions(),
)<HeadingProps>(props => {
  return getStyles('h6', props);
});

export const H6 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const mergedProps = mergeProps(defaultProps, props);
  const { getDataAttributes } = useTheme();

  return <StyledH6 ref={ref} {...getDataAttributes('H6')} {...mergedProps} />;
});

H6.displayName = 'H6';
