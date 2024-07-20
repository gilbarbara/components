/* eslint-disable testing-library/no-render-in-lifecycle,testing-library/no-node-access */
import { useEffect, useRef } from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import {
  useKeyboardNavigation,
  UseKeyboardNavigationOptions,
  UseKeyboardNavigationReturn,
} from '~/hooks/useKeyboardNavigation';

const addEventListener = vi.spyOn(window, 'addEventListener');
const removeEventListener = vi.spyOn(window, 'removeEventListener');

let scopeMethods: UseKeyboardNavigationReturn;

interface Props extends Omit<UseKeyboardNavigationOptions, 'selector'> {
  selector?: string;
}

function dispatchKeydownEvent(code: string) {
  window.dispatchEvent(new KeyboardEvent('keydown', { code }));
}

function Component(props: Props) {
  const { selector = 'button', ...rest } = props;
  const componentRef = useRef<HTMLDivElement>(null);

  scopeMethods = useKeyboardNavigation(componentRef, { selector, ...rest });

  useEffect(() => {
    return () => {
      scopeMethods.removeScope();
    };
  }, []);

  return (
    <div ref={componentRef} className="component">
      <h2>Title</h2>
      <p>My awesome content</p>
      <footer>
        <button data-testid="skip" type="button">
          SKIP
        </button>
        <button data-testid="back" type="button">
          BACK
        </button>
        <button data-testid="primary" type="button">
          GO
        </button>
      </footer>
      <a data-testid="close" href="#close">
        X
      </a>
    </div>
  );
}

describe('hooks/useKeyboardNavigation', () => {
  let unmount: () => void;

  beforeAll(() => {
    vi.clearAllMocks();
  });

  describe('with matching elements and trapFocus', () => {
    beforeAll(() => {
      ({ unmount } = render(<Component trapFocus />));
    });

    beforeEach(() => {
      scopeMethods.addScope();
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    afterAll(() => {
      unmount();
    });

    it('should have initialized', () => {
      scopeMethods.addScope();

      expect(addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    });

    it('should focus the first button', async () => {
      dispatchKeydownEvent('Tab');

      expect(screen.getByTestId('skip')).toBe(document.activeElement);
    });

    it('should focus the second button', () => {
      dispatchKeydownEvent('Tab');

      expect(screen.getByTestId('back')).toBe(document.activeElement);
    });

    it('should focus the third button', () => {
      dispatchKeydownEvent('Tab');

      expect(screen.getByTestId('primary')).toBe(document.activeElement);
    });

    it('should focus the first button again', () => {
      dispatchKeydownEvent('Tab');

      expect(screen.getByTestId('skip')).toBe(document.activeElement);
    });

    it('should focus the last button again with shift', () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab', shiftKey: true }));

      expect(screen.getByTestId('primary')).toBe(document.activeElement);
    });

    it("shouldn't respond to other keyCodes", () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));

      expect(screen.getByTestId('primary')).toBe(document.activeElement);
    });

    it('should remove listener when removing scope', () => {
      unmount();

      expect(removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    });
  });

  describe('with "vertical" arrowNavigation and escCallback', () => {
    const mockEscCallback = vi.fn();

    beforeAll(() => {
      ({ unmount } = render(
        <Component
          arrowNavigation="horizontal"
          escCallback={mockEscCallback}
          initialFocusedElement="[data-testid='primary']"
        />,
      ));
      scopeMethods.addScope();
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    afterAll(() => {
      unmount();
    });

    it('should focus the "primary" button', async () => {
      await vi.waitFor(() => {
        expect(screen.getByTestId('primary')).toBe(document.activeElement);
      });
    });

    it('should navigate to the "back" button', async () => {
      dispatchKeydownEvent('ArrowLeft');

      await vi.waitFor(() => {
        expect(screen.getByTestId('back')).toBe(document.activeElement);
      });
    });

    it('should navigate to the "skip" button', async () => {
      dispatchKeydownEvent('ArrowLeft');

      await vi.waitFor(() => {
        expect(screen.getByTestId('skip')).toBe(document.activeElement);
      });
    });

    it('should stay in the "skip" button', async () => {
      dispatchKeydownEvent('ArrowLeft');

      await vi.waitFor(() => {
        expect(screen.getByTestId('skip')).toBe(document.activeElement);
      });
    });

    it('should call the escCallback', () => {
      dispatchKeydownEvent('Escape');

      expect(mockEscCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe('with "horizontal" arrowNavigation', () => {
    beforeAll(() => {
      ({ unmount } = render(<Component arrowNavigation="vertical" />));
      scopeMethods.addScope();
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    afterAll(() => {
      unmount();
    });

    it('should navigate to the next button', async () => {
      dispatchKeydownEvent('ArrowDown');

      await vi.waitFor(() => {
        expect(screen.getByTestId('skip')).toBe(document.activeElement);
      });
    });

    it('should navigate to the "back" button', async () => {
      dispatchKeydownEvent('ArrowDown');

      await vi.waitFor(() => {
        expect(screen.getByTestId('back')).toBe(document.activeElement);
      });
    });

    it('should navigate to the previous button', async () => {
      dispatchKeydownEvent('ArrowUp');

      await vi.waitFor(() => {
        expect(screen.getByTestId('skip')).toBe(document.activeElement);
      });
    });
  });

  describe('without matching elements', () => {
    beforeAll(() => {
      ({ unmount } = render(<Component selector=".primary" />));
    });

    afterAll(() => {
      unmount();
    });

    it('should have initialized', () => {
      scopeMethods.addScope();

      expect(addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    });

    it("shouldn't have matched anything", () => {
      dispatchKeydownEvent('Tab');

      expect(document.activeElement).toBe(document.body);
    });
  });
});
