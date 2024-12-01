/* eslint-disable react/no-array-index-key */
import { Children, cloneElement, CSSProperties, MouseEvent, ReactElement, useState } from 'react';
import innerText from 'react-innertext';
import styled from '@emotion/styled';
import { opacify } from 'colorizr';
import is from 'is-lite';

import { getColorTokens } from '~/modules/colors';
import { getStyledOptions, getStyles } from '~/modules/system';

import { Button, ButtonProps } from '~/components/Button/Button';

import { WithTheme } from '~/types';

import { ButtonGroupProps, useButtonGroup } from './useButtonGroup';

export const StyledButtonGroup = styled('div', getStyledOptions())<
  Partial<ButtonGroupProps> & WithTheme
>(
  `
    display: inline-flex;

    > button {
      + button {
        margin-left: -1px;
      }

      &:first-of-type {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
      }

      &:last-of-type {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      }

      &:not(:first-of-type):not(:last-of-type) {
        border-radius: 0;
      }
    }
  `,
  props => getStyles(props),
);

export function ButtonGroup(props: ButtonGroupProps) {
  const { componentProps, getDataAttributes } = useButtonGroup(props);
  const {
    bg,
    children,
    color,
    defaultSelected,
    disabled,
    items,
    onClick,
    selected,
    selectedVariant,
    size,
    unselectedVariant,
    ...rest
  } = componentProps;
  const hasItems = is.array(items) && !!items.length;

  const isControlled = hasItems && !!selected;
  const [active, setActive] = useState(
    items?.findIndex(item => {
      const labelText = innerText(item.label);

      if (isControlled) {
        return item.id === selected || labelText === selected;
      }

      if (defaultSelected) {
        return item.id === defaultSelected || labelText === defaultSelected;
      }

      return 0;
    }) ?? 0,
  );

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const { index } = event.currentTarget.dataset;

    onClick?.(event);

    if (hasItems && !isControlled) {
      if (index) {
        setActive(Number(index));
      }
    }
  };

  const buttonProps: Omit<ButtonProps, 'children'> = {
    bg,
    color,
    disabled,
    size,
  };

  const content = items
    ? items.map((item, index) => {
        const { disabled: itemDisabled, id, label, ...itemProps } = item;
        const styles: CSSProperties = {};
        const labelText = innerText(label);
        const isSelected = isControlled
          ? id === selected || labelText === selected
          : index === active;
        const variant = isSelected ? selectedVariant : unselectedVariant;

        if (itemDisabled) {
          styles.color = opacify(
            getColorTokens(color ?? bg, null, rest.theme).mainColor,
            rest.theme.opacityDisabled,
          );
          styles.cursor = 'not-allowed';
          buttonProps.disableRipple = true;
        }

        return (
          <Button
            key={index}
            data-id={id}
            data-index={index}
            data-label={labelText}
            data-selected={isSelected}
            onClick={itemDisabled ? undefined : handleClick}
            style={styles}
            variant={variant}
            {...buttonProps}
            {...itemProps}
          >
            {label}
          </Button>
        );
      })
    : Children.map(children, child => cloneElement(child as ReactElement, { ...buttonProps }));

  return (
    <StyledButtonGroup {...getDataAttributes('ButtonGroup')} {...rest}>
      {content}
    </StyledButtonGroup>
  );
}

ButtonGroup.displayName = 'ButtonGroup';

export { defaultProps, type ButtonGroupProps, type ButtonGroupItemProps } from './useButtonGroup';
