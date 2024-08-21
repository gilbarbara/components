import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getColorTokens } from '~/modules/colors';
import { getStyledOptions } from '~/modules/system';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';

import { WithAccent, WithTheme } from '~/types';

import { PaginationButtonProps, usePaginationButton } from './usePagination';

const StyledPaginationButton = styled(
  ButtonUnstyled,
  getStyledOptions(),
)<WithAccent & WithTheme & { current: boolean; disabled: boolean }>(props => {
  const { accent = 'primary', current, theme } = props;
  const { black, darkMode, opacity, spacing, typography, white } = theme;
  const color = darkMode ? white : black;
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
      opacity: ${opacity.medium};
      pointer-events: none;
    }
  `;
});

export default function PaginationButton(props: PaginationButtonProps) {
  const { componentProps, getDataAttributes } = usePaginationButton(props);
  const { accent, children, currentPage, disabled, onClick, page, theme, type } = componentProps;

  const current = page === currentPage && children === page;

  const handleClick = () => {
    onClick?.(page, type);
  };

  return (
    <StyledPaginationButton
      accent={accent}
      current={current}
      {...getDataAttributes('PaginationButton')}
      data-current={current}
      data-page={page}
      data-type={type}
      disabled={disabled}
      onClick={handleClick}
      theme={theme}
    >
      {children ?? page}
    </StyledPaginationButton>
  );
}

PaginationButton.displayName = 'PaginationButton';
