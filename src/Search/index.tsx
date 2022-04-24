import * as React from 'react';
import { useSetState } from 'react-use';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { StringOrNumber } from '@gilbarbara/types';

import Options from './Options';

import { Box } from '../Box';
import { ClickOutside } from '../ClickOutside';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { getTheme, px } from '../modules/helpers';
import { marginStyles, styledOptions } from '../modules/system';
import {
  Icons,
  SearchCreateProps,
  SearchMessages,
  SearchOptions,
  StyledProps,
  WithMargin,
} from '../types';

export interface SearchProps extends StyledProps, WithMargin {
  createFn?: (props: SearchCreateProps) => JSX.Element;
  /** @default 400 */
  debounce?: number;
  height?: StringOrNumber;
  /** @default search */
  icon?: Icons;
  messages?: SearchMessages;
  onBlur?: React.FocusEventHandler;
  onFocus?: React.FocusEventHandler;
  onSearch?: (value: string) => void;
  onSelect?: (value: string) => void;
  onType?: (value: string) => void;
  options: SearchOptions;
  /** @default Search for... */
  placeholder?: string;
  /**
   * Always show the create button, even with results.
   *
   * It has no effect without the "createFn" prop.
   * @default false */
  showCreateAlways?: boolean;
  style?: React.CSSProperties;
  width?: StringOrNumber;
}

export const StyledSearch = styled(
  Box,
  styledOptions,
)<Omit<SearchProps, 'onChange' | 'onType' | 'options'>>(props => {
  const { width } = props;

  return css`
    ${marginStyles(props)}
    position: relative;
    width: ${width ? px(width) : '100%'};
  `;
});

const SearchInput = styled('div', styledOptions)`
  position: relative;

  [data-component-name='Icon'] {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  [data-component-name='Icon']:nth-of-type(1) {
    left: 0;
  }

  [data-component-name='Icon']:nth-of-type(2) {
    right: 0;
  }

  [data-component-name='Input'] {
    padding-left: 32px;
  }
`;

const defaultMessages = {
  error: 'Search error',
  loading: 'Loading...',
  noResults: 'Nothing found',
};

export function Search(props: SearchProps): JSX.Element {
  const {
    createFn: Create,
    debounce = 400,
    height = 230,
    icon = 'search',
    messages,
    onBlur,
    onFocus,
    onSearch,
    onSelect,
    onType,
    options,
    placeholder = 'Search for...',
    showCreateAlways,
    ...rest
  } = props;

  const isActive = React.useRef(false);
  const [{ active, focus, search, searching, typing, value }, setState] = useSetState({
    active: false,
    focus: false,
    search: '',
    searching: false,
    typing: false,
    value: '',
  });
  const timeout = React.useRef(0);
  const { colors } = getTheme({ theme: useTheme() });

  React.useEffect(() => {
    isActive.current = true;

    return () => {
      isActive.current = false;
    };
  }, []);

  const setStateIfActive = (state: Parameters<typeof setState>[0]) => {
    if (isActive.current) {
      setState(state);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (onType) {
      onType(inputValue);
    }

    setStateIfActive({ active: !!inputValue, typing: true, value: inputValue });
    clearTimeout(timeout.current);

    timeout.current = window.setTimeout(() => {
      setStateIfActive({ typing: false, search: inputValue });

      if (onSearch) {
        onSearch(inputValue);
      }

      timeout.current = 0;
    }, debounce);
  };

  const close = () => {
    setStateIfActive({ active: false });
  };

  const handleBlur = (event: React.FocusEvent) => {
    setStateIfActive({ focus: false });

    if (onBlur) {
      onBlur(event);
    }
  };

  const handleFocus = () => {
    setStateIfActive({ active: !!value, focus: true });
  };

  const handleSelect = (event: React.MouseEvent<HTMLDivElement>) => {
    setStateIfActive({ active: false, value: '' });

    if (onSelect) {
      const { dataset } = event.currentTarget;

      onSelect(dataset.value || '');
    }
  };

  const setSearching = (input: boolean) => {
    setStateIfActive({ searching: input });
  };

  return (
    <StyledSearch data-component-name="Search" {...rest}>
      <ClickOutside active={active} onClick={close}>
        <SearchInput>
          <Icon color={focus || value ? colors.primary : undefined} name={icon} size={24} />
          <Input
            borderless
            name="search"
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder={placeholder}
            value={value}
          />
          {(typing || searching) && <Icon name="spinner" spin />}
        </SearchInput>
        <Options
          active={active}
          createComponent={Create && <Create close={close} value={search} />}
          height={height}
          messages={{ ...defaultMessages, ...messages }}
          onSelect={handleSelect}
          options={options}
          search={search}
          setSearching={setSearching}
          showCreateAlways={showCreateAlways}
        />
      </ClickOutside>
    </StyledSearch>
  );
}
