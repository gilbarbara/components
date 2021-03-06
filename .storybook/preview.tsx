import * as React from 'react';
import { usePrevious } from 'react-use';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { useGlobals } from '@storybook/client-api';

import { colors as themeColors } from '../src/modules/theme';
import { Theme } from '../src/types';

import { Box, BoxCenter } from '../src';
import { useEffect, useRef } from "react";

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
    name: 'appearance',
    description: 'Appearance',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'circlehollow', title: 'light' },
        { value: 'dark', icon: 'circle', title: 'dark' },
        { value: 'side-by-side', icon: 'sidebar', title: 'side by side' },
      ],
    },
  },
  baseColor: {
    name: 'baseColor',
    description: 'Base color',
    defaultValue: 'primary',
    toolbar: {
      icon: 'beaker',
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
    globals: { appearance, baseColor },
    parameters: { maxWidth = 1024, minHeight, withoutPadding },
    viewMode,
  } = context;

  const docsRef = useRef<HTMLDivElement>(null)
  const previousAppearance = usePrevious(appearance);
  const [, updateGlobals] = useGlobals();
  const isDarkMode = appearance === 'dark';
  const isSideBySide = appearance === 'side-by-side';

  useEffect(() => {
    const target = docsRef.current?.closest('.docs-story')?.querySelector('[scale="1"]') as HTMLDivElement;

    if (target) {
      target.style.width = '100%';
    }
  }, []);

  if (viewMode === 'docs') {
    return (
      <Box
        ref={docsRef}
        align="center"
        data-component-name="StoryDocs"
        direction="column"
        display="flex"
        justify="start"
        minHeight={minHeight}
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
            colors: { primary: themeColors[baseColor as keyof Theme['colors']] },
            darkMode: false,
          }}
        >
          <ThemeBlock data-side="left" side="left">
            <BoxCenter
              data-component-name="Story-Left"
              maxWidth={maxWidth}
              minHeight="100vh"
              padding={withoutPadding ? undefined : 'md'}
              width="100%"
            >
              <StoryFn />
            </BoxCenter>
          </ThemeBlock>
        </ThemeProvider>
        <ThemeProvider
          theme={{
            colors: { primary: themeColors[baseColor as keyof Theme['colors']] },
            darkMode: true,
          }}
        >
          <ThemeBlock data-side="right" side="right">
            <BoxCenter
              data-component-name="Story-Right"
              maxWidth={maxWidth}
              minHeight="100vh"
              padding={withoutPadding ? undefined : 'md'}
              width="100%"
            >
              <StoryFn />
            </BoxCenter>
          </ThemeBlock>
        </ThemeProvider>
      </>
    );
  }

  return (
    <ThemeProvider
      theme={{
        darkMode: isDarkMode,
        colors: { primary: themeColors[baseColor as keyof Theme['colors']] },
      }}
    >
      <BoxCenter
        data-component-name="Story"
        maxWidth={maxWidth}
        padding={withoutPadding ? undefined : 'md'}
        style={{ color: isDarkMode ? '#fff' : '#101010' }}
        width="100%"
      >
        <StoryFn />
      </BoxCenter>
    </ThemeProvider>
  );
}

export const decorators = [Preview];
