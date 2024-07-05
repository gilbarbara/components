import { forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps } from '@gilbarbara/helpers';
import { Simplify } from '@gilbarbara/types';
import is from 'is-lite';

import { useTheme } from '~/hooks/useTheme';

import { getTheme } from '~/modules/helpers';
import { textDefaultOptions } from '~/modules/options';
import {
  baseStyles,
  colorStyles,
  getStyledOptions,
  marginStyles,
  textStyles,
} from '~/modules/system';

import { Text } from '~/components/Text';

import {
  StyledProps,
  WithChildren,
  WithColors,
  WithHTMLAttributes,
  WithInline,
  WithMargin,
  WithTextOptions,
} from '~/types';

export interface LabelKnownProps
  extends StyledProps,
    Pick<WithColors, 'color'>,
    WithChildren,
    WithHTMLAttributes<HTMLLabelElement>,
    WithInline,
    WithMargin,
    WithTextOptions {
  /** For the htmlFor attribute */
  labelId?: string;
  labelInfo?: ReactNode;
}

export type LabelProps = Simplify<LabelKnownProps>;

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
  const { dataAttributeName, spacing } = getTheme(props);

  return css`
    ${baseStyles(props)};
    align-items: center;
    cursor: pointer;
    display: ${inline ? 'inline-flex' : 'flex'};
    font-family: inherit;
    line-height: 1;
    ${!inline ? `margin-bottom: ${spacing.sm}` : ''};
    position: relative;
    ${colorStyles(props)};
    ${marginStyles(props)};
    ${textStyles(props)};

    [data-${dataAttributeName}='Text'] {
      line-height: 1;
      margin-left: ${spacing.xxs};
    }
  `;
});

export const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const { children, labelId, labelInfo, ...rest } = mergeProps(defaultProps, props);
  const { getDataAttributes } = useTheme();

  let info;

  if (labelInfo) {
    info = is.string(labelInfo) ? (
      <Text color={rest.color} size="sm">
        {labelInfo}
      </Text>
    ) : (
      labelInfo
    );
  }

  return (
    <StyledLabel ref={ref} {...getDataAttributes('Label')} {...rest} htmlFor={labelId}>
      {children}
      {info}
    </StyledLabel>
  );
});

Label.displayName = 'Label';
