import * as React from 'react';
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
import { isDarkMode, marginStyles, styledOptions } from '../modules/system';
import { NonIdealState } from '../NonIdealState';
import { StyledProps, WithColor, WithMargin } from '../types';

export interface TabsProps extends StyledProps, WithColor, WithMargin {
  children: React.ReactNode;
  initialId?: string;
  loader?: React.ReactNode;
  maxHeight?: number | StandardLonghandProperties['maxHeight'];
  minHeight?: number | StandardLonghandProperties['minHeight'];
  noContent?: React.ReactNode;
  onClick?: (id: string) => void;
  style?: React.CSSProperties;
}

interface State {
  activeId: string;
  error: boolean;
  isReady: boolean;
  tabs: Omit<TabProps, 'children'>[];
}

const StyledTabs = styled(
  'div',
  styledOptions,
)<TabsProps>(props => {
  return css`
    ${marginStyles(props)}
  `;
});

const StyledHeader = styled.div(props => {
  const { grayLighter, spacing } = getTheme(props);

  return css`
    align-items: flex-start;
    border-bottom: 1px solid ${grayLighter};
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: ${spacing.md};
  `;
});

const StyledHeaderItem = styled(ButtonBase)<
  Pick<TabsProps, 'shade' | 'variant'> & { invalid: boolean; isActive: boolean }
>(props => {
  const { invalid, isActive, shade, variant = 'primary' } = props;
  const { grayDarker, grayMid, grayScale, spacing, variants } = getTheme(props);
  const darkMode = isDarkMode(props);

  const { bg } = getColorVariant(variant, shade, variants);
  const color = darkMode ? grayScale['20'] : grayDarker;

  return css`
    color: ${invalid ? grayMid : color};
    cursor: ${invalid ? 'not-allowed' : 'pointer'};
    font-weight: ${isActive ? 700 : 400};
    line-height: 1;
    padding: ${spacing.xs} ${spacing.md};
    position: relative;

    ${isActive &&
    css`
      &:before {
        background-color: ${bg};
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        bottom: -1px;
        content: '';
        display: block;
        height: 3px;
        left: 0;
        position: absolute;
        right: 0;
      }
    `}
  `;
});

const StyledContent = styled(
  'div',
  styledOptions,
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

  React.useEffect(() => {
    const nextState: SetOptional<State, 'activeId'> = { error: false, isReady: true, tabs: [] };

    React.Children.forEach(children, (child, index) => {
      if (!React.isValidElement(child)) {
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

  const handleClickItem = (event: React.MouseEvent<HTMLButtonElement>) => {
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
      content.header = (
        <StyledHeader>
          {tabs.map(d => (
            <StyledHeaderItem
              key={d.id}
              data-disabled={!!d.disabled}
              data-id={d.id}
              invalid={!!d.disabled}
              isActive={d.id === activeId}
              onClick={handleClickItem}
              shade={shade}
              variant={variant}
            >
              {d.title}
            </StyledHeaderItem>
          ))}
        </StyledHeader>
      );

      content.main = (
        <StyledContent maxHeight={maxHeight}>
          {React.Children.toArray(children).filter(
            d => React.isValidElement(d) && d.props.id === activeId,
          )}
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
      {content.header}
      {content.main}
    </StyledTabs>
  );
}

Tabs.defaultProps = {
  shade: 'mid',
  variant: 'primary',
};

export { Tab } from './Tab';
