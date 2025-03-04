import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  memo,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { useSetState } from '@gilbarbara/hooks';

import { useKeyboardNavigation } from '~/hooks/useKeyboardNavigation';
import { getStyledOptions, marginStyles } from '~/modules/system';

import { ClickOutside } from '~/components/ClickOutside';
import { FormElementWrapper } from '~/components/FormElementWrapper';
import { Icon } from '~/components/Icon';
import { Input } from '~/components/Input';

import { WithTheme } from '~/types';

import Items from './Items';
import { SearchProps, useSearch } from './useSearch';

export const StyledSearch = styled(
  'div',
  getStyledOptions(),
)<Omit<SearchProps, 'items' | 'onChange' | 'onSelect' | 'onType'> & WithTheme>(props => {
  const { width = '100%' } = props;

  return css`
    position: relative;
    width: ${px(width)};
    ${marginStyles(props)};
  `;
});

function SearchComponent(props: SearchProps) {
  const { componentProps, getDataAttributes } = useSearch(props);
  const {
    accent,
    borderless,
    disableCloseOnBlur,
    disabled,
    disableKeyboardNavigation,
    height,
    hideIcon,
    icon,
    items,
    loading,
    onBlur,
    onFocus,
    onSearch,
    onSearchDebounce,
    onSelect,
    onType,
    placeholder,
    remote,
    showListOnFocus,
    ...rest
  } = componentProps;
  const { dataAttributeName } = rest.theme;
  const [{ active, currentItems, cursor, focus, typing, value }, setState] = useSetState({
    active: false,
    currentItems: remote ? [] : items,
    cursor: -1,
    focus: false,
    typing: false,
    value: '',
  });
  const mainRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);
  const timeout = useRef(0);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const updateState = useCallback(
    (state: Parameters<typeof setState>[0]) => {
      if (isMounted.current) {
        setState(state);
      }
    },
    [setState],
  );

  const close = useCallback(() => {
    if (disableCloseOnBlur) {
      return;
    }

    updateState({ active: false });
  }, [disableCloseOnBlur, updateState]);

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      updateState({ cursor: -1, focus: false });
      onBlur?.(inputValue);
    },
    [onBlur, updateState],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const nextState = { active: !!inputValue, value: inputValue };

      onType?.(inputValue);

      if (onSearchDebounce) {
        updateState({ ...nextState, typing: true });
        clearTimeout(timeout.current);

        timeout.current = window.setTimeout(() => {
          updateState({
            typing: false,
            currentItems: remote
              ? []
              : items.filter(d => d.value.toLowerCase().includes(inputValue.toLowerCase())),
          });

          onSearch?.(inputValue);

          timeout.current = 0;
        }, onSearchDebounce);
      } else {
        updateState({
          ...nextState,
          currentItems: remote
            ? []
            : items.filter(d => d.value.toLowerCase().includes(inputValue.toLowerCase())),
        });

        onSearch?.(inputValue);
      }
    },
    [items, onSearch, onSearchDebounce, onType, remote, updateState],
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      updateState({
        active: showListOnFocus && (remote ? !!items.length : !!currentItems.length),
        focus: true,
      });

      onFocus?.(inputValue);
    },
    [currentItems.length, items.length, onFocus, remote, showListOnFocus, updateState],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const { code } = event;
      const itemElement = itemsRef.current;

      if (!active || !itemElement) {
        return;
      }

      const nextCursor = cursor;

      if (code === 'Enter') {
        const { dataset } = itemElement.children[cursor] as HTMLDivElement;

        updateState({ active: false, value: '' });
        onSelect(dataset.value ?? '');
      }

      updateState({ cursor: nextCursor });

      if (itemElement.children[nextCursor]) {
        itemElement.children[nextCursor].scrollIntoView({ block: 'end' });
      }
    },
    [active, cursor, onSelect, updateState],
  );

  const handleSelect = useCallback(
    (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
      const { dataset } = event.currentTarget;

      if ('code' in event && !disableKeyboardNavigation) {
        if (['Enter', 'Space'].includes(event.code)) {
          updateState({ active: false, value: '' });
          onSelect(dataset.value ?? '');
        }
      } else {
        updateState({ active: false, value: '' });
        onSelect(dataset.value ?? '');
      }
    },
    [disableKeyboardNavigation, onSelect, updateState],
  );

  const handleToggleList = (force?: boolean) => {
    return () => {
      updateState({ active: force ?? !active });
    };
  };

  const { addScope, removeScope } = useKeyboardNavigation(mainRef, {
    arrowNavigation: 'both',
    disabled: disableKeyboardNavigation,
    escCallback: handleToggleList(false),
    selector: `[data-${dataAttributeName}="SearchItem"]`,
  });

  useEffect(() => {
    if (active) {
      addScope();
    }

    return () => {
      removeScope();
    };
  }, [active, addScope, removeScope]);

  let prefixSpacing = borderless ? 32 : true;

  if (hideIcon) {
    prefixSpacing = false;
  }

  const isBusy = typing || loading;

  return (
    <StyledSearch ref={mainRef} {...getDataAttributes('Search')} {...rest}>
      <ClickOutside active={active} onClick={close}>
        <FormElementWrapper
          endContent={isBusy ? <Icon name="spinner" spin /> : undefined}
          size={borderless ? [24, 40] : 40}
          startContent={
            hideIcon ? undefined : (
              <Icon color={focus || value ? accent : undefined} name={icon} size={24} />
            )
          }
        >
          <Input
            accent={accent}
            autoComplete="off"
            borderless={borderless}
            {...getDataAttributes('SearchInput')}
            disabled={disabled}
            name="search"
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            prefixSpacing={prefixSpacing}
            value={value}
          />
        </FormElementWrapper>
        <Items
          ref={itemsRef}
          accent={accent}
          active={active}
          cursor={cursor}
          getDataAttributes={getDataAttributes}
          height={height}
          isBusy={isBusy}
          items={remote ? items : currentItems}
          onSelect={handleSelect}
          {...rest}
        />
      </ClickOutside>
    </StyledSearch>
  );
}

export const Search = memo(SearchComponent);

Search.displayName = 'Search';

export { defaultProps, type SearchItem, type SearchProps } from './useSearch';
