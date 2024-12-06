import { objectEntries, objectKeys } from '@gilbarbara/helpers';
import { PlainObject } from '@gilbarbara/types';
import { InputType } from '@storybook/types';

import { sizes as sizeOptions } from '~/modules/options';
import { spacing, variants as themeVariants } from '~/modules/theme';

import { PortalOwnPropsKeys, portalPropsKeys } from '~/components/Portal/usePortal';

import { ColorVariantTones, WithFlexBox } from '~/types';

type ControlMap = Record<string, InputType>;

const flexBase = ['normal', 'stretch'];
const flexContentDistribution = ['space-around', 'space-between', 'space-evenly', 'stretch'];
const flexContentPosition = ['center', 'end', 'flex-end', 'flex-start', 'start'];

export const flexItems = ['baseline', ...flexBase, ...flexContentPosition];
export const flexContent = [...flexBase, ...flexContentDistribution, ...flexContentPosition];

export const PANGRAM = 'The quick brown fox jumps over the lazy dog';

export const COMPONENT_SIZES = ['xs', ...sizeOptions, 'xl'] as const;

export const TONES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;
export const SPACING = objectKeys(spacing);
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
) as ColorVariantTones[];

const CHROMATIC_MODE = {
  desktop_light: {
    appearance: 'light',
    'backgrounds.value': '!hex(fff)',
    theme: 'light',
    title: 'Desktop (light)',
    viewport: 'responsive',
  },
  desktop_dark: {
    appearance: 'dark',
    'backgrounds.value': '!hex(262626)',
    theme: 'dark',
    title: 'Desktop (dark)',
    viewport: 'responsive',
  },
  mobile_light: {
    appearance: 'light',
    'backgrounds.value': '!hex(fff)',
    theme: 'light',
    title: 'Mobile (light)',
    viewport: 'mobile2',
  },
  mobile_dark: {
    appearance: 'dark',
    'backgrounds.value': '!hex(262626)',
    theme: 'dark',
    title: 'Mobile (dark)',
    viewport: 'mobile2',
  },
};

type ChromaticMode = keyof typeof CHROMATIC_MODE;

export function addChromaticModes(...inputModes: [ChromaticMode, ...ChromaticMode[]]) {
  const modes = inputModes.reduce<PlainObject<any>>((acc, mode) => {
    const { title, ...rest } = CHROMATIC_MODE[mode];

    acc[title] = rest;

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

interface FlexBoxPropsOptions {
  exclude?: Array<keyof WithFlexBox>;
  hideCategory?: boolean;
  include?: Array<keyof WithFlexBox>;
}

export function flexBoxProps(options: FlexBoxPropsOptions = {}) {
  const { exclude, hideCategory, include } = options;

  const shared = {
    control: 'select',
    table: { category: hideCategory ? undefined : 'Flex Box' },
  };

  const items = {
    align: { options: ['', ...flexItems], ...shared },
    alignContent: { options: ['', ...flexContent], ...shared },
    direction: { options: ['row', 'row-reverse', 'column', 'column-reverse'], ...shared },
    gap: { options: ['', ...SPACING], ...shared },
    justify: { options: ['', ...flexContent], ...shared },
    justifyItems: { options: ['', ...flexItems], ...shared },
    placeContent: { options: ['', ...flexContent], ...shared },
    placeItems: { options: ['', ...flexItems], ...shared },
    wrap: { options: ['nowrap', 'wrap', 'wrap-reverse'], ...shared },
  };

  return objectEntries(items).reduce<PlainObject>((acc, [key, value]) => {
    if (exclude?.includes(key) || (include && !include?.includes(key))) {
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

export function portalProps(): ControlMap {
  return objectKeys(portalPropsKeys).reduce<Partial<Record<PortalOwnPropsKeys, InputType>>>(
    (acc, key) => {
      acc[key] = { table: { category: 'Portal Props' } };

      return acc;
    },
    {},
  );
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
      options: [undefined, 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'round'],
    },
  };
}

export function spacingProps(key?: string): ControlMap {
  if (key) {
    return {
      [key]: { control: 'select', options: [0, SPACING] },
    };
  }

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
