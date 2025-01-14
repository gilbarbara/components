import { forwardRef, isValidElement, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SetRequired } from '@gilbarbara/types';

import { getStyledOptions, getStyles } from '~/modules/system';

import { WithTheme } from '~/types';

import { AnchorProps, useAnchor } from './useAnchor';

export const StyledAnchor = styled('a', getStyledOptions())<
  SetRequired<AnchorProps, 'gap' | 'hideDecoration'> & WithTheme
>(
  {
    alignItems: 'center',
    color: 'inherit',
    cursor: 'pointer',
    display: 'inline-flex',
    padding: 0,
  },
  props => {
    const { hideDecoration } = props;

    return css`
      text-decoration: ${hideDecoration ? 'none' : 'underline'};
      ${getStyles(props, { lineHeightCustom: 1, useFontSize: true })};
    `;
  },
);

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useAnchor(props);
  const { children, endContent, external, startContent, ...rest } = componentProps;

  const additionalProps: Record<string, any> = {};

  if (external) {
    additionalProps.rel = 'noopener noreferrer';
    additionalProps.target = '_blank';
  }

  const content: Record<string, ReactNode> = {};

  if (startContent) {
    content.startContent = isValidElement(startContent) ? (
      startContent
    ) : (
      <span>{startContent}</span>
    );
  }

  if (endContent) {
    content.endContent = isValidElement(endContent) ? endContent : <span>{endContent}</span>;
  }

  return (
    <StyledAnchor ref={ref} {...getDataAttributes('Anchor')} {...additionalProps} {...rest}>
      {content.startContent}
      <span>{children}</span>
      {content.endContent}
    </StyledAnchor>
  );
});

Anchor.displayName = 'Anchor';

export { type AnchorProps, defaultProps } from './useAnchor';
