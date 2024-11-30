import isPropValid from '@emotion/is-prop-valid';
import { css, CSSObject } from '@emotion/react';
import {
  capitalize,
  cleanUpObject,
  objectEntries,
  objectKeys,
  px,
  sortObjectKeys,
} from '@gilbarbara/helpers';
import { StringOrNumber } from '@gilbarbara/types';
import { opacify } from 'colorizr';
import is from 'is-lite';

import { getColorTokens } from '~/modules/colors';
import * as defaultTheme from '~/modules/theme';

import {
  BorderItem,
  BorderItemSide,
  HeadingSizes,
  TextSizes,
  Theme,
  WithAccent,
  WithAlign,
  WithBlock,
  WithBorder,
  WithBorderless,
  WithBusy,
  WithColors,
  WithDimension,
  WithDisabled,
  WithDisplay,
  WithElementSpacing,
  WithFlexBox,
  WithFlexItem,
  WithGrid,
  WithHeight,
  WithInline,
  WithLabel,
  WithLayout,
  WithLight,
  WithMargin,
  WithOutline,
  WithPadding,
  WithPositioning,
  WithRadius,
  WithShadow,
  WithTextOptions,
  WithTheme,
  WithVariant,
} from '~/types';

import { responsive as responsiveHelper } from './helpers';

interface ColorStylesOptions {
  /**
   * @default false
   */
  skipBorder?: boolean;
  /**
   * @default false
   */
  skipShadow?: boolean;
}

interface GetContainerStylesOptions {
  responsive?: boolean;
  verticalPadding?: boolean;
}

interface GetDisableStylesOptions {
  hasPlaceholder?: boolean;
  isButton?: boolean;
}

interface GetStylesProps
  extends WithAccent,
    WithBlock,
    WithBorder,
    WithBorderless,
    WithBusy,
    WithColors,
    WithDimension,
    WithDisabled,
    WithDisplay,
    WithFlexBox,
    WithFlexItem,
    WithGrid,
    WithInline,
    WithLayout,
    WithLabel,
    WithLight,
    WithMargin,
    WithPadding,
    WithPositioning,
    WithRadius,
    WithShadow,
    WithTextOptions,
    WithTheme {
  variant?: string;
}

interface GetStylesOptions extends ColorStylesOptions {
  lineHeightCustom?: StringOrNumber;
  skipColor?: boolean;
  skipSpacing?: boolean;
  useFontSize?: boolean;
}

interface TextStylesOptions {
  lineHeightCustom?: StringOrNumber;
  skipFontSizing?: boolean;
}

export function getContainerStyles(props: WithTheme, options?: GetContainerStylesOptions) {
  const { responsive = true, verticalPadding = false } = options ?? {};
  const { spacing } = props.theme;

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

export function getDisableStyles<T extends WithBorderless & WithTheme & WithVariant>(
  props: T,
  options: GetDisableStylesOptions = {},
) {
  const { borderless, theme, variant } = props;
  const { hasPlaceholder, isButton } = options;
  const { darkMode, grayScale } = theme;

  let backgroundColor;
  let borderColor = darkMode ? grayScale['800'] : grayScale['100'];
  let color = darkMode ? grayScale['100'] : grayScale['700'];
  const placeholderColor = darkMode ? grayScale['600'] : grayScale['300'];

  if (!borderless) {
    backgroundColor = darkMode ? grayScale['900'] : grayScale['30'];
  }

  if (isButton) {
    backgroundColor = darkMode ? grayScale['800'] : grayScale['100'];
    borderColor = darkMode ? grayScale['800'] : grayScale['100'];
    color = grayScale['500'];

    if (variant === 'clean') {
      backgroundColor = 'transparent';
      borderColor = 'transparent';
    }

    if (variant === 'bordered') {
      backgroundColor = 'transparent';
    }
  }

  return css`
    background-color: ${backgroundColor};
    border-color: ${borderColor};
    color: ${color};
    cursor: not-allowed;

    ${hasPlaceholder &&
    css`
      &::placeholder {
        color: ${placeholderColor};
      }
    `}
  `;
}

export function getOutlineStyles(
  color: string,
  { outlineOffset, outlineOpacity, outlineWidth, outlineZIndex }: WithOutline = defaultTheme,
): CSSObject {
  return {
    outline: `${opacify(color, outlineOpacity)} solid ${px(outlineWidth)}`,
    outlineOffset: px(outlineOffset),
    zIndex: outlineZIndex,
  };
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
        'orientation',
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
      !['onApply', 'onClear', 'onCreate', 'onDropdown', 'onOpen', 'onSelect'].some(d =>
        prop.startsWith(d),
      ),
  };
}

export function getStyles(props: GetStylesProps, options: GetStylesOptions = {}) {
  const { busy, display, textAlign, theme } = props;
  const { lineHeightCustom, skipBorder, skipColor, skipShadow, skipSpacing, useFontSize } = options;

  const { fontFamily } = theme;

  const styles: CSSObject = {
    ...borderStyles(props),
    ...(!skipColor ? colorStyles(props, { skipBorder, skipShadow }) : {}),
    ...dimensionStyles(props),
    ...flexBoxStyles(props),
    ...flexItemStyles(props),
    ...gridStyles(props),
    ...layoutStyles(props),
    ...positioningStyles(props),
    ...radiusStyles(props),
    ...shadowStyles(props),
    ...textStyles(props, { lineHeightCustom, skipFontSizing: !useFontSize }),
    ...(!skipSpacing ? marginStyles(props) : {}),
    ...(!skipSpacing ? paddingStyles(props) : {}),
    boxSizing: 'border-box',
    display,
    fontFamily,
    textAlign,
  };

  if (busy) {
    styles.pointerEvents = 'none';
  }

  return sortObjectKeys(cleanUpObject(styles)) as CSSObject;
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

export function baseStyles(theme: Theme = defaultTheme): CSSObject {
  return {
    boxSizing: 'border-box',
    fontFamily: theme.fontFamily,
  };
}

export function borderStyles<T extends WithBorder & WithTheme>(props: T): CSSObject {
  const { border, theme } = props;

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
      objectEntries(item).forEach(([key, value]) => {
        acc[key] = value;
      });

      return acc;
    }, {});
  } else {
    output = getBorderItem(border);
  }

  return output;
}

export function colorStyles<T extends WithColors & WithTheme & { variant?: string }>(
  props: T,
  options: ColorStylesOptions = {},
): CSSObject {
  const { skipBorder = false, skipShadow = false } = options;
  const { bg, color, theme, variant } = props;
  const isTransparent = !!variant && ['bordered', 'clean'].includes(variant);

  const styles: CSSObject = {};

  if (bg) {
    const { mainColor, textColor } = getColorTokens(bg, color, theme);

    styles.backgroundColor = isTransparent ? 'transparent' : mainColor;
    styles.color = isTransparent ? mainColor : textColor;

    if (color) {
      styles.color = textColor;
    }

    if (!skipBorder) {
      styles.border = variant === 'clean' ? 0 : `1px solid ${mainColor}`;
    }

    if (variant === 'shadow' && !skipShadow) {
      const shadowColor = opacify(mainColor, 0.5);

      styles.boxShadow = `0 6px 12px -3px ${shadowColor},0 4px 6px -4px ${shadowColor}`;
    }

    return styles;
  }

  if (color) {
    const { mainColor } = getColorTokens(color, null, theme);

    styles.color = mainColor;
  }

  return styles;
}

export function dimensionStyles<T extends WithDimension>(props: T) {
  const { height, maxHeight, maxWidth, minHeight, minWidth, width } = props;

  const output: CSSObject = {};

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

export function flexBoxStyles<T extends WithFlexBox & WithTheme>(props: T): CSSObject {
  const {
    align,
    alignContent,
    direction,
    gap,
    justify,
    justifyItems,
    placeContent,
    placeItems,
    theme,
    wrap,
  } = props;

  const spacingKeys = objectKeys(theme.spacing);
  let gapValue = px(gap);

  /* @ts-expect-error ({} & string) confuses tsc */
  if (is.string(gap) && spacingKeys.includes(gap)) {
    /* @ts-expect-error ({} & string) confuses tsc */
    gapValue = theme.spacing[gap];
  }

  return {
    alignContent,
    alignItems: align,
    flexDirection: direction,
    flexWrap: wrap,
    gap: gapValue,
    justifyContent: justify,
    justifyItems,
    placeContent,
    placeItems,
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
    } else if (is.string(flex)) {
      output.flex = flex === 'grow' ? '1 0' : '0 1';
    } else {
      if (is.number(flex.grow)) {
        output.flexGrow = flex.grow;
      }

      if (is.number(flex.shrink)) {
        output.flexShrink = flex.shrink;
      }
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

export function gridStyles<T extends WithGrid & WithTheme>(props: T): CSSObject {
  const {
    area,
    autoColumns,
    autoFlow,
    autoRows,
    column,
    columnEnd,
    columnGap,
    columnStart,
    grid,
    row,
    rowEnd,
    rowGap,
    rowStart,
    template,
    templateAreas,
    templateColumns,
    templateRows,
    theme,
  } = props;
  const spacingKeys = objectKeys(theme.spacing);
  let columnGapValue = px(columnGap);
  let rowGapValue = px(rowGap);

  /* @ts-expect-error ({} & string) confuses tsc */
  if (is.string(columnGap) && spacingKeys.includes(columnGap)) {
    /* @ts-expect-error ({} & string) confuses tsc */
    columnGapValue = theme.spacing[columnGap];
  }

  /* @ts-expect-error ({} & string) confuses tsc */
  if (is.string(rowGap) && spacingKeys.includes(rowGap)) {
    /* @ts-expect-error ({} & string) confuses tsc */
    rowGapValue = theme.spacing[rowGap];
  }

  return {
    columnGap: columnGapValue,
    grid,
    gridArea: area,
    gridAutoColumns: autoColumns,
    gridAutoFlow: autoFlow,
    gridAutoRows: autoRows,
    gridColumn: column,
    gridColumnEnd: columnEnd,
    gridColumnStart: columnStart,
    gridRow: row,
    gridRowEnd: rowEnd,
    gridRowStart: rowStart,
    gridTemplate: template,
    gridTemplateAreas: templateAreas,
    gridTemplateColumns: templateColumns,
    gridTemplateRows: templateRows,
    rowGap: rowGapValue,
  };
}

export function hoverStyles<T extends WithColors & WithDisabled & WithTheme & WithVariant>(
  props: T,
): CSSObject {
  const { bg, color, disabled, theme, variant } = props;
  const styles: CSSObject = {};

  if (!bg || disabled) {
    return {};
  }

  const { hoverColor } = getColorTokens(bg, color, theme);

  if (variant === 'bordered') {
    styles.color = hoverColor;
    styles.borderColor = hoverColor;
  } else if (variant === 'clean') {
    styles.color = hoverColor;
  } else {
    styles.backgroundColor = hoverColor;
    styles.borderColor = hoverColor;
  }

  return styles;
}

export function inputStyles<
  T extends WithAccent &
    WithBorderless &
    WithElementSpacing &
    Partial<WithHeight> &
    WithTheme & { multiple?: boolean; width?: StringOrNumber },
>(props: T, type: 'input' | 'select' | 'textarea') {
  const {
    accent = 'primary',
    borderless,
    height = 'md',
    multiple,
    prefixSpacing,
    suffixSpacing,
    theme,
    width,
  } = props;
  const {
    darkColor,
    darkMode,
    fontFamily,
    grayScale,
    inputHeight,
    inputPaddingY,
    lightColor,
    radius,
    selectPaddingY,
    spacing,
    typography,
    white,
  } = theme;
  const { mainColor } = getColorTokens(accent, null, theme);
  const isSelect = is.boolean(multiple);
  const placeholderColor = grayScale['500'];

  let componentHeight;
  let paddingY = inputPaddingY[height];
  let paddingLeft: StringOrNumber = borderless ? 0 : spacing.md;
  let paddingRight: StringOrNumber = borderless ? 0 : spacing.md;

  if (type === 'textarea') {
    paddingY = spacing.xs;
  } else if (!multiple) {
    componentHeight = inputHeight[height];
  }

  if (isSelect) {
    paddingY = selectPaddingY[height];
    paddingRight = spacing.lg;
  }

  if (prefixSpacing) {
    paddingLeft = is.boolean(prefixSpacing) ? '40px' : px(prefixSpacing);
  }

  if (suffixSpacing) {
    paddingRight = is.boolean(suffixSpacing) ? '40px' : px(suffixSpacing);
  }

  const disabled = getDisableStyles(props, { hasPlaceholder: true });

  const styles = borderless
    ? css`
        background-color: transparent;
        border: 0;
        border-bottom: 1px solid ${darkMode ? grayScale['700'] : grayScale['500']};
      `
    : css`
        background-color: ${darkMode ? grayScale['800'] : white};
        border: 1px solid ${darkMode ? grayScale['700'] : grayScale['500']};
        border-radius: ${radius.xs};
      `;

  return css`
    color: ${darkMode ? lightColor : darkColor};
    display: block;
    font-family: ${fontFamily};
    font-size: ${typography.md.fontSize};
    height: ${componentHeight};
    line-height: 1.4;
    padding: ${paddingY} ${paddingRight} ${paddingY} ${paddingLeft};
    width: ${width ? px(width) : '100%'};
    ${styles}

    &:focus {
      ${!!borderless &&
      `
box-shadow: 0 3px 0 0 ${opacify(mainColor, theme.outlineOpacity)};
outline: none;
`}
      ${!borderless && getOutlineStyles(mainColor, theme)}
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
  const { display } = props;

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

  return output;
}

export function marginStyles<T extends WithMargin & WithTheme>(props: T): CSSObject {
  const { m, margin, mb, ml, mr, mt, mx, my, theme } = props;
  const { spacing } = theme;

  const output: CSSObject = {};

  if (!is.undefined(m)) {
    output.margin = m ? spacing[m] : m;
  }

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

export function outlineStyles(color: string, theme: Theme = defaultTheme) {
  const outline = getOutlineStyles(color, theme);

  return css`
    @supports not selector(:focus-visible) {
      &:focus {
        ${outline}
      }
    }

    &:focus-visible {
      ${outline}
    }
  `;
}

export function paddingStyles<T extends WithPadding & WithTheme>(
  props: T,
  force = false,
): CSSObject {
  const { p, padding, pb, pl, pr, pt, px: paddingX, py, theme } = props;
  const { spacing } = theme;

  const output: CSSObject = {};

  if (!is.nullOrUndefined(p)) {
    output.padding = is.number(p) ? p : spacing[p];
  }

  if (!is.nullOrUndefined(padding)) {
    output.padding = is.number(padding) ? padding : spacing[padding];
  }

  if (!is.nullOrUndefined(py)) {
    output.paddingBottom = is.number(py) ? py : spacing[py];
    output.paddingTop = is.number(py) ? py : spacing[py];
  } else {
    if (!is.nullOrUndefined(pb)) {
      output.paddingBottom = is.number(pb) ? pb : spacing[pb];
    }

    if (!is.nullOrUndefined(pt)) {
      output.paddingTop = is.number(pt) ? pt : spacing[pt];
    }
  }

  if (!is.nullOrUndefined(paddingX)) {
    output.paddingLeft = is.number(paddingX) ? paddingX : spacing[paddingX];
    output.paddingRight = is.number(paddingX) ? paddingX : spacing[paddingX];
  } else {
    if (!is.nullOrUndefined(pl)) {
      output.paddingLeft = is.number(pl) ? pl : spacing[pl];
    }

    if (!is.nullOrUndefined(pr)) {
      output.paddingRight = is.number(pr) ? pr : spacing[pr];
    }
  }

  if (force) {
    return objectEntries(output).reduce<CSSObject>((acc, [key, value]) => {
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
  const { radius } = props.theme;
  const output: CSSObject = {};

  if (is.plainObject(props.radius)) {
    const { bottom, left, right, top } = props.radius;

    if (top) {
      output.borderTopLeftRadius = radius[top];
      output.borderTopRightRadius = radius[top];
    }

    if (right) {
      output.borderTopRightRadius = radius[right];
      output.borderBottomRightRadius = radius[right];
    }

    if (bottom) {
      output.borderBottomRightRadius = radius[bottom];
      output.borderBottomLeftRadius = radius[bottom];
    }

    if (left) {
      output.borderBottomLeftRadius = radius[left];
      output.borderTopLeftRadius = radius[left];
    }
  } else if (props.radius) {
    output.borderRadius = radius[props.radius];
  }

  return output;
}

export function shadowStyles<T extends WithShadow & WithTheme>(props: T): CSSObject {
  const { darkMode, shadow, shadowDark } = props.theme;

  if (props.shadow) {
    return {
      boxShadow: darkMode ? shadowDark[props.shadow] : shadow[props.shadow],
    };
  }

  return {};
}

export function textStyles<T extends WithTextOptions<TextSizes | HeadingSizes> & WithTheme>(
  props: T,
  options: TextStylesOptions = {},
): CSSObject {
  const { bold = false, italic = false, lineHeight, size, theme } = props;
  const { fontWeights, typography } = theme;
  const { lineHeightCustom, skipFontSizing } = options;

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

  if (size && !skipFontSizing) {
    const { fontSize, lineHeight: typographyLineHeight } = typography[size];
    const fontWeight = bold ? fontWeights.bold : fontWeights.normal;

    output.fontSize = fontSize;
    output.fontWeight = fontWeight;
    output.lineHeight = lineHeight ?? lineHeightCustom ?? typographyLineHeight;
  }

  return output;
}
