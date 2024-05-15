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
import { useMount, useSetState } from '@gilbarbara/hooks';

import KeyboardScope from '~/modules/keyboardScope';
import { getStyledOptions, marginStyles } from '~/modules/system';

import { ClickOutside } from '~/components/ClickOutside';
import { ComponentWrapper } from '~/components/ComponentWrapper';
import { Icon } from '~/components/Icon';
import { Input } from '~/components/Input';

import Items from './Items';
import { SearchProps } from './types';

export const defaultProps = {
  accent: 'primary',
  borderless: false,
  disableCloseOnBlur: false,
  disableKeyboardNavigation: false,
  disabled: false,
  height: 230,
  hideIcon: false,
  icon: 'search',
  loading: false,
  noResultsLabel: 'Nothing found',
  onSearchDebounce: 250,
  placeholder: 'Search for...',
  showListOnFocus: true,
} satisfies Omit<SearchProps, 'items' | 'onSelect'>;

export const StyledSearch = styled(
  'div',
  getStyledOptions(),
)<Omit<SearchProps, 'items' | 'onChange' | 'onSelect' | 'onType'>>(props => {
  const { width } = props;

  return css`
    position: relative;
    width: ${width ? px(width) : '100%'};
    ${marginStyles(props)};
  `;
});

function SearchComponent(props: SearchProps) {
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
  } = { ...defaultProps, ...props };

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
  const scopeManager = useRef<KeyboardScope>();
  const timeout = useRef(0);

  useMount(() => {
    if (!disableKeyboardNavigation) {
      scopeManager.current = new KeyboardScope(mainRef.current, {
        arrowNavigation: 'both',
        escCallback: handleToggleList(false),
        selector: '[data-component-name="SearchItem"]',
      });
    }
  });

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (active) {
      scopeManager.current?.addScope();
    }

    return () => {
      scopeManager.current?.removeScope();
    };
  }, [active]);

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

  let prefixSpacing = borderless ? 32 : true;

  if (hideIcon) {
    prefixSpacing = false;
  }

  const isBusy = typing || loading;

  return (
    <StyledSearch ref={mainRef} data-component-name="Search" {...rest}>
      <ClickOutside active={active} onClick={close}>
        <ComponentWrapper
          prefix={
            hideIcon ? undefined : (
              <Icon color={focus || value ? accent : undefined} name={icon} size={24} />
            )
          }
          size={borderless ? [24, 40] : 40}
          suffix={isBusy ? <Icon name="spinner" spin /> : undefined}
        >
          <Input
            accent={accent}
            autoComplete="off"
            borderless={borderless}
            data-component-name="SearchInput"
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
        </ComponentWrapper>
        <Items
          ref={itemsRef}
          accent={accent}
          active={active}
          cursor={cursor}
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
