import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme } from './modules/helpers';
import { baseStyles, marginStyles, styledOptions } from './modules/system';
import { ComponentProps, Spacing, StyledProps, WithMargin } from './types';

export interface GroupKnownProps extends StyledProps, WithMargin {
  children: React.ReactNode;
  distribution?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  /** @default sm */
  gap?: Spacing;
}

export type GroupProps = ComponentProps<HTMLDivElement, GroupKnownProps>;

export const StyledGroup = styled(
  'div',
  styledOptions,
)<GroupProps>(props => {
  const { distribution, gap = 'sm' } = props;
  const { spacing } = getTheme(props);

  let gapStyles = css`
    > *:not(:first-child) /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ {
      margin-left: ${spacing[gap]};
    }
  `;
  let distributionStyles;

  if (distribution) {
    distributionStyles = css`
      justify-content: ${distribution};
    `;

    if (distribution.startsWith('space')) {
      gapStyles = css``;
    }
  }

  return css`
    ${baseStyles(props)};
    ${marginStyles(props)};
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    ${distributionStyles};
    ${gapStyles}
  `;
});

export const Group = React.forwardRef<HTMLDivElement, GroupProps>((props, ref) => (
  <StyledGroup ref={ref} data-component-name="Group" {...props} />
));

Group.defaultProps = {
  gap: 'sm',
};
Group.displayName = 'Group';
