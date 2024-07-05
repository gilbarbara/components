import { CSSProperties, forwardRef, isValidElement, MouseEvent, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps, omit } from '@gilbarbara/helpers';
import { PlainObject, SetRequired, Simplify } from '@gilbarbara/types';

import { useTheme } from '~/hooks/useTheme';

import { getTheme } from '~/modules/helpers';
import { textDefaultOptions } from '~/modules/options';
import {
  baseStyles,
  colorStyles,
  dimensionStyles,
  flexItemStyles,
  getStyledOptions,
  marginStyles,
  paddingStyles,
  radiusStyles,
  textStyles,
} from '~/modules/system';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';

import {
  Spacing,
  StyledProps,
  VariantWithTones,
  WithChildren,
  WithColors,
  WithDimension,
  WithEndContent,
  WithFlexItem,
  WithMargin,
  WithPadding,
  WithRadius,
  WithStartContent,
  WithTextOptions,
  WithVariant,
} from '~/types';

export interface ChipKnownProps
  extends StyledProps,
    WithChildren,
    WithEndContent,
    WithColors,
    WithDimension,
    WithFlexItem,
    WithMargin,
    WithPadding,
    WithRadius,
    WithStartContent,
    WithTextOptions,
    WithVariant {
  /**
   * Component background color
   * @default primary
   */
  bg?: VariantWithTones;
  endContentOnClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Space between the start and end content
   * @default xxs
   */
  gap?: Spacing;
  startContentOnClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
}

export type ChipProps = Simplify<ChipKnownProps>;

export const defaultProps = {
  ...omit(textDefaultOptions, 'size'),
  bg: 'primary',
  gap: 'xxs',
  radius: 'md',
  size: 'sm',
  variant: 'solid',
} satisfies Omit<ChipProps, 'children'>;

export const StyledChip = styled(
  'span',
  getStyledOptions(),
)<SetRequired<ChipProps, keyof typeof defaultProps>>(props => {
  const { gap } = props;
  const { spacing } = getTheme(props);

  return css`
    ${baseStyles(props)};
    align-items: center;
    display: inline-flex;
    gap: ${spacing[gap]};
    justify-content: center;
    padding: ${spacing.xxs} ${spacing.xs};
    ${colorStyles(props)};
    ${dimensionStyles(props)};
    ${flexItemStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${radiusStyles(props)};
    ${textStyles(props, 1)};
  `;
});

export const Chip = forwardRef<HTMLSpanElement, ChipProps>((props, ref) => {
  const { children, endContent, endContentOnClick, startContent, startContentOnClick, ...rest } =
    mergeProps(defaultProps, props);
  const { getDataAttributes } = useTheme();

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
