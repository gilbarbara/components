import { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';
import { AnyObject } from '@gilbarbara/types';

import { Box } from './Box';
import { H2, H3 } from './Headings';
import { Icon } from './Icon';
import {
  borderStyles,
  flexItemStyles,
  getStyledOptions,
  layoutStyles,
  marginStyles,
  paddingStyles,
  radiusStyles,
  shadowStyles,
} from './modules/system';
import { Paragraph } from './Paragraph';
import {
  ComponentProps,
  Icons,
  StyledProps,
  WithBorder,
  WithChildrenOptional,
  WithFlexItem,
  WithLayout,
  WithMargin,
  WithPadding,
  WithRadius,
  WithShadow,
} from './types';

export interface NonIdealStateKnownProps
  extends StyledProps,
    WithBorder,
    WithChildrenOptional,
    WithFlexItem,
    WithLayout,
    WithMargin,
    WithPadding,
    WithRadius,
    WithShadow {
  description?: ReactNode;
  icon?: Icons;
  small?: boolean;
  title?: ReactNode;
  type?: 'error' | 'not-found' | 'offline';
}

export type NonIdealStateProps = ComponentProps<HTMLDivElement, NonIdealStateKnownProps, 'wrap'>;

export const StyledNonIdealState = styled(
  Box,
  getStyledOptions('type'),
)<NonIdealStateProps>(props => {
  return css`
    margin: 0 auto;
    text-align: center;
    width: 100%;
    ${borderStyles(props)};
    ${flexItemStyles(props)};
    ${layoutStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${radiusStyles(props)};
    ${shadowStyles(props)};
  `;
});

export function NonIdealState(props: NonIdealStateProps) {
  const { children, description, icon, small, title, type } = props;
  const output: AnyObject = {};
  const iconSize = small ? 64 : 96;

  switch (type) {
    case 'error': {
      output.icon = <Icon name="danger" size={iconSize} />;
      output.title = 'Something went wrong';
      output.description = 'An unexpected error has occurred. Try reloading the page.';
      break;
    }
    case 'not-found': {
      output.icon = <Icon name="smile-none" size={iconSize} />;
      output.title = 'Page not found';
      output.description = "We are sorry, but the page you requested doesn't exist.";
      break;
    }
    case 'offline': {
      output.icon = <Icon name="arrows-exchange-alt-v" size={iconSize} />;
      output.title = 'No connection';
      output.description = 'Please check our internet connection and try again.';
      break;
    }
  }

  if (icon) {
    output.icon = <Icon name={icon} size={iconSize} />;
  }

  if (output.icon) {
    output.icon = <Box>{output.icon}</Box>;
  }

  if (title || output.title) {
    output.title = small ? (
      <H3 mb={0} mt={output.icon ? 'sm' : undefined}>
        {title || output.title}
      </H3>
    ) : (
      <H2 mb={0} mt={output.icon ? 'sm' : undefined}>
        {title || output.title}
      </H2>
    );
  }

  if (description || output.description) {
    output.description = (
      <Paragraph mt={output.title ? 'md' : undefined}>
        {description || output.description}
      </Paragraph>
    );
  }

  if (children) {
    output.content = (
      <Box mt={output.title || output.description ? 'xl' : undefined}>{children}</Box>
    );
  }

  return (
    <StyledNonIdealState data-component-name="NonIdealState" {...omit(props, 'title')}>
      {output.icon}
      {output.title}
      {output.description}
      {output.content}
    </StyledNonIdealState>
  );
}

NonIdealState.defaultProps = {
  maxWidth: '480px',
  padding: 'md',
  radius: false,
  shadow: false,
  small: false,
  type: 'not-found',
};
