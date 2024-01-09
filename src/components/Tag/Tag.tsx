import { CSSProperties, forwardRef, MouseEvent, ReactNode } from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';
import { PlainObject, Simplify } from '@gilbarbara/types';

import { getTheme } from '~/modules/helpers';
import { textDefaultOptions } from '~/modules/options';
import {
  baseStyles,
  colorStyles,
  getStyledOptions,
  marginStyles,
  textStyles,
} from '~/modules/system';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';
import { Icon } from '~/components/Icon';

import {
  Icons,
  StyledProps,
  VariantWithTones,
  WithChildren,
  WithColors,
  WithMargin,
  WithTextOptions,
} from '~/types';

export interface TagKnownProps
  extends StyledProps,
    WithChildren,
    WithColors,
    WithMargin,
    WithTextOptions {
  /** @default primary.50 */
  bg?: VariantWithTones;
  iconAfter?: Icons;
  iconBefore?: Icons;
  invert?: boolean;
  onClickAfter?: (event: MouseEvent<HTMLButtonElement>) => void;
  onClickBefore?: (event: MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
}

export type TagProps = Simplify<TagKnownProps>;

export const defaultProps = {
  ...omit(textDefaultOptions, 'size'),
  bg: 'primary.50',
  invert: false,
  size: 'sm',
} satisfies Omit<TagProps, 'children'>;

export const StyledTag = styled(
  'span',
  getStyledOptions(),
)<TagProps>(props => {
  const { radius, spacing } = getTheme(props);

  return css`
    ${baseStyles(props)};
    align-items: center;
    border-radius: ${radius.xs};
    display: inline-flex;
    padding: ${spacing.xxs} ${spacing.sm};
    ${colorStyles(props)};
    ${marginStyles(props)};
    ${textStyles(props, 1)};
  `;
});

export const Tag = forwardRef<HTMLSpanElement, TagProps>((props, ref) => {
  const { children, iconAfter, iconBefore, onClickAfter, onClickBefore, ...rest } = {
    ...defaultProps,
    ...props,
  };
  const { typography } = getTheme({ theme: useTheme() });

  const iconSize = rest.size ? parseInt(typography[rest.size].fontSize, 10) - 2 : undefined;
  const icons: PlainObject<ReactNode> = {};

  if (iconBefore && onClickBefore) {
    icons.before = (
      <ButtonUnstyled mr="xxs" onClick={onClickBefore}>
        <Icon name={iconBefore} size={iconSize} />
      </ButtonUnstyled>
    );
  } else if (iconBefore) {
    icons.before = <Icon mr="xxs" name={iconBefore} size={iconSize} />;
  }

  if (iconAfter && onClickAfter) {
    icons.after = (
      <ButtonUnstyled ml="xxs" onClick={onClickAfter}>
        <Icon name={iconAfter} size={iconSize} />
      </ButtonUnstyled>
    );
  } else if (iconAfter) {
    icons.after = <Icon ml="xxs" name={iconAfter} size={iconSize} />;
  }

  return (
    <StyledTag ref={ref} data-component-name="Tag" {...rest}>
      {icons.before}
      <span>{children}</span>
      {icons.after}
    </StyledTag>
  );
});

Tag.displayName = 'Tag';
