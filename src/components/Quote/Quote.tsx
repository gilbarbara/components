import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled, { CSSObject } from '@emotion/styled';
import { omit, px } from '@gilbarbara/helpers';
import { SetRequired } from '@gilbarbara/types';

import { getColorTokens } from '~/modules/colors';
import { baseStyles, getStyledOptions, getStyles, textStyles } from '~/modules/system';

import { Spacing, WithTheme } from '~/types';

import { QuoteProps, TextOptions, useQuote } from './useQuote';

const borderSizes = {
  sm: '1px',
  md: '2px',
  lg: '4px',
};

export const StyledFigure = styled('figure', getStyledOptions())<
  SetRequired<Omit<QuoteProps, 'attribution' | 'children'>, 'accent' | 'borderSize' | 'gap'> &
    WithTheme
>(
  {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
  },
  props => {
    const { accent, border, borderSize, gap, theme } = props;
    const { spacing } = theme;

    const { mainColor } = getColorTokens(accent, null, theme);

    const styles: CSSObject = {};

    switch (border) {
      case 'bottom': {
        styles.borderBottom = `${borderSizes[borderSize]} solid ${mainColor}`;
        styles.paddingBottom = px(spacing[gap]);

        break;
      }
      case 'left': {
        styles.borderLeft = `${borderSizes[borderSize]} solid ${mainColor}`;
        styles.paddingLeft = px(spacing[gap]);

        break;
      }
      case 'right': {
        styles.borderRight = `${borderSizes[borderSize]} solid ${mainColor}`;
        styles.paddingRight = px(spacing[gap]);

        break;
      }
      case 'top': {
        styles.borderTop = `${borderSizes[borderSize]} solid ${mainColor}`;
        styles.paddingTop = px(spacing[gap]);
        break;
      }
      // no default
    }

    return css`
      ${styles};
      ${getStyles(omit(props, 'border', 'size'), { skipBorder: true })};
    `;
  },
);

export const StyledQuote = styled('blockquote', getStyledOptions())<
  Omit<QuoteProps, 'attribution' | 'children'> & WithTheme
>(
  {
    display: 'block',
    margin: 0,
  },
  props => {
    return css`
      ${baseStyles(props.theme)};
      ${textStyles(props)};
    `;
  },
);

const StyledAttribution = styled(
  'cite',
  getStyledOptions(),
)<WithTheme & { gap: Spacing; size: TextOptions['size'] }>(props => {
  const { gap, theme } = props;
  const { spacing } = theme;

  return css`
    display: flex;
    margin-top: ${spacing[gap]};
    ${textStyles(props)};
  `;
});

export const Quote = forwardRef<HTMLElement, QuoteProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useQuote(props);
  const { attribution, attributionGap, attributionSize, children, ...rest } = componentProps;

  return (
    <StyledFigure ref={ref} {...getDataAttributes('Quote')} {...rest}>
      <StyledQuote {...rest}>{children}</StyledQuote>
      {attribution && (
        <StyledAttribution gap={attributionGap} size={attributionSize} theme={rest.theme}>
          {attribution}
        </StyledAttribution>
      )}
    </StyledFigure>
  );
});

Quote.displayName = 'Quote';

export { defaultProps, type QuoteProps } from './useQuote';
