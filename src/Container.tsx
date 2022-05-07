import { CSSProperties, forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StringOrNumber } from '@gilbarbara/types';

import { getTheme, px, responsive } from './modules/helpers';
import {
  baseStyles,
  getStyledOptions,
  marginStyles,
  paddingStyles,
  shadowStyles,
} from './modules/system';
import { WithMargin, WithPadding } from './types';

export interface ContainerProps extends WithMargin, WithPadding {
  centered?: boolean;
  children: ReactNode;
  fullScreen?: boolean;
  fullScreenOffset?: StringOrNumber;
  style?: CSSProperties;
  verticalAlign?: 'around' | 'between' | 'bottom' | 'center' | 'evenly' | 'top';
  verticalSpacing?: boolean;
}

export const StyledContainer = styled(
  'div',
  getStyledOptions(),
)<ContainerProps>(props => {
  const { centered, fullScreen, fullScreenOffset, verticalAlign, verticalSpacing } = props;
  const { spacing } = getTheme(props);

  const justifyContentMap = {
    around: 'space-around',
    between: 'space-between',
    bottom: 'flex-end',
    center: 'center',
    evenly: 'space-evenly',
    top: 'flex-start',
  };
  let verticalSpacingStyles;
  let centeredStyles;

  if (verticalSpacing) {
    verticalSpacingStyles = css`
      padding-bottom: ${spacing.md};
      padding-top: ${spacing.md};

      ${responsive({
        lg: {
          paddingBottom: spacing.xl,
          paddingTop: spacing.xl,
        },
      })};
    `;
  }

  if (centered || verticalAlign) {
    centeredStyles = css`
      align-items: center;
      display: flex;
      flex-direction: column;
    `;
  }

  return css`
    ${baseStyles(props)};
    margin-left: auto;
    margin-right: auto;
    padding-left: ${spacing.md};
    padding-right: ${spacing.md};
    position: relative;
    width: 100%;
    ${centeredStyles};
    ${fullScreen &&
    css`
      min-height: ${fullScreenOffset ? `calc(100vh - ${px(fullScreenOffset)})` : '100vh'};
    `};
    ${verticalAlign &&
    css`
      justify-content: ${justifyContentMap[verticalAlign]};
    `};
    ${verticalSpacingStyles};

    ${responsive({
      lg: {
        paddingLeft: spacing.xl,
        paddingRight: spacing.xl,
      },
    })};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${shadowStyles(props)};
  `;
});

export const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  return <StyledContainer ref={ref} data-component-name="Container" {...props} />;
});

Container.displayName = 'Container';
