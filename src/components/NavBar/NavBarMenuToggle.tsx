import { useId, useMemo } from 'react';
import styled from '@emotion/styled';
import { useResponsive } from '@gilbarbara/hooks';
import is from 'is-lite';

import { useComponentProps } from '~/hooks/useComponentProps';

import { formatBreakpoints } from '~/modules/helpers';
import { getStyledOptions } from '~/modules/system';

import { NavBarMenuToggleProps, useNavBarContext } from './useNavBar';

const Toggle = styled('span', getStyledOptions())`
  & input {
    display: none;
  }

  & label {
    cursor: pointer;
    display: block;
    height: 16px;
    position: relative;
    width: 22px;
  }

  & span {
    border-bottom: 2px solid currentcolor;
    display: block;
    padding-top: 7px;
    transition-delay: 0.125s;

    &:before,
    &:after {
      border-top: 2px solid currentcolor;
      content: '';
      left: 0;
      position: absolute;
      right: 0;
      transform-origin: center;
      transition-delay: 0s;
    }

    &:before {
      top: 0;
    }

    &:after {
      bottom: 0;
    }
  }

  & span,
  & span:before,
  & span:after {
    transition-duration: 0.25s;
    transition-property: transform, border-color;
    transition-timing-function: cubic-bezier(0.5, -0.5, 0.5, 1.5);
  }

  & input:checked + span {
    border-color: transparent;
    transition-delay: 0s;

    &:before,
    &:after {
      transition-delay: 0.125s;
    }

    &:before {
      transform: translateY(7px) rotate(135deg);
    }

    &:after {
      transform: translateY(-7px) rotate(-135deg);
    }
  }
`;

export function NavBarMenuToggle(props: NavBarMenuToggleProps) {
  const { componentProps, getDataAttributes } = useComponentProps(props, {
    srOnlyText: 'Toggle Menu',
  });
  const { hideBreakpoint, icon, srOnlyText, theme, ...rest } = componentProps;
  const {
    state: { isMenuOpen },
    toggleMenu,
  } = useNavBarContext();
  const id = useId();

  const breakpoints = formatBreakpoints(theme);
  const { min } = useResponsive(breakpoints);

  const handleChange = () => {
    toggleMenu(!isMenuOpen);
  };

  const child = useMemo(() => {
    if (is.function(icon)) {
      return icon(isMenuOpen);
    }

    return icon;
  }, [icon, isMenuOpen]);

  if (hideBreakpoint && min(hideBreakpoint)) {
    return null;
  }

  if (child) {
    return (
      <div data-open={isMenuOpen} {...getDataAttributes('NavBarMenuToggle')} {...rest}>
        {child}
      </div>
    );
  }

  return (
    <Toggle data-open={isMenuOpen} {...getDataAttributes('NavBarMenuToggle')} {...rest}>
      <label aria-label={srOnlyText} htmlFor={id}>
        <input checked={isMenuOpen} id={id} onChange={handleChange} type="checkbox" />
        <span />
      </label>
    </Toggle>
  );
}

NavBarMenuToggle.displayName = 'NavBarMenuToggle';
