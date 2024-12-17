import { useId, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit, px } from '@gilbarbara/helpers';
import { usePrevious, useResponsive, useUpdateEffect } from '@gilbarbara/hooks';
import { SetRequired } from '@gilbarbara/types';

import { formatBreakpoints } from '~/modules/helpers';
import { getStyledOptions, getStyles } from '~/modules/system';

import { MenuToggleProps, useMenuToggle } from '~/components/MenuToggle/useMenuToggle';

const StyledMenuToggle = styled(
  'label',
  getStyledOptions(),
)<SetRequired<MenuToggleProps, 'border' | 'size'> & { isActive: boolean }>(props => {
  const { border, isActive, isOpen, radius, size } = props;

  const width = size * (22 / 16);
  const transform = size / 2 - border / 2;

  return css`
    cursor: pointer;
    display: inline-flex;
    height: ${px(size)};
    position: relative;
    width: ${px(width)};
    ${getStyles(omit(props, 'border', 'radius', 'size'))};

    & input {
      display: none;
    }

    & span {
      background-color: currentcolor;
      border-radius: ${px(radius)};
      display: block;
      height: ${px(border)};
      position: absolute;
      transition-duration: 0.25s;
      transition-property: transform, border-color;
      transition-timing-function: cubic-bezier(0.5, -0.5, 0.5, 1.5);
      left: 0;
      right: 0;

      &:nth-of-type(1) {
        top: 0;

        ${isOpen &&
        css`
          transform: translateY(${px(transform)}) rotate(135deg);
        `};
      }

      &:nth-of-type(2),
      &:nth-of-type(3) {
        transform-origin: center;
      }

      &:nth-of-type(2) {
        transition-delay: 0.125s;
        top: ${px(transform)};

        ${isActive &&
        css`
          background-color: transparent;
        `};
      }

      &:nth-of-type(3) {
        top: auto;
        bottom: 0;

        ${isOpen &&
        css`
          transform: translateY(-${px(transform)}) rotate(-135deg);
        `};
      }
    }

    & input:checked + span {
      border-color: transparent;
      transition-delay: 0s;

      &:before,
      &:after {
        transition-delay: 0.125s;
      }

      &:before {
        transform: translateY(${px(transform)}) rotate(135deg);
      }

      &:after {
        transform: translateY(-${px(transform)}) rotate(-135deg);
      }
    }
  `;
});

export function MenuToggle(props: MenuToggleProps) {
  const { componentProps, getDataAttributes } = useMenuToggle(props);
  const { hideBreakpoint, isOpen, onToggle, srOnlyText, theme, ...rest } = componentProps;
  const [isActive, setActive] = useState(isOpen);
  const id = useId();
  const previousIsOpen = usePrevious(isOpen);

  const breakpoints = formatBreakpoints(theme);
  const { min } = useResponsive(breakpoints);

  useUpdateEffect(() => {
    if (previousIsOpen === isOpen) {
      return;
    }

    if (isOpen) {
      setActive(true);
    } else {
      setTimeout(() => setActive(false), 250);
    }
  }, [isOpen, previousIsOpen]);

  const handleChange = () => {
    onToggle?.(!isOpen);
  };

  if (hideBreakpoint && min(hideBreakpoint)) {
    return null;
  }

  return (
    <StyledMenuToggle
      aria-label={srOnlyText}
      data-open={isOpen}
      {...getDataAttributes('MenuToggle')}
      {...rest}
      htmlFor={id}
      isActive={isActive}
      isOpen={isOpen}
    >
      <input checked={isActive} id={id} onChange={handleChange} type="checkbox" />
      <span />
      <span />
      <span />
    </StyledMenuToggle>
  );
}

MenuToggle.displayName = 'MenuToggle';

export { defaultProps, type MenuToggleProps } from './useMenuToggle';
