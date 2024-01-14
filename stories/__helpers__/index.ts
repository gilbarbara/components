import { objectEntries, objectKeys } from '@gilbarbara/helpers';
import { PlainObject } from '@gilbarbara/types';

import { variants as themeVariants } from '~/modules/theme';

import { VariantWithTones, WithFlexBox } from '~/types';

const base = ['normal', 'stretch'];
const contentDistribution = ['space-around', 'space-between', 'space-evenly', 'stretch'];
const contentPosition = ['center', 'end', 'flex-end', 'flex-start', 'start'];

export const flexItems = ['baseline', ...base, ...contentPosition];
export const flexContent = [...base, ...contentDistribution, ...contentPosition];
export const tones = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;
export const variants = [...objectKeys(themeVariants), 'black', 'white'] as const;
export const variantsWithTones = [...objectKeys(themeVariants), 'black', 'white'].reduce<
  Array<string>
>(
  (acc, variant) => {
    if (variant === 'black' || variant === 'white') {
      return [...acc, variant];
    }

    return [...acc, variant, ...tones.map(tone => `${variant}.${tone}`)];
  },
  [''],
) as VariantWithTones[];

const chromaticModeTitles = {
  desktop_light: 'Desktop (light)',
  desktop_dark: 'Desktop (dark)',
  mobile_light: 'Mobile (light)',
  mobile_dark: 'Mobile (dark)',
};

type ChromaticMode = keyof typeof chromaticModeTitles;

export function addChromaticModes(...inputModes: [ChromaticMode, ...ChromaticMode[]]) {
  const modes = inputModes.reduce<PlainObject<any>>((acc, mode) => {
    const [viewport, appearance] = mode.split('_');

    acc[chromaticModeTitles[mode]] = {
      appearance,
      viewport: viewport === 'mobile' ? 'mobile2' : 'responsive',
    };

    return acc;
  }, {});

  return {
    chromatic: {
      modes,
    },
  };
}

export function disableControl() {
  return { control: false };
}

export function hideNoControlsWarning() {
  return {
    hideNoControlsWarning: true,
  };
}

export function hideProps(...props: string[]) {
  const fields: PlainObject = {
    as: hideTable(),
    theme: hideTable(),
  };

  props.forEach(d => {
    fields[d] = hideTable();
  });

  return fields;
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export function hideStoryFromDocsPage() {
  return {
    parameters: {
      docs: {
        disable: true,
      },
    },
  };
}

export function hideTable() {
  return {
    table: { disable: true },
  };
}

export function colorProps(
  props: Array<'accent' | 'backgroundColor' | 'bg' | 'borderColor' | 'color'> = ['color'],
) {
  return props.reduce<PlainObject>((acc, prop) => {
    acc[prop] = { control: 'select', options: variantsWithTones };

    return acc;
  }, {});
}

export function dimensionProps() {
  return {
    height: { control: 'text', table: { category: 'Layout' } },
    maxHeight: { control: 'text', table: { category: 'Layout' } },
    maxWidth: { control: 'text', table: { category: 'Layout' } },
    minHeight: { control: 'text', table: { category: 'Layout' } },
    minWidth: { control: 'text', table: { category: 'Layout' } },
    width: { control: 'text', table: { category: 'Layout' } },
  };
}

export function flexBoxProps(...exclude: Array<keyof WithFlexBox>) {
  const options = {
    align: { control: 'select', options: ['', ...flexItems] },
    alignContent: {
      control: 'select',
      options: ['', ...flexContent],
    },
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    gap: {
      control: 'text',
    },
    justify: { control: 'select', options: ['', ...flexContent] },
    justifyItems: { control: 'select', options: ['', ...flexItems] },
    wrap: { control: 'select', options: ['nowrap', 'wrap', 'wrap-reverse'] },
  };

  return objectEntries(options).reduce<PlainObject>((acc, [key, value]) => {
    if (exclude.includes(key)) {
      return acc;
    }

    acc[key] = value;

    return acc;
  }, {});
}

export function flexItemProps() {
  return {
    alignSelf: { table: { category: 'Flex Item' } },
    basis: { table: { category: 'Flex Item' } },
    fill: { table: { category: 'Flex Item' } },
    flex: { table: { category: 'Flex Item' } },
    justifySelf: { table: { category: 'Flex Item' } },
    order: { table: { category: 'Flex Item' } },
  };
}

export function layoutProps(options?: { display: string }) {
  const { display } = options ?? {};

  return {
    ...dimensionProps(),
    display: { control: 'text', defaultValue: display, table: { category: 'Layout' } },
    opacity: { control: 'number', table: { category: 'Layout' } },
    overflow: { control: 'text', table: { category: 'Layout' } },
    pointerEvents: { control: 'select', table: { category: 'Layout' } },
    textAlign: { control: 'select', table: { category: 'Layout' } },
    transform: { control: 'text', table: { category: 'Layout' } },
    transformOrigin: { control: 'text', table: { category: 'Layout' } },
    transition: { control: 'text', table: { category: 'Layout' } },
  };
}

export function marginProps() {
  return {
    margin: { control: 'select', table: { category: 'Spacing' } },
    mb: { control: 'select', table: { category: 'Spacing' } },
    ml: { control: 'select', table: { category: 'Spacing' } },
    mr: { control: 'select', table: { category: 'Spacing' } },
    mt: { control: 'select', table: { category: 'Spacing' } },
    mx: { control: 'select', table: { category: 'Spacing' } },
    my: { control: 'select', table: { category: 'Spacing' } },
  };
}

export function paddingProps() {
  return {
    padding: { control: 'select', table: { category: 'Spacing' } },
    pb: { control: 'select', table: { category: 'Spacing' } },
    pl: { control: 'select', table: { category: 'Spacing' } },
    pr: { control: 'select', table: { category: 'Spacing' } },
    pt: { control: 'select', table: { category: 'Spacing' } },
    px: { control: 'select', table: { category: 'Spacing' } },
    py: { control: 'select', table: { category: 'Spacing' } },
  };
}

export function positioningProps() {
  return {
    bottom: { control: 'text', table: { category: 'Positioning' } },
    left: { control: 'text', table: { category: 'Positioning' } },
    position: { control: 'select', table: { category: 'Positioning' } },
    right: { control: 'text', table: { category: 'Positioning' } },
    top: { control: 'text', table: { category: 'Positioning' } },
    zIndex: { control: 'number', table: { category: 'Positioning' } },
  };
}

export function radiusProps() {
  return {
    radius: {
      control: 'select',
      options: ['', false, 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'round'],
    },
  };
}

export function spacingProps() {
  return {
    ...marginProps(),
    ...paddingProps(),
  };
}

export function textOptionsProps() {
  return {
    bold: { control: 'boolean', table: { category: 'Text Options' } },
    italic: { control: 'boolean', table: { category: 'Text Options' } },
    letterSpacing: { control: 'text', table: { category: 'Text Options' } },
    lineHeight: { control: 'text', table: { category: 'Text Options' } },
    size: { control: 'select', table: { category: 'Text Options' } },
    textDecoration: { control: 'text', table: { category: 'Text Options' } },
    textTransform: { control: 'select', table: { category: 'Text Options' } },
    wordSpacing: { control: 'text', table: { category: 'Text Options' } },
  };
}
