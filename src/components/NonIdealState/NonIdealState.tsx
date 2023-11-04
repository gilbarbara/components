import { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';
import { PlainObject, Simplify } from '@gilbarbara/types';

import {
  baseStyles,
  borderStyles,
  colorStyles,
  flexItemStyles,
  getStyledOptions,
  layoutStyles,
  marginStyles,
  paddingStyles,
  radiusStyles,
  shadowStyles,
} from '~/modules/system';

import { Box } from '~/components/Box';
import { H1, H2, H3 } from '~/components/Headings';
import { Icon } from '~/components/Icon';
import { Paragraph } from '~/components/Paragraph';

import {
  Direction,
  Icons,
  OmitElementProps,
  Sizes,
  StyledProps,
  WithBorder,
  WithChildrenOptional,
  WithColors,
  WithFlexItem,
  WithLayout,
  WithMargin,
  WithPadding,
  WithRadius,
  WithShadow,
} from '~/types';

export interface NonIdealStateKnownProps
  extends StyledProps,
    WithBorder,
    WithColors,
    WithChildrenOptional,
    WithFlexItem,
    WithLayout,
    WithMargin,
    WithPadding,
    WithRadius,
    WithShadow {
  description?: ReactNode;
  /** @default vertical */
  direction?: Direction;
  /** @default false */
  hideIcon?: boolean;
  icon?: Icons;
  /** @default md */
  size?: Sizes;
  title?: ReactNode;
  /** @default not-found */
  type?: 'error' | 'no-results' | 'not-found' | 'offline' | null;
}

export type NonIdealStateProps = Simplify<
  OmitElementProps<HTMLDivElement, NonIdealStateKnownProps, 'wrap'>
>;

export const defaultProps = {
  direction: 'vertical',
  hideIcon: false,
  maxWidth: '600px',
  padding: 'md',
  shadow: false,
  size: 'md',
  type: 'not-found',
} satisfies NonIdealStateProps;

export const StyledNonIdealState = styled(
  'div',
  getStyledOptions('type'),
)<NonIdealStateProps>(props => {
  const { direction } = props;

  return css`
    ${direction === 'horizontal' ? 'align-items: center;' : ''};
    display: ${direction === 'horizontal' ? 'flex' : 'block'};
    margin: 0 auto;
    text-align: ${direction === 'horizontal' ? 'left' : 'center'};
    width: 100%;
    ${baseStyles(props)};
    ${colorStyles(props, false)};
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
  const { children, description, direction, hideIcon, icon, size, title, type } = {
    ...defaultProps,
    ...props,
  };
  const iconSize = {
    sm: 48,
    md: 64,
    lg: 96,
  };
  const isVertical = direction === 'vertical';
  const template: PlainObject<ReactNode> = {};
  const output: PlainObject<ReactNode> = {};

  switch (type) {
    case 'error': {
      template.icon = <Icon name="danger-o" size={iconSize[size]} />;
      template.title = 'Something went wrong';
      template.description = 'An unexpected error has occurred. Try reloading the page.';
      break;
    }
    case 'no-results': {
      template.icon = <Icon name="search" size={iconSize[size]} />;
      template.title = 'No search results';
      template.description = "Your search didn't match anything.";
      break;
    }
    case 'not-found': {
      template.icon = <Icon name="smile-none" size={iconSize[size]} />;
      template.title = 'Page not found';
      template.description = "We are sorry, but the page you requested doesn't exist.";
      break;
    }
    case 'offline': {
      template.icon = <Icon name="arrows-exchange-alt-v" size={iconSize[size]} />;
      template.title = 'No connection';
      template.description = 'Please check our internet connection and try again.';
      break;
    }
  }

  if (!hideIcon && (icon ?? template.icon)) {
    output.icon = (
      <Box align="center" flexBox justify="center">
        {icon ? <Icon name={icon} size={iconSize[size]} /> : template.icon}
      </Box>
    );
  }

  if (title !== null && (title || template.title)) {
    const content = title ?? template.title;

    switch (size) {
      case 'sm': {
        output.title = <H3 mb={0}>{content}</H3>;
        break;
      }
      case 'md': {
        output.title = <H2 mb={0}>{content}</H2>;
        break;
      }
      default: {
        output.title = <H1 mb={0}>{content}</H1>;
        break;
      }
    }
  }

  if (description !== null && (description || template.description)) {
    output.description = (
      <Paragraph mt={output.title ? 'xxs' : undefined}>
        {description ?? template.description}
      </Paragraph>
    );
  }

  if (children) {
    output.content = (
      <Box mt={output.title ?? output.description ? 'xl' : undefined}>{children}</Box>
    );
  }

  return (
    <StyledNonIdealState data-component-name="NonIdealState" {...omit(props, 'title', 'type')}>
      {output.icon}
      <Box ml={!isVertical ? 'xs' : undefined} mt={isVertical && output.icon ? 'sm' : undefined}>
        {output.title}
        {output.description}
      </Box>
      {output.content}
    </StyledNonIdealState>
  );
}

NonIdealState.displayName = 'NonIdealState';
