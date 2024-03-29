import SyntaxHighlighter, { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { grayScale, spacing } from '~/modules/theme';

const style = { ...atomOneLight };

style.hljs.background = grayScale['40'];
style.hljs.padding = spacing.md;

function CodeBlock(props: SyntaxHighlighterProps) {
  return <SyntaxHighlighter style={atomOneLight} {...props} />;
}

export default CodeBlock;
