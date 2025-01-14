import { forwardRef } from 'react';
import { css, CSSObject } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { SetRequired } from '@gilbarbara/types';

import { getContainerStyles, getStyles } from '~/modules/system';

import { Box } from '~/components/Box';
import { ContainerProps, useContainer } from '~/components/Container/useContainer';

import { WithTheme } from '~/types';

export const StyledContainer = styled(Box)<SetRequired<ContainerProps, 'align'> & WithTheme>(
  {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    width: '100%',
  },
  props => {
    const { fullScreen, fullScreenOffset, responsive, verticalPadding } = props;
    const styles: CSSObject = {};

    if (fullScreen) {
      styles.minHeight = fullScreenOffset ? `calc(100vh - ${px(fullScreenOffset)})` : '100vh';
    }

    return css`
      ${styles};
      ${getContainerStyles(props, { responsive, verticalPadding })};
      ${getStyles(props, { skipBorder: true })};
    `;
  },
);

export const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useContainer(props);

  return <StyledContainer ref={ref} {...getDataAttributes('Container')} {...componentProps} />;
});

Container.displayName = 'Container';

export { type ContainerProps, defaultProps } from './useContainer';
