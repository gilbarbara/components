import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Icon } from './Icon';
import {
  appearanceStyles,
  baseStyles,
  colorStyles,
  displayStyles,
  marginStyles,
  paddingStyles,
  styledOptions,
  textStyles,
} from './modules/system';
import { Text } from './Text';
import {
  ComponentProps,
  Icons,
  StyledProps,
  WithColor,
  WithDisplay,
  WithMargin,
  WithPadding,
  WithTextOptions,
} from './types';

export interface AnchorKnownProps
  extends StyledProps,
    WithColor,
    WithDisplay,
    WithMargin,
    WithPadding,
    WithTextOptions {
  children: React.ReactNode;
  external?: boolean;
  href: string;
  iconAfter?: Icons;
  iconBefore?: Icons;
  name?: string;
}

export type AnchorProps = ComponentProps<HTMLAnchorElement, AnchorKnownProps>;

export const StyledAnchor = styled(
  'a',
  styledOptions,
)<AnchorProps>(props => {
  const { color } = colorStyles(props);

  return css`
    ${appearanceStyles};
    ${baseStyles(props)};
    align-items: center;
    color: inherit;
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    line-height: 1;
    padding: 0;
    text-decoration: none;
    ${colorStyles(props)};
    ${displayStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${textStyles(props)};

    [data-component-name='Text'] {
      border-bottom: 1px solid ${color};
      line-height: 1;
    }
  `;
});

export const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>((props, ref) => {
  const { children, external, iconAfter, iconBefore, size } = props;
  const { fontSize = '16px' } = textStyles(props);

  const addtionalProps: any = {};

  if (external) {
    addtionalProps.rel = 'noopener noreferrer';
    addtionalProps.target = '_blank';
  }

  return (
    <StyledAnchor ref={ref} data-component-name="Anchor" {...addtionalProps} {...props}>
      {iconBefore && <Icon mr="xxs" name={iconBefore} size={parseInt(`${fontSize}`, 10)} />}
      <Text size={size}>{children}</Text>
      {iconAfter && <Icon ml="xxs" name={iconAfter} size={parseInt(`${fontSize}`, 10)} />}
    </StyledAnchor>
  );
});

Anchor.defaultProps = {
  external: false,
  size: 'regular',
  variant: 'primary',
};
Anchor.displayName = 'Anchor';
