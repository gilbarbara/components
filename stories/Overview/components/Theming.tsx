import { Box, Paragraph } from '~';

import CodeBlock from './CodeBlock';

function OverviewTheming() {
  return (
    <Box>
      <Paragraph>
        The theme object is where you define your application's colors, typography, breakpoints and
        more.
      </Paragraph>
      <Paragraph mt={0}>
        You can check the default{' '}
        <a
          href="https://github.com/gilbarbara/components/blob/main/src/modules/theme.ts"
          rel="noopener noreferrer"
          target="_blank"
        >
          theme
        </a>{' '}
        for more information.
      </Paragraph>
      <Paragraph mt="lg">
        We will generate a palette that ranges from 50 to 900 for each color you define.
      </Paragraph>
      <Paragraph mt={0}>
        You can access them using the <code style={{ color: 'red' }}>variants</code> property.
      </Paragraph>
      <CodeBlock language="tsx">
        {`import { ThemeProvider } from '@emotion/react';
import { mergeTheme } from '@gilbarbara/components';

export const theme = mergeTheme({
  colors: {
    primary: '#ff0044',
  },
});

function App() {
  <ThemeProvider theme={theme}>
    <Root />
  </ThemeProvider>
}`}
      </CodeBlock>
    </Box>
  );
}

export default OverviewTheming;
