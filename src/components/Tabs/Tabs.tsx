import { MouseEvent, ReactNode, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px, unique } from '@gilbarbara/helpers';
import { useSetState } from '@gilbarbara/hooks';
import { PlainObject, SetOptional } from '@gilbarbara/types';
import is from 'is-lite';

import { getMatchingChildren } from '~/modules/react-helpers';
import { getStyledOptions, getStyles } from '~/modules/system';

import { Flex } from '~/components/Flex';
import { Loader } from '~/components/Loader';
import { NonIdealState } from '~/components/NonIdealState';
import { TabsMenu } from '~/components/Tabs/TabsMenu';

import { WithTheme } from '~/types';

import { Tab } from './Tab';
import { TabProps, TabsProps, useTabs } from './useTabs';

interface State {
  activeId: string;
  error: boolean;
  isReady: boolean;
  tabs: TabProps[];
  width: number | null;
}

const StyledTabs = styled(
  'div',
  getStyledOptions(),
)<TabsProps & WithTheme>(props => {
  const { orientation } = props;

  return css`
    display: flex;
    flex-direction: ${orientation === 'vertical' ? 'row' : 'column'};
    flex-grow: 1;
    ${getStyles(props, { skipBorder: true })};
  `;
});

const StyledContent = styled(
  'div',
  getStyledOptions(),
)<Pick<TabsProps, 'maxHeight' | 'minHeight'>>(props => {
  const { maxHeight, minHeight } = props;

  return css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-height: ${maxHeight ? px(maxHeight) : undefined};
    min-height: ${minHeight ? px(minHeight) : undefined};
    overflow-y: auto;
  `;
});

export function Tabs(props: TabsProps) {
  const { componentProps, getDataAttributes } = useTabs(props);
  const {
    accent,
    children,
    defaultId = '',
    id,
    loader,
    maxHeight,
    minHeight,
    noContent,
    onClick,
    ...rest
  } = componentProps;
  const [{ activeId, error, isReady, tabs }, setState] = useSetState<State>({
    activeId: id ?? defaultId,
    error: false,
    isReady: false,
    tabs: [],
    width: null,
  });
  const isMounted = useRef(false);
  const uniqueId = useRef(unique(6));

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const nextState: SetOptional<State, 'activeId' | 'width'> = {
      error: false,
      isReady: true,
      tabs: [],
    };

    const { elements, hasInvalidElements } = getMatchingChildren(children, Tab);

    elements.forEach((child, index) => {
      nextState.tabs.push(child.props);

      if (!activeId && index === 0) {
        nextState.activeId = child.props.id;
      }
    });

    nextState.error = hasInvalidElements;

    setState(nextState);
  }, [activeId, children, setState]);

  useEffect(() => {
    if (id) {
      setState({ activeId: id });
    }
  }, [id, setState]);

  if (error) {
    return null;
  }

  const handleClickItem = (event: MouseEvent<HTMLButtonElement>) => {
    const { disabled, tabId = '' } = event.currentTarget.dataset;

    if (activeId === tabId || disabled === 'true') {
      return;
    }

    if (is.undefined(id)) {
      setState({ activeId: tabId });
    }

    onClick?.(tabId);
  };

  const content: PlainObject<ReactNode> = {};

  if (isReady) {
    if (tabs.length) {
      content.menu = (
        <TabsMenu
          {...props}
          activeId={activeId}
          onClickItem={handleClickItem}
          tabs={tabs}
          uniqueId={uniqueId.current}
        />
      );

      content.main = (
        <StyledContent
          {...getDataAttributes('TabsContent')}
          maxHeight={maxHeight}
          minHeight={minHeight}
        >
          {tabs
            .filter(d => d.id === activeId)
            .map(({ id: tabId, title, ...tabProps }) => {
              return (
                <Flex
                  key={tabId}
                  {...getDataAttributes('TabsPanel')}
                  direction="column"
                  fill
                  id={`panel-${uniqueId.current}-${tabId}`}
                  role="tabpanel"
                  {...tabProps}
                />
              );
            })}
        </StyledContent>
      );
    } else {
      content.main = noContent ?? (
        <NonIdealState description="Content not available" icon="danger-o" size="sm" />
      );
    }
  } else {
    content.main = loader ?? <Loader />;
  }

  return (
    <StyledTabs {...getDataAttributes('Tabs')} minHeight={minHeight} {...rest}>
      {content.menu}
      {content.main}
    </StyledTabs>
  );
}

Tabs.displayName = 'Tabs';

export { defaultProps, type TabsProps } from './useTabs';
