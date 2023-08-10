import { forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import is from 'is-lite';

import { Text } from './Text';

import { getTheme } from '../modules/helpers';
import { textDefaultOptions } from '../modules/options';
import { baseStyles, getStyledOptions, textStyles } from '../modules/system';
import { ComponentProps, StyledProps, WithChildren, WithInline, WithTextOptions } from '../types';

export interface LabelKnownProps extends StyledProps, WithChildren, WithInline, WithTextOptions {
  /** For the htmlFor attribute */
  labelId?: string;
  labelInfo?: ReactNode;
}

export type LabelProps = ComponentProps<HTMLLabelElement, LabelKnownProps>;

export const defaultProps = {
  ...textDefaultOptions,
  bold: true,
  inline: false,
} satisfies Omit<LabelProps, 'children'>;

export const StyledLabel = styled(
  'label',
  getStyledOptions(),
)<LabelProps>(props => {
  const { inline } = props;
  const { spacing } = getTheme(props);

  return css`
    ${baseStyles(props)};
    align-items: center;
    cursor: pointer;
    display: ${inline ? 'inline-flex' : 'flex'};
    font-family: inherit;
    line-height: 1;
    ${!inline ? `margin-bottom: ${spacing.sm}` : ''};
    position: relative;
    white-space: nowrap;
    ${textStyles(props)};

    [data-component-name='Text'] {
      line-height: 1;
      margin-left: ${spacing.xxs};
    }
  `;
});

export const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const { children, labelId, labelInfo, ...rest } = { ...defaultProps, ...props };

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
    <StyledLabel ref={ref} data-component-name="Label" {...rest} htmlFor={labelId}>
      {children}
      {info}
    </StyledLabel>
  );
});

Label.displayName = 'Label';
