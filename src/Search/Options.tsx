import * as React from 'react';
import { useSetState } from 'react-use';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ASYNC_STATUS } from '@gilbarbara/helpers';
import { AnyObject, AsyncStatus, StringOrNumber } from '@gilbarbara/types';
import is from 'is-lite';

import Item from './Item';

import { getTheme, px } from '../modules/helpers';
import { isDarkMode, styledOptions } from '../modules/system';
import {
  SearchMessages,
  SearchOption,
  SearchOptionCallback,
  SearchOptions as SearchOptionsType,
  Theme,
} from '../types';

interface SearchOptionsProps {
  active: boolean;
  createComponent?: React.ReactElement;
  height: StringOrNumber;
  messages: Required<SearchMessages>;
  onSelect: React.MouseEventHandler;
  options: SearchOptionsType;
  search: string;
  setSearching: (input: boolean) => void;
  showCreateAlways?: boolean;
}

interface State {
  items: SearchOption[];
  message: string;
  status: AsyncStatus;
}

const StyledSearchOptions = styled(
  'div',
  styledOptions,
)<{ active: boolean; height: StringOrNumber }>(props => {
  const { active, height } = props;
  const { grayDarker, radius, shadow, spacing, white } = getTheme(props);
  const darkMode = isDarkMode(props);

  return css`
    background-color: ${darkMode ? grayDarker : white};
    border-radius: ${radius.xxs};
    box-shadow: ${shadow.mid};
    left: 0;
    max-height: ${px(height)};
    margin-top: ${spacing.xs};
    overflow-y: auto;
    position: absolute;
    right: 0;
    top: 100%;
    transform-origin: top;
    transform: scaleY(0);
    transition: transform 0.3s;

    ${active &&
    css`
      transform: scaleY(1);
    `}
  `;
});

function getSharedStyles(spacing: Theme['spacing']) {
  return css`
    align-items: center;
    display: flex;
    padding: ${spacing.xs} ${spacing.sm};
    width: 100%;
  `;
}

const Empty = styled(
  'div',
  styledOptions,
)(props => {
  const { spacing } = getTheme(props);

  return css`
    ${getSharedStyles(spacing)};
    justify-content: center;
  `;
});

const Centered = styled(
  'div',
  styledOptions,
)<{ withBorder: boolean }>(props => {
  const { withBorder } = props;
  const { grayLight, spacing } = getTheme(props);

  return css`
    ${getSharedStyles(spacing)};
    border-top: ${withBorder ? `1px solid ${grayLight}` : 0};
    justify-content: center;
    padding: 0;
  `;
});

export default function SearchOptions(props: SearchOptionsProps): JSX.Element {
  const {
    active,
    createComponent,
    height,
    messages,
    onSelect,
    options,
    search,
    setSearching,
    showCreateAlways,
  } = props;
  const isActive = React.useRef(false);

  const [{ items, message, status }, setState] = useSetState<State>({
    items: [],
    message: '',
    status: ASYNC_STATUS.IDLE,
  });

  const getItems = React.useRef(async (fn: SearchOptionCallback, value: string) => {
    isActive.current && setState({ status: ASYNC_STATUS.PENDING });
    setSearching(true);

    try {
      const response = await fn(value);

      isActive.current && setState({ items: response, status: ASYNC_STATUS.SUCCESS });
    } catch (error: any) {
      isActive.current && setState({ message: error.message, status: ASYNC_STATUS.ERROR });
    }

    setSearching(false);
  });

  React.useEffect(() => {
    isActive.current = true;

    return () => {
      isActive.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (is.function(options)) {
      getItems.current(options, search);
    } else {
      isActive.current &&
        setState({
          items: options.filter(d => d.value.includes(search)),
          status: ASYNC_STATUS.SUCCESS,
        });
    }
  }, [options, search, setState]);

  const content: AnyObject = {};

  if (!items.length) {
    if (status === ASYNC_STATUS.ERROR) {
      content.options = <Empty>{message || messages.error}</Empty>;
    } else if (([ASYNC_STATUS.IDLE, ASYNC_STATUS.PENDING] as AsyncStatus[]).includes(status)) {
      content.options = <Empty>{messages.loading}</Empty>;
    } else if (createComponent) {
      content.create = <Centered withBorder={!!items.length}>{createComponent}</Centered>;
    } else if (!createComponent) {
      content.options = <Empty>{messages.noResults}</Empty>;
    }
  } else {
    content.options = items.map(d => (
      <Item key={d.value} onClick={onSelect} value={d.value}>
        {d.label || d.value}
      </Item>
    ));

    if (createComponent && showCreateAlways) {
      content.create = <Centered withBorder={!!items.length}>{createComponent}</Centered>;
    }
  }

  return (
    <StyledSearchOptions
      active={active}
      data-component-name="SearchOptions"
      height={height}
      role="list"
    >
      {content.options}
      {content.create}
    </StyledSearchOptions>
  );
}
