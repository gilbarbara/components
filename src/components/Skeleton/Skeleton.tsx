import { forwardRef, isValidElement } from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useIsFirstRender } from '@gilbarbara/hooks';
import { SetRequired } from '@gilbarbara/types';

import { fadeIn } from '~/modules/animations';
import { getColorTokens } from '~/modules/colors';
import { getStyledOptions, getStyles } from '~/modules/system';

import { WithTheme } from '~/types';

import { SkeletonProps, useSkeleton } from './useSkeleton';

const bgAnimation = keyframes`
  0% {
    background-position: 60% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

export const StyledSkeleton = styled('div', getStyledOptions())<
  SetRequired<
    SkeletonProps,
    'accent' | 'animationDelay' | 'animationDuration' | 'bg' | 'fitContent'
  > &
    WithTheme
>(
  {
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'none',
    userSelect: 'none',
  },
  props => {
    const { accent, animationDelay, animationDuration, bg, fitContent, theme } = props;
    const { mainColor: accentColor } = getColorTokens(accent, null, theme);
    const { mainColor: bgColor } = getColorTokens(bg, null, theme);

    return css`
      animation: ${bgAnimation} ${animationDuration}s infinite ease-in-out;
      animation-delay: ${animationDelay}s;
      background: ${bgColor}
        linear-gradient(
          90deg,
          ${bgColor} 0,
          ${bgColor} 10%,
          ${accentColor} 25%,
          ${bgColor} 40%,
          ${bgColor} 100%
        );
      background-position: 60% 0;
      background-repeat: no-repeat;
      background-size: 200% 100%;
      width: ${fitContent ? 'fit-content' : undefined};
      ${getStyles(props, { skipColor: true })};

      &:before,
      &:after,
      > * {
        visibility: hidden;
      }
    `;
  },
);

const StyledContent = styled('div', getStyledOptions())<{
  appearDuration: number;
  isFirstRender: boolean;
}>(
  {
    display: 'flex',
    flexDirection: 'column',
  },
  props => {
    const { appearDuration, isFirstRender } = props;

    return css`
      ${isFirstRender && 'animation: none'};
      ${!isFirstRender &&
      css`
        animation: ${fadeIn} ${appearDuration}s ease-in-out forwards;
      `};
      opacity: ${isFirstRender ? 1 : 0};
    `;
  },
);

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useSkeleton(props);
  const { appearDuration, children, isLoaded, ...rest } = componentProps;
  const isFirstRender = useIsFirstRender();

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

export { defaultProps, type SkeletonProps } from './useSkeleton';
