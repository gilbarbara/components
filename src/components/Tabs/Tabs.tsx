import {
  Children,
  CSSProperties,
  isValidElement,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit, px, unique } from '@gilbarbara/helpers';
import { useMeasure, useSetState } from '@gilbarbara/hooks';
import { PlainObject, SetOptional, SetRequired, Simplify } from '@gilbarbara/types';
import { StandardLonghandProperties } from 'csstype';
import is from 'is-lite';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { getStyledOptions, isDarkMode, marginStyles } from '~/modules/system';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';
import { Loader } from '~/components/Loader';
import { NonIdealState } from '~/components/NonIdealState';

import { Direction, StyledProps, WithAccent, WithChildren, WithMargin } from '~/types';

import { Tab, TabProps } from './Tab';

export interface TabsKnownProps extends StyledProps, WithAccent, WithChildren, WithMargin {
  defaultId?: string;
  /** @default vertical */
  direction?: Direction;
  /** @default false */
  disableActiveBorderRadius?: boolean;
  id?: string;
  loader?: ReactNode;
  maxHeight?: number | StandardLonghandProperties['maxHeight'];
  minHeight?: number | StandardLonghandProperties['minHeight'];
  noContent?: ReactNode;
  onClick?: (id: string) => void;
  style?: CSSProperties;
}

export type TabsProps = Simplify<TabsKnownProps>;

interface State {
  activeId: string;
  error: boolean;
  isReady: boolean;
  tabs: Omit<TabProps, 'children'>[];
  width: number | null;
}

export const defaultProps = {
  accent: 'primary',
  direction: 'vertical',
  disableActiveBorderRadius: false,
} satisfies Omit<TabsProps, 'children'>;

const StyledTabs = styled(
  'div',
  getStyledOptions(),
)<TabsProps>(props => {
  const { direction } = props;

  return css`
    display: ${direction === 'vertical' ? 'block' : 'flex'};
    ${marginStyles(props)};
  `;
});

const StyledMenu = styled(
  'div',
  getStyledOptions(),
)<TabsProps & { width: number | null }>(props => {
  const { direction, width } = props;
  const { grayScale, spacing } = getTheme(props);

  const isHorizontal = direction === 'horizontal';
  const isVertical = direction === 'vertical';

  return css`
    align-items: flex-start;
    display: flex;
    flex-direction: ${isVertical ? 'row' : 'column'};
    margin-bottom: ${isVertical ? spacing.md : undefined};
    margin-right: ${isHorizontal ? spacing.md : undefined};
    max-width: ${width ? px(width) : undefined};
    overflow: ${isVertical ? 'auto hidden' : undefined};
    position: relative;

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
});

const StyledMenuItem = styled(
  ButtonUnstyled,
  getStyledOptions('disabled'),
)<
  SetRequired<Pick<TabsProps, 'accent' | 'direction' | 'disableActiveBorderRadius'>, 'accent'> & {
    disabled: boolean;
    isActive: boolean;
  }
>(props => {
  const { accent, direction, disableActiveBorderRadius, disabled, isActive } = props;
  const { grayScale, spacing, ...theme } = getTheme(props);
  const darkMode = isDarkMode(props);

  const { mainColor } = getColorTokens(accent, null, theme);
  let color = darkMode ? grayScale['200'] : grayScale['800'];
  const isVertical = direction === 'vertical';
  const isHorizontal = direction === 'horizontal';

  if (disabled) {
    color = grayScale['500'];
  } else if (isActive) {
    color = mainColor;
  }

  return css`
    color: ${disabled ? grayScale['500'] : color};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    line-height: 1;
    padding: ${spacing.xs} ${spacing.md};
    position: relative;
    width: ${isHorizontal ? '100%' : undefined};
    white-space: nowrap;

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
});

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
  } = { ...defaultProps, ...props };
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
      if (width || rest.direction === 'horizontal') {
        content.menu = (
          <StyledMenu
            data-component-name="TabsMenu"
            direction={rest.direction}
            role="tablist"
            width={width}
          >
            {tabs.map(d => (
              <StyledMenuItem
                key={d.id}
                accent={accent}
                aria-controls={`panel-${uniqueId.current}-${d.id}`}
                aria-selected={d.id === activeId}
                data-component-name="TabsMenuItem"
                data-disabled={!!d.disabled}
                data-tab-id={d.id}
                direction={rest.direction}
                disableActiveBorderRadius={rest.disableActiveBorderRadius}
                disabled={!!d.disabled}
                isActive={d.id === activeId}
                onClick={handleClickItem}
                role="tab"
              >
                {d.title}
              </StyledMenuItem>
            ))}
          </StyledMenu>
        );
      }

      content.main = (
        <StyledContent
          data-component-name="TabsContent"
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
                    data-component-name="TabsPanel"
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
    <StyledTabs data-component-name="Tabs" {...rest}>
      {rest.direction === 'vertical' && <div ref={ref} />}
      {content.menu}
      {content.main}
    </StyledTabs>
  );
}

Tabs.displayName = 'Tabs';
