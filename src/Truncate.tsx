import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StringOrNumber } from '@gilbarbara/types';

import { px } from './modules/helpers';
import { getStyledOptions } from './modules/system';
import { StyledProps, WithChildren } from './types';

export interface TruncateProps extends StyledProps, WithChildren {
  /** @default 2 */
  lines?: number;
  maxWidth?: StringOrNumber;
}

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
    -webkit-line-clamp: ${lines || 2};
  `;
});

export function Truncate(props: TruncateProps): JSX.Element {
  const { children, ...rest } = props;

  return (
    <StyledTruncate data-component-name="Truncate" {...rest}>
      {children}
    </StyledTruncate>
  );
}

Truncate.defaultProps = {
  lines: 2,
};
