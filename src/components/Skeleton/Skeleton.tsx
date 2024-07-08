import { forwardRef, isValidElement } from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps } from '@gilbarbara/helpers';
import { useIsFirstMount } from '@gilbarbara/hooks';
import { SetRequired } from '@gilbarbara/types';

import { useTheme } from '~/hooks/useTheme';

import { fadeIn } from '~/modules/animations';
import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import {
  baseStyles,
  getStyledOptions,
  layoutStyles,
  marginStyles,
  radiusStyles,
} from '~/modules/system';

import { baseDefaultProps, SkeletonProps } from './utils';

const bgAnimation = keyframes`
  0% {
    background-position: 60% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

export const defaultProps = {
  ...baseDefaultProps,
  fitContent: false,
};

export const StyledSkeleton = styled(
  'div',
  getStyledOptions(),
)<
  SetRequired<
    SkeletonProps,
    'accent' | 'animationDelay' | 'animationDuration' | 'bg' | 'fitContent'
  >
>(props => {
  const { accent, animationDelay, animationDuration, bg, fitContent } = props;
  const theme = getTheme(props);
  const { mainColor: accentColor } = getColorTokens(accent, null, theme);
  const { mainColor: bgColor } = getColorTokens(bg, null, theme);

  return css`
    ${baseStyles(props)};
    animation: ${bgAnimation} ${animationDuration}s infinite ease-in-out;
    animation-delay: ${animationDelay}s;
    background: ${bgColor} linear-gradient(90deg, ${bgColor} 0, ${bgColor} 10%, ${accentColor} 25%, ${bgColor} 40%, ${bgColor} 100%);
    background-position: 60% 0;
    background-repeat: no-repeat;
    background-size: 200% 100%;
    display: flex;
    flex-direction: column;
    pointer-events: none;
    user-select: none;
    width: ${fitContent ? 'fit-content' : undefined};
    ${layoutStyles(props)};
    ${marginStyles(props)};
    ${radiusStyles(props)};
    
    &:before, &:after, > * {
      visibility: hidden;
    },
  `;
});

const StyledContent = styled(
  'div',
  getStyledOptions(),
)<{ appearDuration: number; isFirstRender: boolean }>(props => {
  const { appearDuration, isFirstRender } = props;

  return css`
    animation: ${isFirstRender
      ? 'none'
      : css`
          ${fadeIn} ${appearDuration}s ease-in-out forwards
        `};
    display: flex;
    flex-direction: column;
    opacity: ${isFirstRender ? 1 : 0};
  `;
});

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
  const { appearDuration, children, isLoaded, ...rest } = mergeProps(defaultProps, props);
  const isFirstRender = useIsFirstMount();
  const { getDataAttributes } = useTheme();

  if (isLoaded) {
    return (
      <StyledContent
        ref={ref}
        appearDuration={appearDuration}
        {...getDataAttributes('Skeleton')}
        isFirstRender={isFirstRender}
      >
        {children}
      </StyledContent>
    );
  }

  let content;

  if (children) {
    content = isValidElement(children) ? children : <div>{children}</div>;
  }

  return (
    <StyledSkeleton ref={ref} {...getDataAttributes('Skeleton')} {...rest}>
      {content}
    </StyledSkeleton>
  );
});

Skeleton.displayName = 'Skeleton';
