import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { baseStyles, styledOptions } from './modules/system';
import { ComponentProps, StyledProps, WithColor, WithComponentSize } from './types';

export interface ButtonGroupKnownProps extends StyledProps, WithColor, WithComponentSize {
  children: React.ReactNode;
}

export type ButtonGroupProps = ComponentProps<HTMLDivElement, ButtonGroupKnownProps>;

export const StyledButtonGroup = styled(
  'div',
  styledOptions,
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

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ children, shade, size, variant, ...rest }, ref) => {
    const buttonProps = {
      shade,
      size,
      variant,
    };

    return (
      <StyledButtonGroup ref={ref} data-component-name="ButtonGroup" {...rest}>
        {React.Children.map(children, child =>
          React.cloneElement(child as React.ReactElement, { ...buttonProps }),
        )}
      </StyledButtonGroup>
    );
  },
);

ButtonGroup.defaultProps = {
  shade: 'mid',
  size: 'md',
  variant: 'primary',
};
ButtonGroup.displayName = 'ButtonGroup';
