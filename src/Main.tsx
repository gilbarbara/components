import { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StringOrNumber } from '@gilbarbara/types';
import { Property } from 'csstype';

import { Box } from './Box';
import { Loader } from './Loader';
import { getTheme, responsive } from './modules/helpers';
import { Alignment, WithColor, WithFlexBox, WithPadding } from './types';

export interface MainProps extends WithColor, Pick<WithFlexBox, 'align' | 'justify'>, WithPadding {
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
  /**
   * Set the "data-component-name" property
   *
   * @default Main
   */
  name?: string;
  textAlign?: Alignment;
}

export const StyledMain = styled(Box)<Omit<MainProps, 'name'>>(props => {
  const { padding } = props;
  const { spacing } = getTheme(props);

  return css`
    min-height: 100vh;
    width: 100%;

    ${!padding &&
    responsive({
      _: {
        padding: spacing.md,
      },
      lg: {
        padding: spacing.xl,
      },
    })};
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
  name: 'Main',
};
