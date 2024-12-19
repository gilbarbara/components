import { Anchor, Box, H2, H3, Jumbo, Paragraph, Spacer, SVG } from '~';

import Navigation from './Navigation';

import packageJson from '../../../package.json';
import CodeBlock from '../../components/CodeBlock';

export default function Introduction() {
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
          <a href="https://emotion.sh/docs/introduction" rel="noopener noreferrer" target="_blank">
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

      <H2>Exports</H2>

      <Paragraph mb="lg">
        Besides the components, this library has additional exports some that can be useful.
      </Paragraph>

      <H2>Constants</H2>

      <Box mb="md">
        <Paragraph bold>theme</Paragraph>
        <Paragraph mt={0}>The base theme.</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>icons</Paragraph>
        <Paragraph mt={0}>An array with all the icons.</Paragraph>
      </Box>

      <H2>Types</H2>

      <Box mb="md">
        <Paragraph bold>Props</Paragraph>
        <Paragraph mt={0}>All the components typings.</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>Theme</Paragraph>
        <Paragraph mt={0}>The typings of the theme.</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>Types</Paragraph>
        <Paragraph mt={0}>All the shared typings.</Paragraph>
      </Box>

      <H2>Hooks</H2>

      <Box mb="md">
        <Paragraph bold>useImage</Paragraph>
        <Paragraph mt={0}>Load an image and return the load status and image props</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>useTheme</Paragraph>
        <Paragraph mt={0}>Return the current theme and some helpers</Paragraph>
      </Box>

      <H2>Utilities</H2>

      <Box mb="md">
        <Paragraph bold>generatePalette</Paragraph>
        <Paragraph mt={0}>Generate a palette that ranges from 50 to 900.</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>getContainerStyles</Paragraph>
        <Paragraph mt={0}>Add responsive padding to a component.</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>mergeTheme</Paragraph>
        <Paragraph mt={0}>A function to create a new theme with custom tokens.</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>px</Paragraph>
        <Paragraph mt={0}>
          Returns a px string for a number (if the input is already a string just returns it).
        </Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>responsive</Paragraph>
        <Paragraph mt={0}>
          Create media queries based on the <code style={{ color: 'red' }}>breakpoints</code> token.
        </Paragraph>
      </Box>

      <Box mb="md">
        <CodeBlock language="tsx">
          {`\${responsive({
  _: { // "_" is the base
    width: '29rem',
  },
  md: {
    width: '32rem',
  },
})};`}
        </CodeBlock>
      </Box>

      <H2>Animation</H2>

      <Box mb="md">
        <Paragraph bold>animateIcon</Paragraph>
        <Paragraph mt={0}>Animate an element</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>fadeIn</Paragraph>
        <Paragraph mt={0}>keyframes for a fadeIn animation</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>fadeOut</Paragraph>
        <Paragraph mt={0}>keyframes for a fadeOut animation</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>fadeInOut</Paragraph>
        <Paragraph mt={0}>keyframes for a fadeInOut animation</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>horizontalScale</Paragraph>
        <Paragraph mt={0}>keyframes for an horizontal scaling animation</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>rotate</Paragraph>
        <Paragraph mt={0}>keyframes for a rotate animation</Paragraph>
      </Box>

      <H2>Libraries</H2>

      <Box mb="md">
        <Paragraph bold>SVG</Paragraph>
        <Paragraph mt={0}>
          The main export from{' '}
          <Anchor external href="https://github.com/gilbarbara/react-inlinesvg">
            react-inlinesvg
          </Anchor>
        </Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>colorizr</Paragraph>
        <Paragraph mt={0}>
          All exports from{' '}
          <Anchor external href="https://github.com/gilbarbara/colorizr">
            colorizr
          </Anchor>
        </Paragraph>
      </Box>

      <Navigation next="Colors" />
    </Box>
  );
}
