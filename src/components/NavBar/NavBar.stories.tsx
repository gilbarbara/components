import { MouseEvent } from 'react';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import {
  expect,
  fireEvent,
  fn,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@storybook/test';

import { Anchor, Box, Button, Icon, Paragraph } from '~';

import { scrollTo } from '~/modules/animations';

import { colorProps, hideProps } from '~/stories/__helpers__';

import {
  NavBar,
  NavBarBrand,
  NavBarContent,
  NavBarItem,
  NavBarMenu,
  NavBarMenuItem,
  NavBarMenuToggle,
} from './index';
import { defaultProps } from './useNavBar';

type Story = StoryObj<typeof NavBar>;

export default {
  title: 'Components/NavBar',
  // category: 'Content',
  component: NavBar,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['bg', 'color']),
  },
  parameters: {
    align: 'start',
    padding: 0,
    maxWidth: 'none',
  },
} satisfies Meta<typeof NavBar>;

export const Basic: Story = {
  render: function Render(props) {
    const handleClick = (event: MouseEvent) => {
      event.preventDefault();

      action('click')(event.currentTarget.textContent);
    };

    const links = ['Dashboard', 'About Us', 'News', 'Contact'];

    return (
      <>
        <NavBar {...props}>
          <NavBarContent>
            <NavBarMenuToggle hideBreakpoint="md" />
            <NavBarBrand gap="xs">
              <Icon name="storybook" />
              Storybook
            </NavBarBrand>
          </NavBarContent>
          <NavBarContent justify="center" showBreakpoint="md">
            {links.map(d => (
              <NavBarItem key={d}>
                <Anchor bold={d === 'Dashboard'} href="#" onClick={handleClick}>
                  {d}
                </Anchor>
              </NavBarItem>
            ))}
          </NavBarContent>
          <NavBarContent justify="end">
            <Button onClick={handleClick} size="sm">
              Sign up
            </Button>
          </NavBarContent>
          <NavBarMenu>
            {links.map(d => (
              <NavBarMenuItem key={d}>
                <Anchor bold={d === 'Dashboard'} href="#" onClick={handleClick}>
                  {d}
                </Anchor>
              </NavBarMenuItem>
            ))}
          </NavBarMenu>
        </NavBar>
        <Box p="md">
          <Paragraph>
            Do mollit nulla minim non culpa. Elit aliquip commodo duis ad Lorem deserunt nostrud
            exercitation. Amet duis ipsum deserunt amet qui officia veniam nisi adipisicing. Duis
            excepteur non ipsum consequat magna et.
          </Paragraph>

          <Paragraph>
            Cillum irure magna nulla minim adipisicing incididunt. Lorem est mollit dolor anim enim
            id velit aliquip veniam ea tempor. Et officia incididunt minim sunt aute occaecat anim
            elit sint. Esse id ipsum voluptate veniam ullamco et incididunt deserunt. Do sint ad
            reprehenderit in irure laboris adipisicing dolor officia velit fugiat anim aliqua sit
            dolore. Labore fugiat et sint deserunt elit eiusmod magna mollit ullamco enim.
          </Paragraph>

          <Paragraph>
            Nulla eiusmod cillum commodo proident dolor ea. Lorem tempor qui cillum. Et officia do
            esse eiusmod nostrud culpa mollit deserunt. Aute voluptate fugiat ipsum nulla culpa
            ullamco excepteur ut. Tempor ea incididunt aliqua sit consectetur fugiat ex exercitation
            proident adipisicing labore eu exercitation do veniam. Est veniam culpa veniam
            exercitation nulla nisi. Consequat occaecat officia est ex ut Lorem officia tempor.
          </Paragraph>

          <Paragraph>
            Veniam esse aute ullamco consequat ad ut laborum fugiat pariatur laboris. Duis aliqua
            nisi nulla do commodo dolor labore ullamco. Do ut Lorem ut ex nulla nulla esse proident
            consectetur velit duis nostrud aliquip aute. Esse nostrud sint amet adipisicing ex aute
            Lorem culpa. Aute laborum enim quis occaecat in enim adipisicing nulla in ipsum commodo
            eiusmod occaecat officia. Ut dolore mollit nisi nisi eu do anim labore.
          </Paragraph>

          <Paragraph>
            Excepteur id voluptate consectetur consectetur. Eiusmod Lorem nostrud occaecat voluptate
            nisi reprehenderit pariatur excepteur deserunt proident. Magna aute officia pariatur
            sunt culpa ipsum incididunt officia reprehenderit minim. In reprehenderit esse culpa
            dolore cupidatat irure culpa nostrud laboris. Aliquip aliquip dolor duis laboris sit
            irure deserunt qui magna non fugiat tempor. Sit in laborum reprehenderit aute esse
            nostrud voluptate qui in mollit occaecat irure magna nisi esse. In amet dolor non
            pariatur.
          </Paragraph>

          <Paragraph>
            Aliquip quis culpa magna laboris velit est. Cillum quis commodo aute culpa qui magna
            cillum commodo adipisicing voluptate. Lorem ex nostrud ullamco consequat reprehenderit
            cillum aliquip. Nisi ullamco nisi do mollit exercitation ipsum et nostrud anim irure.
            Reprehenderit reprehenderit excepteur et tempor magna aliqua minim irure do amet nostrud
            commodo.
          </Paragraph>

          <Paragraph>
            Eu aliquip elit nisi. Exercitation elit in officia voluptate laborum sint tempor.
            Laborum excepteur ipsum incididunt labore ipsum anim officia ad magna ex est voluptate
            consectetur in non. Elit velit eu enim enim eu excepteur commodo. Est consequat
            excepteur do labore adipisicing consectetur aliqua cillum. Nostrud esse reprehenderit
            laborum enim elit enim commodo proident reprehenderit est. Cillum culpa sint minim ea ad
            pariatur et.
          </Paragraph>

          <Paragraph>
            Nulla dolor ullamco in Lorem proident. In magna adipisicing non. Quis elit et veniam
            dolore esse ex est labore excepteur. Labore pariatur eiusmod consectetur aliquip esse
            laboris deserunt aliqua dolore qui aute culpa. Quis Lorem dolore ullamco et velit
            laboris. Enim veniam do ut ullamco et fugiat laboris excepteur deserunt.
          </Paragraph>

          <Paragraph>
            Ex in nostrud enim ex labore duis magna. Nisi do sint irure reprehenderit sit ea
            voluptate sunt. Sint nulla culpa deserunt. Consectetur ullamco non consequat ipsum
            eiusmod dolore excepteur. Irure non do sint do dolor occaecat nostrud aute aliqua. Qui
            exercitation ullamco sint magna ea est enim amet sit. Elit deserunt cupidatat esse sit.
            Officia magna est non sint laboris nostrud mollit pariatur dolor labore aliquip ea
            officia tempor sint.
          </Paragraph>

          <Paragraph>
            Minim esse non ea aliqua commodo id ipsum excepteur ea sint. Fugiat sunt aute ipsum
            cillum et. Velit est minim consequat adipisicing dolor duis Lorem magna Lorem nostrud
            dolor aute. Dolor irure ad eiusmod ullamco. Incididunt voluptate consectetur ex qui sint
            fugiat reprehenderit non elit amet ad duis nulla aliquip officia. Sit culpa culpa
            cupidatat quis dolore sit nisi excepteur in voluptate aliqua ipsum deserunt.
          </Paragraph>

          <Paragraph>
            Sunt do cillum aliqua incididunt. Laboris pariatur ea et ea commodo et consequat fugiat
            sint amet. Elit labore ea est. Minim minim officia ut est veniam ullamco.
          </Paragraph>

          <Paragraph>
            Anim exercitation officia aliquip ea nisi adipisicing ipsum quis proident. Cupidatat
            cillum laboris laborum enim non ut aliqua officia. Occaecat tempor laborum duis irure
            sit duis ex labore proident in. Excepteur qui nisi nulla incididunt dolore voluptate ut
            ut voluptate consectetur. Elit culpa enim proident elit anim sit consequat eiusmod
            commodo nisi amet sint nisi excepteur. Est qui velit aliqua aute mollit dolore voluptate
            deserunt sit sint ea nostrud. Eu eiusmod Lorem commodo ipsum voluptate cupidatat id ea
            consectetur.
          </Paragraph>
        </Box>
      </>
    );
  },
};

export const Tests: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    bg: 'pink',
    hideOnScroll: true,
    onToggleMenu: fn(),
    onScrollPosition: fn(),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  render: Basic.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('NavBar');

    // Scroll
    await expect(canvas.getByTestId('NavBar')).toHaveAttribute('data-hidden', 'false');
    await scrollTo(300);

    await waitFor(() => {
      expect(canvas.getByTestId('NavBar')).toHaveAttribute('data-hidden', 'true');
    });

    await scrollTo(-100);

    await waitFor(() => {
      expect(canvas.getByTestId('NavBar')).toHaveAttribute('data-hidden', 'false');
    });

    // Toggle

    expect(canvas.getByTestId('NavBarMenuToggle')).toHaveAttribute('data-open', 'false');
    await fireEvent.click(canvas.getByLabelText('Toggle Menu'));

    await waitFor(() => {
      expect(canvas.getByTestId('NavBarMenuToggle')).toHaveAttribute('data-open', 'true');
    });

    await waitFor(() => {
      expect(screen.getByTestId('NavBarMenu')).toBeInTheDocument();
    });
    await expect(screen.getAllByTestId('NavBarMenuItem')).toHaveLength(4);

    await fireEvent.click(canvas.getByLabelText('Toggle Menu'));
    await waitFor(() => {
      expect(canvas.getByTestId('NavBarMenuToggle')).toHaveAttribute('data-open', 'false');
    });

    await waitForElementToBeRemoved(() => screen.queryByTestId('NavBarMenu'));
  },
};
