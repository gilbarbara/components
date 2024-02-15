/* eslint-disable testing-library/no-render-in-lifecycle,testing-library/no-node-access */
import { useEffect, useRef } from 'react';
import { render, screen } from '@testing-library/react';
import { MockInstance, vi } from 'vitest';

import KeyboardScope, { Options } from '~/modules/keyboardScope';

const addEventListener = vi.spyOn(window, 'addEventListener');
const removeEventListener = vi.spyOn(window, 'removeEventListener');

const canBeTabbedCount = 3;

const mocks: Record<string, MockInstance> = {};
let scopeInstance: KeyboardScope;

interface Props extends Omit<Options, 'selector'> {
  selector?: string;
}

function setScope(scope: KeyboardScope) {
  scopeInstance = scope;

  mocks.addScope = vi.spyOn(scope, 'addScope');
  mocks.canBeTabbed = vi.spyOn(scope, 'canBeTabbed');
  mocks.findValidElements = vi.spyOn(scope, 'findValidElements');
  mocks.interceptArrows = vi.spyOn(scope, 'interceptArrows');
  mocks.interceptTab = vi.spyOn(scope, 'interceptTab');
  mocks.removeScope = vi.spyOn(scope, 'removeScope');
}

function dispatchKeydownEvent(code: string) {
  window.dispatchEvent(new KeyboardEvent('keydown', { code }));
}

function Component(props: Props) {
  const { selector = 'button', ...rest } = props;
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = new KeyboardScope(componentRef.current, {
      selector,
      ...rest,
    });

    setScope(scope);

    return () => {
      scope.removeScope();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={componentRef} className="component">
      <h2>Title</h2>
      <p>My awesome content</p>
      <footer>
        <button data-component-name="skip" type="button">
          SKIP
        </button>
        <button data-component-name="back" type="button">
          BACK
        </button>
        <button data-component-name="primary" type="button">
          GO
        </button>
      </footer>
      <a data-component-name="close" href="#close">
        X
      </a>
    </div>
  );
}

describe('modules/keyboardScope', () => {
  let unmount: () => void;

  beforeAll(() => {
    addEventListener.mockClear();
    removeEventListener.mockClear();
  });

  describe('with matching elements', () => {
    beforeAll(() => {
      ({ unmount } = render(<Component />));
    });

    beforeEach(() => {
      scopeInstance.addScope();
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    afterAll(() => {
      unmount();
    });

    it('should have initialized', () => {
      scopeInstance.addScope();

      expect(addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function), false);
      expect(scopeInstance.element?.className).toBe('component');
    });

    it('should focus the first button', async () => {
      dispatchKeydownEvent('Tab');

      expect(mocks.findValidElements).toHaveBeenCalledTimes(1);
      expect(mocks.canBeTabbed).toHaveBeenCalledTimes(canBeTabbedCount);
      expect(mocks.interceptTab).toHaveBeenCalledTimes(1);

      expect(screen.getByTestId('skip') === document.activeElement).toBeTrue();
    });

    it('should focus the second button', () => {
      dispatchKeydownEvent('Tab');

      expect(mocks.interceptTab).toHaveBeenCalledTimes(1);
      expect(mocks.findValidElements).toHaveBeenCalledTimes(1);
      expect(mocks.canBeTabbed).toHaveBeenCalledTimes(canBeTabbedCount);

      expect(screen.getByTestId('back') === document.activeElement).toBeTrue();
    });

    it('should focus the third button', () => {
      dispatchKeydownEvent('Tab');

      expect(mocks.interceptTab).toHaveBeenCalledTimes(1);
      expect(mocks.findValidElements).toHaveBeenCalledTimes(1);
      expect(mocks.canBeTabbed).toHaveBeenCalledTimes(canBeTabbedCount);

      expect(screen.getByTestId('primary') === document.activeElement).toBeTrue();
    });

    it('should focus the first button again', () => {
      dispatchKeydownEvent('Tab');

      expect(mocks.interceptTab).toHaveBeenCalledTimes(1);
      expect(mocks.findValidElements).toHaveBeenCalledTimes(1);
      expect(mocks.canBeTabbed).toHaveBeenCalledTimes(canBeTabbedCount);

      expect(screen.getByTestId('skip') === document.activeElement).toBeTrue();
    });

    it('should focus the last button again with shift', () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab', shiftKey: true }));

      expect(mocks.interceptTab).toHaveBeenCalledTimes(1);
      expect(mocks.findValidElements).toHaveBeenCalledTimes(1);
      expect(mocks.canBeTabbed).toHaveBeenCalledTimes(canBeTabbedCount);

      expect(screen.getByTestId('primary') === document.activeElement).toBeTrue();
    });

    it("shouldn't respond to other keyCodes", () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
      expect(mocks.interceptTab).toHaveBeenCalledTimes(0);
      expect(mocks.findValidElements).toHaveBeenCalledTimes(0);
      expect(mocks.canBeTabbed).toHaveBeenCalledTimes(0);

      expect(screen.getByTestId('primary') === document.activeElement).toBeTrue();
    });

    it('should remove listener when removing scope', () => {
      unmount();

      expect(mocks.removeScope).toHaveBeenCalledTimes(1);
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
          initialFocusedElement="[data-component-name='primary']"
        />,
      ));
      scopeInstance.addScope();
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    afterAll(() => {
      unmount();
    });

    it('should focus the primary button', async () => {
      await vi.waitFor(() => {
        expect(screen.getByTestId('primary') === document.activeElement).toBeTrue();
      });
    });

    it('should navigate to the previous button', async () => {
      dispatchKeydownEvent('ArrowLeft');

      expect(mocks.interceptArrows).toHaveBeenCalledTimes(1);
      expect(mocks.findValidElements).toHaveBeenCalledTimes(1);
      expect(mocks.canBeTabbed).toHaveBeenCalledTimes(canBeTabbedCount);

      await vi.waitFor(() => {
        expect(screen.getByTestId('back') === document.activeElement).toBeTrue();
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
      scopeInstance.addScope();
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    afterAll(() => {
      unmount();
    });

    it('should navigate to the next button', async () => {
      dispatchKeydownEvent('ArrowDown');

      expect(mocks.interceptArrows).toHaveBeenCalledTimes(1);
      expect(mocks.findValidElements).toHaveBeenCalledTimes(1);
      expect(mocks.canBeTabbed).toHaveBeenCalledTimes(canBeTabbedCount);

      await vi.waitFor(() => {
        expect(screen.getByTestId('skip') === document.activeElement).toBeTrue();
      });
    });

    it('should navigate to the previous button', async () => {
      dispatchKeydownEvent('ArrowUp');

      expect(mocks.interceptArrows).toHaveBeenCalledTimes(1);
      expect(mocks.findValidElements).toHaveBeenCalledTimes(1);
      expect(mocks.canBeTabbed).toHaveBeenCalledTimes(canBeTabbedCount);

      await vi.waitFor(() => {
        expect(screen.getByTestId('primary') === document.activeElement).toBeTrue();
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
      scopeInstance.addScope();

      expect(addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function), false);
      expect(scopeInstance.element?.className).toBe('component');
    });

    it("shouldn't have matched anything", () => {
      dispatchKeydownEvent('Tab');

      expect(mocks.interceptTab).toHaveBeenCalledTimes(1);
      expect(mocks.findValidElements).toHaveBeenCalledTimes(1);
      expect(mocks.canBeTabbed).toHaveBeenCalledTimes(0);
    });
  });
});
