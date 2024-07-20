import { isValidElement, ReactNode } from 'react';
import { Simplify } from '@gilbarbara/types';

import { useTheme } from '~/hooks/useTheme';

import { Box } from '~/components/Box';
import { Collapse, CollapseProps } from '~/components/Collapse/Collapse';
import { Text } from '~/components/Text';

export interface AccordionItemKnownProps
  extends Omit<
    CollapseProps,
    | 'bottomToggle'
    | 'defaultOpen'
    | 'hideHeaderToggle'
    | 'initialHeight'
    | 'maxHeight'
    | 'showBottomToggle'
  > {
  /**
   * Make the accordion item compact.
   */
  compact?: boolean;
  /**
   * Disable the accordion item.
   * @default false
   */
  disabled?: boolean;
  // indicator	IndicatorProps	The accordion item expanded indicator, usually an arrow icon.
  /**
   * Hide the toggle.
   * @default false
   */
  hideToggle?: boolean;
  /**
   * The accordion item id.
   */
  id: string;
  /**
   * The accordion item start content, usually an icon or avatar.
   */
  startContent?: ReactNode;
  /**
   * The accordion item subtitle.
   */
  subtitle?: ReactNode;
  /**
   * The accordion item title.
   */
  title: ReactNode;
}

export type AccordionItemBaseProps = Simplify<AccordionItemKnownProps>;
export type AccordionItemProps = Omit<AccordionItemBaseProps, 'compact' | 'open' | 'onToggle' | ''>;

export function AccordionItemBase(props: AccordionItemBaseProps) {
  const { children, compact, hideToggle, startContent, subtitle, title } = props;

  const { getDataAttributes } = useTheme();

  const content: Record<string, ReactNode> = {
    title: isValidElement(title) ? title : <Text size={compact ? 'md' : 'lg'}>{title}</Text>,
  };

  if (subtitle) {
    content.subtitle = isValidElement(subtitle) ? (
      subtitle
    ) : (
      <Text color="gray.500">{subtitle}</Text>
    );
  }

  if (startContent) {
    content.startContent = isValidElement(startContent) ? (
      startContent
    ) : (
      <span {...getDataAttributes('AccordionItemStartContent')}>{startContent}</span>
    );
  }

  content.header = (
    <Box
      align="center"
      as="span"
      {...getDataAttributes('AccordionItemWrapper')}
      flex
      flexBox
      gap={12}
      py={compact ? undefined : 'xs'}
    >
      {content.startContent}
      <Box as="span" {...getDataAttributes('AccordionItemHeading')} direction="column" flex flexBox>
        {content.title}
        {content.subtitle}
      </Box>
    </Box>
  );

  return (
    <Collapse
      componentName="AccordionItem"
      hideHeaderToggle={hideToggle}
      {...props}
      title={content.header}
    >
      {children}
    </Collapse>
  );
}

export function AccordionItem(props: AccordionItemProps) {
  return <AccordionItemBase {...props} />;
}
