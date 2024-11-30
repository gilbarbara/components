import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyledOptions, getStyles } from '~/modules/system';

import { WithTheme } from '~/types';

import { FlexProps, useFlex } from './useFlex';

export const StyledFlex = styled('div', getStyledOptions('fill'))<FlexProps & WithTheme>(
  {},
  props => getStyles(props, { skipBorder: true }),
);

export const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useFlex(props, 'Flex');

  return <StyledFlex ref={ref} {...getDataAttributes('Flex')} {...componentProps} />;
});

Flex.displayName = 'Box';

export const FlexCenter = forwardRef<HTMLDivElement, Omit<FlexProps, 'display'>>((props, ref) => {
  const { componentProps, getDataAttributes } = useFlex(props, 'FlexCenter');

  return <StyledFlex ref={ref} {...getDataAttributes('FlexCenter')} {...componentProps} />;
});

FlexCenter.displayName = 'FlexCenter';

export const FlexInline = forwardRef<HTMLDivElement, Omit<FlexProps, 'display'>>((props, ref) => {
  const { componentProps, getDataAttributes } = useFlex(props, 'FlexInline');

  return <StyledFlex ref={ref} {...getDataAttributes('FlexInline')} {...componentProps} />;
});

FlexInline.displayName = 'FlexInline';
export {
  type FlexProps,
  flexDefaultProps,
  flexInlineDefaultProps,
  flexCenterDefaultProps,
} from './useFlex';
