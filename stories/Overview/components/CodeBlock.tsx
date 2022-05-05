import React from 'react';
import SyntaxHighlighter, { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { grayScale, spacing } from '../../../src/modules/theme';

const style = { ...atomOneLight };

style.hljs.background = grayScale['4'];
style.hljs.padding = spacing.md;

function CodeBlock(props: SyntaxHighlighterProps): JSX.Element {
  return <SyntaxHighlighter style={atomOneLight} {...props} />;
}

export default CodeBlock;
