import { CSSProperties, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StringOrNumber } from '@gilbarbara/types';
import { Property } from 'csstype';
import is from 'is-lite';

import { Box } from './Box';
import { Loader } from './Loader';
import { getTheme, px, responsive as responsiveHelper } from './modules/helpers';
import { paddingStyles } from './modules/system';
import {
  Alignment,
  ComponentProps,
  StyledProps,
  WithColor,
  WithFlexBox,
  WithPadding,
  WithTextColor,
} from './types';

export interface MainKnownProps
  extends StyledProps,
    WithColor,
    Pick<WithFlexBox, 'align' | 'justify'>,
    WithPadding,
    WithTextColor {
  /**
   * Override `align` and `justify` to "center"
   *
   * @default false
   */
  centered?: boolean;
  children: ReactNode;
  /** @default false */
  isLoading?: boolean;
  maxWidth?: StringOrNumber;
  /** @default 100vh */
  minHeight?: StringOrNumber;
  /**
   * Set the "data-component-name" property
   *
   * @default Main
   */
  name?: string;
  /**
   * Updates the padding for large screens.
   * @default true
   */
  responsive?: boolean;
  style?: CSSProperties;
  textAlign?: Alignment;
}

export type MainProps = ComponentProps<HTMLDivElement, MainKnownProps, 'wrap'>;

export const StyledMain = styled(Box)<Omit<MainProps, 'name'>>(props => {
  const { minHeight = '100vh', padding, responsive } = props;
  const { spacing } = getTheme(props);

  return css`
    display: grid;
    min-height: ${px(minHeight)};
    padding: ${spacing.md};
    width: 100%;

    ${responsive &&
    is.nullOrUndefined(padding) &&
    responsiveHelper({
      lg: {
        padding: spacing.xl,
      },
    })};

    // overrides default padding
    ${paddingStyles(props, true)};
  `;
});

export function Main(props: MainProps): JSX.Element {
  const { align, centered, children, isLoading, justify, maxWidth, name, textAlign, ...rest } =
    props;

  const textAlignMap: Partial<Record<Property.AlignItems, Alignment>> = {
    start: 'left',
    'flex-start': 'left',
    center: 'center',
    end: 'right',
    'flex-end': 'right',
  };

  const shouldCenter = isLoading || centered;
  let textAlignValue = textAlign;

  if (!textAlign) {
    if (centered) {
      textAlignValue = 'center';
    } else if (align && (['start', 'center', 'end'].includes(align) || align.startsWith('flex'))) {
      textAlignValue = textAlignMap[align];
    }
  }

  return (
    <StyledMain data-component-name={name} {...rest}>
      <Box
        align={shouldCenter ? 'center' : align}
        direction="column"
        display={shouldCenter || align || justify ? 'flex' : undefined}
        fill
        justify={shouldCenter ? 'center' : justify}
        maxWidth={maxWidth}
        mx={maxWidth ? 'auto' : undefined}
        textAlign={textAlignValue}
      >
        {isLoading ? <Loader block /> : children}
      </Box>
    </StyledMain>
  );
}

Main.defaultProps = {
  centered: false,
  isLoading: false,
  minHeight: '100vh',
  name: 'Main',
  responsive: true,
};
