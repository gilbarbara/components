/* eslint-disable react/no-array-index-key */
import { Children, cloneElement, MouseEvent, ReactElement, useState } from 'react';
import styled from '@emotion/styled';
import is from 'is-lite';

import { getStyledOptions, getStyles } from '~/modules/system';

import { Button } from '~/components/Button/Button';

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
    defaultVariant,
    disabled,
    items,
    onClick,
    selectedVariant,
    size,
    ...rest
  } = componentProps;
  const [active, setActive] = useState(
    items?.findIndex(item => (is.plainObject(item) ? item.defaultSelected : null)) ?? 0,
  );

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const { index = '' } = event.currentTarget.dataset;

    if (index) {
      setActive(Number(index));
    }

    onClick?.(event);
  };

  const buttonProps = {
    bg,
    color,
    disabled,
    size,
  };

  const content = items
    ? items.map((item, index) => {
        const itemProps = is.string(item) ? { children: item } : item;
        const isSelected = index === active;

        return (
          <Button
            key={index}
            data-index={index}
            data-selected={isSelected}
            onClick={handleClick}
            variant={isSelected ? selectedVariant : defaultVariant}
            {...buttonProps}
            {...itemProps}
          />
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

export { defaultProps, type ButtonGroupProps } from './useButtonGroup';
