/* eslint-disable class-methods-use-this */
export interface Options {
  arrowNavigation?: 'horizontal' | 'vertical' | 'both';
  escCallback?: () => void;
  initialFocusedElement?: HTMLElement | string;
  selector: string;
}

export default class KeyboardScope {
  element: HTMLElement | null;
  options: Options;

  constructor(element: HTMLElement | null, options: Options) {
    this.element = element;
    this.options = options;

    this.setFocus();
  }

  addScope = () => {
    window.addEventListener('keydown', this.handleKeyDown, false);
  };

  canBeTabbed = (element: HTMLElement): boolean => {
    const { tabIndex } = element;

    if (tabIndex === null || tabIndex < 0) {
      return false;
    }

    return !!element;
  };

  findValidElements = (): Array<HTMLElement> => {
    return [].slice
      .call(this.element?.querySelectorAll(this.options.selector), 0)
      .filter(this.canBeTabbed);
  };

  getElementIndex = (elements: Array<HTMLElement>) => {
    return document.activeElement ? elements.indexOf(document.activeElement as HTMLElement) : 0;
  };

  handleKeyDown = (event: KeyboardEvent) => {
    const { code } = event;
    const { arrowNavigation, escCallback } = this.options;

    if (code === 'Tab') {
      this.interceptTab(event);
    } else if (escCallback && code === 'Escape') {
      escCallback();
    } else if (
      (['horizontal', 'both'] as Options['arrowNavigation'][]).includes(arrowNavigation) &&
      ['ArrowLeft', 'ArrowRight'].includes(code)
    ) {
      this.interceptArrows(event);
    } else if (
      (['vertical', 'both'] as Options['arrowNavigation'][]).includes(arrowNavigation) &&
      ['ArrowUp', 'ArrowDown'].includes(code)
    ) {
      this.interceptArrows(event);
    }
  };

  interceptArrows = (event: KeyboardEvent) => {
    event.preventDefault();

    const { code } = event;
    const elements = this.findValidElements();

    const isPrevious = ['ArrowUp', 'ArrowLeft'].includes(code);

    if (!elements.length) {
      return;
    }

    let index = this.getElementIndex(elements);

    if (index === -1 || (index + 1 === elements.length && !isPrevious)) {
      index = 0;
    } else if (isPrevious && index === 0) {
      index = elements.length - 1;
    } else {
      index += isPrevious ? -1 : 1;
    }

    elements[index].focus();
  };

  interceptTab = (event: KeyboardEvent) => {
    event.preventDefault();
    const elements = this.findValidElements();
    const { shiftKey } = event;

    if (!elements.length) {
      return;
    }

    let index = this.getElementIndex(elements);

    if (index === -1 || (!shiftKey && index + 1 === elements.length)) {
      index = 0;
    } else if (shiftKey && index === 0) {
      index = elements.length - 1;
    } else {
      index += shiftKey ? -1 : 1;
    }

    elements[index].focus();
  };

  removeScope = () => {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  checkFocus = (target: HTMLElement | null) => {
    if (target && document.activeElement !== target) {
      target.focus();
      window.requestAnimationFrame(() => this.checkFocus(target));
    }
  };

  setFocus = () => {
    const { initialFocusedElement } = this.options;

    if (!initialFocusedElement) {
      return;
    }

    const target =
      typeof initialFocusedElement === 'string'
        ? (this.element?.querySelector(initialFocusedElement) as HTMLElement | null)
        : initialFocusedElement;

    if (target) {
      window.requestAnimationFrame(() => this.checkFocus(target));
    }
  };
}
