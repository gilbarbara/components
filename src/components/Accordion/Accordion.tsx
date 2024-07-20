import { Children, Fragment, isValidElement, ReactElement, useRef } from 'react';
import { css, CSSObject } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps } from '@gilbarbara/helpers';
import { useLifecycles } from '@gilbarbara/hooks';
import { SetRequired, Simplify } from '@gilbarbara/types';
import is from 'is-lite';

import { useKeyboardNavigation } from '~/hooks/useKeyboardNavigation';
import { useTheme } from '~/hooks/useTheme';

import { getTheme } from '~/modules/helpers';
import {
  baseStyles,
  colorStyles,
  dimensionStyles,
  getStyledOptions,
  marginStyles,
  paddingStyles,
  radiusStyles,
  shadowStyles,
} from '~/modules/system';

import { Divider, DividerProps } from '~/components/Divider/Divider';

import {
  StyledProps,
  WithColors,
  WithDimension,
  WithMargin,
  WithPadding,
  WithRadius,
  WithShadow,
} from '~/types';

import { AccordionItem, AccordionItemBase, type AccordionItemProps } from './AccordionItem';
import { useAccordion } from './useAccordion';

interface AccordionKnownProps
  extends StyledProps,
    WithColors,
    Pick<WithDimension, 'maxWidth' | 'minWidth' | 'width'>,
    WithMargin,
    WithPadding,
    WithRadius,
    WithShadow {
  children: ReactElement<AccordionItemProps>[];
  /**
   * Make the accordion compact.
   * @default false
   */
  compact?: boolean;
  /**
   * Disable the accordion.
   */
  disabled?: boolean;
  /**
   * Disabled ids (controlled).
   */
  disabledIds?: string[];
  /**
   * The divider props.
   */
  dividerProps?: Partial<DividerProps>;
  /**
   * Hide the divider at the bottom of each accordion item.
   * @default false
   */
  hideDivider?: boolean;
  /**
   * Hide the items toggle.
   * @default false
   */
  hideToggle?: boolean;
  /**
   * The initial selected ids in the collection (uncontrolled).
   */
  initialSelectedIds?: 'all' | string[];
  /**
   * A callback that is called when the selection changes.
   */
  onChange?: (selectedIds: string[]) => void;
  /**
   *  The currently selected keys in the collection (controlled).
   */
  selectedIds?: 'all' | string[];
  /**
   * The type of selection that is allowed in the collection.
   * @default single
   */
  selectionMode?: 'none' | 'single' | 'multiple';
  /**
   * Component type
   * @default clean
   */
  variant?: 'bordered' | 'clean' | 'shadow' | 'split';
}

export type AccordionProps = Simplify<AccordionKnownProps>;

export const defaultProps = {
  compact: false,
  disabled: false,
  hideDivider: false,
  hideToggle: false,
  variant: 'clean',
  selectionMode: 'single',
} satisfies Omit<AccordionProps, 'children' | 'initialSelectedIds' | 'selectedIds'>;

export const StyledAccordion = styled(
  'div',
  getStyledOptions(),
)<SetRequired<Omit<AccordionProps, 'children'>, 'variant'>>(props => {
  const { shadow, variant = 'sm' } = props;
  const {
    darkColor,
    darkMode,
    grayScale,
    radius,
    shadow: themeShadow,
    spacing,
    white,
  } = getTheme(props);

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
    ${baseStyles(props)};
    display: flex;
    flex-direction: column;
    ${variantStyles};
    ${colorStyles(props, { skipShadow: true })};
    ${dimensionStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${radiusStyles(props)};
    ${shadowStyles(props)};
  `;
});

export function Accordion(props: AccordionProps) {
  const {
    children,
    compact,
    disabled,
    disabledIds,
    dividerProps,
    hideDivider,
    hideToggle,
    initialSelectedIds,
    onChange,
    selectedIds,
    selectionMode,
    variant,
    ...rest
  } = mergeProps(defaultProps, props);
  const { activeItems, onToggle } = useAccordion({
    children,
    initialSelectedIds,
    onChange,
    selectedIds,
    selectionMode,
  });
  const ref = useRef<HTMLDivElement>(null);
  const {
    getDataAttributes,
    theme: { dataAttributeName },
  } = useTheme();

  const { addScope, removeScope } = useKeyboardNavigation(ref, {
    arrowNavigation: 'vertical',
    selector: `[data-${dataAttributeName}="AccordionItemHeader"]`,
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
    <StyledAccordion ref={ref} {...getDataAttributes('Accordion')} {...rest} variant={variant}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child) || child.type !== AccordionItem) {
          // eslint-disable-next-line no-console
          console.error('Invalid children detected. Only the AccordionItem component is allowed.');

          return null;
        }

        const { id, ...childProps } = child.props;
        const otherProps: Record<string, any> = {};
        const notLastChild = index < Children.count(children) - 1;
        const isSplit = variant === 'split';

        if (isSplit) {
          otherProps.px = 'md';
          otherProps.radius = 'sm';
          otherProps.shadow = 'mid';
        }

        const isDisabled = disabled || disabledIds?.includes(id) || childProps.disabled;

        return (
          <Fragment key={id}>
            <AccordionItemBase
              compact={compact}
              disabled={isDisabled}
              hideToggle={hideToggle ?? childProps.hideToggle}
              id={id}
              onToggle={handleClickToggle}
              open={activeItems.includes(id)}
              py="xs"
              {...childProps}
              {...otherProps}
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
