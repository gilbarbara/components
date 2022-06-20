import { CSSProperties, forwardRef } from 'react';
import { css, CSSObject } from '@emotion/react';
import styled from '@emotion/styled';
import { StringOrNumber } from '@gilbarbara/types';

import { getTheme, px, responsive } from './modules/helpers';
import { baseStyles, getStyledOptions, marginStyles, paddingStyles } from './modules/system';
import {
  Alignment,
  ComponentProps,
  StyledProps,
  WithChildren,
  WithMargin,
  WithPadding,
} from './types';

export interface ContainerKnownProps extends StyledProps, WithChildren, WithMargin, WithPadding {
  /** @default left */
  align?: Alignment | 'stretch';
  fullScreen?: boolean;
  fullScreenOffset?: StringOrNumber;
  style?: CSSProperties;
  /** @default left */
  textAlign?: Alignment;
  /** @default start */
  verticalAlign?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  verticalPadding?: boolean;
}

export type ContainerProps = ComponentProps<HTMLDivElement, ContainerKnownProps>;

const flexMap = {
  center: 'center',
  right: 'flex-end',
  left: 'flex-start',
  stretch: 'stretch',
};

export const StyledContainer = styled(
  'div',
  getStyledOptions(),
)<ContainerProps>(props => {
  const {
    align = 'left',
    fullScreen,
    fullScreenOffset,
    textAlign,
    verticalAlign,
    verticalPadding,
  } = props;
  const { spacing } = getTheme(props);
  const styles: CSSObject = {
    alignItems: flexMap[align],
    justifyContent: verticalAlign,
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
    ${responsive({
      _: {
        paddingLeft: spacing.md,
        paddingRight: spacing.md,
      },
      lg: {
        paddingLeft: spacing.xl,
        paddingRight: spacing.xl,
      },
    })};
    ${verticalPadding &&
    responsive({
      _: {
        paddingBottom: spacing.md,
        paddingTop: spacing.md,
      },
      lg: {
        paddingBottom: spacing.xl,
        paddingTop: spacing.xl,
      },
    })}
    position: relative;
    width: 100%;
    ${css(styles)};

    ${marginStyles(props)};
    ${paddingStyles(props)};
  `;
});

export const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  return <StyledContainer ref={ref} data-component-name="Container" {...props} />;
});

Container.defaultProps = {
  align: 'stretch',
  fullScreen: false,
  textAlign: 'left',
  verticalAlign: 'start',
  verticalPadding: false,
};
