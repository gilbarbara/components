import { CSSProperties, forwardRef } from 'react';
import { css, CSSObject } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps, px } from '@gilbarbara/helpers';
import { SetRequired, Simplify, StringOrNumber } from '@gilbarbara/types';

import { useTheme } from '~/hooks/useTheme';

import {
  baseStyles,
  flexBoxStyles,
  flexItemStyles,
  getContainerStyles,
  layoutStyles,
  marginStyles,
  paddingStyles,
} from '~/modules/system';

import { Box } from '~/components/Box';

import {
  Alignment,
  StyledProps,
  WithChildren,
  WithFlexBox,
  WithFlexItem,
  WithHTMLAttributes,
  WithLayout,
  WithMargin,
  WithPadding,
} from '~/types';

export interface ContainerKnownProps
  extends StyledProps,
    WithChildren,
    WithFlexBox,
    WithFlexItem,
    WithHTMLAttributes,
    WithLayout,
    WithMargin,
    WithPadding {
  /** @default left */
  align?: Alignment | 'stretch';
  fullScreen?: boolean;
  fullScreenOffset?: StringOrNumber;
  /**
   * Update the padding for large screens.
   * @default true
   */
  responsive?: boolean;
  style?: CSSProperties;
  /** @default left */
  textAlign?: Alignment;
  verticalPadding?: boolean;
}

export type ContainerProps = Simplify<ContainerKnownProps>;

const flexMap = {
  center: 'center',
  right: 'flex-end',
  left: 'flex-start',
  stretch: 'stretch',
};

export const defaultProps = {
  align: 'stretch',
  fullScreen: false,
  responsive: true,
  textAlign: 'left',
  justify: 'start',
  verticalPadding: false,
} satisfies Omit<ContainerProps, 'children'>;

export const StyledContainer = styled(Box)<SetRequired<ContainerProps, 'align'>>(props => {
  const { align, fullScreen, fullScreenOffset, responsive, textAlign, verticalPadding } = props;
  const styles: CSSObject = {
    alignItems: flexMap[align],
    textAlign,
  };

  if (fullScreen) {
    styles.minHeight = fullScreenOffset ? `calc(100vh - ${px(fullScreenOffset)})` : '100vh';
  }

  return css`
    ${baseStyles(props)};
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    width: 100%;
    ${css(styles)};
    ${getContainerStyles(props, { responsive, verticalPadding })};
    ${flexBoxStyles(props)};
    ${flexItemStyles(props)};
    ${layoutStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props, true)};
  `;
});

export const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const mergedProps = mergeProps(defaultProps, props);
  const { getDataAttributes } = useTheme();

  return <StyledContainer ref={ref} {...getDataAttributes('Container')} {...mergedProps} />;
});

Container.displayName = 'Container';
