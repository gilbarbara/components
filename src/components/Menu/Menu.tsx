import { forwardRef, KeyboardEvent, useCallback, useEffect, useId, useRef, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';
import { useLatest, useMergeRefs, useUpdateEffect } from '@gilbarbara/hooks';
import is from 'is-lite';

import { useKeyboardNavigation } from '~/hooks/useKeyboardNavigation';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';
import { ClickOutside } from '~/components/ClickOutside';

import { WithTheme } from '~/types';

import { MenuItems } from './Items';
import { MenuProps, MenuProvider, useMenu } from './useMenu';

const StyledMenu = styled.nav<WithTheme>(
  {
    display: 'inline-flex',
    position: 'relative',
    verticalAlign: 'middle',
  },
  props => {
    const {
      theme: { dataAttributeName },
    } = props;

    return css`
      [data-${dataAttributeName}='ClickOutside'] {
        width: 100%;
      }
    `;
  },
);

const StyledMenuButton = styled(ButtonUnstyled)<WithTheme>(
  {
    borderRadius: '2px',
  },
  props => {
    const {
      theme: { spacing, typography },
    } = props;

    return css`
      font-size: ${typography.md.fontSize};
      min-height: ${spacing.lg};
      min-width: ${spacing.lg};
    `;
  },
);

export const Menu = forwardRef<HTMLElement, MenuProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useMenu(props);
  const {
    bg,
    button,
    children,
    disableCloseOnBlur,
    disabled,
    disableKeyboardNavigation,
    labels,
    minWidth,
    onToggle,
    open,
    orientation,
    position,
    theme,
    trigger,
  } = componentProps;
  const [isOpen, setIsOpen] = useState(open ?? false);
  const localRef = useRef<HTMLElement>(null);
  const mergedRefs = useMergeRefs(localRef, ref);
  const onToggleRef = useLatest(onToggle);
  const id = useId();

  useEffect(() => {
    if (is.boolean(open)) {
      setIsOpen(open);
    }
  }, [open]);

  const handleClickOutside = useCallback(() => {
    if (is.boolean(open) || disableCloseOnBlur) {
      return;
    }

    setIsOpen(false);
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

        setIsOpen(a => force ?? !a);
      };
    },
    [disabled, open],
  );

  const { addScope, removeScope } = useKeyboardNavigation(localRef, {
    arrowNavigation: 'both',
    disabled: disableKeyboardNavigation,
    escCallback: handleToggleMenu(false),
    selector: `#${id.replace(/:/g, '\\:')} > [data-${theme.dataAttributeName}="MenuItem"]`,
  });

  useUpdateEffect(() => {
    if (isOpen) {
      addScope();
    }

    onToggleRef.current?.(isOpen);

    return () => {
      if (!is.boolean(open)) {
        removeScope();
      }
    };
  }, [isOpen, addScope, onToggleRef, open, removeScope]);

  return (
    <StyledMenu
      ref={mergedRefs}
      aria-label={labels.name}
      {...getDataAttributes('Menu')}
      onMouseEnter={trigger === 'hover' ? handleToggleMenu(true) : undefined}
      onMouseLeave={trigger === 'hover' ? handleToggleMenu(false) : undefined}
      theme={theme}
    >
      <ClickOutside active={isOpen} onClick={handleClickOutside}>
        <MenuProvider
          closeMenu={handleToggleMenu(false)}
          props={omit(componentProps, 'button', 'children', 'onToggle')}
        >
          <StyledMenuButton
            aria-controls={id}
            aria-expanded={isOpen}
            aria-haspopup="menu"
            aria-label={isOpen ? labels.close : labels.open}
            {...getDataAttributes('MenuButton')}
            disabled={disabled}
            onClick={handleToggleMenu()}
            onKeyDown={handleKeyDownButton}
            tabIndex={disableKeyboardNavigation ? -1 : 0}
            theme={theme}
            title={isOpen ? labels.close : labels.open}
            type="button"
          >
            {is.function(button) ? button(isOpen) : button}
          </StyledMenuButton>
          <MenuItems
            bg={bg}
            id={id}
            isOpen={isOpen}
            minWidth={minWidth}
            orientation={orientation}
            position={position}
          >
            {children}
          </MenuItems>
        </MenuProvider>
      </ClickOutside>
    </StyledMenu>
  );
});

Menu.displayName = 'Menu';
