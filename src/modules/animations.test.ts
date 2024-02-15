import { vi } from 'vitest';

import { animateIcon } from './animations';

vi.useFakeTimers();

describe('animateIcon', () => {
  let target: HTMLElement;
  let icon: HTMLElement;

  beforeAll(() => {
    target = document.createElement('div');
    icon = document.createElement('span');

    icon.setAttribute('data-component-name', 'Icon');
    icon.setAttribute('class', 'icon-class');
    target.appendChild(icon);
    document.body.appendChild(target);
  });

  afterAll(() => {
    document.body.removeChild(target);
  });

  it('should animate the icon', () => {
    animateIcon(target, 'primary');

    const iconClone = target.querySelector('span.will-animate') as HTMLSpanElement;

    expect(iconClone).toHaveClass('will-animate');

    vi.runAllTimers();
    expect(iconClone).toHaveClass('is-animating');

    target.dispatchEvent(new Event('transitionend'));
    expect(iconClone).not.toBeInTheDocument();
  });

  it('should not throw if the icon does not exist', () => {
    expect(() => animateIcon(document.createElement('div'), 'primary')).not.toThrow();
  });

  it('should not throw without a target', () => {
    expect(() => animateIcon(null, 'primary')).not.toThrow();
  });
});
