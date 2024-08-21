import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import is from 'is-lite';

import { getStyledOptions, getStyles } from '~/modules/system';

import { Text } from '~/components/Text';

import { WithTheme } from '~/types';

import { LabelProps, useLabel } from './useLabel';

export const StyledLabel = styled('label', getStyledOptions())<LabelProps & WithTheme>(
  {
    alignItems: 'center',
    cursor: 'pointer',
    lineHeight: 1,
    position: 'relative',
  },
  props => {
    const { inline, theme } = props;
    const { dataAttributeName, spacing } = theme;

    return css`
      display: ${inline ? 'inline-flex' : 'flex'};
      ${!inline ? `margin-bottom: ${spacing.sm}` : ''};
      ${getStyles(props, { useFontSize: true })};

      [data-${dataAttributeName}='Text'] {
        line-height: 1;
        margin-left: ${spacing.xxs};
      }
    `;
  },
);

export const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useLabel(props);
  const { children, labelId, labelInfo, ...rest } = componentProps;

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

export { defaultProps, type LabelProps } from './useLabel';
