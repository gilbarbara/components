import { forwardRef, isValidElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps, omit } from '@gilbarbara/helpers';
import { SetRequired, Simplify } from '@gilbarbara/types';

import { useTheme } from '~/hooks/useTheme';

import { getTheme } from '~/modules/helpers';
import { textDefaultOptions } from '~/modules/options';
import {
  appearanceStyles,
  baseStyles,
  colorStyles,
  displayStyles,
  getStyledOptions,
  marginStyles,
  paddingStyles,
  textStyles,
} from '~/modules/system';

import {
  OmitElementProps,
  Spacing,
  StyledProps,
  WithChildren,
  WithColorsDefaultColor,
  WithDisplay,
  WithEndContent,
  WithMargin,
  WithPadding,
  WithStartContent,
  WithTextOptions,
} from '~/types';

export interface AnchorKnownProps
  extends StyledProps,
    WithChildren,
    Pick<WithColorsDefaultColor, 'color'>,
    WithDisplay,
    WithEndContent,
    WithMargin,
    WithPadding,
    WithStartContent,
    WithTextOptions {
  /**
   * Open the link in a new tab and add `rel="noopener noreferrer"`.
   * @default false
   */
  external?: boolean;
  /**
   * Space between the start and end content.
   * @default xxs
   */
  gap?: Spacing;
  /**
   * Remove the underline from the link.
   * @default false
   */
  hideDecoration?: boolean;
  href: string;
}

export type AnchorProps = Simplify<OmitElementProps<HTMLAnchorElement, AnchorKnownProps>>;

export const defaultProps = {
  ...omit(textDefaultOptions, 'size'),
  color: 'primary',
  display: 'inline-flex',
  external: false,
  gap: 'xxs',
  hideDecoration: false,
} satisfies Omit<AnchorProps, 'children' | 'href'>;

export const StyledAnchor = styled(
  'a',
  getStyledOptions(),
)<SetRequired<AnchorProps, 'gap' | 'hideDecoration'>>(props => {
  const { gap, hideDecoration } = props;
  const { spacing } = getTheme(props);

  return css`
    ${appearanceStyles};
    ${baseStyles(props)};
    align-items: center;
    color: inherit;
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    gap: ${spacing[gap]};
    padding: 0;
    text-decoration: ${hideDecoration ? 'none' : 'underline'};
    ${colorStyles(props)};
    ${displayStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${textStyles(props, 1)};
  `;
});

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>((props, ref) => {
  const { children, endContent, external, startContent, ...rest } = mergeProps(defaultProps, props);
  const { getDataAttributes } = useTheme();

  const additionalProps: Record<string, any> = defaultProps;

  if (external) {
    additionalProps.rel = 'noopener noreferrer';
    additionalProps.target = '_blank';
  }

  return (
    <StyledAnchor ref={ref} {...getDataAttributes('Anchor')} {...additionalProps} {...rest}>
      {isValidElement(startContent) ? startContent : <span>{startContent}</span>}
      <span>{children}</span>
      {isValidElement(endContent) ? endContent : <span>{endContent}</span>}
    </StyledAnchor>
  );
});

Anchor.displayName = 'Anchor';
