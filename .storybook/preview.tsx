import * as React from 'react';
import styled from '@emotion/styled';
import { DocsContainer } from '@storybook/addon-docs';
import { objectKeys } from '@gilbarbara/helpers';
import { configure } from '@storybook/test';

import { ThemeProvider } from '@emotion/react';
import { useGlobals } from '@storybook/client-api';
import CacheProvider from 'react-inlinesvg/provider';

import { colors as themeColors } from '../src/modules/theme';
import { Theme, WithFlexBox, WithPadding } from '../src/types';

import { Box } from '../src';

interface Context {
  globals: {
    backgrounds: { value: string };
    color: keyof Theme['colors'];
    appearance: 'light' | 'dark' | 'side-by-side';
  };
  parameters: {
    align: string;
    direction: WithFlexBox['direction'];
    display: string;
    justify: string;
    layout: string;
    minWidth: number;
    maxWidth: number;
    minHeight?: string;
    padding: WithPadding['padding'];
    paddingDocs: WithPadding['padding'];
  };
  viewMode: string;
}

configure({ testIdAttribute: 'data-component-name' });

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'white',
    values: [
      { name: 'white', value: '#fff', default: true },
      { name: 'light', value: '#f0f0f0' },
      { name: 'gray', value: '#999' },
      { name: 'dark', value: '#101010' },
    ],
  },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    sort: 'requiredFirst',
  },
  docs: {
    container: ({ children, context }: React.ComponentProps<typeof DocsContainer>) => {
      return (
        <DocsContainer context={context}>
          <CacheProvider name="@gilbarbara/components">
            <>{children}</>
          </CacheProvider>
        </DocsContainer>
      );
    },
  },
  layout: 'centered',
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Overview', 'Components'],
    },
  },
  sidebar: {
    showRoots: true,
  },
};

export const globalTypes = {
  appearance: {
    description: 'The appearance of the components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'sun', title: 'light' },
        { value: 'dark', icon: 'moon', title: 'dark' },
        { value: 'side-by-side', icon: 'sidebyside', title: 'side by side' },
      ],
    },
  },
  color: {
    description: 'The color used by the components',
    defaultValue: 'primary',
    toolbar: {
      icon: 'paintbrush',
      items: objectKeys(themeColors),
    },
  },
};

const ThemeBlock = styled.div(
  {
    bottom: 0,
    left: 0,
    minHeight: '100vh',
    overflow: 'auto',
    position: 'absolute',
    right: '50vw',
    top: 0,
    width: '50vw',
  },
  ({ theme }) => ({
    background: theme.darkMode ? '#101010' : '#fff',
    color: theme.darkMode ? '#fff' : '#101010',
  }),
  ({ side }: any) =>
    side === 'left'
      ? {
          left: 0,
          right: '50vw',
        }
      : {
          right: 0,
          left: '50vw',
        },
);

function Preview(StoryFn: React.FC, context: Context) {
  const {
    globals: { appearance, backgrounds, color },
    parameters: {
      align = 'center',
      direction = 'column',
      display = 'flex',
      justify = 'start',
      layout,
      minWidth,
      maxWidth = 1024,
      minHeight,
      padding = 'md',
      paddingDocs = 0,
    },
    viewMode,
  } = context;

  const docsRef = React.useRef<HTMLDivElement>(null);
  const [, updateGlobals] = useGlobals();

  const isDocs = viewMode === 'docs';
  const isDarkMode = appearance === 'dark';
  const isSideBySide = appearance === 'side-by-side';
  const desiredBackground = isSideBySide || appearance === 'light' ? '#fff' : '#101010';
  const requireBackgroundUpdate = backgrounds?.value !== desiredBackground;

  React.useEffect(() => {
    const target = docsRef.current
      ?.closest('.docs-story')
      ?.querySelector('[scale="1"]') as HTMLDivElement;

    if (target) {
      target.style.width = '100%';
    }

    if (isDocs && requireBackgroundUpdate) {
      updateGlobals({ backgrounds: { value: desiredBackground } });
    }
  }, []);

  React.useEffect(() => {
    if (isDocs) {
      return;
    }

    if (requireBackgroundUpdate) {
      updateGlobals({ backgrounds: { value: desiredBackground } });
    }
  }, [isDocs, desiredBackground]);

  if (isDocs) {
    return (
      <ThemeProvider
        theme={{
          darkMode: isDarkMode,
          colors: { primary: themeColors[color] },
        }}
      >
        <Box
          ref={docsRef}
          align={align}
          data-component-name="StoryDocs"
          direction={direction}
          display={display}
          justify={justify}
          minHeight={minHeight}
          minWidth={minWidth}
          padding={paddingDocs}
          style={{ color: isDarkMode ? '#fff' : '#101010' }}
        >
          <StoryFn />
        </Box>
      </ThemeProvider>
    );
  }

  if (isSideBySide) {
    return (
      <>
        <ThemeProvider
          theme={{
            colors: { primary: themeColors[color] },
            darkMode: false,
          }}
        >
          <ThemeBlock data-side="left" side="left">
            <Box
              align={align}
              data-component-name="Story-Left"
              direction={direction}
              display={display}
              justify={layout === 'centered' ? 'center' : justify}
              maxWidth={maxWidth}
              minHeight="100vh"
              padding={padding}
              width="100%"
            >
              <StoryFn />
            </Box>
          </ThemeBlock>
        </ThemeProvider>
        <ThemeProvider
          theme={{
            colors: { primary: themeColors[color] },
            darkMode: true,
          }}
        >
          <ThemeBlock data-side="right" side="right">
            <Box
              align={align}
              data-component-name="Story-Right"
              direction={direction}
              display={display}
              justify={layout === 'centered' ? 'center' : justify}
              maxWidth={maxWidth}
              minHeight="100vh"
              padding={padding}
              width="100%"
            >
              <StoryFn />
            </Box>
          </ThemeBlock>
        </ThemeProvider>
      </>
    );
  }

  return (
    <ThemeProvider
      theme={{
        darkMode: isDarkMode,
        colors: { primary: themeColors[color] },
      }}
    >
      <Box
        align={align}
        data-component-name="Story"
        direction={direction}
        display={display}
        justify={justify}
        maxWidth={maxWidth}
        minWidth={minWidth}
        mx="auto"
        padding={padding}
        style={{ color: isDarkMode ? '#fff' : '#101010' }}
        width="100%"
      >
        <StoryFn />
      </Box>
    </ThemeProvider>
  );
}

export const decorators = [
  (StoryFn: React.FC, context: Context) => (
    <CacheProvider name="@gilbarbara/components">{Preview(StoryFn, context)}</CacheProvider>
  ),
];
