import { forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import is from 'is-lite';

import { getTheme } from './modules/helpers';
import { baseStyles, getStyledOptions } from './modules/system';
import { Text } from './Text';
import { ComponentProps, StyledProps, WithChildren, WithInline } from './types';

export interface LabelKnownProps extends StyledProps, WithChildren, WithInline {
  /** For the htmlFor attribute */
  labelId?: string;
  labelInfo?: ReactNode;
}

export type LabelProps = ComponentProps<HTMLLabelElement, LabelKnownProps>;

export const StyledLabel = styled(
  'label',
  getStyledOptions(),
)<LabelProps>(props => {
  const { inline } = props;
  const { spacing, typography } = getTheme(props);

  return css`
    ${baseStyles(props)};
    align-items: center;
    cursor: pointer;
    display: ${inline ? 'inline-flex' : 'flex'};
    font-family: inherit;
    font-size: ${typography.regular.fontSize};
    font-weight: 700;
    line-height: 1;
    ${!inline ? `margin-bottom: ${spacing.sm}` : ''};
    position: relative;
    white-space: nowrap;

    [data-component-name='Text'] {
      line-height: 1;
      margin-left: ${spacing.xxs};
    }
  `;
});

export const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const { children, labelId, labelInfo } = props;

  let info;

  if (labelInfo) {
    info = is.string(labelInfo) ? (
      <Text size="mid" variant="gray">
        {labelInfo}
      </Text>
    ) : (
      labelInfo
    );
  }

  return (
    <StyledLabel ref={ref} data-component-name="Label" {...props} htmlFor={labelId}>
      {children}
      {info}
    </StyledLabel>
  );
});

Label.defaultProps = {
  inline: false,
};
