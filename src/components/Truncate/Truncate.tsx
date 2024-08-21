import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';

import { getStyledOptions } from '~/modules/system';

import { TruncateProps, useTruncate } from './useTruncate';

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
  const {
    componentProps: { children, ...rest },
    getDataAttributes,
  } = useTruncate(props);

  return (
    <StyledTruncate {...getDataAttributes('Truncate')} {...rest}>
      {children}
    </StyledTruncate>
  );
}

Truncate.displayName = 'Truncate';

export { defaultProps, type TruncateProps } from './useTruncate';
