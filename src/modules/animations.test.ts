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
    target.appendChild(icon);
    document.body.appendChild(target);
  });

  afterAll(() => {
    document.body.removeChild(target);
  });

  it('should animate the icon', () => {
    animateIcon(icon, 'primary');

    const iconClone = target.querySelector('span:nth-child(2)') as HTMLSpanElement;

    expect(iconClone).toHaveStyle('transition: opacity 0.6s, transform 0.6s');

    vi.runAllTimers();
    expect(iconClone).toHaveStyle('opacity:0;transform: scale(4);');

    iconClone.dispatchEvent(new Event('transitionend'));
    expect(iconClone).not.toBeInTheDocument();
  });

  it('should not throw if the icon does not exist', () => {
    expect(() => animateIcon(document.createElement('span'), 'primary')).not.toThrow();
  });

  it('should not throw without a target', () => {
    expect(() => animateIcon(null, 'primary')).not.toThrow();
  });
});
