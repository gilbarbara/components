import { AnyObject } from '@gilbarbara/types';

import { variants as themeVariants } from 'src/modules/theme';
import { Shades, Variants } from 'src/types';

const base = ['normal', 'stretch'];
const contentDistribution = ['space-around', 'space-between', 'space-evenly', 'stretch'];
const contentPosition = ['center', 'end', 'flex-end', 'flex-start', 'start'];

export const flexItems = ['baseline', ...base, ...contentPosition];
export const flexContent = [...base, ...contentDistribution, ...contentPosition];
export const shades = Object.keys(themeVariants.primary) as Shades[];
export const variants = Object.keys(themeVariants) as Variants[];

export function disableControl() {
  return { control: false };
}

export function hideNoControlsWarning() {
  return {
    hideNoControlsWarning: true,
  };
}

export function hideProps(...props: string[]) {
  const fields: AnyObject = {
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

export function colorProps() {
  return {
    shade: { control: 'select', table: { category: 'Color' } },
    variant: { control: 'select', table: { category: 'Color' } },
  };
}

export function flexBoxProps() {
  return {
    alignContent: { control: 'select', options: ['', ...flexContent] },
    align: { control: 'select', options: ['', ...flexItems] },
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    justify: { control: 'select', options: ['', ...flexContent] },
    wrap: { control: 'select', options: ['nowrap', 'wrap', 'wrap-reverse'] },
  };
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
  const { display } = options || {};

  return {
    display: { control: 'text', defaultValue: display, table: { category: 'Layout' } },
    height: { control: 'text', table: { category: 'Layout' } },
    maxHeight: { control: 'text', table: { category: 'Layout' } },
    maxWidth: { control: 'text', table: { category: 'Layout' } },
    minHeight: { control: 'text', table: { category: 'Layout' } },
    minWidth: { control: 'text', table: { category: 'Layout' } },
    opacity: { control: 'number', table: { category: 'Layout' } },
    overflow: { control: 'text', table: { category: 'Layout' } },
    pointerEvents: { control: 'select', table: { category: 'Layout' } },
    textAlign: { control: 'select', table: { category: 'Layout' } },
    transform: { control: 'text', table: { category: 'Layout' } },
    transformOrigin: { control: 'text', table: { category: 'Layout' } },
    transition: { control: 'text', table: { category: 'Layout' } },
    width: { control: 'text', table: { category: 'Layout' } },
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

export function spacingProps() {
  return {
    ...marginProps(),
    ...paddingProps(),
  };
}
