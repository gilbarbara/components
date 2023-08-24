import innerText from 'react-innertext';
import is from 'is-lite';

import { DataTableRow } from '~/components/DataTable/types';

import { BorderItem, SortDirection } from '~/types';

export function getBorder(darkMode: boolean): Array<BorderItem> {
  return [{ side: 'top', color: darkMode ? 'gray.700' : 'gray.100' }];
}

export function getRowContent<T extends DataTableRow<string>>(input: T, key: string) {
  const item = input[key];

  return is.plainObject(item) && 'label' in item ? item.label : item;
}

export function getRowKey<T extends DataTableRow<string>>(input: T, index: number) {
  return is.string(input.id) || is.number(input.id) ? input.id : index;
}

export function getRowValue<T extends DataTableRow<string>>(input: T, key: string) {
  const item = input[key];

  return is.plainObject(item) && 'value' in item ? item.value : innerText(item);
}

export function sortData<T extends string>(
  data: Array<DataTableRow<T>>,
  sortBy: T,
  sortDirection: SortDirection,
) {
  if (!sortBy) {
    return data;
  }

  return [...data].sort((a, b) => {
    const leftValue = a[sortBy];
    const rightValue = b[sortBy];

    const left =
      is.plainObject(leftValue) && 'value' in leftValue ? leftValue.value : innerText(leftValue);
    const right =
      is.plainObject(rightValue) && 'value' in rightValue
        ? rightValue.value
        : innerText(rightValue);

    if (sortDirection === 'desc') {
      return right.toLowerCase().localeCompare(left.toLowerCase(), undefined, { numeric: true });
    }

    return left.toLowerCase().localeCompare(right.toLowerCase(), undefined, { numeric: true });
  });
}
