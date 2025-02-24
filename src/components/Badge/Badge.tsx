import { useMemo } from 'react';
import { css, CSSObject } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { SetRequired } from '@gilbarbara/types';

import { getColorTokens } from '~/modules/colors';
import { getStyledOptions, getStyles } from '~/modules/system';

import { WithTheme } from '~/types';

import { BadgeProps, useBadge } from './useBadge';

export const StyledBadgeWrapper = styled('div', getStyledOptions('shape'))<WithTheme>(
  {
    display: 'flex',
    position: 'relative',
    width: 'min-content',
  },
  props => getStyles(props, { skipColor: true }),
);

export const StyledBadge = styled('span', getStyledOptions('shape'))<
  SetRequired<
    Omit<BadgeProps, 'children'>,
    'hideBorder' | 'dot' | 'hideBadge' | 'placement' | 'size'
  > &
    WithTheme
>(
  {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    lineHeight: 1,
    position: 'absolute',
    transition: 'opacity 0.3s',
  },
  props => {
    const {
      borderColor,
      dot,
      hideBadge,
      hideBorder,
      offsetX,
      offsetY,
      placement,
      shape,
      size,
      theme,
    } = props;
    const { black, darkMode, spacing, typography, white } = theme;

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
          right: ${px(offsetX ?? offsetValue)};
          top: ${px(offsetY ?? offsetValue)};
          transform: translate(${transformValue}, -${transformValue});
        `;
        break;
      }
      case 'top-left': {
        position = css`
          left: ${px(offsetX ?? offsetValue)};
          top: ${px(offsetY ?? offsetValue)};
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
      ${!hideBorder ? `border: 2px solid ${borderColorValue};` : undefined};
      font-size: ${sizingMap[size].fontSize};
      height: ${sizingMap[size].size};
      min-width: ${sizingMap[size].size};
      opacity: ${hideBadge ? 0 : 1};
      padding-left: ${sizingMap[size].padding};
      padding-right: ${sizingMap[size].padding};
      ${position};
      ${getStyles(props, { skipBorder: true })};
    `;
  },
);

export function Badge(props: BadgeProps) {
  const { componentProps, getDataAttributes } = useBadge(props);
  const { children, content, dot, ...rest } = componentProps;

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

Badge.displayName = 'Badge';

export { type BadgeProps, defaultProps } from './useBadge';
