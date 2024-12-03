import {
  Children,
  isValidElement,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import { useDeepCompareEffect } from '@gilbarbara/hooks';
import { Simplify } from '@gilbarbara/types';
import is from 'is-lite';

import { useComponentProps } from '~/hooks/useComponentProps';

import { CollapseProps } from '~/components/Collapse/Collapse';
import { DividerProps } from '~/components/Divider/Divider';

import {
  StyledProps,
  Variant,
  WithColors,
  WithDimension,
  WithMargin,
  WithPadding,
  WithRadius,
  WithShadow,
} from '~/types';

export interface AccordionItemKnownProps
  extends Omit<
    CollapseProps,
    | 'bottomToggle'
    | 'defaultOpen'
    | 'hideHeaderToggle'
    | 'initialHeight'
    | 'maxHeight'
    | 'showBottomToggle'
  > {
  /**
   * Make the accordion item compact.
   */
  compact?: boolean;
  /**
   * Disable the accordion item.
   * @default false
   */
  disabled?: boolean;
  // indicator	IndicatorProps	The accordion item expanded indicator, usually an arrow icon.
  /**
   * Hide the toggle.
   * @default false
   */
  hideToggle?: boolean;
  /**
   * The accordion item id.
   */
  id: string;
  /**
   * The accordion item subtitle.
   */
  subtitle?: ReactNode;
  /**
   * The accordion item title.
   */
  title: ReactNode;
}

export type AccordionItemBaseProps = Simplify<AccordionItemKnownProps>;
export type AccordionItemProps = Omit<AccordionItemBaseProps, 'compact' | 'open' | 'onToggle' | ''>;

interface AccordionKnownProps
  extends StyledProps,
    WithColors,
    Pick<WithDimension, 'maxWidth' | 'minWidth' | 'width'>,
    WithMargin,
    WithPadding,
    WithRadius,
    WithShadow,
    Pick<CollapseProps, 'headerAlign'> {
  children: ReactElement<AccordionItemProps>[];
  /**
   * Make the accordion compact.
   * @default false
   */
  compact?: boolean;
  /**
   * Disable the accordion.
   */
  disabled?: boolean;
  /**
   * Disabled ids (controlled).
   */
  disabledIds?: string[];
  /**
   * The divider props.
   */
  dividerProps?: Partial<DividerProps>;
  /**
   * Hide the divider at the bottom of each accordion item.
   * @default false
   */
  hideDivider?: boolean;
  /**
   * Hide the items toggle.
   * @default false
   */
  hideToggle?: boolean;
  /**
   * The initial selected ids in the collection (uncontrolled).
   */
  initialSelectedIds?: 'all' | string[];
  /**
   * Handler called when the selection changes.
   */
  onChange?: (selectedIds: string[]) => void;
  /**
   *  The currently selected keys in the collection (controlled).
   */
  selectedIds?: 'all' | string[];
  /**
   * The type of selection that is allowed in the collection.
   * @default single
   */
  selectionMode?: 'none' | 'single' | 'multiple';
  /**
   * Component type
   * @default clean
   */
  variant?: Exclude<Variant, 'solid'> | 'split';
}

export type AccordionProps = Simplify<AccordionKnownProps>;

export const defaultProps = {
  compact: false,
  disabled: false,
  headerAlign: 'start',
  hideDivider: false,
  hideToggle: false,
  variant: 'clean',
  selectionMode: 'single',
} satisfies Omit<AccordionProps, 'children' | 'initialSelectedIds' | 'selectedIds'>;

export function useAccordion<T = JSXElementConstructor<AccordionProps>>(
  props: AccordionProps,
  childType: T,
) {
  const { componentProps, getDataAttributes } = useComponentProps(props, defaultProps);

  const { children, initialSelectedIds, onChange, selectedIds, selectionMode } = componentProps;

  const items = Children.map(children, child =>
    !isValidElement(child) || child.type !== childType ? '' : child.props.id,
  );

  const [activeItems, setActiveItems] = useState<string[]>(() => {
    let keys: string[] = [];

    if (selectedIds) {
      keys = selectedIds === 'all' ? items : selectedIds;
    }

    if (initialSelectedIds) {
      keys = initialSelectedIds === 'all' ? items : initialSelectedIds;
    }

    return keys;
  });

  const isControlled = is.defined(selectedIds);
  const isSelectable = selectionMode !== 'none';
  const isSingle = selectionMode === 'single';

  useDeepCompareEffect(() => {
    if (selectedIds) {
      setActiveItems(selectedIds === 'all' ? items : selectedIds);
    }
  }, [items, selectedIds]);

  const onToggle = useCallback(
    (isOpen: boolean, id?: string) => {
      if (!id) {
        return;
      }

      let nextActiveItems: string[];

      if (isSingle) {
        nextActiveItems = !isOpen ? [id] : [];
      } else {
        nextActiveItems = !isOpen ? [...activeItems, id] : activeItems.filter(key => key !== id);
      }

      onChange?.(nextActiveItems);

      if (isControlled || !isSelectable) {
        return;
      }

      setActiveItems(nextActiveItems);
    },
    [activeItems, isControlled, isSelectable, isSingle, onChange],
  );

  return {
    activeItems,
    componentProps,
    getDataAttributes,
    onToggle,
  };
}

export function useAccordionItem(props: AccordionItemBaseProps) {
  return useComponentProps(props);
}
