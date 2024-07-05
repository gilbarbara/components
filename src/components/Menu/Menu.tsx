import { forwardRef, KeyboardEvent, useCallback, useEffect, useId, useRef, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps, omit } from '@gilbarbara/helpers';
import { useLatest, useMergeRefs, useMount, useUpdateEffect } from '@gilbarbara/hooks';
import { deepmerge } from 'deepmerge-ts';
import is from 'is-lite';

import { useTheme } from '~/hooks/useTheme';

import { getTheme } from '~/modules/helpers';
import KeyboardScope from '~/modules/keyboardScope';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';
import { ClickOutside } from '~/components/ClickOutside';

import { MenuItems } from './Items';
import { MenuProps } from './types';
import { defaultProps, MenuProvider } from './utils';

const StyledMenu = styled.nav(props => {
  const { dataAttributeName } = getTheme(props);

  return css`
    display: inline-flex;
    position: relative;
    vertical-align: middle;

    [data-${dataAttributeName}='ClickOutside'] {
      width: 100%;
    }
  `;
});

const StyledMenuButton = styled(ButtonUnstyled)(props => {
  const { opacityDisabled, spacing } = getTheme(props);

  return css`
    border-radius: 2px;
    display: flex;
    min-height: ${spacing.lg};
    min-width: ${spacing.lg};

    :disabled {
      cursor: not-allowed;
      opacity: ${opacityDisabled};
    }
  `;
});

export const Menu = forwardRef<HTMLElement, MenuProps>((props, ref) => {
  const mergedProps = mergeProps(defaultProps, props);
  const {
    button,
    children,
    disableCloseOnBlur,
    disabled,
    disableKeyboardNavigation,
    minWidth,
    onToggle,
    open,
    position,
    trigger,
  } = mergedProps;
  const [active, setActive] = useState(open ?? false);
  const localRef = useRef<HTMLElement>(null);
  const mergedRefs = useMergeRefs(localRef, ref);
  const keyboardScope = useRef<KeyboardScope>();
  const onToggleRef = useLatest(onToggle);
  const id = useId();
  const { getDataAttributes, theme } = useTheme();

  const labels = deepmerge(defaultProps.labels, mergedProps.labels);

  useMount(() => {
    if (!disableKeyboardNavigation) {
      keyboardScope.current = new KeyboardScope(localRef.current, {
        arrowNavigation: 'both',
        escCallback: handleToggleMenu(false),
        selector: `#${id.replace(/:/g, '\\:')} > [data-${theme.dataAttributeName}="MenuItem"]`,
      });
    }
  });

  useEffect(() => {
    if (is.boolean(open)) {
      setActive(open);
    }
  }, [open]);

  useUpdateEffect(() => {
    const scope = keyboardScope.current;

    if (active) {
      scope?.addScope();
    }

    onToggleRef.current?.(active);

    return () => {
      if (!is.boolean(open)) {
        scope?.removeScope();
      }
    };
  }, [active, onToggleRef, open]);

  const handleClickOutside = useCallback(() => {
    if (is.boolean(open) || disableCloseOnBlur) {
      return;
    }

    setActive(false);
  }, [disableCloseOnBlur, open]);

  const handleKeyDownButton = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (disableKeyboardNavigation) {
        event.preventDefault();
      }
    },
    [disableKeyboardNavigation],
  );

  const handleToggleMenu = useCallback(
    (force?: boolean) => {
      return () => {
        if (disabled || is.boolean(open)) {
          return;
        }

        setActive(a => force ?? !a);
      };
    },
    [disabled, open],
  );

  return (
    <StyledMenu
      ref={mergedRefs}
      aria-label={labels.name}
      {...getDataAttributes('Menu')}
      onMouseEnter={trigger === 'hover' ? handleToggleMenu(true) : undefined}
      onMouseLeave={trigger === 'hover' ? handleToggleMenu(false) : undefined}
    >
      <ClickOutside active={active} onClick={handleClickOutside}>
        <MenuProvider
          closeMenu={handleToggleMenu(false)}
          props={omit(mergedProps, 'button', 'children', 'onToggle')}
        >
          <StyledMenuButton
            aria-controls={id}
            aria-expanded={active}
            aria-haspopup="menu"
            aria-label={active ? labels.close : labels.open}
            {...getDataAttributes('MenuButton')}
            disabled={disabled}
            onClick={handleToggleMenu()}
            onKeyDown={handleKeyDownButton}
            tabIndex={disableKeyboardNavigation ? -1 : 0}
            title={active ? labels.close : labels.open}
            type="button"
          >
            {button}
          </StyledMenuButton>
          <MenuItems active={active} id={id} minWidth={minWidth} position={position}>
            {children}
          </MenuItems>
        </MenuProvider>
      </ClickOutside>
    </StyledMenu>
  );
});

Menu.displayName = 'Menu';
