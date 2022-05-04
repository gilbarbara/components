import isPropValid from '@emotion/is-prop-valid';
import { css, CSSObject } from '@emotion/react';
import is from 'is-lite';
import { rgba } from 'polished';

import { getColorVariant, getTheme, px } from './helpers';

import {
  WithAlign,
  WithColor,
  WithDisplay,
  WithInvert,
  WithLayout,
  WithMargin,
  WithPadding,
  WithRadius,
  WithShadow,
  WithTextOptions,
  WithTheme,
  WithTransparent,
} from '../types';

export const styledOptions = {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) &&
    !['color', 'loading', 'margin', 'padding', 'radius', 'shadow', 'width'].includes(prop) &&
    !['onClear', 'onCreate', 'onDropdown', 'onSelect'].some(d => prop.startsWith(d)),
};

export function isDarkMode(props: WithTheme) {
  return !!props?.theme?.darkMode;
}

export function alignStyles<T extends WithAlign>(props: T): CSSObject {
  const { align } = props;

  if (align) {
    return {
      textAlign: align,
    };
  }

  return {};
}

export const appearanceStyles: CSSObject = {
  appearance: 'none',
};

export function backgroundStyles<T extends WithColor & WithInvert & WithTransparent & WithTheme>(
  props: T,
): CSSObject {
  const { variants } = getTheme(props);
  const { invert, shade = 'mid', transparent, variant } = props;

  if (variant) {
    const { bg, color } = getColorVariant(variant, shade, variants);

    return {
      backgroundColor: invert || transparent ? 'transparent' : bg,
      border: transparent ? 0 : `1px solid ${bg}`,
      color: invert || transparent ? bg : color,
    };
  }

  return {};
}

export function baseStyles<T extends WithColor & WithTheme>(props: T): CSSObject {
  const { fontFamily } = getTheme(props);

  return {
    boxSizing: 'border-box',
    fontFamily,
  };
}

export const buttonStyles: CSSObject = {
  ...appearanceStyles,
  backgroundColor: 'transparent',
  border: 0,
};

export function colorStyles<T extends WithColor & WithTheme>(props: T): CSSObject {
  const { shade = 'mid', variant } = props;
  const { variants } = getTheme(props);

  if (variant) {
    const { bg } = getColorVariant(variant, shade, variants);

    return {
      color: bg,
    };
  }

  return {};
}

export function displayStyles<T extends WithDisplay>(props: T): CSSObject {
  const { display } = props;

  return { display };
}

export function inputStyles<T extends WithTheme & { borderless?: boolean; multiple?: boolean }>(
  props: T,
) {
  const { borderless, multiple } = props;
  const darkMode = isDarkMode(props);
  const {
    colors,
    darkColor,
    fontFamily,
    grayDark,
    grayDarker,
    grayLighter,
    grayLightest,
    grayMid,
    lightColor,
    radius,
    typography,
    white,
  } = getTheme(props);

  const isSelect = is.boolean(multiple);
  const placeholderColor = grayMid;

  const disabled = css`
    ${!borderless && `background-color: ${darkMode ? grayDark : grayLightest}`};
    border-color: ${darkMode ? grayDark : grayLighter};
    color: ${darkMode ? grayLighter : grayDark};
    cursor: not-allowed;
  `;

  const styles = borderless
    ? css`
        background-color: transparent;
        border: 0;
        border-bottom: 1px solid ${darkMode ? grayDark : grayMid};
      `
    : css`
        background-color: ${darkMode ? grayDarker : white};
        border: 1px solid ${darkMode ? grayDark : grayMid};
        border-radius: ${radius.xs};
      `;

  return css`
    color: ${darkMode ? lightColor : darkColor};
    display: block;
    font-family: ${fontFamily};
    font-size: ${typography.regular.fontSize};
    line-height: 1.4;
    ${styles};

    &:focus {
      ${!!borderless && `border-color: ${colors.primary}`};
      box-shadow: ${borderless ? '' : `0 0 8px 1px ${rgba(colors.primary, 1)}`};
      outline: none;
    }

    &:disabled {
      ${disabled};
    }

    ${!isSelect &&
    css`
      &::placeholder {
        color: ${placeholderColor};
      }

      &:not(:placeholder-shown) {
        border-color: ${colors.primary};
      }

      &:read-only {
        ${disabled};
      }
    `};
  `;
}

export function layoutStyles<T extends WithLayout>(props: T): CSSObject {
  const {
    bottom,
    display,
    height,
    left,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    opacity,
    overflow,
    pointerEvents,
    position,
    right,
    textAlign,
    top,
    transform,
    transformOrigin,
    transition,
    width,
    zIndex,
  } = props;

  const output: CSSObject = {
    opacity,
    overflow,
    pointerEvents,
    position,
    textAlign,
    transition,
    transform,
    transformOrigin,
    zIndex,
  };

  if (!is.nullOrUndefined(bottom)) {
    output.bottom = px(bottom);
  }

  if (!is.nullOrUndefined(display)) {
    output.display = display;
  }

  if (!is.nullOrUndefined(height)) {
    output.height = px(height);
  }

  if (!is.nullOrUndefined(left)) {
    output.left = px(left);
  }

  if (!is.nullOrUndefined(maxHeight)) {
    output.maxHeight = px(maxHeight);
  }

  if (!is.nullOrUndefined(maxWidth)) {
    output.maxWidth = px(maxWidth);
  }

  if (!is.nullOrUndefined(minHeight)) {
    output.minHeight = px(minHeight);
  }

  if (!is.nullOrUndefined(minWidth)) {
    output.minWidth = px(minWidth);
  }

  if (!is.nullOrUndefined(right)) {
    output.right = px(right);
  }

  if (!is.nullOrUndefined(top)) {
    output.top = px(top);
  }

  if (!is.nullOrUndefined(width)) {
    output.width = px(width);
  }

  return output;
}

export function marginStyles<T extends WithMargin & WithTheme>(props: T): CSSObject {
  const { margin, mb, ml, mr, mt, mx, my } = props;
  const { spacing } = getTheme(props);

  if (!is.undefined(margin)) {
    return { margin: margin ? spacing[margin] : margin };
  }

  const output: CSSObject = {};

  if (!is.undefined(my)) {
    output.marginBottom = my ? spacing[my] : my;
    output.marginTop = my ? spacing[my] : my;
  } else {
    if (!is.undefined(mb)) {
      output.marginBottom = mb ? spacing[mb] : mb;
    }

    if (!is.undefined(mt)) {
      output.marginTop = mt ? spacing[mt] : mt;
    }
  }

  if (!is.undefined(mx)) {
    output.marginLeft = mx === 'auto' || mx === 0 ? mx : spacing[mx];
    output.marginRight = mx === 'auto' || mx === 0 ? mx : spacing[mx];
  } else {
    if (!is.undefined(ml)) {
      output.marginLeft = ml === 'auto' || ml === 0 ? ml : spacing[ml];
    }

    if (!is.undefined(mr)) {
      output.marginRight = mr === 'auto' || mr === 0 ? mr : spacing[mr];
    }
  }

  return output;
}

export function outlineStyles<T extends WithTheme>(props: T): CSSObject {
  const { colors } = getTheme(props);

  return {
    boxShadow: `0 0 6px 0 ${rgba(colors.primary, 0.6)}`,
  };
}

export function paddingStyles<T extends WithPadding>(props: T): CSSObject {
  const { padding, pb, pl, pr, pt, px: paddingX, py } = props;
  const { spacing } = getTheme(props);

  if (padding) {
    return { padding: spacing[padding] };
  }

  const output: CSSObject = {};

  if (py) {
    output.paddingBottom = spacing[py];
    output.paddingTop = spacing[py];
  } else {
    if (pb) {
      output.paddingBottom = spacing[pb];
    }

    if (pt) {
      output.paddingTop = spacing[pt];
    }
  }

  if (paddingX) {
    output.paddingLeft = spacing[paddingX];
    output.paddingRight = spacing[paddingX];
  } else {
    if (pl) {
      output.paddingLeft = spacing[pl];
    }

    if (pr) {
      output.paddingRight = spacing[pr];
    }
  }

  return output;
}

export function radiusStyles<T extends WithRadius & WithTheme>(props: T): CSSObject {
  const { radius } = getTheme(props);

  if (props.radius) {
    return {
      borderRadius: radius[props.radius],
    };
  }

  return {};
}

export function shadowStyles<T extends WithShadow & WithTheme>(props: T): CSSObject {
  const { shadow } = getTheme(props);

  if (props.shadow) {
    return {
      boxShadow: isDarkMode(props)
        ? shadow[props.shadow].replace(/148/g, '222')
        : shadow[props.shadow],
    };
  }

  return {};
}

export function textStyles<T extends WithTextOptions & WithTheme>(props: T): CSSObject {
  const { bold = false, size = 'regular' } = props;
  const { typography } = getTheme(props);

  const { fontSize, lineHeight, weight } = typography[size];
  const fontWeight = bold ? weight[1] : undefined;

  return {
    fontSize,
    fontWeight,
    lineHeight,
  };
}
