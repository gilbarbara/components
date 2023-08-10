import { getColorScale, getGrayScale } from './colors';

/**
 * Basics
 */

export const fontFamily = 'inherit';
export const fontMonospace = 'Courier, monospace';
export const fontWeights = {
  normal: 400,
  bold: 700,
};

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

export const dropShadow = {
  low: 'drop-shadow(2px 4px 8px rgba(148, 148, 148, 0.4))',
  mid: 'drop-shadow(2px 4px 12px rgba(148, 148, 148, 0.6))',
  high: 'drop-shadow(2px 4px 18px rgba(148, 148, 148, 0.8))',
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
  },
  mid: {
    fontSize: '14px',
    lineHeight: 1.2,
  },
  regular: {
    fontSize: '16px',
    lineHeight: 1.2,
  },
  large: {
    fontSize: '18px',
    lineHeight: 1.2,
  },
  h6: {
    fontSize: '16px',
    lineHeight: 1.2,
  },
  h5: {
    fontSize: '18px',
    lineHeight: 1.2,
  },
  h4: {
    fontSize: '20px',
    lineHeight: 1.2,
  },
  h3: {
    fontSize: '24px',
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '28px',
    lineHeight: 1.2,
  },
  h1: {
    fontSize: '32px',
    lineHeight: 1.2,
  },
  jumbo: {
    fontSize: '48px',
    lineHeight: 1.2,
  },
  jumboLarge: {
    fontSize: '64px',
    lineHeight: 1.2,
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
export const grayLightest = '#f5f5f5';
export const grayLighter = '#e0e0e0';
export const grayLight = '#c0c0c0';
export const grayMid = '#767676';
export const grayDark = '#484848';
export const grayDarker = '#242424';
export const grayDarkest = '#101010';

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

export const avatar = {
  xxs: {
    size: '16px',
    fontSize: '8px',
  },
  xs: {
    size: '24px',
    fontSize: '12px',
  },
  sm: {
    size: '32px',
    fontSize: '14px',
  },
  md: {
    size: '48px',
    fontSize: '18px',
  },
  lg: {
    size: '64px',
    fontSize: '24px',
  },
  xl: {
    size: '96px',
    fontSize: '40px',
  },
  jumbo: {
    size: '128px',
    fontSize: '52px',
  },
};

export const button = {
  xs: {
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 700,
    height: '24px',
    lineHeight: 1.2,
    padding: ['4px', '8px'],
  },
  sm: {
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 700,
    height: '32px',
    lineHeight: 1.2,
    padding: ['6px', '12px'],
  },
  md: {
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 700,
    height: '40px',
    lineHeight: 1.3,
    padding: ['8px', '16px'],
  },
  lg: {
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 700,
    height: '48px',
    lineHeight: 1.4,
    padding: ['10px', '20px'],
  },
};

export const inputHeight = {
  normal: '40px',
  large: '48px',
};
