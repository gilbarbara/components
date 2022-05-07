import is from 'is-lite';

interface Props {
  debug?: boolean;
  name: string;
}

/**
 * Convert primitive to string
 */
function primitiveToString(value: any, key: string): string {
  if (key === 'control') {
    return `{ RHF ${key} }`;
  }

  if (is.function(value)) {
    return '{ Function }';
  }

  if (is.plainObject(value) || is.array(value)) {
    return JSON.stringify(value, null, 2);
  }

  if (is.undefined(value)) {
    return 'undefined';
  }

  return value.toString();
}

function FieldDebug(props: Props) {
  const { debug, name } = props;

  if (!debug) {
    return null;
  }

  return (
    <code style={{ backgroundColor: '#eee', fontSize: 12, padding: 8 }}>
      <h4>{name}</h4>
      {Object.entries(props).map(([key, value]) => (
        <div key={key}>
          <b>{key}</b>: {primitiveToString(value, key)}
        </div>
      ))}
    </code>
  );
}

export default FieldDebug;
