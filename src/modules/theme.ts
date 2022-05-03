import { getColorScale, getGrayScale } from './colors';

export const fontFamily = 'inherit';
export const fontMonospace = 'Courier, monospace';

export const letterSpacing = '-0.018em';
export const lineHeight = 1.4;

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

export const inputHeight = {
  sm: '48px',
  md: '56px',
};

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
  low: '0 4px 16px rgba(148, 148, 148, 0.24)',
  mid: '0 4px 16px rgba(148, 148, 148, 0.24)',
  high: '0 4px 32px rgba(148, 148, 148, 0.24)',
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
    letterSpacing,
    lineHeight: '16px',
    weight: [400, 700],
  },
  mid: {
    fontSize: '14px',
    letterSpacing,
    lineHeight: '18px',
    weight: [400, 700],
  },
  regular: {
    fontSize: '16px',
    letterSpacing,
    lineHeight: '21px',
    weight: [400, 700],
  },
  large: {
    fontSize: '18px',
    letterSpacing,
    lineHeight: '24px',
    weight: [400, 700],
  },
  title3: {
    fontSize: '20px',
    letterSpacing: '-0.02em',
    lineHeight: '26px',
    weight: 700,
  },
  title2: {
    fontSize: '24px',
    letterSpacing: '-0.02em',
    lineHeight: '30px',
    weight: 700,
  },
  title1: {
    fontSize: '28px',
    letterSpacing: 0,
    lineHeight: '32px',
    weight: 700,
  },
  jumbo: {
    fontSize: '40px',
    letterSpacing: '-0.04em',
    lineHeight: '44px',
    weight: 700,
  },
  jumboBigger: {
    fontSize: '48px',
    letterSpacing: '-0.04em',
    lineHeight: '52px',
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
  primary: '#4747eb',
  secondary: '#14a1b8',
  blue: '#4D96FF',
  green: '#58d063',
  orange: '#e97c3e',
  pink: '#ee63ab',
  purple: '#a475f0',
  red: '#ff5252',
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
