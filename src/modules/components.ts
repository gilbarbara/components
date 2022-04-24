import { white } from './theme';

/**
 * Components
 */
export const badge = {
  borderRadius: 10,
  fontSize: 12,
  fontWeight: 700,
  lineHeight: 18,
  padding: 5,
  size: 20,
  sizeDot: 10,
};

export const button = {
  borderRadius: {
    sm: '8px',
    md: '8px',
    lg: '8px',
  },
  dimension: {
    sm: '36px',
    md: '48px',
    lg: '56px',
  },
  fontSize: {
    sm: '14px',
    md: '16px',
    lg: '18px',
  },
  fontWeight: 700,
  lineHeight: {
    sm: 1.2,
    md: 1.3,
    lg: 1.4,
  },
  padding: {
    sm: ['8px', '16px'],
    md: ['10px', '20px'],
    lg: ['12px', '24px'],
  },
};

export const list = {
  borderRadius: 0,
  padding: {
    sm: 8,
    md: 12,
    lg: 16,
  },
};

export const table = {
  borderColors: { primary: '#ccc', secondary: '#32383e' },
  captionColor: '#ccc',
  captionPadding: 6,
  colors: { primary: white, secondary: '#000' },
  headColors: { light: '#f4f4f4', dark: '#000' },
  padding: {
    sm: 6,
    md: 12,
    lg: 18,
  },
  stripedColors: { primary: '#ededed', secondary: '#262626' },
};
