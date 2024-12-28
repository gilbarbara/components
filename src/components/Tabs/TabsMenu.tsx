import { useEffect, useId, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { debounce, px } from '@gilbarbara/helpers';
import { SetRequired } from '@gilbarbara/types';

import { getColorTokens } from '~/modules/colors';
import { stringifyCSSProperties } from '~/modules/helpers';
import { flexBoxStyles, getStyledOptions } from '~/modules/system';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';

import { WithTheme } from '~/types';

import { TabsMenuProps, TabsProps, useTabs } from './useTabs';

interface Dimensions {
  [key: string]: {
    height: number;
    left: number;
    top: number;
    width: number;
  };
}

const StyledMenu = styled('div', getStyledOptions())<
  SetRequired<Omit<TabsProps, 'width'>, 'accent' | 'gap' | 'menu'> &
    WithTheme & { activeId: string; dimensions: Dimensions }
>(
  {
    alignItems: 'flex-start',
    display: 'flex',
    position: 'relative',
  },
  props => {
    const { accent, activeId, dimensions, menu, orientation, theme } = props;
    const { darkMode, grayScale } = theme;
    const accentColor = getColorTokens(accent, null, theme).mainColor;
    const { borderColor, borderSize = 2, indicatorColor, indicatorLength, indicatorStyle } = menu;

    const isHorizontal = orientation === 'horizontal';
    const isVertical = orientation === 'vertical';
    let bgColor = darkMode ? grayScale['800'] : grayScale['50'];

    if (borderColor) {
      bgColor = getColorTokens(borderColor, null, theme).mainColor;
    }

    const base = css`
      flex-direction: ${isHorizontal ? 'row' : 'column'};
      flex-shrink: 0;
      overflow: ${isHorizontal ? 'auto hidden' : undefined};
      width: ${isVertical ? px(menu.width) : undefined};
      ${flexBoxStyles({ ...menu, theme })};
    `;

    const before = css`
      &:before {
        background-color: ${borderColor ?? bgColor};
        bottom: 0;
        content: '';
        height: ${isHorizontal ? px(borderSize) : undefined};
        left: ${isHorizontal ? 0 : undefined};
        position: absolute;
        right: 0;
        top: ${isVertical ? 0 : undefined};
        width: ${isHorizontal ? undefined : px(borderSize)};
        z-index: 1;
      }
    `;
    let after = css``;

    if (Object.keys(dimensions).length) {
      const active = dimensions[activeId];
      let lenght = isHorizontal ? active.width : active.height;
      let left = isHorizontal ? px(active.left) : undefined;
      let top = isVertical ? px(active.top) : undefined;

      bgColor = accentColor;

      if (indicatorColor) {
        bgColor = getColorTokens(indicatorColor, null, theme).mainColor;
      }

      if (indicatorLength) {
        if (typeof indicatorLength === 'string') {
          const ratio = parseInt(indicatorLength, 10) / 100;

          lenght = isHorizontal ? active.width * ratio : active.height * ratio;
          left = isHorizontal ? px(active.left + (active.width - lenght) / 2) : undefined;
          top = isVertical ? px(active.top + (active.height - lenght) / 2) : undefined;
        } else {
          lenght = indicatorLength;
          left = isHorizontal ? px(active.left + (active.width - indicatorLength) / 2) : undefined;
          top = isVertical ? px(active.top + (active.height - indicatorLength) / 2) : undefined;
        }
      }

      after = css`
        &:after {
          background-color: ${bgColor};
          bottom: ${isHorizontal ? 0 : undefined};
          content: '';
          display: block;
          height: ${isHorizontal ? px(borderSize) : px(lenght)};
          left: ${left};
          position: absolute;
          right: ${isVertical ? 0 : undefined};
          top: ${top};
          transition: ${`${isVertical ? 'top' : 'left'} 0.3s ease-in-out, width 0.2s`};
          transition-origin: bottom;
          width: ${isHorizontal ? px(lenght) : px(borderSize)};
          z-index: 2;
          ${stringifyCSSProperties(indicatorStyle)};
        }
      `;
    }

    return css`
      ${base};
      ${before};
      ${after};
    `;
  },
);

const StyledMenuItem = styled(ButtonUnstyled, getStyledOptions('disabled'))<
  SetRequired<Pick<TabsProps, 'accent' | 'menu' | 'orientation'>, 'accent' | 'menu'> &
    WithTheme & {
      disabled: boolean;
      isActive: boolean;
    }
>(
  {
    position: 'relative',
    whiteSpace: 'nowrap',
  },
  props => {
    const { accent, disabled, isActive, menu, orientation, theme } = props;
    const { darkMode, grayScale, spacing, white } = theme;
    const { activeItemBgColor, activeItemColor, expand, itemBgColor, itemColor } = menu;

    const accentColor = getColorTokens(accent, null, theme).mainColor;
    let bgColor = darkMode ? grayScale['800'] : white;
    let color = darkMode ? grayScale['200'] : grayScale['800'];
    const isVertical = orientation === 'vertical';

    if (itemBgColor) {
      const { mainColor: tagBgColor, textColor } = getColorTokens(itemBgColor, null, theme);

      bgColor = tagBgColor;
      color = textColor;
    }

    if (itemColor) {
      const { mainColor: tabMainColor } = getColorTokens(itemColor, null, theme);

      color = tabMainColor;
    }

    if (isActive) {
      bgColor = darkMode ? grayScale['900'] : white;
      color = accentColor;

      if (activeItemBgColor) {
        const { mainColor, textColor } = getColorTokens(activeItemBgColor, null, theme);

        bgColor = mainColor;
        color = textColor;
      }

      if (activeItemColor) {
        const { mainColor } = getColorTokens(activeItemColor, null, theme);

        color = mainColor;
      }
    }

    if (disabled) {
      color = grayScale['500'];
    }

    return css`
      background-color: ${bgColor};
      color: ${disabled ? grayScale['500'] : color};
      display: flex;
      justify-content: center;
      flex-grow: ${expand ? 1 : 0};
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
      padding: ${spacing.sm} ${spacing.lg};
      width: ${isVertical ? '100%' : undefined};
      ${stringifyCSSProperties(menu.itemStyle)};

      ${!isActive &&
      !disabled &&
      css`
        &:hover {
          transition: transform 0.2s;
          transform: scale(1.05);
        }
      `};
    `;
  },
);

export function TabsMenu(props: TabsMenuProps) {
  const { activeId, onClickItem, tabs, uniqueId, ...rest } = props;
  const { componentProps: tabsProps, getDataAttributes } = useTabs(rest);
  const { accent, gap, menu, onClick, orientation, theme, ...otherTabsProps } = tabsProps;
  const [dimensions, setDimensions] = useState<Dimensions>({});
  const id = useId();

  useEffect(() => {
    const elements = document.querySelectorAll(`[data-tab-id]`);

    const calculateDimensions = () => {
      setDimensions(
        ([...elements] as HTMLElement[]).reduce<Dimensions>((acc, el) => {
          const tabId = el.getAttribute('data-tab-id');

          if (tabId) {
            acc[tabId] = {
              left: el.offsetLeft,
              top: el.offsetTop,
              width: el.clientWidth,
              height: el.clientHeight,
            };
          }

          return acc;
        }, {}),
      );
    };

    // Create a debounced version of the calculation function
    const debouncedCalculateDimensions = debounce(calculateDimensions, 50);

    // Create a ResizeObserver to observe size changes
    const observer = new ResizeObserver(debouncedCalculateDimensions);

    // Attach the observer to each tab element
    elements.forEach(el => observer.observe(el));

    // Perform an initial calculation
    calculateDimensions();

    return () => {
      // Cleanup the observer on unmount
      observer.disconnect();
    };
  }, [menu.expand]);

  return (
    <StyledMenu
      {...getDataAttributes('TabsMenu')}
      {...otherTabsProps}
      accent={accent}
      activeId={activeId}
      dimensions={dimensions}
      gap={gap}
      id={id}
      menu={menu}
      orientation={orientation}
      role="tablist"
      theme={theme}
    >
      {tabs.map(d => (
        <StyledMenuItem
          key={d.id}
          accent={accent}
          aria-controls={`panel-${uniqueId}-${d.id}`}
          aria-selected={d.id === activeId}
          {...getDataAttributes('TabsMenuItem')}
          data-disabled={!!d.disabled}
          data-tab-id={d.id}
          disabled={!!d.disabled}
          isActive={d.id === activeId}
          menu={menu}
          onClick={onClickItem}
          orientation={orientation}
          role="tab"
          theme={theme}
        >
          {d.title}
        </StyledMenuItem>
      ))}
    </StyledMenu>
  );
}
