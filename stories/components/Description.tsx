import { Box, type Props } from '~';

import { ColorVariantTones } from '~/types';

interface DescriptionProps extends Props.BoxProps {
  borderColor?: ColorVariantTones;
  intro?: boolean;
}

export default function Description(props: DescriptionProps) {
  const { borderColor = 'gray.500', intro, maxWidth = 640, ...rest } = props;

  return (
    <Box
      border={{ side: 'all', color: borderColor }}
      data-testid={null}
      maxWidth={maxWidth}
      mb={intro ? 'lg' : undefined}
      mt={intro ? undefined : 'lg'}
      padding="sm"
      radius="sm"
      style={{ lineHeight: 1.4 }}
      textAlign="center"
      {...rest}
    />
  );
}
