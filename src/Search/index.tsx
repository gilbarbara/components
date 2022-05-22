import { ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent, useEffect, useRef } from 'react';
import { useSetState } from 'react-use';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import Options from './Items';

import { Box } from '../Box';
import { ClickOutside } from '../ClickOutside';
import { ComponentWrapper } from '../ComponentWrapper';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { getTheme, px } from '../modules/helpers';
import { getStyledOptions, marginStyles } from '../modules/system';
import { SearchProps } from '../types';

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

export function Search(props: SearchProps): JSX.Element {
  const {
    borderless,
    debounce,
    height = 230,
    hideIcon,
    icon = 'search',
    items,
    loading,
    onFocus,
    onSearch,
    onSelect,
    onType,
    placeholder,
    showListOnFocus,
    ...rest
  } = props;

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
  const { colors } = getTheme({ theme: useTheme() });

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

    if (onType) {
      onType(inputValue);
    }

    const nextState = { active: !!inputValue, value: inputValue };

    if (debounce) {
      updateState({ ...nextState, typing: true });
      clearTimeout(timeout.current);

      timeout.current = window.setTimeout(() => {
        updateState({
          typing: false,
          currentItems: items.filter(d => d.value.toLowerCase().includes(inputValue.toLowerCase())),
        });

        if (onSearch) {
          onSearch(inputValue);
        }

        timeout.current = 0;
      }, debounce);
    } else {
      updateState({
        ...nextState,
        currentItems: items.filter(d => d.value.toLowerCase().includes(inputValue.toLowerCase())),
      });

      if (onSearch) {
        onSearch(inputValue);
      }
    }
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    updateState({ active: showListOnFocus && !!currentItems.length, focus: true });

    if (onFocus) {
      onFocus(inputValue);
    }
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
      onSelect(dataset.value || '');
    }

    updateState({ cursor: nextCursor });

    if (optionElement.children[nextCursor]) {
      optionElement.children[nextCursor].scrollIntoView({ block: 'end' });
    }
  };

  const handleSelect = (event: MouseEvent<HTMLDivElement>) => {
    const { dataset } = event.currentTarget;

    updateState({ active: false, value: '' });
    onSelect(dataset.value || '');
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
              <Icon color={focus || value ? colors.primary : undefined} name={icon} size={24} />
            )
          }
          size={borderless ? [24, 40] : 40}
          suffix={typing || loading ? <Icon name="spinner" spin /> : undefined}
        >
          <Input
            autoComplete="off"
            borderless={borderless}
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
        <Options
          ref={optionsRef}
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

Search.defaultProps = {
  borderless: false,
  debounce: 0,
  height: 230,
  hideIcon: false,
  icon: 'search',
  loading: false,
  noResultsLabel: 'Nothing found',
  placeholder: 'Search for...',
  showListOnFocus: true,
};
