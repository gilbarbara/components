import {
  Children,
  cloneElement,
  ComponentProps,
  ElementType,
  FC,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';
import { PlainObject } from '@gilbarbara/types';

export function enhanceChildren<T extends ElementType>(
  children: ReactNode,
  type: T,
  props: PlainObject,
): ReactNode {
  const getProps = (includeProps: boolean, nodes: ReactNode) => {
    const enhancedProps: PlainObject = includeProps ? { ...props } : {};

    if (nodes) {
      enhancedProps.children = nodes;
    }

    return enhancedProps;
  };

  return Children.map(children, child => {
    if (!isValidElement(child)) {
      return child; // Return non-element nodes unchanged
    }

    const enhancedChildren = child.props.children
      ? enhanceChildren(child.props.children, type, props) // Recursively enhance children
      : undefined;

    // Enhance the target component by merging props
    if (child.type === type) {
      return cloneElement(child, getProps(true, enhancedChildren));
    }

    // Return other elements unchanged, but with enhanced nested children
    return cloneElement(child, getProps(false, enhancedChildren));
  });
}

export function getMatchingChildren<T extends ElementType>(
  children: ReactNode,
  type: T,
): { elements: ReactElement<ComponentProps<T>>[]; hasInvalidElements: boolean } {
  const matchingElements: ReactElement<ComponentProps<T>>[] = [];
  let hasInvalidElements = false;

  const processChildren = (nodes: ReactNode) => {
    Children.forEach(nodes, child => {
      if (!isValidElement(child)) {
        hasInvalidElements = true;
        // eslint-disable-next-line no-console
        console.warn('Invalid child detected: Not a React element.', child);

        return;
      }

      // Check if the child matches the valid component type
      if (child.type === type) {
        matchingElements.push(child as ReactElement<ComponentProps<T>>);

        return;
      }

      // If the child is a functional component, render it and process its output
      if (typeof child.type === 'function') {
        const renderedOutput = (child.type as FC)(child.props);

        processChildren(renderedOutput);

        return;
      }

      // Recursively process nested children if available
      const { children: nestedChildren } = child.props || {};

      if (nestedChildren) {
        processChildren(nestedChildren);
      }
    });
  };

  processChildren(children);

  return { elements: matchingElements, hasInvalidElements };
}

export function splitReactChildren<T extends ElementType>(
  children: ReactNode,
  targetChild: T,
): [ReactNode, ReactElement<ComponentProps<T>>[]] {
  const matchingElements: ReactElement<ComponentProps<T>>[] = [];

  const withoutTargetChildren = Children.map(children, item => {
    if (!isValidElement(item)) {
      return item;
    }

    if (item.type === targetChild) {
      matchingElements.push(item as ReactElement<ComponentProps<T>>);

      return null;
    }

    return item;
  })?.filter(Boolean);

  return [withoutTargetChildren, matchingElements];
}
