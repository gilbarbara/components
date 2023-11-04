import { Children, cloneElement, ReactElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Simplify } from '@gilbarbara/types';

import { baseStyles, getStyledOptions } from '~/modules/system';

import {
  OmitElementProps,
  StyledProps,
  WithButtonSize,
  WithChildren,
  WithColorsDefaultBg,
  WithDisabled,
} from '~/types';

export interface ButtonGroupKnownProps
  extends StyledProps,
    WithButtonSize,
    WithChildren,
    WithColorsDefaultBg,
    WithDisabled {}

export type ButtonGroupProps = Simplify<OmitElementProps<HTMLDivElement, ButtonGroupKnownProps>>;

export const defaultProps = {
  bg: 'primary',
  disabled: false,
  size: 'md',
} satisfies Omit<ButtonGroupProps, 'children'>;

export const StyledButtonGroup = styled(
  'div',
  getStyledOptions(),
)<Partial<ButtonGroupProps>>(
  props => css`
    ${baseStyles(props)};
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
);

export function ButtonGroup(props: ButtonGroupProps) {
  const { bg, children, color, disabled, size, ...rest } = { ...defaultProps, ...props };
  const buttonProps = {
    bg,
    color,
    disabled,
    size,
  };

  return (
    <StyledButtonGroup data-component-name="ButtonGroup" {...rest}>
      {Children.map(children, child => cloneElement(child as ReactElement, { ...buttonProps }))}
    </StyledButtonGroup>
  );
}

ButtonGroup.displayName = 'ButtonGroup';
