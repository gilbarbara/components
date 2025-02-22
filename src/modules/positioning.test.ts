import { FloatingPlacement } from '~/types';

import { getComputedPlacement, getElementDimenstions, getFloatingStyles } from './positioning';

function getElements(
  triggerRect: Partial<DOMRect> = {},
  contentRect: Partial<DOMRect> = {},
  style: Partial<CSSStyleDeclaration> = {},
) {
  const triggerElement = document.createElement('div');
  const contentElement = document.createElement('div');

  triggerElement.getBoundingClientRect = () => ({
    top: 100,
    bottom: 300,
    left: 400,
    right: 500,
    width: 100,
    height: 100,
    x: 400,
    y: 200,
    ...triggerRect,
    toJSON,
  });

  contentElement.getBoundingClientRect = () => ({
    top: 0,
    bottom: 50,
    left: 0,
    right: 50,
    width: 50,
    height: 50,
    x: 0,
    y: 0,
    ...contentRect,
    toJSON,
  });

  Object.defineProperty(window, 'getComputedStyle', {
    writable: true,
    configurable: true,
    value: () => ({
      height: '100px',
      width: '100px',
      ...style,
    }),
  });

  return { triggerElement, contentElement };
}

function toJSON(this: DOMRect) {
  return this;
}

describe('getComputedPlacement', () => {
  it('should return "bottom" when triggerElement is null and placement is "auto"', () => {
    const contentElement = document.createElement('div');

    expect(getComputedPlacement('auto', null, contentElement)).toBe('bottom');
  });

  it('should return the provided placement when there is no overflow', () => {
    const { contentElement, triggerElement } = getElements();

    expect(getComputedPlacement('top', triggerElement, contentElement)).toBe('top');
  });

  it('should return a fallback placement when the requested placement overflows', () => {
    const { contentElement, triggerElement } = getElements({ top: 20, bottom: 70 });

    expect(getComputedPlacement('top-start', triggerElement, contentElement)).toBe('bottom-start');
  });

  it('should compute an auto placement based on available space', () => {
    const { contentElement, triggerElement } = getElements();

    expect(getComputedPlacement('auto', triggerElement, contentElement)).toBe('right');
  });

  it('should appends alignment if fallback has no dash but original did', () => {
    const { contentElement, triggerElement } = getElements({ left: 0 });

    expect(getComputedPlacement('left', triggerElement, contentElement)).toBe('top-start');
  });

  it('should use the fallback order when the "top" placement overflows', () => {
    // Place trigger near the top so "top" is impossible
    const { contentElement, triggerElement } = getElements({ top: 0 });

    expect(getComputedPlacement('top', triggerElement, contentElement)).toBe('bottom');
  });

  it('should use the fallback order when the "bottom" placement overflows', () => {
    // Place trigger near the top so "top" is impossible
    const { contentElement, triggerElement } = getElements({ bottom: 800 });

    expect(getComputedPlacement('bottom', triggerElement, contentElement)).toBe('top');
  });

  it('shoud returns "bottom" if no side can fit the content (bestPlacement is null)', () => {
    const { contentElement, triggerElement } = getElements(
      { top: 100, bottom: 150 },
      {},
      { width: '200px', height: '200px' },
    );

    expect(getComputedPlacement('top', triggerElement, contentElement)).toBe('bottom');
  });

  it('should handle wide content that would overflow horizontally with top placement', () => {
    const { contentElement, triggerElement } = getElements(
      { left: 900 },
      {},
      { width: '300px', height: '50px' },
    );

    expect(getComputedPlacement('top', triggerElement, contentElement)).toBe('top-end');
  });

  it('should handle tall content that would overflow vertically with left placement', () => {
    const { contentElement, triggerElement } = getElements(
      { top: 700, height: 50 },
      {},
      { height: '300px' },
    );

    expect(getComputedPlacement('left-start', triggerElement, contentElement)).toBe('left-end');
  });

  it('should handle alignment with top-start without available space', () => {
    const { contentElement, triggerElement } = getElements({ top: 20 }, {}, { width: '150px' });

    // Should not use top-start since it would overflow to the left
    expect(getComputedPlacement('top-start', triggerElement, contentElement)).toBe('bottom-start');
  });

  it('should handle right placement with extremely wide content', () => {
    const { contentElement, triggerElement } = getElements(
      { top: 200, bottom: 300, left: 800, right: 900 },
      {},
      { width: '500px', height: '50px' },
    );

    // Right placement with wide content near right edge should overflow
    expect(getComputedPlacement('right', triggerElement, contentElement)).toBe('bottom-end');
  });

  it('should handle extremely tall trigger elements', () => {
    const { contentElement, triggerElement } = getElements(
      { top: 50, bottom: 700, left: 400, right: 500, height: 650 },
      {},
      { width: '100px', height: '100px' },
    );

    expect(getComputedPlacement('auto', triggerElement, contentElement)).toBe('right');
  });

  it('should preserve alignment when possible with fallback position', () => {
    const { contentElement, triggerElement } = getElements(
      { top: 0, bottom: 50, left: 400, right: 500 },
      {},
      { width: '100px', height: '100px' },
    );

    // Top-start can't work (no space above), but bottom-start should
    expect(getComputedPlacement('top-start', triggerElement, contentElement)).toBe('bottom-start');
  });

  it('should handle corner cases (element in bottom-right corner)', () => {
    const { contentElement, triggerElement } = getElements(
      { top: 700, bottom: 750, left: 950, right: 1000 },
      {},
      { width: '100px', height: '100px' },
    );

    expect(getComputedPlacement('auto', triggerElement, contentElement)).toBe('left-end');
  });

  it('should prefer placements with less overflow when all options overflow', () => {
    const { contentElement, triggerElement } = getElements(
      { top: 150, bottom: 100, left: 150, right: 500 },
      {},
      { width: '200px', height: '200px' },
    );

    expect(getComputedPlacement('auto', triggerElement, contentElement)).toBe('bottom');
  });

  it('should respect preferredPlacements option', () => {
    const { contentElement, triggerElement } = getElements({
      top: 50,
    });

    expect(
      getComputedPlacement('top', triggerElement, contentElement, {
        preferredPlacements: ['right', 'left', 'bottom', 'top'],
      }),
    ).toBe('right');
  });
});

describe('getElementDimenstions', () => {
  it('should return the element dimensions from its bounding rect', () => {
    const element = document.createElement('div');

    // Override the element's getBoundingClientRect to simulate specific dimensions.
    element.getBoundingClientRect = () => ({
      top: 10,
      bottom: 60,
      left: 15,
      right: 65,
      width: 50,
      height: 50,
      x: 15,
      y: 10,
      toJSON,
    });

    Object.defineProperty(window, 'getComputedStyle', {
      writable: true,
      configurable: true,
      value: () => ({
        height: '40px',
        width: '80px',
      }),
    });

    expect(getElementDimenstions(element)).toMatchSnapshot();
  });
});

describe('getFloatingStyles', () => {
  it.each<FloatingPlacement>([
    'auto',
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
    'right',
    'right-start',
    'right-end',
  ])('should return correct styles for %s placement', placement => {
    const styles = getFloatingStyles(placement, { offset: 20, distance: 10 });

    expect(styles).toMatchSnapshot();
  });
});
