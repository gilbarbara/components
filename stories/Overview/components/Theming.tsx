import { Box, Paragraph } from 'src';

import CodeBlock from './CodeBlock';

function OverviewTheming() {
  return (
    <Box>
      <Paragraph>You can customize the theme in your app.</Paragraph>
      <Paragraph mt={0}>
        Check the default{' '}
        <a
          href="https://github.com/gilbarbara/components/blob/main/src/modules/theme.ts"
          rel="noopener noreferrer"
          target="_blank"
        >
          theme
        </a>{' '}
        for more information.
      </Paragraph>
      <CodeBlock language="tsx">{`import { ThemeProvider } from '@emotion/react';
import { mergeTheme } from '@by-intera/components';

const theme = mergeTheme({
  colors: {
    primary: '#ff0044',
  },
});

function App() {
  <ThemeProvider theme={theme}>
    <Root />
  </ThemeProvider>
}`}</CodeBlock>
    </Box>
  );
}

export default OverviewTheming;
