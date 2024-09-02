import { useRef } from 'react';
import { act, render, screen } from '@testing-library/react';

import { useScrollPosition, UseScrollPositionOptions } from './useScrollPosition';

function Component(props: UseScrollPositionOptions & { withElement?: boolean }) {
  const { withElement } = props;
  const elementRef = useRef<HTMLDivElement | null>(null);

  useScrollPosition({
    elementRef: withElement ? elementRef : undefined,
    delay: 0,
    isEnabled: true,
    ...props,
  });

  return (
    <div ref={elementRef} data-testid="Component">
      Hello World
    </div>
  );
}

describe('useScrollPosition', () => {
  it('should return properly', () => {
    const callback = vi.fn();

    const { rerender, unmount } = render(
      <Component callback={callback} delay={30} isEnabled={false} />,
    );

    rerender(<Component callback={callback} delay={30} isEnabled={false} />);

    expect(callback).toHaveBeenCalledTimes(0);

    unmount();
  });

  it('should run the callback on scroll', () => {
    const callback = vi.fn();

    const { rerender, unmount } = render(<Component callback={callback} />);

    rerender(<Component callback={callback} />);
    window.dispatchEvent(new CustomEvent('scroll', { detail: 'anything' }));

    expect(callback).toHaveBeenCalledTimes(1);

    unmount();
  });

  it('should run the callback on scroll with elementRef and delay', () => {
    vi.useFakeTimers();
    const callback = vi.fn();

    const { rerender, unmount } = render(<Component callback={callback} delay={30} withElement />);

    rerender(<Component callback={callback} delay={30} withElement />);
    screen
      .getByTestId('Component')
      .dispatchEvent(new CustomEvent('scroll', { detail: 'anything' }));

    act(() => {
      vi.runOnlyPendingTimers();
    });

    expect(callback).toHaveBeenCalledTimes(1);

    unmount();
  });
});
