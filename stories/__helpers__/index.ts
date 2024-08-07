import { objectEntries, objectKeys } from '@gilbarbara/helpers';
import { PlainObject } from '@gilbarbara/types';
import { InputType } from '@storybook/types';

import { sizes as sizeOptions } from '~/modules/options';
import { variants as themeVariants } from '~/modules/theme';

import { VariantWithTones, WithFlexBox } from '~/types';

type ControlMap = Record<string, InputType>;

const flexBase = ['normal', 'stretch'];
const flexContentDistribution = ['space-around', 'space-between', 'space-evenly', 'stretch'];
const flexContentPosition = ['center', 'end', 'flex-end', 'flex-start', 'start'];

export const flexItems = ['baseline', ...flexBase, ...flexContentPosition];
export const flexContent = [...flexBase, ...flexContentDistribution, ...flexContentPosition];

export const PANGRAM = 'The quick brown fox jumps over the lazy dog';

export const COMPONENT_SIZES = ['xs', ...sizeOptions] as const;

export const TONES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;
export const VARIANTS = [...objectKeys(themeVariants), 'black', 'white'] as const;
export const VARIANTS_WITH_TONES = [...objectKeys(themeVariants), 'black', 'white'].reduce<
  Array<string>
>(
  (acc, variant) => {
    if (variant === 'black' || variant === 'white') {
      return [...acc, variant];
    }

    return [...acc, variant, ...TONES.map(tone => `${variant}.${tone}`)];
  },
  [''],
) as VariantWithTones[];

const CHROMATIC_MODE_TITLE = {
  desktop_light: 'Desktop (light)',
  desktop_dark: 'Desktop (dark)',
  mobile_light: 'Mobile (light)',
  mobile_dark: 'Mobile (dark)',
};

type ChromaticMode = keyof typeof CHROMATIC_MODE_TITLE;

export function addChromaticModes(...inputModes: [ChromaticMode, ...ChromaticMode[]]) {
  const modes = inputModes.reduce<PlainObject<any>>((acc, mode) => {
    const [viewport, appearance] = mode.split('_');

    acc[CHROMATIC_MODE_TITLE[mode]] = {
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

export function disableControl(): InputType {
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

export function hideTable() {
  return {
    table: { disable: true },
  };
}

export function colorProps(
  props: Array<'accent' | 'backgroundColor' | 'bg' | 'borderColor' | 'color'> = ['color'],
  variantsOnly = false,
): ControlMap {
  return props.reduce<ControlMap>((acc, prop) => {
    acc[prop] = {
      control: 'select',
      options: variantsOnly
        ? VARIANTS.filter(v => !['black', 'white'].includes(v))
        : VARIANTS_WITH_TONES,
    };

    return acc;
  }, {});
}

export function dimensionProps(): ControlMap {
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

export function flexItemProps(): ControlMap {
  return {
    alignSelf: { table: { category: 'Flex Item' } },
    basis: { table: { category: 'Flex Item' } },
    fill: { table: { category: 'Flex Item' } },
    flex: { table: { category: 'Flex Item' } },
    justifySelf: { table: { category: 'Flex Item' } },
    order: { table: { category: 'Flex Item' } },
  };
}

export function layoutProps(options?: { display: string }): ControlMap {
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

export function marginProps(): ControlMap {
  return {
    margin: { control: 'select', table: { category: 'Spacing' } },
    m: { control: 'select', table: { category: 'Spacing' } },
    mb: { control: 'select', table: { category: 'Spacing' } },
    ml: { control: 'select', table: { category: 'Spacing' } },
    mr: { control: 'select', table: { category: 'Spacing' } },
    mt: { control: 'select', table: { category: 'Spacing' } },
    mx: { control: 'select', table: { category: 'Spacing' } },
    my: { control: 'select', table: { category: 'Spacing' } },
  };
}

export function paddingProps(): ControlMap {
  return {
    padding: { control: 'select', table: { category: 'Spacing' } },
    p: { control: 'select', table: { category: 'Spacing' } },
    pb: { control: 'select', table: { category: 'Spacing' } },
    pl: { control: 'select', table: { category: 'Spacing' } },
    pr: { control: 'select', table: { category: 'Spacing' } },
    pt: { control: 'select', table: { category: 'Spacing' } },
    px: { control: 'select', table: { category: 'Spacing' } },
    py: { control: 'select', table: { category: 'Spacing' } },
  };
}

export function positioningProps(): ControlMap {
  return {
    bottom: { control: 'text', table: { category: 'Positioning' } },
    left: { control: 'text', table: { category: 'Positioning' } },
    position: { control: 'select', table: { category: 'Positioning' } },
    right: { control: 'text', table: { category: 'Positioning' } },
    top: { control: 'text', table: { category: 'Positioning' } },
    zIndex: { control: 'number', table: { category: 'Positioning' } },
  };
}

export function radiusProps(): ControlMap {
  return {
    radius: {
      control: 'select',
      options: ['', 'none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'round'],
    },
  };
}

export function spacingProps(): ControlMap {
  return {
    ...marginProps(),
    ...paddingProps(),
  };
}

export function textOptionsProps(): ControlMap {
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
