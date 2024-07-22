/* eslint-disable react/no-array-index-key */
import { Children, cloneElement, MouseEvent, ReactElement, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps } from '@gilbarbara/helpers';
import { RequireAtLeastOne, Simplify } from '@gilbarbara/types';
import is from 'is-lite';

import { useTheme } from '~/hooks/useTheme';

import { baseStyles, getStyledOptions, marginStyles } from '~/modules/system';

import { Button, ButtonProps } from '~/components/Button/Button';

import {
  DataAttributes,
  StyledProps,
  WithButtonSize,
  WithColorsDefaultBg,
  WithDisabled,
  WithHTMLAttributes,
  WithMargin,
  WithVariant,
} from '~/types';

export interface ButtonGroupKnownProps
  extends StyledProps,
    WithButtonSize,
    WithColorsDefaultBg,
    WithDisabled,
    WithHTMLAttributes,
    WithMargin {
  children?: ReactElement[];
  /**
   * The default variant for the buttons if you are using the `items` prop.
   * @default 'bordered'
   */
  defaultVariant?: WithVariant['variant'];
  items: Array<
    | (ButtonProps &
        DataAttributes & {
          defaultSelected?: boolean;
        })
    | string
  >;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * The selected variant for the buttons if you are using the `items` prop.
   * @default 'solid'
   */
  selectedVariant?: WithVariant['variant'];
}

export type ButtonGroupProps = Simplify<
  RequireAtLeastOne<ButtonGroupKnownProps, 'children' | 'items'>
>;

export const defaultProps = {
  bg: 'primary',
  defaultVariant: 'bordered',
  disabled: false,
  selectedVariant: 'solid',
  size: 'md',
} satisfies Omit<ButtonGroupProps, 'children'>;

export const StyledButtonGroup = styled(
  'div',
  getStyledOptions(),
)<Partial<ButtonGroupProps>>(
  props => css`
    ${baseStyles(props)};
    display: inline-flex;
    ${marginStyles(props)};

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
);

export function ButtonGroup(props: ButtonGroupProps) {
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
  } = mergeProps(defaultProps, props);
  const { getDataAttributes } = useTheme();
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

        return (
          <Button
            key={index}
            data-index={index}
            onClick={handleClick}
            variant={index === active ? selectedVariant : defaultVariant}
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
