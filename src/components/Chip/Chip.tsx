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
      padding: ${spacing.xxs} ${spacing.sm};
      ${getStyles(props, { lineHeightCustom: 1, useFontSize: true })};
    `;
  },
);

export const Chip = forwardRef<HTMLSpanElement, ChipProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useChip(props);
  const { children, endContent, endContentOnClick, startContent, startContentOnClick, ...rest } =
    componentProps;

  const content: PlainObject<ReactNode> = {};

  if (startContent) {
    content.startContent = startContent;

    if (startContentOnClick) {
      content.startContent = (
        <ButtonUnstyled onClick={startContentOnClick}>{content.startContent}</ButtonUnstyled>
      );
    } else {
      content.startContent = isValidElement(startContent) ? (
        startContent
      ) : (
        <span>{startContent}</span>
      );
    }
  }

  if (endContent) {
    content.endContent = endContent;

    if (endContentOnClick) {
      content.endContent = (
        <ButtonUnstyled onClick={endContentOnClick}>{content.endContent}</ButtonUnstyled>
      );
    } else {
      content.endContent = isValidElement(endContent) ? endContent : <span>{endContent}</span>;
    }
  }

  return (
    <StyledChip ref={ref} {...getDataAttributes('Chip')} {...rest}>
      {content.startContent}
      <span>{children}</span>
      {content.endContent}
    </StyledChip>
  );
});

Chip.displayName = 'Chip';

export { defaultProps, type ChipProps } from './useChip';
