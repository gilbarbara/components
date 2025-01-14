import { Box, H2, Jumbo, Paragraph } from '~';

import Code from '../../components/Code';
import CodeBlock from '../../components/CodeBlock';

import Navigation from './Navigation';

export default function ThemeCustomization() {
  return (
    <>
      <Jumbo>Theme Customization</Jumbo>
      <Paragraph>
        All components inherit values from the default theme. You might want to customize the theme
        tokens to match your design requirements.
      </Paragraph>
      <Paragraph>
        You can customize the theme tokens like colors, font sizes, line heights, etc. Check the
        default{' '}
        <a
          href="https://github.com/gilbarbara/components/blob/main/src/modules/theme.ts"
          rel="noopener noreferrer"
          target="_blank"
        >
          theme
        </a>{' '}
        for more information.
      </Paragraph>
      <Box mt="xl">
        <H2>Customizing theme tokens</H2>
        <Paragraph>
          To override a token in the default theme, import the <Code>mergeTheme</Code> function and
          set the keys you'd like to change.
        </Paragraph>
        <CodeBlock language="tsx">
          {`import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';

import App from './App';

export const theme = mergeTheme({
  colors: {
    primary: '#ff0044',
  },
});

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
  );
}`}
        </CodeBlock>
        <Paragraph>
          The custom theme is merged with the default theme, so you don't need to set all the keys
          or every value in an object.
        </Paragraph>
        <Paragraph mt="md">
          Setting a color will generate a palette that ranges from 50 to 900 for the matching
          variant.
        </Paragraph>
        <Paragraph>
          But you can override the variant by setting the <Code>variant</Code> key for the color.
        </Paragraph>
        <Paragraph>
          You can access these colors using the <Code>accent</Code>, <Code>bg</Code> or{' '}
          <Code>color</Code> props in components that support them.
        </Paragraph>
      </Box>

      <Navigation next="Composition" previous="Theme" />
    </>
  );
}
