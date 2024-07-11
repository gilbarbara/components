import { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps, px } from '@gilbarbara/helpers';
import { SetRequired, Simplify } from '@gilbarbara/types';

import { useTheme } from '~/hooks/useTheme';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import {
  baseStyles,
  borderStyles,
  dimensionStyles,
  getStyledOptions,
  marginStyles,
  paddingStyles,
  radiusStyles,
  shadowStyles,
  textStyles,
} from '~/modules/system';

import {
  CopyToClipboard,
  type CopyToClipboardProps,
} from '~/components/CopyToClipboard/CopyToClipboard';
import { Icon } from '~/components/Icon';

import {
  Spacing,
  StyledProps,
  WithBorder,
  WithChildren,
  WithColors,
  WithComponentSize,
  WithDimension,
  WithMargin,
  WithPadding,
  WithRadius,
} from '~/types';

export interface SnippetKnownProps
  extends Pick<
      CopyToClipboardProps,
      | 'checkIcon'
      | 'copyIcon'
      | 'onCopy'
      | 'onError'
      | 'timeout'
      | 'tooltipCopiedText'
      | 'tooltipProps'
      | 'tooltipText'
    >,
    StyledProps,
    WithBorder,
    WithChildren,
    WithColors,
    WithComponentSize,
    WithDimension,
    WithMargin,
    WithPadding,
    WithRadius {
  /**
   * The value to copy.
   * If it is set, it will be copied instead of the children.
   */
  copyValue?: ReactNode;
  /**
   * Disable the animation of the copy icon.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * The gap between the elements.
   * @default xs
   */
  gap?: Spacing;
  /**
   * Hide the copy button.
   * @default false
   */
  hideCopyButton?: boolean;
  /**
   * Hide the symbol.
   * @default false
   */
  hideSymbol?: boolean;
  /**
   * Hide the tooltip in the copy button.
   * @default false
   */
  hideTooltip?: boolean;
  /**
   * Prevent the text to wrap.
   * @default false
   */
  preventWrap?: boolean;
  /**
   * Use the regular font instead of the monospace.
   * @default false
   */
  removeFormatting?: boolean;
  /**
   * The symbol to show before the snippet.
   * @default $
   */
  symbol?: ReactNode;
}

export type SnippetProps = Simplify<SnippetKnownProps>;

export const defaultProps = {
  checkIcon: <Icon name="check" />,
  copyIcon: <Icon name="copy" />,
  disableAnimation: false,
  gap: 'xs',
  preventWrap: false,
  radius: 'xs',
  removeFormatting: false,
  size: 'md',
  symbol: '$',
} satisfies Omit<SnippetProps, 'children'>;

export const StyledSnippet = styled(
  'div',
  getStyledOptions(),
)<SetRequired<SnippetProps, 'gap' | 'size'>>(props => {
  const { bg, color, gap, size } = props;
  const { darkMode, spacing, ...theme } = getTheme(props);
  const defaultBg = darkMode ? 'gray.800' : 'gray.50';

  const { mainColor, textColor } = getColorTokens(bg ?? defaultBg, color, theme);

  const heightMap = {
    sm: px(32),
    md: px(40),
    lg: px(48),
  };

  const paddingMap = {
    sm: `${spacing.xs} ${spacing.sm}`,
    md: `${spacing.sm} ${spacing.md}`,
    lg: `${spacing.sm} ${spacing.md}`,
  };

  return css`
    ${baseStyles(props)};
    align-items: center;
    background-color: ${mainColor};
    color: ${textColor};
    display: inline-flex;
    gap: ${spacing[gap]};
    min-height: ${heightMap[size]};
    padding: ${paddingMap[size]};
    ${borderStyles(props)};
    ${dimensionStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${radiusStyles(props)};
    ${textStyles(props)}
    ${shadowStyles(props)};
  `;
});

export const StyledWrapper = styled(
  'div',
  getStyledOptions(),
)<SetRequired<SnippetProps, 'gap'>>(props => {
  const { gap, removeFormatting } = props;
  const { fontFamily, fontMonospace, spacing } = getTheme(props);

  return css`
    align-items: center;
    font-family: ${removeFormatting ? fontFamily : fontMonospace};
    display: flex;
    gap: ${spacing[gap]};
  `;
});

const StyledSymbol = styled.span`
  display: inline-flex;
`;

export const StyledPre = styled(
  'pre',
  getStyledOptions(),
)<SetRequired<SnippetProps, 'gap'>>(props => {
  const { preventWrap, removeFormatting } = props;
  const { fontFamily, fontMonospace } = getTheme(props);

  return css`
    font-family: ${removeFormatting ? fontFamily : fontMonospace};
    display: flex;
    margin: 0;
    ${preventWrap && 'white-space: nowrap'};
  `;
});

export function Snippet(props: SnippetProps) {
  const {
    checkIcon,
    children,
    copyIcon,
    copyValue,
    disableAnimation,
    gap,
    hideCopyButton,
    hideSymbol,
    hideTooltip,
    onCopy,
    onError,
    preventWrap,
    removeFormatting,
    symbol,
    timeout,
    tooltipCopiedText,
    tooltipProps,
    tooltipText,
    ...rest
  } = mergeProps(defaultProps, props);
  const { getDataAttributes } = useTheme();

  const content: Record<string, ReactNode> = {};

  if (!hideSymbol) {
    content.symbol = <StyledSymbol>{symbol}</StyledSymbol>;
  }

  content.main = Array.isArray(children) ? (
    <div>
      {children.map((child, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <StyledWrapper key={index} gap={gap} removeFormatting={removeFormatting}>
          {content.symbol}
          <StyledPre gap={gap} preventWrap={preventWrap} removeFormatting={removeFormatting}>
            {child}
          </StyledPre>
        </StyledWrapper>
      ))}
    </div>
  ) : (
    <StyledWrapper gap={gap} removeFormatting={removeFormatting}>
      {content.symbol}
      <StyledPre gap={gap} preventWrap={preventWrap} removeFormatting={removeFormatting}>
        {children}
      </StyledPre>
    </StyledWrapper>
  );

  if (!hideCopyButton) {
    content.copyButton = (
      <CopyToClipboard
        checkIcon={checkIcon}
        copyIcon={copyIcon}
        disableAnimation={disableAnimation}
        hideTooltip={hideTooltip}
        onCopy={onCopy}
        onError={onError}
        padding="xxs"
        timeout={timeout}
        tooltipCopiedText={tooltipCopiedText}
        tooltipProps={tooltipProps}
        tooltipText={tooltipText}
        value={copyValue ?? children}
      />
    );
  }

  return (
    <StyledSnippet {...getDataAttributes('Snippet')} gap={gap} {...rest}>
      {content.main}
      {content.copyButton}
    </StyledSnippet>
  );
}
