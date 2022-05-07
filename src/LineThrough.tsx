import { forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme } from './modules/helpers';
import {
  baseStyles,
  colorStyles,
  getStyledOptions,
  marginStyles,
  textStyles,
} from './modules/system';
import {
  ComponentProps,
  Spacing,
  StyledProps,
  WithColor,
  WithMargin,
  WithTextOptions,
} from './types';

export interface LineThroughKnownProps extends StyledProps, WithColor, WithMargin, WithTextOptions {
  children: ReactNode;
  /** @default xs */
  gap?: Spacing;
  /** @default 1 */
  line?: number;
}

export type LineThroughProps = ComponentProps<HTMLSpanElement, LineThroughKnownProps>;

export const StyledLineThrough = styled(
  'p',
  getStyledOptions(),
)<LineThroughProps>(props => {
  const { gap = 'xs', line = 1 } = props;
  const { spacing } = getTheme(props);

  const { color } = colorStyles(props);

  return css`
    ${baseStyles(props)};
    ${marginStyles(props)};
    ${textStyles(props)};
    align-items: center;
    color: ${color};
    display: flex;
    flex-direction: row;
    line-height: 1;
    width: 100%;

    &:before,
    &:after {
      content: '';
      flex: 1 1;
      border-bottom: ${line}px solid;
      margin: auto;
    }

    &:before {
      margin-right: ${spacing[gap]};
    }

    &:after {
      margin-left: ${spacing[gap]};
    }
  `;
});

export const LineThrough = forwardRef<HTMLParagraphElement, LineThroughProps>((props, ref) => (
  <StyledLineThrough ref={ref} data-component-name="LineThrough" {...props} />
));

LineThrough.defaultProps = {
  gap: 'xs',
  line: 1,
  size: 'regular',
};
LineThrough.displayName = 'LineThrough';
