import { PropsWithChildren } from 'react';

export default function Code({ children }: PropsWithChildren) {
  return (
    <code
      style={{
        backgroundColor: '#d3d3d3',
        fontSize: '85%',
        margin: 0,
        padding: '2px 4px',
        borderRadius: '6px',
      }}
    >
      {children}
    </code>
  );
}
