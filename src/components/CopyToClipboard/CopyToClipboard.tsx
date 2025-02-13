import {
  cloneElement,
  isValidElement,
  MouseEvent,
  ReactElement,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from 'react';
import innerText from 'react-innertext';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';
import { useIsMounted } from '@gilbarbara/hooks';

import { animateIcon } from '~/modules/animations';
import { getStyledOptions, getStyles } from '~/modules/system';

import { Icon } from '~/components/Icon';
import { Tooltip } from '~/components/Tooltip';

import { WithTheme } from '~/types';

import { CopyToClipboardProps, useCopyToClipboard } from './useCopyToClipboard';

const StyledCopyToClipboard = styled('span', getStyledOptions())<
  Omit<CopyToClipboardProps, 'value'> & WithTheme
>(
  {
    cursor: 'pointer',
    display: 'inline-flex',
    lineHeight: 1,
    position: 'relative',
  },
  props => getStyles(omit(props, 'size')),
);

export function CopyToClipboard(props: CopyToClipboardProps) {
  const {
    componentProps: {
      checkIcon = <Icon name="check" />,
      children,
      copyIcon = <Icon name="copy" />,
      disableAnimation,
      hideTooltip,
      onCopy,
      onError,
      size,
      timeout,
      tooltipCopiedText,
      tooltipProps,
      tooltipText,
      value,
      ...rest
    },
    getDataAttributes,
  } = useCopyToClipboard(props);
  const isMounted = useIsMounted();
  const [tooltipContent, setTooltipContent] = useState(tooltipText);
  const [copied, setCopied] = useState(false);
  const iconRef = useRef<HTMLSpanElement>(null);

  const valueText = useMemo(() => {
    let stringValue = '';

    if (Array.isArray(value)) {
      value.forEach(child => {
        const childString = innerText(child);

        if (childString) {
          stringValue += `${childString}\n`;
        }
      });
    } else {
      stringValue = innerText(value);
    }

    return stringValue.trim();
  }, [value]);

  const handleClick = async (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    if (!disableAnimation && iconRef.current) {
      animateIcon(iconRef.current, rest.color ?? 'primary', rest.theme);
    }

    try {
      await navigator.clipboard.writeText(valueText);

      onCopy?.(valueText);

      if (tooltipCopiedText) {
        setTooltipContent(tooltipCopiedText);
      }

      setTimeout(
        () => {
          if (isMounted()) {
            setCopied(true);
          }
        },
        disableAnimation ? 0 : 300,
      );

      setTimeout(() => {
        if (isMounted()) {
          setTooltipContent(tooltipText);
          setCopied(false);
        }
      }, timeout);
    } catch (error: any) {
      setTooltipContent(error.message);
      onError?.(error.message);
    }
  };

  const copyIconElement =
    copyIcon && !isValidElement(copyIcon) ? <span>{copyIcon}</span> : copyIcon;
  const checkIconElement =
    checkIcon && !isValidElement(checkIcon) ? <span>{checkIcon}</span> : checkIcon;

  let main: ReactNode = cloneElement(
    (copied ? checkIconElement : copyIconElement) as ReactElement,
    {
      ref: iconRef,
      size,
      title: null,
    },
  );

  if (children) {
    main = children;
  }

  if (!hideTooltip && (tooltipCopiedText || !copied)) {
    main = (
      <Tooltip content={tooltipContent} placement="top-middle" size="xs" {...tooltipProps}>
        {main}
      </Tooltip>
    );
  }

  return (
    <StyledCopyToClipboard
      {...getDataAttributes('CopyToClipboard')}
      onClick={handleClick}
      {...rest}
    >
      {main}
    </StyledCopyToClipboard>
  );
}

CopyToClipboard.displayName = 'CopyToClipboard';

export { type CopyToClipboardProps, defaultProps } from './useCopyToClipboard';
