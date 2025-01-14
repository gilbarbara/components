import { RefObject, useCallback, useEffect } from 'react';
import { useLatest } from '@gilbarbara/hooks';

type ArrowNavigation = 'horizontal' | 'vertical' | 'both';

export type UseKeyboardNavigationReturn = ReturnType<typeof useKeyboardNavigation>;

export interface UseKeyboardNavigationOptions {
  /**
   * The arrow navigation type
   */
  arrowNavigation?: ArrowNavigation;
  /**
   * Disable the keyboard navigation
   * @default false
   */
  disabled?: boolean;
  /**
   * Handler called when when the escape key is pressed
   */
  escCallback?: () => void;
  /**
   * The initial focused element
   */
  initialFocusedElement?: HTMLElement | string;
  selector: string;
  /**
   * Trap the focus inside the elements
   * @default false
   */
  trapFocus?: boolean;
}

export function useKeyboardNavigation(
  elementRef: RefObject<HTMLElement | null>,
  options: UseKeyboardNavigationOptions,
) {
  const { arrowNavigation, disabled, escCallback, initialFocusedElement, selector, trapFocus } =
    options;
  const escCallbackRef = useLatest(escCallback);

  const canBeTabbed = useCallback((element: HTMLElement): boolean => {
    const { tabIndex } = element;

    if (tabIndex === null || tabIndex < 0) {
      return false;
    }

    return !!element;
  }, []);

  const getValidElements = useCallback((): HTMLElement[] => {
    return ([...(elementRef.current?.querySelectorAll(selector) ?? [])] as HTMLElement[]).filter(
      canBeTabbed,
    );
  }, [elementRef, canBeTabbed, selector]);

  const getElementIndex = useCallback((elements: HTMLElement[]): number => {
    return elements.indexOf(document.activeElement as HTMLElement);
  }, []);

  const isLastElement = useCallback((elements: HTMLElement[], index: number): boolean => {
    return index === elements.length - 1;
  }, []);

  const interceptArrows = useCallback(
    (event: KeyboardEvent) => {
      const elements = getValidElements();

      if (!elements.length) {
        return;
      }

      const isPrevious = ['ArrowLeft', 'ArrowUp'].includes(event.code);
      const initialIndex = getElementIndex(elements);
      let index = getElementIndex(elements);

      if (isPrevious) {
        if (trapFocus) {
          index = index === 0 ? elements.length - 1 : index - 1;
        } else {
          index = index === 0 ? index : index - 1;
        }
      } else {
        index =
          !isLastElement(elements, index) || trapFocus ? (index + 1) % elements.length : index;
      }

      if (initialIndex !== index) {
        event.preventDefault();
        elements[index].focus();
      }
    },
    [getValidElements, getElementIndex, isLastElement, trapFocus],
  );

  const interceptTab = useCallback(
    (event: KeyboardEvent) => {
      const elements = getValidElements();

      if (!elements.length) {
        return;
      }

      const { shiftKey } = event;
      const initialIndex = getElementIndex(elements);
      let index = getElementIndex(elements);

      if (shiftKey) {
        if (trapFocus) {
          index = index === 0 ? elements.length - 1 : index - 1;
        } else {
          index = index === 0 ? index : index - 1;
        }
      } else {
        index =
          !isLastElement(elements, index) || trapFocus ? (index + 1) % elements.length : index;
      }

      if (initialIndex !== index) {
        event.preventDefault();
        elements[index].focus();
      }
    },
    [getValidElements, getElementIndex, isLastElement, trapFocus],
  );

  const allowArrowNavigation = useCallback(
    (types: UseKeyboardNavigationOptions['arrowNavigation'][]): boolean => {
      return types.includes(arrowNavigation);
    },
    [arrowNavigation],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { code } = event;

      if (code === 'Tab') {
        interceptTab(event);
      } else if (escCallbackRef.current && code === 'Escape') {
        escCallbackRef.current();
      } else if (
        ['ArrowLeft', 'ArrowRight'].includes(code) &&
        allowArrowNavigation(['horizontal', 'both'])
      ) {
        interceptArrows(event);
      } else if (
        ['ArrowDown', 'ArrowUp'].includes(code) &&
        allowArrowNavigation(['vertical', 'both'])
      ) {
        interceptArrows(event);
      }
    },
    [allowArrowNavigation, escCallbackRef, interceptArrows, interceptTab],
  );

  const checkFocus = useCallback((target: HTMLElement | null) => {
    if (target && document.activeElement !== target) {
      target.focus();
      window.requestAnimationFrame(() => checkFocus(target));
    }
  }, []);

  const setFocus = useCallback(() => {
    if (!initialFocusedElement) {
      return;
    }

    const target =
      typeof initialFocusedElement === 'string'
        ? (elementRef.current?.querySelector(initialFocusedElement) as HTMLElement | null)
        : initialFocusedElement;

    if (target) {
      window.requestAnimationFrame(() => checkFocus(target));
    }
  }, [checkFocus, elementRef, initialFocusedElement]);

  useEffect(() => {
    if (disabled) {
      return () => {};
    }

    window.addEventListener('keydown', handleKeyDown);
    setFocus();

    return () => {
      if (!disabled) {
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [disabled, handleKeyDown, setFocus]);

  const addScope = useCallback(() => {
    if (!disabled) {
      window.addEventListener('keydown', handleKeyDown);
    }
  }, [disabled, handleKeyDown]);

  const removeScope = useCallback(() => {
    if (!disabled) {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [disabled, handleKeyDown]);

  return {
    addScope,
    removeScope,
  };
}
