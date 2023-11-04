import { CSSProperties, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { Simplify, StringOrNumber } from '@gilbarbara/types';
import { Property } from 'csstype';

import { getContainerStyles, paddingStyles } from '~/modules/system';

import { Box } from '~/components/Box';
import { Loader } from '~/components/Loader';

import {
  Alignment,
  OmitElementProps,
  StyledProps,
  WithColors,
  WithFlexBox,
  WithPadding,
} from '~/types';

export interface PageKnownProps
  extends StyledProps,
    WithColors,
    Pick<WithFlexBox, 'align' | 'justify'>,
    WithPadding {
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
   * @default Page
   */
  name?: string;
  /**
   * Don't add the default padding
   * @default false
   */
  skipSpacing?: boolean;
  style?: CSSProperties;
  textAlign?: Alignment;
}

export type PageProps = Simplify<OmitElementProps<HTMLDivElement, PageKnownProps, 'wrap'>>;

export const defaultProps = {
  centered: false,
  isLoading: false,
  minHeight: '100vh',
  name: 'Page',
  skipSpacing: false,
} satisfies Omit<PageProps, 'children'>;

export const StyledPage = styled(Box)<Omit<PageProps, 'name'>>(props => {
  const { minHeight, skipSpacing } = props;

  return css`
    ${paddingStyles(props, true)};
    display: grid;
    min-height: ${px(minHeight)};
    width: 100%;
    ${!skipSpacing
      ? getContainerStyles(props, { responsive: true, verticalPadding: true })
      : undefined};
  `;
});

export function Page(props: PageProps) {
  const { align, centered, children, isLoading, justify, maxWidth, name, textAlign, ...rest } = {
    ...defaultProps,
    ...props,
  };

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
    <StyledPage data-component-name={name} {...rest}>
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
    </StyledPage>
  );
}

Page.displayName = 'Page';
