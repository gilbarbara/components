import { HiddenInput, Option, Props } from '@gilbarbara/react-dropdown';
import { Simplify, StringOrNumber } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { StyledProps, WithAccent, WithBorderless, WithHeight, WithMargin, WithOpen } from '~/types';

export type DropdownBaseProps = Omit<
  Props,
  | 'className'
  | 'clearComponent'
  | 'clearOnSelect'
  | 'contentComponent'
  | 'create'
  | 'handleComponent'
  | 'inputComponent'
  | 'loadingComponent'
  | 'menuComponent'
  | 'menuItemComponent'
  | 'noDataComponent'
  | 'onClearAll'
  | 'onCreate'
  | 'onSelectAll'
  | 'optionComponent'
  | 'options'
  | 'searchFn'
  | 'secondaryPlaceholder'
  | 'separatorComponent'
  | 'style'
  | 'styles'
>;

export type DropdownProps = Simplify<DropdownKnownProps>;

export interface DropdownKnownProps
  extends StyledProps,
    WithAccent,
    WithBorderless,
    WithHeight,
    WithMargin,
    WithOpen,
    DropdownBaseProps {
  /** @default false */
  allowCreate?: boolean;
  /** @default false */
  closeMultiOnSelect?: boolean;
  /**
   * If set, an input with type hidden will be added to the component with the value of the selected option(s).
   * In case of multiple items, the value will be a string concatenated with "separator".
   */
  inputOptions?: HiddenInput;
  items: Option[];
  /** @default 260 */
  menuMaxHeight?: number;
  onClear?: () => void;
  onCreate?: (item: string, close: () => void) => void;
  onSearch?: (value: string) => void;
  /** @default 260 */
  width?: StringOrNumber;
}

export const defaultProps = {
  accent: 'primary',
  allowCreate: false,
  autoFocus: false,
  borderless: false,
  closeOnScroll: false,
  closeMultiOnSelect: false,
  direction: 'ltr',
  disabled: false,
  height: 'md',
  keepSelectedInList: true,
  labels: {
    create: 'Create {search}',
    noData: 'Nothing found',
  },
  loading: false,
  menuMaxHeight: 260,
  multi: false,
  placeholder: 'Select an option',
  searchBy: 'label',
  searchable: true,
  showClearButton: false,
  showSeparator: false,
  width: 260,
} satisfies Omit<DropdownProps, 'items'>;

export function useDropdown(props: DropdownProps) {
  return useComponentProps(props, defaultProps);
}
