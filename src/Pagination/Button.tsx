import { MouseEventHandler } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ButtonBase } from '../ButtonBase';
import { getTheme } from '../modules/helpers';
import { getStyledOptions, isDarkMode } from '../modules/system';
import { WithChildrenOptional } from '../types';

interface PaginationButtonProps extends WithChildrenOptional {
  currentPage: number;
  disabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  page: number;
}

const StyledPaginationButton = styled(
  ButtonBase,
  getStyledOptions(),
)<{ current: boolean; disabled: boolean }>(props => {
  const { current } = props;
  const { black, spacing, typography, variants, white } = getTheme(props);
  const color = isDarkMode(props) ? white : black;

  return css`
    align-items: center;
    border-radius: 50%;
    background-color: ${current ? variants.primary.mid.bg : 'transparent'};
    color: ${current ? variants.primary.mid.color : color};
    display: flex;
    font-size: ${typography.mid.fontSize};
    font-weight: ${700};
    justify-content: center;
    height: ${spacing.xl};
    line-height: 1;
    width: ${spacing.xl};

    &:disabled {
      opacity: 0.3;
      pointer-events: none;
    }
  `;
});

export default function PaginationButton(props: PaginationButtonProps): JSX.Element {
  const { children, currentPage, disabled, onClick, page } = props;

  return (
    <StyledPaginationButton
      current={page === currentPage && children === page}
      data-page={page}
      disabled={disabled}
      onClick={onClick}
    >
      {children || page}
    </StyledPaginationButton>
  );
}
