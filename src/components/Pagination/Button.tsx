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
  onClick: (currentPage: number, type?: string) => void;
  page: number;
  type?: string;
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
  const { accent, children, currentPage, disabled, onClick, page, type } = props;
  const current = page === currentPage && children === page;

  const handleClick = () => {
    onClick?.(page, type);
  };

  return (
    <StyledPaginationButton
      accent={accent}
      current={current}
      data-component-name="PaginationButton"
      data-current={current}
      data-page={page}
      data-type={type}
      disabled={disabled}
      onClick={handleClick}
    >
      {children ?? page}
    </StyledPaginationButton>
  );
}

PaginationButton.displayName = 'PaginationButton';
