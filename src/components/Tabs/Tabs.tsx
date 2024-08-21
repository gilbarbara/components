import { Children, isValidElement, MouseEvent, ReactNode, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit, px, unique } from '@gilbarbara/helpers';
import { useMeasure, useSetState } from '@gilbarbara/hooks';
import { PlainObject, SetOptional, SetRequired } from '@gilbarbara/types';
import is from 'is-lite';

import { getColorTokens } from '~/modules/colors';
import { getStyledOptions, marginStyles } from '~/modules/system';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';
import { Loader } from '~/components/Loader';
import { NonIdealState } from '~/components/NonIdealState';

import { WithTheme } from '~/types';

import { Tab, TabProps } from './Tab';
import { TabsProps, useTabs } from './useTabs';

interface State {
  activeId: string;
  error: boolean;
  isReady: boolean;
  tabs: Omit<TabProps, 'children'>[];
  width: number | null;
}

const StyledTabs = styled(
  'div',
  getStyledOptions(),
)<TabsProps & WithTheme>(props => {
  const { orientation } = props;

  return css`
    display: ${orientation === 'vertical' ? 'block' : 'flex'};
    ${marginStyles(props)};
  `;
});

const StyledMenu = styled('div', getStyledOptions())<
  TabsProps & WithTheme & { width: number | null }
>(
  {
    alignItems: 'flex-start',
    display: 'flex',
    position: 'relative',
  },
  props => {
    const { orientation, theme, width } = props;
    const { grayScale, spacing } = theme;

    const isHorizontal = orientation === 'horizontal';
    const isVertical = orientation === 'vertical';

    return css`
      flex-direction: ${isVertical ? 'row' : 'column'};
      margin-bottom: ${isVertical ? spacing.md : undefined};
      margin-right: ${isHorizontal ? spacing.md : undefined};
      max-width: ${width ? px(width) : undefined};
      overflow: ${isVertical ? 'auto hidden' : undefined};

      &:before {
        border-bottom: ${isVertical ? `1px solid ${grayScale['100']}` : undefined};
        border-right: ${isHorizontal ? `1px solid ${grayScale['100']}` : undefined};
        bottom: 0;
        content: '';
        left: ${isVertical ? 0 : undefined};
        position: absolute;
        right: ${isHorizontal ? '-1px' : 0};
        top: ${isHorizontal ? 0 : undefined};
      }
    `;
  },
);

const StyledMenuItem = styled(ButtonUnstyled, getStyledOptions('disabled'))<
  SetRequired<Pick<TabsProps, 'accent' | 'disableActiveBorderRadius' | 'orientation'>, 'accent'> &
    WithTheme & {
      disabled: boolean;
      isActive: boolean;
    }
>(
  {
    lineHeight: 1,
    position: 'relative',
    whiteSpace: 'nowrap',
  },
  props => {
    const { accent, disableActiveBorderRadius, disabled, isActive, orientation, theme } = props;
    const { darkMode, grayScale, spacing } = theme;

    const { mainColor } = getColorTokens(accent, null, theme);
    let color = darkMode ? grayScale['200'] : grayScale['800'];
    const isVertical = orientation === 'vertical';
    const isHorizontal = orientation === 'horizontal';

    if (disabled) {
      color = grayScale['500'];
    } else if (isActive) {
      color = mainColor;
    }

    return css`
      color: ${disabled ? grayScale['500'] : color};
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
      padding: ${spacing.xs} ${spacing.md};
      width: ${isHorizontal ? '100%' : undefined};

      ${isActive &&
      css`
        &:before {
          background-color: ${mainColor};
          bottom: ${isVertical ? '-1px' : 0};
          content: '';
          display: block;
          height: ${isVertical ? '3px' : undefined};
          left: ${isVertical ? 0 : undefined};
          position: absolute;
          right: ${isHorizontal ? '-1px' : 0};
          top: ${isHorizontal ? 0 : undefined};
          width: ${isHorizontal ? '3px' : undefined};

          ${!disableActiveBorderRadius &&
          css`
            border-top-left-radius: 3px;
            border-top-right-radius: ${isVertical ? '3px' : undefined};
            border-bottom-left-radius: ${isHorizontal ? '3px' : undefined};
          `};
        }
      `}
    `;
  },
);

const StyledContent = styled(
  'div',
  getStyledOptions(),
)<Pick<TabsProps, 'maxHeight' | 'minHeight'>>(props => {
  const { maxHeight, minHeight } = props;

  return css`
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
  const [{ activeId, error, isReady, tabs, width }, setState] = useSetState<State>({
    activeId: id ?? defaultId,
    error: false,
    isReady: false,
    tabs: [],
    width: null,
  });
  const isMounted = useRef(false);
  const uniqueId = useRef(unique(6));
  const ref = useRef<HTMLDivElement>(null);
  const measurements = useMeasure(ref);

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

    Children.forEach(children, (child, index) => {
      if (!isValidElement(child)) {
        return;
      }

      if (child.type === Tab) {
        nextState.tabs.push(omit(child.props as TabProps, 'children'));

        if (!activeId && index === 0) {
          nextState.activeId = child.props.id;
        }
      } else {
        nextState.error = true;
        // eslint-disable-next-line no-console
        console.warn('Invalid children detected. Only the Tab component is allowed.');
      }
    });

    setState(nextState);
  }, [activeId, children, setState]);

  useEffect(() => {
    if (measurements.width && measurements.width !== width) {
      setState({ width: measurements.width });
    }
  }, [measurements, setState, width]);

  useEffect(() => {
    setState({ activeId: id });
  }, [id, setState]);

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

  if (error) {
    return null;
  }

  const content: PlainObject<ReactNode> = {};

  if (isReady) {
    if (tabs.length) {
      if (width || rest.orientation === 'horizontal') {
        content.menu = (
          <StyledMenu
            {...getDataAttributes('TabsMenu')}
            orientation={rest.orientation}
            role="tablist"
            theme={rest.theme}
            width={width}
          >
            {tabs.map(d => (
              <StyledMenuItem
                key={d.id}
                accent={accent}
                aria-controls={`panel-${uniqueId.current}-${d.id}`}
                aria-selected={d.id === activeId}
                {...getDataAttributes('TabsMenuItem')}
                data-disabled={!!d.disabled}
                data-tab-id={d.id}
                disableActiveBorderRadius={rest.disableActiveBorderRadius}
                disabled={!!d.disabled}
                isActive={d.id === activeId}
                onClick={handleClickItem}
                orientation={rest.orientation}
                role="tab"
                theme={rest.theme}
              >
                {d.title}
              </StyledMenuItem>
            ))}
          </StyledMenu>
        );
      }

      content.main = (
        <StyledContent
          {...getDataAttributes('TabsContent')}
          maxHeight={maxHeight}
          minHeight={minHeight}
        >
          {Children.toArray(children)
            .filter(d => isValidElement(d) && d.props.id === activeId)
            .map(
              d =>
                isValidElement(d) && (
                  <div
                    key={d.props.id}
                    {...getDataAttributes('TabsPanel')}
                    id={`panel-${uniqueId.current}-${d.props.id}`}
                    role="tabpanel"
                  >
                    {d.props.children}
                  </div>
                ),
            )}
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
    <StyledTabs {...getDataAttributes('Tabs')} {...rest}>
      {rest.orientation === 'vertical' && <div ref={ref} />}
      {content.menu}
      {content.main}
    </StyledTabs>
  );
}

Tabs.displayName = 'Tabs';

export { defaultProps, type TabsProps } from './useTabs';
