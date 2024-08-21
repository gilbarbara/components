import { forwardRef, isValidElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit, px } from '@gilbarbara/helpers';

import { alignStyles, getStyledOptions, getStyles } from '~/modules/system';

import { Text } from '~/components/Text';

import { WithTheme } from '~/types';

import { ParagraphProps, useParagraph } from './useParagraph';

export const StyledParagraph = styled('p', getStyledOptions())<ParagraphProps & WithTheme>(
  {
    marginBottom: 0,
    marginTop: 0,
  },
  props => {
    const { skipMarginTop, theme } = props;

    return css`
      ${getStyles(omit(props, 'align'), { useFontSize: true })};
      ${alignStyles(props)};

      ${!skipMarginTop &&
      css`
        & + & {
          margin-top: ${px(theme.spacing.sm)};
        }
      `};
    `;
  },
);

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useParagraph(props);
  const { children } = componentProps;

  return (
    <StyledParagraph ref={ref} {...getDataAttributes('Paragraph')} {...componentProps}>
      {isValidElement(children) ? children : <Text {...componentProps} />}
    </StyledParagraph>
  );
});

Paragraph.displayName = 'Paragraph';

export { defaultProps, type ParagraphProps } from './useParagraph';
