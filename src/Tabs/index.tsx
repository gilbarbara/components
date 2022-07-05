import { Children, CSSProperties, isValidElement, MouseEvent, ReactNode, useEffect } from 'react';
import { useSetState } from 'react-use';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';
import { AnyObject } from '@gilbarbara/types';
import { StandardLonghandProperties } from 'csstype';
import { SetOptional } from 'type-fest';

import { Tab, TabProps } from './Tab';

import { ButtonBase } from '../ButtonBase';
import { Loader } from '../Loader';
import { getColorVariant, getTheme, px } from '../modules/helpers';
import { getStyledOptions, isDarkMode, marginStyles } from '../modules/system';
import { NonIdealState } from '../NonIdealState';
import { Direction, StyledProps, WithChildren, WithColor, WithMargin } from '../types';

export interface TabsProps extends StyledProps, WithChildren, WithColor, WithMargin {
  /** @default vertical */
  direction?: Direction;
  /** @default false */
  disableActiveBorderRadius?: boolean;
  initialId?: string;
  loader?: ReactNode;
  maxHeight?: number | StandardLonghandProperties['maxHeight'];
  minHeight?: number | StandardLonghandProperties['minHeight'];
  noContent?: ReactNode;
  onClick?: (id: string) => void;
  style?: CSSProperties;
}

interface State {
  activeId: string;
  error: boolean;
  isReady: boolean;
  tabs: Omit<TabProps, 'children'>[];
}

const StyledTabs = styled(
  'div',
  getStyledOptions('direction'),
)<TabsProps>(props => {
  const { direction } = props;
  const isVertical = direction === 'vertical';

  return css`
    display: ${isVertical ? 'block' : 'flex'};
    ${marginStyles(props)};
  `;
});

const StyledMenu = styled(
  'div',
  getStyledOptions('direction'),
)<TabsProps>(props => {
  const { direction } = props;
  const { grayLighter, spacing } = getTheme(props);

  const isVertical = direction === 'vertical';

  return css`
    align-items: flex-start;
    border-bottom: ${isVertical ? `1px solid ${grayLighter}` : 'none'};
    border-right: ${!isVertical ? `1px solid ${grayLighter}` : 'none'};
    display: flex;
    flex-direction: ${isVertical ? 'row' : 'column'};
    flex-wrap: nowrap;
    margin-bottom: ${isVertical ? spacing.md : undefined};
    margin-right: ${!isVertical ? spacing.md : undefined};
    // min-width: ${!isVertical ? '120px' : 'auto'};
  `;
});

const StyledMenuItem = styled(
  ButtonBase,
  getStyledOptions('direction'),
)<
  Pick<TabsProps, 'direction' | 'disableActiveBorderRadius' | 'shade' | 'variant'> & {
    invalid: boolean;
    isActive: boolean;
  }
>(props => {
  const {
    direction,
    disableActiveBorderRadius,
    invalid,
    isActive,
    shade,
    variant = 'primary',
  } = props;
  const { grayDarker, grayMid, grayScale, spacing, variants } = getTheme(props);
  const darkMode = isDarkMode(props);

  const { bg } = getColorVariant(variant, shade, variants);
  const color = darkMode ? grayScale['20'] : grayDarker;
  const isVertical = direction === 'vertical';
  const isHorizontal = direction === 'horizontal';

  return css`
    color: ${invalid ? grayMid : color};
    cursor: ${invalid ? 'not-allowed' : 'pointer'};
    font-weight: ${isActive ? 700 : 400};
    line-height: 1;
    padding: ${spacing.xs} ${spacing.md};
    position: relative;
    width: ${isHorizontal ? '100%' : undefined};

    ${isActive &&
    css`
      &:before {
        background-color: ${bg};
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
    children,
    initialId = '',
    loader,
    maxHeight,
    noContent,
    onClick,
    shade,
    variant,
    ...rest
  } = props;
  const [{ activeId, error, isReady, tabs }, setState] = useSetState<State>({
    activeId: initialId,
    error: false,
    isReady: false,
    tabs: [],
  });

  useEffect(() => {
    const nextState: SetOptional<State, 'activeId'> = { error: false, isReady: true, tabs: [] };

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

  const handleClickItem = (event: MouseEvent<HTMLButtonElement>) => {
    const { disabled, id = '' } = event.currentTarget.dataset;

    if (activeId === id || disabled === 'true') {
      return;
    }

    setState({ activeId: id });

    if (onClick) {
      onClick(id);
    }
  };

  if (error) {
    return null;
  }

  const content: AnyObject = {};

  if (isReady) {
    if (tabs.length) {
      content.menu = (
        <StyledMenu data-component-name="TabsMenu" direction={rest.direction}>
          {tabs.map(d => (
            <StyledMenuItem
              key={d.id}
              data-component-name="TabsMenuItem"
              data-disabled={!!d.disabled}
              data-id={d.id}
              direction={rest.direction}
              disableActiveBorderRadius={rest.disableActiveBorderRadius}
              invalid={!!d.disabled}
              isActive={d.id === activeId}
              onClick={handleClickItem}
              shade={shade}
              variant={variant}
            >
              {d.title}
            </StyledMenuItem>
          ))}
        </StyledMenu>
      );

      content.main = (
        <StyledContent data-component-name="TabsContent" maxHeight={maxHeight}>
          {Children.toArray(children).filter(d => isValidElement(d) && d.props.id === activeId)}
        </StyledContent>
      );
    } else {
      content.main = noContent || (
        <NonIdealState description="Content not available" icon="danger" small />
      );
    }
  } else {
    content.main = loader || <Loader />;
  }

  return (
    <StyledTabs data-component-name="Tabs" {...rest}>
      {content.menu}
      {content.main}
    </StyledTabs>
  );
}

Tabs.defaultProps = {
  direction: 'vertical',
  disableActiveBorderRadius: false,
  shade: 'mid',
  variant: 'primary',
};

export { Tab } from './Tab';
