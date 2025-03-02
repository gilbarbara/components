import { keyframes } from '@emotion/react';
import { px } from '@gilbarbara/helpers';
import scroll from 'scroll';

import { getColorTokens } from '~/modules/colors';

import { AnimationDirection, ColorVariantTones, Theme } from '../types';

import * as baseTheme from './theme';

interface ScrollToOptions {
  element?: HTMLElement;
  scrollDuration?: number;
}

export interface AnimateIconOptions {
  /**
   * The duration of the animation in milliseconds.
   * @default 400
   */
  duration?: number;
  /**
   * The easing function of the animation.
   * @default 'ease-in-out'
   */
  easing?: string;
  /**
   * Handler called when the animation ends.
   */
  onEnd?: () => void;
  /**
   * The final opacity of the icon.
   * @default 0
   */
  opacity?: number;
  /**
   * The final transform of the icon.
   * @default 'scale(4)'
   */
  transform?: string;
}

export function animateIcon(
  target: HTMLElement | null,
  color: ColorVariantTones,
  theme: Theme = baseTheme,
  options: AnimateIconOptions = {},
) {
  if (!target) {
    return;
  }

  const { mainColor } = getColorTokens(color, null, theme);
  const {
    duration = 400,
    easing = 'ease-in-out',
    onEnd,
    opacity = 0,
    transform = 'scale(4)',
  } = options;

  const iconClone = document.createElement('span');

  iconClone.innerHTML = target.innerHTML;

  Object.assign(iconClone.style, {
    color: mainColor,
    left: px(target.offsetLeft),
    pointerEvents: 'none',
    position: 'absolute',
    top: px(target.offsetTop),
    transition: `all ${duration - 20}ms ${easing}`,
  });

  target.parentElement?.appendChild(iconClone);

  requestAnimationFrame(() => {
    iconClone.style.opacity = `${opacity}`;
    iconClone.style.transform = transform;
  });

  iconClone.addEventListener('transitionend', () => {
    onEnd?.();
    iconClone.remove();
  });
}

export function getGrowAnimation(
  direction: AnimationDirection,
  targetSize: number,
  isEntering: boolean = true,
  initialSize: number = 0,
) {
  const isVertical = direction === 'up' || direction === 'down';
  const sizeProp = isVertical ? 'height' : 'width';

  // For entering animation: start at initialSize, end at targetSize
  // For exiting animation: start at targetSize, end at initialSize
  const startSize = isEntering ? initialSize : targetSize;
  const endSize = isEntering ? targetSize : initialSize;

  // Set opacity transitions if initialSize is 0 (completely hidden)
  const startOpacity = isEntering && !initialSize ? 0 : 1;
  const endOpacity = !isEntering && !initialSize ? 0 : 1;

  return keyframes`
    0% {
      ${sizeProp}: ${px(startSize)};
      opacity: ${startOpacity};
    }
    100% {
      ${sizeProp}: ${px(endSize)};
      opacity: ${endOpacity};
    }
  `;
}

export function getSlideAnimation(direction: AnimationDirection, isEntering: boolean) {
  const start = isEntering ? '0%' : '100%';
  const end = isEntering ? '100%' : '0%';

  if (direction === 'up' || direction === 'down') {
    return keyframes`
      ${start} {
        transform: translateY(${direction === 'down' ? '-100%' : '100%'});
        opacity: 0;
      }
      ${end} {
        transform: translateY(0);
        opacity: 1;
      }
    `;
  }

  return keyframes`
      ${start} {
        transform: translateX(${direction === 'left' ? '100%' : '-100%'});
        opacity: 0;
      }
      ${end} {
        transform: translateX(0);
        opacity: 1;
      }
    `;
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

export const horizontalScale = keyframes`
  0% {
    transform: translateX(-50%) scaleX(.2);
  }
  
  100% {
    transform: translateX(100%) scaleX(1);
  }
`;

export const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  
  100% {
    transform: scale(1.1);
    opacity: 0;
  }
`;

export const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

/* c8 ignore next 3 */
export function scrollDocument(): HTMLElement {
  return (document.scrollingElement as HTMLElement) || document.createElement('body');
}

/* c8 ignore start  */
export function scrollTo(value: number, options: ScrollToOptions = {}): Promise<void> {
  const { element = scrollDocument(), scrollDuration = 400 } = options;

  return new Promise((resolve, reject) => {
    const { scrollTop } = element;

    const nextValue = scrollDocument().scrollTop + value;
    const limit = nextValue > scrollTop ? nextValue - scrollTop : scrollTop - nextValue;

    scroll.top(element, nextValue, { duration: limit < 100 ? 50 : scrollDuration }, error => {
      if (error && error.message !== 'Element already at target scroll position') {
        return reject(error);
      }

      return resolve();
    });
  });
}
/* c8 ignore stop  */
