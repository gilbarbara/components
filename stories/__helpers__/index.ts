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

export function layoutParameters(options?: { display: string }) {
  const { display = 'block' } = options || {};

  return {
    bottom: { control: 'text' },
    display: { control: 'text', defaultValue: display },
    height: { control: 'text' },
    left: { control: 'text' },
    maxHeight: { control: 'text' },
    maxWidth: { control: 'text' },
    minHeight: { control: 'text' },
    minWidth: { control: 'text' },
    opacity: { control: 'number' },
    overflow: { control: 'text' },
    right: { control: 'text' },
    top: { control: 'text' },
    transform: { control: 'text' },
    transformOrigin: { control: 'text' },
    transition: { control: 'text' },
    width: { control: 'text' },
    zIndex: { control: 'number' },
  };
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
    // margin shortcuts
    ml: hideTable(),
    mb: hideTable(),
    mr: hideTable(),
    mt: hideTable(),
    mx: hideTable(),
    my: hideTable(),
    // padding shortcuts
    pl: hideTable(),
    pb: hideTable(),
    pr: hideTable(),
    pt: hideTable(),
    px: hideTable(),
    py: hideTable(),
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
