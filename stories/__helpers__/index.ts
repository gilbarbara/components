import { AnyObject } from '@gilbarbara/types';

import { TextSizes } from '../../src/types';

const base = ['normal', 'stretch'];
const contentDistribution = ['space-around', 'space-between', 'space-evenly', 'stretch'];
const contentPosition = ['center', 'end', 'flex-end', 'flex-start', 'start'];

export const flexItems = ['baseline', ...base, ...contentPosition];
export const flexContent = [...base, ...contentDistribution, ...contentPosition];
export const textSizes: TextSizes[] = ['small', 'mid', 'regular', 'large'];

export function hideTable() {
  return {
    table: { disable: true },
  };
}

export function hideProps(...props: string[]) {
  const fields: AnyObject = {
    as: hideTable(),
    theme: hideTable(),
    // layout
    bottom: hideTable(),
    height: hideTable(),
    left: hideTable(),
    maxHeight: hideTable(),
    maxWidth: hideTable(),
    minHeight: hideTable(),
    minWidth: hideTable(),
    overflow: hideTable(),
    position: hideTable(),
    right: hideTable(),
    top: hideTable(),
    width: hideTable(),
    // margin
    mx: hideTable(),
    my: hideTable(),
    mb: hideTable(),
    ml: hideTable(),
    mr: hideTable(),
    mt: hideTable(),
    // padding
    px: hideTable(),
    py: hideTable(),
    pb: hideTable(),
    pl: hideTable(),
    pr: hideTable(),
    pt: hideTable(),
  };

  props.forEach(d => {
    fields[d] = hideTable();
  });

  return fields;
}
