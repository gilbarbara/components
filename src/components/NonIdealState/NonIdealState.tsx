import { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';
import { PlainObject } from '@gilbarbara/types';

import { getStyledOptions, getStyles } from '~/modules/system';

import { Box } from '~/components/Box';
import { Flex } from '~/components/Flex';
import { H1, H2, H3 } from '~/components/Headings';
import { Icon } from '~/components/Icon';
import { Paragraph } from '~/components/Paragraph';

import { WithTheme } from '~/types';

import { NonIdealStateProps, useNonIdealState } from './useNonIdealState';

export const StyledNonIdealState = styled(
  'div',
  getStyledOptions('type'),
)<NonIdealStateProps & WithTheme>(props => {
  const { orientation } = props;
  const isHorizontal = orientation === 'horizontal';

  return css`
    ${isHorizontal ? 'align-items: center;' : ''};
    display: ${isHorizontal ? 'flex' : 'block'};
    margin: 0 auto;
    text-align: ${isHorizontal ? 'left' : 'center'};
    width: 100%;
    ${getStyles(props, { skipBorder: true })};
  `;
});

export function NonIdealState(props: NonIdealStateProps) {
  const { componentProps, getDataAttributes } = useNonIdealState(props);
  const { children, description, hideIcon, icon, orientation, size, title, type } = componentProps;

  const iconSize = {
    sm: 48,
    md: 64,
    lg: 96,
  };
  const isVertical = orientation === 'vertical';
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
      <Flex align="center" justify="center">
        {icon ? <Icon name={icon} size={iconSize[size]} /> : template.icon}
      </Flex>
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
      <Box mt={(output.title ?? output.description) ? 'xl' : undefined}>{children}</Box>
    );
  }

  return (
    <StyledNonIdealState
      {...getDataAttributes('NonIdealState')}
      {...omit(componentProps, 'title', 'type')}
    >
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

export { defaultProps, type NonIdealStateProps } from './useNonIdealState';
