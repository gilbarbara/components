import { forwardRef, isValidElement, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { PlainObject, SetRequired } from '@gilbarbara/types';

import { getStyledOptions, getStyles } from '~/modules/system';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';

import { WithTheme } from '~/types';

import { ChipProps, defaultProps, useChip } from './useChip';

export const StyledChip = styled('span', getStyledOptions())<
  SetRequired<ChipProps, keyof typeof defaultProps> & WithTheme
>(
  {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
  },
  props => {
    const { theme } = props;
    const { spacing } = theme;

    return css`
      padding: ${spacing.xxs} ${spacing.xs};
      ${getStyles(props, { lineHeightCustom: 1, useFontSize: true })};
    `;
  },
);

export const Chip = forwardRef<HTMLSpanElement, ChipProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useChip(props);
  const { children, endContent, endContentOnClick, startContent, startContentOnClick, ...rest } =
    componentProps;

  const content: PlainObject<ReactNode> = {
    startContent,
    endContent,
  };

  if (startContentOnClick) {
    content.startContent = (
      <ButtonUnstyled onClick={endContentOnClick}>{content.startContent}</ButtonUnstyled>
    );
  }

  if (endContentOnClick) {
    content.endContent = (
      <ButtonUnstyled onClick={endContentOnClick}>{content.endContent}</ButtonUnstyled>
    );
  }

  return (
    <StyledChip ref={ref} {...getDataAttributes('Chip')} {...rest}>
      {isValidElement(content.startContent) ? (
        content.startContent
      ) : (
        <span>{content.startContent}</span>
      )}
      <span>{children}</span>
      {isValidElement(content.endContent) ? content.endContent : <span>{content.endContent}</span>}
    </StyledChip>
  );
});

Chip.displayName = 'Chip';

export { defaultProps, type ChipProps } from './useChip';
