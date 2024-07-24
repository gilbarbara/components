import { ReactNode, useMemo } from 'react';
import { css, CSSObject } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps, px } from '@gilbarbara/helpers';
import { SetRequired, Simplify } from '@gilbarbara/types';

import { useTheme } from '~/hooks/useTheme';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import {
  baseStyles,
  colorStyles,
  getStyledOptions,
  marginStyles,
  paddingStyles,
  radiusStyles,
} from '~/modules/system';

import {
  StyledProps,
  VariantWithTones,
  WithChildren,
  WithColors,
  WithComponentSize,
  WithMargin,
  WithPadding,
  WithRadius,
} from '~/types';

export interface BadgeKnownProps
  extends StyledProps,
    WithChildren,
    WithColors,
    WithComponentSize,
    WithMargin,
    WithPadding,
    WithRadius {
  /**
   * The border color of the badge.
   * if not set the badge will have a white border on light mode and a black border on dark mode.
   */
  borderColor?: VariantWithTones;
  /**
   * The content of the badge. The badge will be rendered relative to its children.
   */
  content?: ReactNode;
  /**
   * Render the badge as a dot.
   * @default false
   */
  dot?: boolean;
  /**
   * Hide the badge.
   * @default false
   */
  hideBadge?: boolean;
  /**
   * Hide the border around the badge.
   * @default false
   */
  hideBorder?: boolean;
  /**
   * The horizontal offset of the badge.
   * @default 0
   */
  offsetX?: number;
  /**
   * The vertical offset of the badge.
   * @default 0
   */
  offsetY?: number;
  /**
   * The placement of the badge.
   * @default top-right
   */
  placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /**
   * The shape of the badge.
   * @default rectangle
   */
  shape?: 'circle' | 'rectangle';
}

export type BadgeProps = Simplify<BadgeKnownProps>;

export const defaultProps = {
  bg: 'primary',
  hideBorder: false,
  dot: false,
  hideBadge: false,
  placement: 'top-right',
  radius: 'sm',
  shape: 'rectangle',
  size: 'md',
} satisfies Omit<BadgeProps, 'children'>;

export const StyledBadgeWrapper = styled(
  'div',
  getStyledOptions('shape'),
)(props => {
  return css`
    ${baseStyles(props)};
    display: flex;
    position: relative;
    width: min-content;
    ${marginStyles(props)};
  `;
});

export const StyledBadge = styled(
  'span',
  getStyledOptions('shape'),
)<
  SetRequired<
    Omit<BadgeProps, 'children'>,
    'hideBorder' | 'dot' | 'hideBadge' | 'placement' | 'size'
  >
>(props => {
  const { borderColor, dot, hideBadge, hideBorder, offsetX, offsetY, placement, shape, size } =
    props;
  const { black, darkMode, spacing, typography, white, ...theme } = getTheme(props);

  let borderColorValue = darkMode ? black : white;
  const offsetValue = dot || shape === 'circle' ? '10%' : '5%';
  const transformValue = dot ? '50%' : '40%';
  let position: CSSObject = {};

  if (borderColor) {
    borderColorValue = getColorTokens(borderColor, null, theme).mainColor;
  }

  const sizingMap = {
    sm: {
      fontSize: typography.xs.fontSize,
      padding: dot ? undefined : '2px',
      size: dot ? '12px' : '16px',
    },
    md: {
      fontSize: typography.sm.fontSize,
      padding: dot ? undefined : spacing.xxs,
      size: dot ? '14px' : '20px',
    },
    lg: {
      fontSize: typography.md.fontSize,
      padding: dot ? undefined : spacing.xxs,
      size: dot ? '16px' : '24px',
    },
  };

  switch (placement) {
    case 'top-right': {
      position = css`
        top: ${px(offsetY ?? offsetValue)};
        right: ${px(offsetX ?? offsetValue)};
        transform: translate(${transformValue}, -${transformValue});
      `;
      break;
    }
    case 'top-left': {
      position = css`
        top: ${px(offsetY ?? offsetValue)};
        left: ${px(offsetX ?? offsetValue)};
        transform: translate(-${transformValue}, -${transformValue});
      `;
      break;
    }
    case 'bottom-right': {
      position = css`
        bottom: ${px(offsetY ?? offsetValue)};
        right: ${px(offsetX ?? offsetValue)};
        transform: translate(${transformValue}, ${transformValue});
      `;
      break;
    }
    case 'bottom-left': {
      position = css`
        bottom: ${px(offsetY ?? offsetValue)};
        left: ${px(offsetX ?? offsetValue)};
        transform: translate(-${transformValue}, ${transformValue});
      `;
      break;
    }
  }

  return css`
    ${baseStyles(props)};
    align-items: center;
    ${!hideBorder ? `border: 2px solid ${borderColorValue};` : undefined};
    display: inline-flex;
    font-size: ${sizingMap[size].fontSize};
    height: ${sizingMap[size].size};
    justify-content: center;
    line-height: 1;
    opacity: ${hideBadge ? 0 : 1};
    padding-left: ${sizingMap[size].padding};
    padding-right: ${sizingMap[size].padding};
    min-width: ${sizingMap[size].size};
    position: absolute;
    transition: opacity 0.3s;
    ${position};
    ${colorStyles(props, { withoutBorder: true })};
    ${paddingStyles(props)};
    ${radiusStyles(props)};
  `;
});

export function Badge(props: BadgeProps) {
  const { children, content, dot, ...rest } = mergeProps(defaultProps, props);

  const { getDataAttributes } = useTheme();

  const isDot = useMemo(() => dot || !content || !content.toString().length, [content, dot]);

  return (
    <StyledBadgeWrapper {...getDataAttributes('Badge')} {...rest}>
      {children}
      <StyledBadge dot={isDot} {...rest}>
        {!isDot && content}
      </StyledBadge>
    </StyledBadgeWrapper>
  );
}
