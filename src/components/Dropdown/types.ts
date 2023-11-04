import { HiddenInput, Option, Props } from '@gilbarbara/react-dropdown';
import { Simplify, StringOrNumber } from '@gilbarbara/types';

import { StyledProps, WithAccent, WithBorderless, WithMargin, WithOpen } from '~/types';

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

export interface DropdownKnownProps
  extends StyledProps,
    WithAccent,
    WithBorderless,
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
  large?: boolean;
  /** @default 260 */
  menuMaxHeight?: number;
  onClear?: () => void;
  onCreate?: (item: string, close: () => void) => void;
  onSearch?: (value: string) => void;
  /** @default 260 */
  width?: StringOrNumber;
}

export type DropdownProps = Simplify<DropdownKnownProps>;
