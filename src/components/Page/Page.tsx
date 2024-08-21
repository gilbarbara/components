import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { Property } from 'csstype';

import { getContainerStyles, paddingStyles } from '~/modules/system';

import { Box } from '~/components/Box';
import { Loader } from '~/components/Loader';

import { Alignment, WithTheme } from '~/types';

import { PageProps, usePage } from './usePage';

export const StyledPage = styled(Box)<Omit<PageProps, 'name'> & WithTheme>(props => {
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
  const { componentProps, getDataAttributes } = usePage(props);
  const { align, centered, children, isLoading, justify, maxWidth, name, textAlign, ...rest } =
    componentProps;

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
    <StyledPage {...getDataAttributes(name)} {...rest}>
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

export { defaultProps, type PageProps } from './usePage';
