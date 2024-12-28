import { PropsWithChildren } from 'react';
import { render, screen } from '@testing-library/react';

import { enhanceChildren, getMatchingChildren, splitReactChildren } from './react-helpers';

function ComponentA({ children, name }: PropsWithChildren<{ name?: string }>) {
  return <div data-testid="component-a">{name ?? children}</div>;
}

function ComponentB({ name = 'Not Enhanced' }: { name?: string }) {
  return <div data-testid="component-b">{name}</div>;
}

describe('enhanceChildren', () => {
  it('should enhance the matching components', () => {
    const children = enhanceChildren(
      <>
        Hello
        <ComponentA />
        <>
          <ComponentA />
          <ComponentB />
        </>
      </>,
      ComponentA,
      {
        name: 'Enhanced',
      },
    );

    render(children);

    const enhancedComponents = screen.getAllByTestId('component-a');

    expect(enhancedComponents).toHaveLength(2);
    enhancedComponents.forEach(instance => {
      expect(instance).toHaveTextContent('Enhanced');
    });

    // Assert ComponentB remains untouched
    const untouchedComponents = screen.getAllByTestId('component-b');

    expect(untouchedComponents).toHaveLength(1);
    untouchedComponents.forEach(instance => {
      expect(instance).toHaveTextContent('Not Enhanced');
    });
  });
});

describe('getMatchingChildren', () => {
  beforeAll(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should get the matching children', () => {
    const { elements, hasInvalidElements } = getMatchingChildren(
      <>
        <ComponentA>One</ComponentA>
        <ComponentA>Two</ComponentA>
        <ComponentB />
      </>,
      ComponentA,
    );

    const { container } = render(elements);

    expect(container.innerHTML).toMatchSnapshot();
    expect(hasInvalidElements).toBe(true);
  });
});

describe('splitReactChildren', () => {
  it('should return the splitted children', () => {
    const [otherChildren, selected] = splitReactChildren(
      ['Hello', <ComponentA />, <ComponentA>Two</ComponentA>, <ComponentB />],
      ComponentA,
    );

    expect(otherChildren).toHaveLength(2);
    expect(selected).toHaveLength(2);
    expect(selected[0]).toStrictEqual(<ComponentA />);
  });
});
