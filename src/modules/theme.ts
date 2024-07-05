import { generatePalette } from './palette';

/**
 * Basics
 */
export const breakpoints = {
  /** @default 320px */
  xxs: '320px',
  /** @default 375px */
  xs: '375px',
  /** @default 400px */
  sm: '400px',
  /** @default 768px */
  md: '768px',
  /** @default 1024px */
  lg: '1024px',
  /** @default 1280px */
  xl: '1280px',
  /** @default 1440px */
  xxl: '1440px',
  /** @default 1680px */
  xxxl: '1680px',
};

export const dataAttributeName = 'component-name';
export const darkMode = false;

export const easing = 'cubic-bezier(0.65, 0.815, 0.735, 0.395)';

export const fontFamily = 'inherit';
export const fontMonospace = 'Courier, monospace';
export const fontWeights = {
  normal: 400,
  bold: 700,
};

export const opacity = {
  /** @default 0.72 */
  semiOpaque: 0.72,
  /** @default 0.64 */
  intense: 0.64,
  /** @default 0.32 */
  medium: 0.32,
  /** @default 0.16 */
  light: 0.16,
  /** @default 0.08 */
  semiTransparent: 0.08,
};
export const opacityDisabled = opacity.intense;

export const radius = {
  /** @default 0px */
  none: '0px',
  /** @default 4px */
  xxs: '4px',
  /** @default 8px */
  xs: '8px',
  /** @default 12px */
  sm: '12px',
  /** @default 16px */
  md: '16px',
  /** @default 24px */
  lg: '24px',
  /** @default 32px */
  xl: '32px',
  /** @default 9999px */
  full: '9999px',
  /** @default 50% */
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
  /** @default 4px */
  xxs: '4px',
  /** @default 8px */
  xs: '8px',
  /** @default 12px */
  sm: '12px',
  /** @default 16px */
  md: '16px',
  /** @default 24px */
  lg: '24px',
  /** @default 32px */
  xl: '32px',
  /** @default 48px */
  xxl: '48px',
  /** @default 64px */
  xxxl: '64px',
  /** @default 96px */
  jumbo: '96px',
};

export const typography = {
  xxs: {
    /** @default 10px */
    fontSize: '10px',
    lineHeight: 1.1,
  },
  xs: {
    /** @default 12px */
    fontSize: '12px',
    lineHeight: 1.2,
  },
  sm: {
    /** @default 14px */
    fontSize: '14px',
    lineHeight: 1.2,
  },
  md: {
    /** @default 16px */
    fontSize: '16px',
    lineHeight: 1.2,
  },
  lg: {
    /** @default 18px */
    fontSize: '18px',
    lineHeight: 1.2,
  },
  xl: {
    /** @default 20px */
    fontSize: '20px',
    lineHeight: 1.2,
  },
  h6: {
    /** @default 16px */
    fontSize: '16px',
    lineHeight: 1.2,
  },
  h5: {
    /** @default 18px */
    fontSize: '18px',
    lineHeight: 1.2,
  },
  h4: {
    /** @default 20px */
    fontSize: '20px',
    lineHeight: 1.2,
  },
  h3: {
    /** @default 24px */
    fontSize: '24px',
    lineHeight: 1.2,
  },
  h2: {
    /** @default 28px */
    fontSize: '28px',
    lineHeight: 1.2,
  },
  h1: {
    /** @default 32px */
    fontSize: '32px',
    lineHeight: 1.2,
  },
  jumbo: {
    /** @default 48px */
    fontSize: '48px',
    lineHeight: 1.2,
  },
  jumboLarge: {
    /** @default 64px */
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

export const grayScale = {
  /** @default #fcfcfc */
  '10': '#fcfcfc',
  /** @default #fafafa */
  '20': '#fafafa',
  /** @default #f7f7f7 */
  '30': '#f7f7f7',
  /**
   * Lightest
   * @default #f5f5f5
   * */
  '40': '#f5f5f5',
  /** @default #f2f2f2 */
  '50': '#f2f2f2',
  /**
   * Lighter
   * @default #e6e6e6
   */
  '100': '#e6e6e6',
  /** @default #d9d9d9 */
  '150': '#d9d9d9',
  /**
   * Light
   * @default #cccccc
   */
  '200': '#cccccc',
  /** @default #b3b3b3 */
  '300': '#b3b3b3',
  /** @default #999999 */
  '400': '#999999',
  /**
   * Mid
   * @default #808080
   */
  '500': '#808080',
  /** @default #666666 */
  '600': '#666666',
  /**
   * Dark
   * @default #4d4d4d
   */
  '700': '#4d4d4d',
  /** @default #404040 */
  '750': '#404040',
  /**
   * Darker
   * @default #333333
   */
  '800': '#333333',
  /** @default #262626 */
  '850': '#262626',
  /**
   * Darkest
   * @default #1a1a1a
   */
  '900': '#1a1a1a',
  /** @default #0d0d0d */
  '950': '#0d0d0d',
};

export const colors = {
  /** @default #3030e8 */
  primary: '#3030e8',
  /** @default #2a5d65 */
  secondary: '#2a5d65',
  /** @default #999999 */
  gray: '#999999',
  /** @default #ff5e5e */
  red: '#ff5e5e',
  /** @default #ff995d */
  orange: '#ff995d',
  /** @default #ffe166 */
  yellow: '#ffe166',
  /** @default #58d063 */
  green: '#58d063',
  /** @default #38b2ac */
  teal: '#38b2ac',
  /** @default #0bc5ea */
  cyan: '#0bc5ea',
  /** @default #66a5ff */
  blue: '#66a5ff',
  /** @default #8a8fff */
  indigo: '#8a8fff',
  /** @default #ad7bff */
  purple: '#ad7bff',
  /** @default #ee63ab */
  pink: '#ee63ab',
};

export const variants = {
  primary: generatePalette(colors.primary),
  secondary: generatePalette(colors.secondary),
  gray: generatePalette(colors.gray, true),
  red: generatePalette(colors.red),
  orange: generatePalette(colors.orange),
  yellow: generatePalette(colors.yellow),
  green: generatePalette(colors.green),
  teal: generatePalette(colors.teal),
  cyan: generatePalette(colors.cyan),
  blue: generatePalette(colors.blue),
  indigo: generatePalette(colors.indigo),
  purple: generatePalette(colors.purple),
  pink: generatePalette(colors.pink),
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
  /** @default 32px */
  sm: '32px',
  /** @default 40px */
  md: '40px',
  /** @default 48px */
  lg: '48px',
};

export const inputPaddingY = {
  sm: spacing.xs,
  md: spacing.sm,
  lg: spacing.md,
};

export const selectPaddingY = {
  sm: spacing.xxs,
  md: spacing.xs,
  lg: spacing.sm,
};
