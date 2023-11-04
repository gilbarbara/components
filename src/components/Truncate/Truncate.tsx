import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { Simplify, StringOrNumber } from '@gilbarbara/types';

import { getStyledOptions } from '~/modules/system';

import { StyledProps, WithChildren } from '~/types';

export interface TruncateKnownProps extends StyledProps, WithChildren {
  /** @default 2 */
  lines?: number;
  maxWidth?: StringOrNumber;
}

export type TruncateProps = Simplify<TruncateKnownProps>;

export const defaultProps = {
  lines: 2,
} satisfies Omit<TruncateProps, 'children'>;

const StyledTruncate = styled(
  'span',
  getStyledOptions(),
)<TruncateProps>(props => {
  const { lines, maxWidth } = props;

  if (maxWidth) {
    return css`
      display: inline-block;
      max-width: ${px(maxWidth)};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    `;
  }

  return css`
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${lines ?? 2};
  `;
});

export function Truncate(props: TruncateProps) {
  const { children, ...rest } = { ...defaultProps, ...props };

  return (
    <StyledTruncate data-component-name="Truncate" {...rest}>
      {children}
    </StyledTruncate>
  );
}

Truncate.displayName = 'Truncate';
