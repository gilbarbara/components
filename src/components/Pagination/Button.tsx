import { MouseEventHandler } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { getStyledOptions, isDarkMode } from '~/modules/system';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';

import { WithAccent, WithChildrenOptional } from '~/types';

interface PaginationButtonProps extends WithAccent, WithChildrenOptional {
  currentPage: number;
  disabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  page: number;
}

const StyledPaginationButton = styled(
  ButtonUnstyled,
  getStyledOptions(),
)<WithAccent & { current: boolean; disabled: boolean }>(props => {
  const { accent = 'primary', current } = props;
  const { black, spacing, typography, white, ...theme } = getTheme(props);
  const color = isDarkMode(props) ? white : black;
  const { mainColor, textColor } = getColorTokens(accent, null, theme);

  return css`
    align-items: center;
    border-radius: 50%;
    background-color: ${current ? mainColor : 'transparent'};
    color: ${current ? textColor : color};
    display: flex;
    font-size: ${typography.sm.fontSize};
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

export default function PaginationButton(props: PaginationButtonProps) {
  const { accent, children, currentPage, disabled, onClick, page } = props;

  return (
    <StyledPaginationButton
      accent={accent}
      current={page === currentPage && children === page}
      data-page={page}
      disabled={disabled}
      onClick={onClick}
    >
      {children ?? page}
    </StyledPaginationButton>
  );
}

PaginationButton.displayName = 'PaginationButton';
