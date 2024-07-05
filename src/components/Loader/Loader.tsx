import { cloneElement, isValidElement, ReactElement, ReactNode, useId } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps } from '@gilbarbara/helpers';
import { StandardLonghandProperties } from 'csstype';
import is from 'is-lite';

import { useTheme } from '~/hooks/useTheme';

import { getTheme } from '~/modules/helpers';

import { Box } from '~/components/Box';

import LoaderGrow from './Grow';
import LoaderPill from './Pill';
import LoaderPride from './Pride';
import LoaderPulse from './Pulse';
import LoaderRotate from './Rotate';
import { LoaderProps } from './types';

export const defaultProps = {
  color: 'primary',
  block: false,
  labelPosition: 'bottom',
  labelSize: 'sm',
  size: 32,
  type: 'pill',
} satisfies LoaderProps;

const StyledLabel = styled('p')<Required<Pick<LoaderProps, 'labelPosition' | 'labelSize'>>>(
  props => {
    const { labelPosition, labelSize } = props;
    const { spacing, typography } = getTheme(props);

    if (labelPosition === 'middle') {
      return css`
        font-size: ${typography[labelSize].fontSize};
        left: 50%;
        margin: 0;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
      `;
    }

    let margin;

    switch (labelPosition) {
      case 'top': {
        margin = `0 0 ${spacing.xs} 0`;
        break;
      }
      case 'left': {
        margin = `0 ${spacing.xs} 0 0`;
        break;
      }
      case 'right': {
        margin = `0 0 0 ${spacing.xs}`;
        break;
      }

      case 'bottom':
      default: {
        margin = `${spacing.xs} 0 0 0`;
        break;
      }
    }

    return css`
      font-size: ${typography[labelSize].fontSize};
      margin: ${margin};
    `;
  },
);

export function Loader(props: LoaderProps) {
  const { block, color, label, labelPosition, labelSize, size, type, ...rest } = mergeProps(
    defaultProps,
    props,
  );
  const { getDataAttributes } = useTheme();
  const labelId = useId();

  const componentSize = is.array(size) ? size[0] : size;
  let direction: StandardLonghandProperties['flexDirection'];

  switch (labelPosition) {
    case 'left': {
      direction = 'row-reverse';
      break;
    }
    case 'right': {
      direction = 'row';
      break;
    }
    case 'top': {
      direction = 'column-reverse';
      break;
    }
    default: {
      direction = 'column';
      break;
    }
  }

  const content: Record<string, ReactNode> = {};

  switch (type) {
    case 'grow': {
      content.loader = <LoaderGrow block={block} color={color} size={componentSize} />;
      break;
    }
    case 'pride': {
      content.loader = <LoaderPride block={block} size={componentSize} />;
      break;
    }
    case 'pulse': {
      content.loader = <LoaderPulse block={block} color={color} size={componentSize} />;
      break;
    }
    case 'rotate': {
      content.loader = <LoaderRotate block={block} color={color} size={componentSize} />;
      break;
    }

    case 'pill':
    default: {
      content.loader = <LoaderPill block={block} color={color} size={size} />;
      break;
    }
  }

  if (label) {
    content.label = isValidElement(label) ? (
      cloneElement(label as ReactElement, { id: labelId })
    ) : (
      <StyledLabel id={labelId} labelPosition={labelPosition} labelSize={labelSize}>
        {label}
      </StyledLabel>
    );
  }

  return (
    <Box
      align="center"
      aria-busy
      aria-label={!label ? 'Loading...' : undefined}
      aria-labelledby={label ? labelId : undefined}
      aria-live="polite"
      {...getDataAttributes('Loader')}
      direction={direction}
      flexBox
      justify="center"
      position="relative"
      role="status"
      {...rest}
    >
      {content.loader}
      {content.label}
    </Box>
  );
}

Loader.displayName = 'Loader';
