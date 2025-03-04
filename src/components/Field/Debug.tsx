import { objectEntries, sortByLocaleCompare } from '@gilbarbara/helpers';
import is from 'is-lite';

import { useTheme } from '~/hooks/useTheme';

import { Box } from '~/components/Box';
import { Paragraph } from '~/components/Paragraph';

interface Props {
  debug?: boolean;
}

function FieldDebug(props: Props) {
  const { debug } = props;
  const { getDataAttributes } = useTheme();

  if (!debug) {
    return null;
  }

  return (
    <Box as="code" bg="gray.50" {...getDataAttributes('FieldDebug')} display="block" padding="md">
      {objectEntries(props)
        .filter(([key]) => !['debug', 'theme'].includes(key))
        .sort(sortByLocaleCompare('0'))
        .map(([key, value]) => (
          <Paragraph key={key} mt="xxs">
            <b>{key}</b>: {primitiveToString(value, key)}
          </Paragraph>
        ))}
    </Box>
  );
}

/**
 * Convert primitive to string
 */
function primitiveToString(value: any, key: string): string {
  if (key === 'control') {
    return `{ RHF ${key} }`;
  }

  if (key === 'children') {
    return '{ ReactNode }';
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

FieldDebug.displayName = 'FieldDebug';

export default FieldDebug;
