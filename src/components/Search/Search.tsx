import { ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent, useEffect, useRef } from 'react';
import { useSetState } from 'react-use';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';

import { getStyledOptions, marginStyles } from '~/modules/system';

import { Box } from '~/components/Box';
import { ClickOutside } from '~/components/ClickOutside';
import { ComponentWrapper } from '~/components/ComponentWrapper';
import { Icon } from '~/components/Icon';
import { Input } from '~/components/Input';

import Items from './Items';
import { SearchProps } from './types';

export const defaultProps = {
  accent: 'primary',
  borderless: false,
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
  Box,
  getStyledOptions(),
)<Omit<SearchProps, 'items' | 'onChange' | 'onSelect' | 'onType'>>(props => {
  const { width } = props;

  return css`
    position: relative;
    width: ${width ? px(width) : '100%'};
    ${marginStyles(props)};
  `;
});

export function Search(props: SearchProps) {
  const {
    accent,
    borderless,
    height,
    hideIcon,
    icon,
    items,
    loading,
    onFocus,
    onSearch,
    onSearchDebounce,
    onSelect,
    onType,
    placeholder,
    showListOnFocus,
    ...rest
  } = { ...defaultProps, ...props };

  const optionsRef = useRef<HTMLDivElement>(null);
  const isActive = useRef(false);
  const [{ active, currentItems, cursor, focus, typing, value }, setState] = useSetState({
    active: false,
    currentItems: items,
    cursor: -1,
    focus: false,
    typing: false,
    value: '',
  });
  const timeout = useRef(0);

  useEffect(() => {
    isActive.current = true;

    return () => {
      isActive.current = false;
    };
  }, []);

  const updateState = (state: Parameters<typeof setState>[0]) => {
    if (isActive.current) {
      setState(state);
    }
  };

  const close = () => {
    updateState({ active: false });
  };

  const handleBlur = () => {
    updateState({ cursor: -1, focus: false });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    onType?.(inputValue);

    const nextState = { active: !!inputValue, value: inputValue };

    if (onSearchDebounce) {
      updateState({ ...nextState, typing: true });
      clearTimeout(timeout.current);

      timeout.current = window.setTimeout(() => {
        updateState({
          typing: false,
          currentItems: items.filter(d => d.value.toLowerCase().includes(inputValue.toLowerCase())),
        });

        onSearch?.(inputValue);

        timeout.current = 0;
      }, onSearchDebounce);
    } else {
      updateState({
        ...nextState,
        currentItems: items.filter(d => d.value.toLowerCase().includes(inputValue.toLowerCase())),
      });

      onSearch?.(inputValue);
    }
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    updateState({ active: showListOnFocus && !!currentItems.length, focus: true });

    onFocus?.(inputValue);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { code, shiftKey } = event;
    const optionElement = optionsRef.current;

    if (!active || !optionElement) {
      return;
    }

    let nextCursor = cursor;

    if (
      ((code === 'Tab' && !shiftKey) || code === 'ArrowDown') &&
      cursor < currentItems.length - 1
    ) {
      nextCursor++;
      event.preventDefault();
    } else if (((code === 'Tab' && shiftKey) || code === 'ArrowUp') && cursor > 0) {
      nextCursor--;
      event.preventDefault();
    } else if (code === 'Enter') {
      const { dataset } = optionElement.children[cursor] as HTMLDivElement;

      updateState({ active: false, value: '' });
      onSelect(dataset.value ?? '');
    }

    updateState({ cursor: nextCursor });

    if (optionElement.children[nextCursor]) {
      optionElement.children[nextCursor].scrollIntoView({ block: 'end' });
    }
  };

  const handleSelect = (event: MouseEvent<HTMLDivElement>) => {
    const { dataset } = event.currentTarget;

    updateState({ active: false, value: '' });
    onSelect(dataset.value ?? '');
  };

  let prefixSpacing = borderless ? 32 : true;

  if (hideIcon) {
    prefixSpacing = false;
  }

  return (
    <StyledSearch data-component-name="Search" {...rest}>
      <ClickOutside active={active} onClick={close}>
        <ComponentWrapper
          prefix={
            hideIcon ? undefined : (
              <Icon color={focus || value ? accent : undefined} name={icon} size={24} />
            )
          }
          size={borderless ? [24, 40] : 40}
          suffix={typing || loading ? <Icon name="spinner" spin /> : undefined}
        >
          <Input
            accent={accent}
            autoComplete="off"
            borderless={borderless}
            data-component-name="SearchInput"
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
          ref={optionsRef}
          accent={accent}
          active={active}
          cursor={cursor}
          height={height}
          items={currentItems}
          onSelect={handleSelect}
          {...rest}
        />
      </ClickOutside>
    </StyledSearch>
  );
}

Search.displayName = 'Search';
