import { Children, isValidElement, useCallback, useState } from 'react';
import { useDeepCompareEffect } from '@gilbarbara/hooks';
import { SetRequired } from '@gilbarbara/types';
import is from 'is-lite';

import { AccordionItem } from '~/components/Accordion/AccordionItem';

import type { AccordionProps } from './Accordion';

export interface UseAccordionProps
  extends SetRequired<
    Pick<
      AccordionProps,
      'children' | 'initialSelectedIds' | 'onChange' | 'selectionMode' | 'selectedIds'
    >,
    'selectionMode'
  > {}

export function useAccordion(props: UseAccordionProps) {
  const { children, initialSelectedIds, onChange, selectedIds, selectionMode } = props;

  const items = Children.map(children, child =>
    !isValidElement(child) || child.type !== AccordionItem ? '' : child.props.id,
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
    onToggle,
  };
}
