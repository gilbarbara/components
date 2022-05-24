import { getColorScale, getGrayScale } from './colors';

/**
 * Basics
 */

export const fontFamily = 'inherit';
export const fontMonospace = 'Courier, monospace';

export const breakpoints = {
  xxs: '320px',
  xs: '375px',
  sm: '400px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1440px',
  xxxl: '1680px',
};

export const easing = 'cubic-bezier(0.35, 0.01, 0.77, 0.34);';

export const opacity = {
  semiOpaque: 0.72,
  intense: 0.64,
  medium: 0.32,
  light: 0.16,
  semiTransparent: 0.08,
};

export const radius = {
  xxs: '4px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  round: '50%',
};

export const shadow = {
  low: '2px 4px 16px 2px rgba(148, 148, 148, 0.16)',
  mid: '2px 4px 16px 4px rgba(148, 148, 148, 0.24)',
  high: '2px 4px 16px 8px rgba(148, 148, 148, 0.32)',
};

export const spacing = {
  xxs: '4px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
  xxxl: '64px',
  jumbo: '96px',
};

export const typography = {
  small: {
    fontSize: '12px',
    lineHeight: 1.2,
    weight: [400, 700],
  },
  mid: {
    fontSize: '14px',
    lineHeight: 1.2,
    weight: [400, 700],
  },
  regular: {
    fontSize: '16px',
    lineHeight: 1.2,
    weight: [400, 700],
  },
  large: {
    fontSize: '18px',
    lineHeight: 1.2,
    weight: [400, 700],
  },
  h6: {
    fontSize: '16px',
    lineHeight: 1.2,
    weight: 700,
  },
  h5: {
    fontSize: '18px',
    lineHeight: 1.2,
    weight: 700,
  },
  h4: {
    fontSize: '20px',
    lineHeight: 1.2,
    weight: 700,
  },
  h3: {
    fontSize: '24px',
    lineHeight: 1.2,
    weight: 700,
  },
  h2: {
    fontSize: '28px',
    lineHeight: 1.2,
    weight: 700,
  },
  h1: {
    fontSize: '32px',
    lineHeight: 1.2,
    weight: 700,
  },
  jumbo: {
    fontSize: '48px',
    lineHeight: 1.2,
    weight: 700,
  },
  jumboLarge: {
    fontSize: '64px',
    lineHeight: 1.2,
    weight: 700,
  },
};

/**
 * Colors
 */

export const black = '#000';
export const white = '#fff';
export const darkColor = '#101010';
export const lightColor = '#f5f5f5';

export const gray = '#808080';

export const grayLightest = lightColor;
export const grayLighter = '#e0e0e0';
export const grayLight = '#c0c0c0';
export const grayMid = '#767676';
export const grayDark = '#484848';
export const grayDarker = '#242424';
export const grayDarkest = darkColor;

export const grayScale = {
  '1': '#fcfcfc',
  '2': '#fafafa',
  '3': '#f7f7f7',
  '4': '#f5f5f5',
  '5': '#f2f2f2',
  '10': '#e6e6e6',
  '15': '#d9d9d9',
  '20': '#cccccc',
  '30': '#b3b3b3',
  '40': '#999999',
  '50': '#808080',
  '60': '#666666',
  '70': '#4d4d4d',
  '80': '#333333',
  '90': '#1a1a1a',
  '95': '#0d0d0d',
};

export const colors = {
  primary: '#3030e8',
  secondary: '#2A5D65',
  blue: '#66a5ff',
  green: '#58d063',
  orange: '#ff995d',
  pink: '#ee63ab',
  purple: '#ad7bff',
  red: '#ff5e5e',
  yellow: '#ffe166',
};

export const variants = {
  primary: getColorScale(colors.primary),
  secondary: getColorScale(colors.secondary),
  blue: getColorScale(colors.blue),
  gray: getGrayScale(
    grayLightest,
    grayLighter,
    grayLight,
    grayMid,
    grayDark,
    grayDarker,
    grayDarkest,
  ),
  green: getColorScale(colors.green),
  orange: getColorScale(colors.orange),
  pink: getColorScale(colors.pink),
  purple: getColorScale(colors.purple),
  red: getColorScale(colors.red),
  yellow: getColorScale(colors.yellow),
};

/**
 * Components
 */

export const button = {
  borderRadius: {
    sm: '8px',
    md: '8px',
    lg: '8px',
  },
  fontSize: {
    sm: '14px',
    md: '16px',
    lg: '18px',
  },
  fontWeight: 700,
  height: {
    sm: '32px',
    md: '40px',
    lg: '48px',
  },
  lineHeight: {
    sm: 1.2,
    md: 1.3,
    lg: 1.4,
  },
  padding: {
    sm: ['6px', '12px'],
    md: ['8px', '16px'],
    lg: ['10px', '20px'],
  },
};

export const inputHeight = {
  normal: '40px',
  large: '48px',
};
