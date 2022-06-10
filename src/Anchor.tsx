import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Icon } from './Icon';
import {
  appearanceStyles,
  baseStyles,
  colorStyles,
  displayStyles,
  getStyledOptions,
  marginStyles,
  paddingStyles,
  textStyles,
} from './modules/system';
import {
  ComponentProps,
  Icons,
  StyledProps,
  WithChildren,
  WithColor,
  WithDisplay,
  WithMargin,
  WithPadding,
  WithTextOptions,
} from './types';

export interface AnchorKnownProps
  extends StyledProps,
    WithChildren,
    WithColor,
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

export type AnchorProps = ComponentProps<HTMLAnchorElement, AnchorKnownProps>;

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

  const addtionalProps: any = {};

  if (external) {
    addtionalProps.rel = 'noopener noreferrer';
    addtionalProps.target = '_blank';
  }

  return (
    <StyledAnchor ref={ref} data-component-name="Anchor" {...addtionalProps} {...props}>
      {iconBefore && <Icon mr="xxs" name={iconBefore} size={iconSize} />}
      <span>{children}</span>
      {iconAfter && <Icon ml="xxs" name={iconAfter} size={iconSize} />}
    </StyledAnchor>
  );
});

Anchor.defaultProps = {
  bold: false,
  display: 'inline-flex',
  external: false,
  hideDecoration: false,
  shade: 'mid',
  variant: 'primary',
};
