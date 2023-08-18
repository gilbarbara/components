import isPropValid from '@emotion/is-prop-valid';
import { css, CSSObject } from '@emotion/react';
import { capitalize, px } from '@gilbarbara/helpers';
import { StringOrNumber } from '@gilbarbara/types';
import is from 'is-lite';
import { rgba } from 'polished';

import { getColorTokens } from '~/modules/colors';

import {
  BorderItem,
  BorderItemSide,
  HeadingSizes,
  TextSizes,
  WithAccent,
  WithAlign,
  WithBorder,
  WithBorderless,
  WithChildrenOptional,
  WithColors,
  WithDisplay,
  WithElementSpacing,
  WithFlexBox,
  WithFlexItem,
  WithInvert,
  WithLayout,
  WithMargin,
  WithPadding,
  WithPositioning,
  WithRadius,
  WithShadow,
  WithTextOptions,
  WithTheme,
  WithTransparent,
} from '~/types';

import { getTheme, responsive as responsiveHelper } from './helpers';

interface GetContainerStylesOptions {
  responsive?: boolean;
  verticalPadding?: boolean;
}

export function getContainerStyles(props: WithTheme, options?: GetContainerStylesOptions) {
  const { responsive = true, verticalPadding = false } = options ?? {};
  const { spacing } = getTheme(props);

  return css`
    padding-left: ${spacing.md};
    padding-right: ${spacing.md};

    ${verticalPadding &&
    css`
      padding-bottom: ${spacing.md};
      padding-top: ${spacing.md};
    `}

    ${responsive &&
    responsiveHelper({
      lg: {
        paddingLeft: spacing.xl,
        paddingRight: spacing.xl,
      },
    })}

    ${responsive &&
    verticalPadding &&
    responsiveHelper({
      lg: {
        paddingBottom: spacing.xl,
        paddingTop: spacing.xl,
      },
    })}
  `;
}

export function getStyledOptions(...exclude: string[]) {
  return {
    shouldForwardProp: (prop: string) =>
      isPropValid(prop) &&
      ![
        'bg',
        'color',
        'direction',
        'display',
        'height',
        'letterSpacing',
        'loading',
        'margin',
        'opacity',
        'overflow',
        'padding',
        'pointerEvents',
        'radius',
        'shadow',
        'size',
        'textDecoration',
        'textTransform',
        'transform',
        'width',
        'wordSpacing',
        'wrap',
        ...exclude,
      ].includes(prop) &&
      !['onClear', 'onCreate', 'onDropdown', 'onOpen', 'onSelect'].some(d => prop.startsWith(d)),
  };
}

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

export function colorStyles<T extends WithColors & WithInvert & WithTransparent & WithTheme>(
  props: T,
  withBorder = true,
): CSSObject {
  const theme = getTheme(props);
  const { bg, color, invert, transparent } = props;

  const styles: CSSObject = {};

  if (bg) {
    const { mainColor, textColor } = getColorTokens(bg, color, theme);

    styles.backgroundColor = invert || transparent ? 'transparent' : mainColor;
    styles.color = invert || transparent ? mainColor : textColor;

    if (color) {
      styles.color = textColor;
    }

    if (withBorder) {
      styles.border = transparent ? 0 : `1px solid ${mainColor}`;
    }

    return styles;
  }

  if (color) {
    const { mainColor } = getColorTokens(color, null, theme);

    styles.color = mainColor;
  }

  return styles;
}

export function baseStyles<T extends WithTheme>(props: T): CSSObject {
  const { fontFamily } = getTheme(props);

  return {
    boxSizing: 'border-box',
    fontFamily,
  };
}

export function borderStyles<T extends WithBorder & WithTheme>(props: T): CSSObject {
  const { border } = props;
  const theme = getTheme(props);

  let { mainColor: borderColor } = getColorTokens('gray.100', null, theme);
  const defaultBorder = `1px solid ${borderColor}`;
  let output: CSSObject = {};

  const getBorderValue = (side: BorderItemSide, value: string = defaultBorder) => {
    const item: CSSObject = {};

    if (['bottom', 'left', 'right', 'top'].includes(side)) {
      item[`border${capitalize(side)}`] = value;
    } else if (['start', 'end'].includes(side)) {
      item[`borderInline${capitalize(side)}`] = value;
    } else if (side === 'horizontal') {
      item.borderBottom = value;
      item.borderTop = value;
    } else if (side === 'vertical') {
      item.borderLeft = value;
      item.borderRight = value;
    } else {
      item.border = value;
    }

    return item;
  };

  const getBorderItem = (item: BorderItem) => {
    const { color = 'gray.100', side = 'all', size = '1px', style = 'solid' } = item;

    ({ mainColor: borderColor } = getColorTokens(color, null, theme));
    const value = `${px(size)} ${style} ${borderColor}`;

    return getBorderValue(side, value);
  };

  if (is.nullOrUndefined(border)) {
    return output;
  }

  if (is.boolean(border)) {
    output.border = border ? defaultBorder : undefined;
  } else if (is.string(border)) {
    output = getBorderValue(border);
  } else if (is.array(border)) {
    const items: CSSObject[] = [];

    border.forEach(item => {
      items.push(getBorderItem(item));
    });

    output = items.reduce<CSSObject>((acc, item) => {
      Object.entries(item).forEach(([key, value]) => {
        acc[key] = value;
      });

      return acc;
    }, {});
  } else {
    output = getBorderItem(border);
  }

  return output;
}

export function boxStyles<
  T extends WithBorder &
    WithChildrenOptional &
    WithColors &
    WithFlexBox &
    WithFlexItem &
    WithLayout &
    WithMargin &
    WithPadding &
    WithPositioning &
    WithRadius &
    WithShadow &
    WithTheme,
>(props: T) {
  return css`
    ${baseStyles(props)};
    ${colorStyles(props, false)};
    ${borderStyles(props)};
    ${flexBoxStyles(props)};
    ${flexItemStyles(props)};
    ${layoutStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${positioningStyles(props)};
    ${radiusStyles(props)};
    ${shadowStyles(props)};
  `;
}

export const buttonStyles: CSSObject = {
  ...appearanceStyles,
  backgroundColor: 'transparent',
  border: 0,
};

export function displayStyles<T extends WithDisplay>(props: T): CSSObject {
  const { display } = props;

  if (display) {
    return { display };
  }

  return {};
}

export function flexBoxStyles<T extends WithFlexBox>(props: T): CSSObject {
  const { align, alignContent, direction, gap, justify, justifyItems, wrap } = props;

  return {
    alignContent,
    alignItems: align,
    flexDirection: direction,
    flexWrap: wrap,
    gap: px(gap),
    justifyContent: justify,
    justifyItems,
  };
}

export function flexItemStyles<T extends WithFlexItem>(props: T): CSSObject {
  const { alignSelf, basis, fill, flex, justifySelf, order } = props;

  const output: CSSObject = {};

  if (!is.nullOrUndefined(fill)) {
    output.height = fill === true || fill === 'vertical' ? '100%' : undefined;
    output.width = fill === true || fill === 'horizontal' ? '100%' : undefined;
  }

  if (!is.nullOrUndefined(flex)) {
    if (is.boolean(flex)) {
      output.flex = flex ? '1 1' : '0 0';
    }

    if (is.string(flex)) {
      output.flex = flex === 'grow' ? '1 0' : '0 1';
    }

    if (is.plainObject(flex)) {
      output.flex = `${flex.grow ? flex.grow : 0} ${flex.shrink ? flex.shrink : 0}`;
    }
  }

  return {
    ...output,
    alignSelf,
    flexBasis: basis,
    justifySelf,
    order,
  };
}

export function inputStyles<
  T extends WithAccent &
    WithBorderless &
    WithElementSpacing &
    WithTheme & { large?: boolean; multiple?: boolean; width?: StringOrNumber },
>(props: T, type: 'input' | 'select' | 'textarea') {
  const {
    accent = 'primary',
    borderless,
    large,
    multiple,
    prefixSpacing,
    suffixSpacing,
    width,
  } = props;
  const darkMode = isDarkMode(props);
  const {
    darkColor,
    fontFamily,
    grayDark,
    grayDarker,
    grayLighter,
    grayLightest,
    grayMid,
    inputHeight,
    lightColor,
    radius,
    spacing,
    typography,
    white,
    ...theme
  } = getTheme(props);
  const { mainColor } = getColorTokens(accent, null, theme);
  const isSelect = is.boolean(multiple);
  const placeholderColor = grayMid;

  let height;
  let paddingY = large ? spacing.md : spacing.sm;
  let paddingLeft: StringOrNumber | undefined = borderless ? 0 : spacing.md;
  let paddingRight: StringOrNumber | undefined = borderless ? 0 : spacing.md;

  if (type === 'textarea') {
    paddingY = spacing.xs;
  }

  if (type !== 'textarea' && !multiple) {
    height = large ? inputHeight.large : inputHeight.normal;
  }

  if (isSelect) {
    paddingY = large ? spacing.sm : spacing.xs;
    paddingRight = spacing.lg;
  }

  if (prefixSpacing) {
    paddingLeft = is.boolean(prefixSpacing) ? '40px' : px(prefixSpacing);
  }

  if (suffixSpacing) {
    paddingRight = is.boolean(suffixSpacing) ? '40px' : px(suffixSpacing);
  }

  const disabled = css`
    ${!borderless && `background-color: ${darkMode ? grayDark : grayLightest};`}
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
    height: ${height};
    line-height: 1.4;
    padding: ${paddingY} ${paddingRight} ${paddingY} ${paddingLeft};
    width: ${width ? px(width) : '100%'};
    ${styles}

    &:focus {
      ${!!borderless && `border-color: ${mainColor};`}
      ${!borderless && `box-shadow: 0 0 8px 1px ${rgba(mainColor, 1)};`}
      outline: none;
    }

    &:disabled {
      ${disabled}
    }

    ${!isSelect &&
    css`
      &::placeholder {
        color: ${placeholderColor};
      }

      &:not(:placeholder-shown) {
        border-color: ${mainColor};
      }

      &:read-only {
        ${disabled}
      }
    `}
  `;
}

export function layoutStyles<T extends WithLayout>(props: T): CSSObject {
  const { display, height, maxHeight, maxWidth, minHeight, minWidth, width } = props;

  const output: CSSObject = {};

  (
    [
      'opacity',
      'overflow',
      'pointerEvents',
      'textAlign',
      'transition',
      'transform',
      'transformOrigin',
    ] as const
  ).forEach(prop => {
    const value = props[prop];

    if (!is.nullOrUndefined(value)) {
      output[prop as keyof CSSObject] = value;
    }
  });

  if (!is.nullOrUndefined(display)) {
    output.display = display;
  }

  if (!is.nullOrUndefined(height)) {
    output.height = px(height);
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

  if (!is.nullOrUndefined(width)) {
    output.width = px(width);
  }

  return output;
}

export function marginStyles<T extends WithMargin & WithTheme>(props: T): CSSObject {
  const { margin, mb, ml, mr, mt, mx, my } = props;
  const { spacing } = getTheme(props);

  const output: CSSObject = {};

  if (!is.undefined(margin)) {
    output.margin = margin ? spacing[margin] : margin;
  }

  if (!is.undefined(my)) {
    output.marginBottom = my ? spacing[my] : my;
    output.marginTop = my ? spacing[my] : my;
  } else {
    if (!is.undefined(mb)) {
      output.marginBottom = mb === 'auto' || mb === 0 ? mb : spacing[mb];
    }

    if (!is.undefined(mt)) {
      output.marginTop = mt === 'auto' || mt === 0 ? mt : spacing[mt];
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

export function paddingStyles<T extends WithPadding>(props: T, force = false): CSSObject {
  const { padding, pb, pl, pr, pt, px: paddingX, py } = props;
  const { spacing } = getTheme(props);

  const output: CSSObject = {};

  if (padding) {
    output.padding = spacing[padding];
  }

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

  if (force) {
    return Object.entries(output).reduce<CSSObject>((acc, [key, value]) => {
      acc[key] = `${value} !important`;

      return acc;
    }, {});
  }

  return output;
}

export function positioningStyles<T extends WithPositioning>(props: T): CSSObject {
  const { bottom, left, right, top } = props;

  const output: CSSObject = {};

  (['position', 'zIndex'] as const).forEach(prop => {
    const value = props[prop];

    if (!is.nullOrUndefined(value)) {
      output[prop as keyof CSSObject] = value;
    }
  });

  if (!is.nullOrUndefined(bottom)) {
    output.bottom = px(bottom);
  }

  if (!is.nullOrUndefined(left)) {
    output.left = px(left);
  }

  if (!is.nullOrUndefined(right)) {
    output.right = px(right);
  }

  if (!is.nullOrUndefined(top)) {
    output.top = px(top);
  }

  return output;
}

export function radiusStyles<T extends WithRadius & WithTheme>(props: T): CSSObject {
  const { radius } = getTheme(props);
  const output: CSSObject = {};

  if (is.plainObject(props.radius)) {
    const { bottom, left, right, top } = props.radius;

    if (top) {
      output.borderTopLeftRadius = radius[top];
      output.borderTopRightRadius = radius[top];
    } else if (right) {
      output.borderTopRightRadius = radius[right];
      output.borderBottomRightRadius = radius[right];
    } else if (bottom) {
      output.borderBottomRightRadius = radius[bottom];
      output.borderBottomLeftRadius = radius[bottom];
    } else if (left) {
      output.borderBottomLeftRadius = radius[left];
      output.borderTopLeftRadius = radius[left];
    }
  } else if (props.radius) {
    output.borderRadius = radius[props.radius];
  }

  return output;
}

export function shadowStyles<T extends WithShadow & WithTheme>(
  props: T,
  useFilter = false,
): CSSObject {
  const { dropShadow, shadow } = getTheme(props);

  if (props.shadow) {
    if (useFilter) {
      return {
        filter: isDarkMode(props)
          ? dropShadow[props.shadow].replace(/148/g, '222')
          : dropShadow[props.shadow],
      };
    }

    return {
      boxShadow: isDarkMode(props)
        ? shadow[props.shadow].replace(/148/g, '222')
        : shadow[props.shadow],
    };
  }

  return {};
}

export function textStyles<T extends WithTextOptions<HeadingSizes | TextSizes> & WithTheme>(
  props: T,
  lineHeightCustom?: StringOrNumber,
): CSSObject {
  const { bold = false, italic = false, size } = props;
  const { fontWeights, typography } = getTheme(props);

  const output: CSSObject = {};

  (
    ['letterSpacing', 'lineHeight', 'textDecoration', 'textTransform', 'wordSpacing'] as const
  ).forEach(prop => {
    const value = props[prop];

    if (!is.nullOrUndefined(value)) {
      output[prop as keyof CSSObject] = value;
    }
  });

  if (bold) {
    output.fontWeight = fontWeights.bold;
  }

  if (italic) {
    output.fontStyle = 'italic';
  }

  if (size) {
    const { fontSize, lineHeight: typographyLineHeight } = typography[size];
    const fontWeight = bold ? fontWeights.bold : fontWeights.normal;

    return {
      ...output,
      fontSize,
      fontWeight,
      lineHeight: output.lineHeight ?? lineHeightCustom ?? typographyLineHeight,
    };
  }

  return output;
}
