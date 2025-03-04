/* eslint-disable unicorn/prevent-abbreviations */
import { type ComponentProps, type FC, useEffect, useRef } from 'react';
import CacheProvider from 'react-inlinesvg/provider';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { objectKeys } from '@gilbarbara/helpers';
import { useOnce, useUpdateEffect } from '@gilbarbara/hooks';
import { DocsContainer } from '@storybook/addon-docs';
import { useGlobals } from '@storybook/preview-api';
import { GlobalTypes } from '@storybook/types';

import { mergeTheme } from '../src';
import { black, darkColor, lightColor, colors as themeColors, white } from '../src/modules/theme';

import { Context, Story } from './Story';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'white',
    values: [
      { name: 'white', value: '#fff', default: true },
      { name: 'light', value: lightColor },
      { name: 'gray', value: '#999' },
      { name: 'dark', value: darkColor },
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
    container: ({ children, context }: ComponentProps<typeof DocsContainer>) => {
      return (
        <DocsContainer context={context}>
          <CacheProvider name="@gilbarbara/components">{children}</CacheProvider>
        </DocsContainer>
      );
    },
  },
  layout: 'centered',
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Introduction',
        'Colors',
        'Icons',
        'Theme',
        'Theme Customization',
        'Composition',
        'Components',
      ],
    },
  },
};

export const globalTypes: GlobalTypes = {
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
    background: theme.darkMode ? darkColor : white,
    color: theme.darkMode ? white : black,
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

function Preview(StoryFn: FC, context: Context) {
  const {
    globals: { appearance, backgrounds, color },
    parameters: {
      align = 'center',
      direction = 'column',
      display = 'flex',
      justify = 'start',
      layout,
      maxWidth = 1024,
      minHeight,
      minWidth,
      padding = 'md',
      paddingDocs = 0,
    },
    viewMode,
  } = context;

  const docsRef = useRef<HTMLDivElement>(null);
  const [, updateGlobals] = useGlobals();

  const isDocs = viewMode === 'docs';
  const isDarkMode = appearance === 'dark';
  const isSideBySide = appearance === 'side-by-side';
  const desiredBackground = isSideBySide || appearance === 'light' ? white : darkColor;
  const requireBackgroundUpdate = backgrounds?.value !== desiredBackground;
  const sharedProps = {
    align,
    direction,
    display,
    justify,
    maxWidth,
    minWidth,
    minHeight: minHeight ?? (layout === 'fullscreen' ? '100vh' : undefined),
    padding,
  };

  useOnce(() => {
    if (isDocs) {
      return;
    }

    updateGlobals({ backgrounds: { value: isDarkMode ? darkColor : white } });
  });

  useEffect(() => {
    const target = docsRef.current
      ?.closest('.docs-story')
      ?.querySelector('[scale="1"]') as HTMLDivElement;

    if (target) {
      target.style.width = '100%';
    }

    if (isDocs && requireBackgroundUpdate) {
      updateGlobals({ backgrounds: { value: desiredBackground } });
    }
  }, [desiredBackground, isDocs, requireBackgroundUpdate, updateGlobals]);

  useUpdateEffect(() => {
    if (isDocs) {
      return;
    }

    if (requireBackgroundUpdate) {
      updateGlobals({ backgrounds: { value: desiredBackground } });
    }
  }, [desiredBackground, isDocs, requireBackgroundUpdate, updateGlobals]);

  const customTheme = (darkMode: boolean): any => {
    return mergeTheme({
      dataAttributeName: 'testid',
      colors: { primary: themeColors[color!] },
      darkMode,
    });
  };

  if (isDocs) {
    return (
      <ThemeProvider theme={customTheme(isDarkMode)}>
        <Story
          {...sharedProps}
          padding={paddingDocs}
          style={{ color: isDarkMode ? white : darkColor }}
        >
          <StoryFn />
        </Story>
      </ThemeProvider>
    );
  }

  if (isSideBySide) {
    return (
      <>
        <ThemeProvider theme={customTheme(false)}>
          <ThemeBlock data-side="left" side="left">
            <Story
              data-testid="Story-Left"
              {...sharedProps}
              justify={layout === 'centered' ? 'center' : justify}
              minHeight="100vh"
              width="100%"
            >
              <StoryFn />
            </Story>
          </ThemeBlock>
        </ThemeProvider>
        <ThemeProvider theme={customTheme(true)}>
          <ThemeBlock data-side="right" side="right">
            <Story
              data-testid="Story-Right"
              {...sharedProps}
              justify={layout === 'centered' ? 'center' : justify}
              minHeight="100vh"
              width="100%"
            >
              <StoryFn />
            </Story>
          </ThemeBlock>
        </ThemeProvider>
      </>
    );
  }

  return (
    <ThemeProvider theme={customTheme(isDarkMode)}>
      <Story
        data-testid="Story"
        {...sharedProps}
        justify={layout === 'centered' ? 'center' : justify}
        mx="auto"
        style={{ color: isDarkMode ? white : darkColor }}
        width="100%"
      >
        <StoryFn />
      </Story>
    </ThemeProvider>
  );
}

export const decorators = [
  (StoryFn: FC, context: Context) => (
    <CacheProvider name="@gilbarbara/components">{Preview(StoryFn, context)}</CacheProvider>
  ),
];

export const tags = ['autodocs'];
