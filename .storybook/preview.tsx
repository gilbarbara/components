import * as React from 'react';
import { usePrevious } from 'react-use';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { useGlobals } from '@storybook/client-api';

import { colors as themeColors } from '../src/modules/theme';
import { Theme } from '../src/types';

import { Box } from '../src';

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
  layout: 'centered',
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
  variant: {
    description: 'The variant color used by the components',
    defaultValue: 'primary',
    toolbar: {
      icon: 'paintbrush',
      items: Object.keys(themeColors),
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

function Preview(StoryFn: React.FC, context: any) {
  const {
    globals: { appearance, variant },
    parameters: {
      align = 'center',
      centered,
      direction = 'column',
      display = 'flex',
      justify = 'start',
      minWidth = 768,
      maxWidth = 1024,
      minHeight,
      padding = 'md',
      paddingDocs = 0,
    },
    viewMode,
  } = context;

  const docsRef = React.useRef<HTMLDivElement>(null);
  const previousAppearance = usePrevious(appearance);
  const [, updateGlobals] = useGlobals();
  const isDarkMode = appearance === 'dark';
  const isSideBySide = appearance === 'side-by-side';

  React.useEffect(() => {
    const target = docsRef.current
      ?.closest('.docs-story')
      ?.querySelector('[scale="1"]') as HTMLDivElement;

    if (target) {
      target.style.width = '100%';
    }
  }, []);

  if (viewMode === 'docs') {
    return (
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
      >
        <StoryFn />
      </Box>
    );
  }

  if (!isSideBySide && previousAppearance !== appearance) {
    updateGlobals({ backgrounds: { value: appearance === 'dark' ? '#101010' : '#fff' } });
  }

  if (isSideBySide) {
    return (
      <>
        <ThemeProvider
          theme={{
            colors: { primary: themeColors[variant as keyof Theme['colors']] },
            darkMode: false,
          }}
        >
          <ThemeBlock data-side="left" side="left">
            <Box
              align={align}
              data-component-name="Story-Left"
              direction={direction}
              display={display}
              justify={justify}
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
            colors: { primary: themeColors[variant as keyof Theme['colors']] },
            darkMode: true,
          }}
        >
          <ThemeBlock data-side="right" side="right">
            <Box
              align={align}
              data-component-name="Story-Right"
              direction={direction}
              display={display}
              justify={justify}
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
        colors: { primary: themeColors[variant as keyof Theme['colors']] },
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
        mx={centered ? 'auto' : undefined}
        padding={padding}
        style={{ color: isDarkMode ? '#fff' : '#101010' }}
        width="100%"
      >
        <StoryFn />
      </Box>
    </ThemeProvider>
  );
}

export const decorators = [Preview];
