import { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';
import { AnyObject } from '@gilbarbara/types';

import { Box } from './Box';
import { H2 } from './Headings';
import { Icon } from './Icon';
import { getTheme, responsive } from './modules/helpers';
import { getStyledOptions } from './modules/system';
import { Paragraph } from './Paragraph';
import { ComponentProps, Icons, StyledProps, WithChildrenOptional, WithMargin } from './types';

export interface NonIdealStateKnownProps extends StyledProps, WithChildrenOptional, WithMargin {
  description?: ReactNode;
  icon?: Icons;
  small?: boolean;
  title?: ReactNode;
  type?: 'error' | 'offline';
}

export type NonIdealStateProps = ComponentProps<HTMLDivElement, NonIdealStateKnownProps>;

export const StyledNonIdealState = styled(
  Box,
  getStyledOptions('type'),
)<NonIdealStateProps>(props => {
  const { small } = props;
  const { spacing } = getTheme(props);

  return css`
    margin: 0 auto;
    max-width: 320px;
    padding: ${spacing.xl} ${spacing.md};
    text-align: center;
    width: 100%;

    ${responsive({
      md: css`
        max-width: ${small ? '360px' : '480px'};
      `,
    })};
  `;
});

export function NonIdealState(props: NonIdealStateProps) {
  const { children, description, icon, small, title, type } = props;
  const output: AnyObject = {};
  const iconSize = small ? 64 : 96;

  switch (type) {
    case 'offline': {
      output.icon = <Icon name="arrows-exchange-alt-v" size={iconSize} />;
      output.title = 'Oops, we had some connection issues…';
      output.description =
        'It looks like you have a problem with your internet connection. Please try again.';
      break;
    }
    case 'error': {
      output.icon = <Icon name="danger" size={iconSize} />;
      output.title = 'Something went wrong';
      output.description = 'An unexpected error has occurred. Try reloading the page.';
      break;
    }
  }

  if (icon) {
    output.icon = <Icon name={icon} size={iconSize} />;
  }

  const hasTitle = !!title || !!output.title;
  const hasDescription = !!description || !!output.description;
  const hasContent = !!children;

  return (
    <StyledNonIdealState data-component-name="NonIdealState" {...omit(props, 'title')}>
      <div>{output.icon}</div>
      {hasTitle && <H2 mb="md">{title || output.title}</H2>}
      {hasDescription && <Paragraph>{description || output.description}</Paragraph>}
      {hasContent && <Box mt="xl">{children || output.content}</Box>}
    </StyledNonIdealState>
  );
}
