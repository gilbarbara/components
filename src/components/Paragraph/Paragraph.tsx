import { forwardRef, isValidElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit, px } from '@gilbarbara/helpers';
import is from 'is-lite';

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
    const { mt, theme } = props;
    let marginTop: string | undefined;

    if (mt && mt !== 'auto') {
      marginTop = px(theme.spacing[mt]);
    } else if (is.number(mt)) {
      marginTop = px(mt);
    }

    return css`
      ${getStyles(omit(props, 'align', 'mt'), { useFontSize: true })};
      ${alignStyles(props)};
      margin-top: ${marginTop} !important;

      & + p {
        margin-top: ${px(theme.paragraphMarginBetween)};
      }
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
