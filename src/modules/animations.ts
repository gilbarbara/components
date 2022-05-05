import { keyframes } from '@emotion/react';
import * as scroll from 'scroll';

import * as baseTheme from './theme';

import { Theme, Variants } from '../types';

interface ScrollToOptions {
  element?: HTMLElement;
  scrollDuration?: number;
}

export function animateIcon(
  target: HTMLElement,
  color: Variants = 'primary',
  theme: Theme = baseTheme,
) {
  const { black, colors, gray, white } = theme;

  /* istanbul ignore else */
  if (target) {
    const icon = target.querySelector('[data-component-name="Icon"]') as HTMLSpanElement;

    if (!icon) {
      return;
    }

    const getColor = (variant: Variants) => {
      switch (variant) {
        case 'black': {
          return black;
        }
        case 'white': {
          return white;
        }
        case 'gray': {
          return gray;
        }
        // No default
      }

      return colors[variant];
    };

    const iconClone = document.createElement('span');

    iconClone.innerHTML = icon.innerHTML;
    iconClone.classList.add(icon.className, 'will-animate');
    iconClone.setAttribute(
      'style',
      `color: ${getColor(color)}; position: absolute; top: ${icon.offsetTop}px; left: ${
        icon.offsetLeft
      }px`,
    );
    target.appendChild(iconClone);

    setTimeout(() => {
      iconClone.classList.add('is-animating');
    }, 100);

    target.addEventListener('transitionend', () => {
      /* istanbul ignore else */
      if (iconClone.parentNode !== null && iconClone.classList.contains('is-animating')) {
        iconClone.parentNode.removeChild(iconClone);
      }
    });
  }
}

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

export const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

export const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export function scrollDocument(): HTMLElement {
  return (document.scrollingElement as HTMLElement) || document.createElement('body');
}

export function scrollTo(value: number, options: ScrollToOptions = {}): Promise<void> {
  const { element = scrollDocument(), scrollDuration = 400 } = options;

  return new Promise((resolve, reject) => {
    const { scrollTop } = element;

    const nextValue = scrollDocument().scrollTop + value;
    const limit = nextValue > scrollTop ? nextValue - scrollTop : scrollTop - nextValue;

    scroll.top(
      element,
      nextValue,
      { duration: limit < 100 ? 50 : scrollDuration },
      (error: any) => {
        if (error && error.message !== 'Element already at target scroll position') {
          return reject(error);
        }

        return resolve();
      },
    );
  });
}
