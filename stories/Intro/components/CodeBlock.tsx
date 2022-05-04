import React from 'react';
import SyntaxHighlighter, { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function CodeBlock(props: SyntaxHighlighterProps): JSX.Element {
  return <SyntaxHighlighter style={atomOneLight} {...props} />;
}

export default CodeBlock;
