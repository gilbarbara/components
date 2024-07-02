import SVG from 'react-inlinesvg';

import { Box, H2, H3, Jumbo, Paragraph, Spacer } from '~';

import packageJson from '../../../package.json';
import CodeBlock from '../../components/CodeBlock';

function OverviewAbout() {
  return (
    <Box>
      <Box textAlign="center">
        <Jumbo>@gilbarbara/components</Jumbo>

        <img
          alt="components"
          height={240}
          src="https://files.gilbarbara.dev/logos/components-icon.svg"
          width={256}
        />
        <Paragraph mt="md">
          A collection of React components to help you create beautiful user interfaces.
        </Paragraph>
        <Paragraph mt={0}>
          It is built on top of the{' '}
          <a
            href="https://emotion.sh/docs/Overviewduction"
            rel="noopener noreferrer"
            target="_blank"
          >
            {' '}
            @emotion
          </a>{' '}
          system.
        </Paragraph>

        <Spacer distribution="center" gap="xs" mb="xl" mt="md">
          <a
            aria-label="GitHub"
            href="https://github.com/gilbarbara/components"
            rel="noreferrer"
            target="_blank"
          >
            <SVG height={24} src="https://cdn.svgporn.com/logos/github-icon.svg" width={32} />
          </a>
          <a
            aria-label="NPM"
            href="https://www.npmjs.com/package/@gilbarbara/components"
            rel="noreferrer"
            target="_blank"
          >
            <SVG height={24} src="https://cdn.svgporn.com/logos/npm-icon.svg" width={32} />
          </a>
          <Paragraph>Version: {packageJson.version}</Paragraph>
        </Spacer>
      </Box>

      <H2>Installation</H2>

      <CodeBlock language="bash">
        npm i @gilbarbara/components @emotion/react @emotion/styled
      </CodeBlock>

      <H3>Usage</H3>

      <CodeBlock language="tsx">
        {`import { Button } from '@gilbarbara/components';

function App() {
  return <Button>Click Me</Button>
}
`}
      </CodeBlock>
    </Box>
  );
}

export default OverviewAbout;
