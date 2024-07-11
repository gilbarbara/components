import { Box, Icon, type Props, useTheme } from '~';

import { Icons } from '~/types';

interface InfoProps extends Props.BoxProps {
  icon?: Icons;
  nested?: boolean;
}

export default function Info(props: InfoProps) {
  const { bg, children, color, icon, nested } = props;
  const {
    theme: { darkMode },
  } = useTheme();

  let bgColor = bg ?? undefined;
  let selectedColor = color ?? (darkMode ? 'gray.200' : 'gray.900');

  if (nested) {
    bgColor = bg ?? (darkMode ? 'gray.900' : 'gray.50');
    selectedColor = color ?? (darkMode ? 'gray.400' : 'gray.700');
  }

  return (
    <Box
      align="center"
      bg={bgColor}
      border={{ side: 'all', color: selectedColor }}
      color={selectedColor}
      data-testid={null}
      flexBox
      justify="center"
      maxWidth={640}
      mt="sm"
      padding="xs"
      radius="xs"
      {...props}
    >
      {icon && <Icon mr="xs" name={icon} />}
      <span>{children}</span>
    </Box>
  );
}
