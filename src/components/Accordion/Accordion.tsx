import { Children, Fragment, isValidElement, useRef } from 'react';
import { css, CSSObject } from '@emotion/react';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';
import { useLifecycles } from '@gilbarbara/hooks';
import { SetRequired } from '@gilbarbara/types';
import is from 'is-lite';

import { useKeyboardNavigation } from '~/hooks/useKeyboardNavigation';

import { getStyledOptions, getStyles } from '~/modules/system';

import { Divider } from '~/components/Divider/Divider';

import { WithTheme } from '~/types';

import { AccordionItem, AccordionItemBase } from './AccordionItem';
import { AccordionProps, useAccordion } from './useAccordion';

export const StyledAccordion = styled('div', getStyledOptions())<
  SetRequired<Omit<AccordionProps, 'children'>, 'variant'> & WithTheme
>(
  {
    display: 'flex',
    flexDirection: 'column',
  },
  props => {
    const { shadow, theme, variant = 'sm' } = props;
    const { darkColor, darkMode, grayScale, radius, shadow: themeShadow, spacing, white } = theme;

    const variantStyles: CSSObject = {};

    if (['bordered', 'shadow'].includes(variant)) {
      variantStyles.padding = `${spacing.xs} ${spacing.md}`;
      variantStyles.borderRadius = radius.md;
    }

    if (variant === 'bordered') {
      variantStyles.border = `2px solid ${grayScale[200]} `;
    }

    if (['bordered', 'shadow'].includes(variant)) {
      variantStyles.backgroundColor = darkMode ? darkColor : white;
    }

    if (variant === 'shadow' && !is.defined(shadow)) {
      variantStyles.boxShadow = themeShadow.mid;
    }

    return css`
      ${getStyles(omit(props, 'variant'), { skipShadow: true })};
      ${variantStyles};
    `;
  },
);

export function Accordion(props: AccordionProps) {
  const { activeItems, componentProps, getDataAttributes, onToggle } = useAccordion(
    props,
    AccordionItem,
  );
  const {
    children,
    compact,
    disabled,
    disabledIds,
    dividerProps,
    headerAlign,
    hideDivider,
    hideToggle,
    initialSelectedIds,
    onChange,
    selectedIds,
    selectionMode,
    theme,
    variant,
    ...rest
  } = componentProps;
  const ref = useRef<HTMLDivElement>(null);

  const { addScope, removeScope } = useKeyboardNavigation(ref, {
    arrowNavigation: 'vertical',
    selector: `[data-${theme.dataAttributeName}="AccordionItemHeader"]`,
  });

  const handleClickToggle = (isOpen: boolean, id?: string) => {
    onToggle(isOpen, id);
  };

  useLifecycles(
    () => {
      addScope();
    },
    () => {
      removeScope();
    },
  );

  const showDivider = !hideDivider;

  return (
    <StyledAccordion
      ref={ref}
      {...getDataAttributes('Accordion')}
      {...rest}
      theme={theme}
      variant={variant}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child) || child.type !== AccordionItem) {
          // eslint-disable-next-line no-console
          console.error('Invalid children detected. Only the AccordionItem component is allowed.');

          return null;
        }

        const { id, ...childProps } = child.props;
        const splitProps: Record<string, any> = {};
        const notLastChild = index < Children.count(children) - 1;
        const isSplit = variant === 'split';

        if (isSplit) {
          splitProps.px = 'md';
          splitProps.radius = 'sm';
          splitProps.shadow = 'mid';
        }

        const isDisabled = disabled || disabledIds?.includes(id) || childProps.disabled;

        return (
          <Fragment key={id}>
            <AccordionItemBase
              compact={compact}
              disabled={isDisabled}
              headerAlign={headerAlign}
              hideToggle={hideToggle ?? childProps.hideToggle}
              id={id}
              onToggle={handleClickToggle}
              open={activeItems.includes(id)}
              py="xs"
              {...childProps}
              {...splitProps}
            />
            {showDivider && notLastChild && (
              <Divider
                color={isSplit ? 'transparent' : undefined}
                spacing={isSplit ? 'xs' : 0}
                {...dividerProps}
              />
            )}
          </Fragment>
        );
      })}
    </StyledAccordion>
  );
}

Accordion.displayName = 'Accordion';

export { defaultProps, type AccordionProps } from './useAccordion';
