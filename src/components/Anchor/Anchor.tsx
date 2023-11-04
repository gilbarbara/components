import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';
import { Simplify } from '@gilbarbara/types';

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

import { Icon } from '~/components/Icon';

import {
  Icons,
  OmitElementProps,
  StyledProps,
  WithChildren,
  WithColorsDefaultColor,
  WithDisplay,
  WithMargin,
  WithPadding,
  WithTextOptions,
} from '~/types';

export interface AnchorKnownProps
  extends StyledProps,
    WithChildren,
    Pick<WithColorsDefaultColor, 'color'>,
    WithDisplay,
    WithMargin,
    WithPadding,
    WithTextOptions {
  external?: boolean;
  hideDecoration?: boolean;
  href: string;
  iconAfter?: Icons;
  iconBefore?: Icons;
  name?: string;
}

export type AnchorProps = Simplify<OmitElementProps<HTMLAnchorElement, AnchorKnownProps>>;

export const defaultProps = {
  ...omit(textDefaultOptions, 'size'),
  color: 'primary',
  display: 'inline-flex',
  external: false,
  hideDecoration: false,
} satisfies Omit<AnchorProps, 'children' | 'href'>;

export const StyledAnchor = styled(
  'a',
  getStyledOptions(),
)<AnchorProps>(props => {
  const { hideDecoration } = props;

  return css`
    ${appearanceStyles};
    ${baseStyles(props)};
    align-items: center;
    color: inherit;
    cursor: pointer;
    font-family: inherit;
    line-height: 1;
    padding: 0;
    text-decoration: ${hideDecoration ? 'none' : 'underline'};
    ${colorStyles(props)};
    ${displayStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${textStyles(props)};
  `;
});

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>((props, ref) => {
  const { children, external, iconAfter, iconBefore } = props;
  const { fontSize } = textStyles(props);
  let iconSize;

  if (fontSize) {
    iconSize = parseInt(`${fontSize}`, 10);
  }

  const additionalProps: Record<string, any> = defaultProps;

  if (external) {
    additionalProps.rel = 'noopener noreferrer';
    additionalProps.target = '_blank';
  }

  return (
    <StyledAnchor ref={ref} data-component-name="Anchor" {...additionalProps} {...props}>
      {iconBefore && <Icon mr="xxs" name={iconBefore} size={iconSize} />}
      <span>{children}</span>
      {iconAfter && <Icon ml="xxs" name={iconAfter} size={iconSize} />}
    </StyledAnchor>
  );
});

Anchor.displayName = 'Anchor';
