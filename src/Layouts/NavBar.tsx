import {
  Anchor,
  Center,
  Container,
  createStyles,
  Image,
  Navbar,
  Stack,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { IconSettings, TablerIcon } from '@tabler/icons';
import { Link, useLocation } from 'react-router-dom';
import LogoLight from '../Assets/Images/Logo/H-LogoDark.png';
import LogoDark from '../Assets/Images/Logo/H-LogoLight.png';
import ToggleColor from '../Components/Buttons/ToggleColorScheme';

const useStyles = createStyles((theme) => ({
  NavBar: {
    // smallerThan="xs" styles={{ display: 'none' }}
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      display: 'none',
    },
  },

  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      margin: '5px 0',
    },
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active: boolean;
  to: string;
  // onClick: () => void;
}

function NavbarLink({
  icon: Icon,
  label,
  to = '/',
  active = false,
}: // onClick = () => {},
NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        component={Link}
        to={to}
        // onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

interface NavbarProps {
  links: {
    icon: TablerIcon;
    label: string;
    link: string;
  }[];
}

export default function Nav({ links }: NavbarProps) {
  const { pathname } = useLocation();
  const colorScheme = useColorScheme();
  const { classes } = useStyles();

  const linksList = links.map((link) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={pathname === link.link}
      to={link.link}
    />
  ));

  return (
    <Container p={0} className={classes.NavBar}>
      <Navbar
        height={750}
        withBorder={false}
        width={{ base: 80 }}
        p="md"
        className="fixed top-0 left-0 z-50 h-full"
      >
        <Center>
          <Anchor component={Link} to="/">
            {colorScheme === 'dark' ? (
              <Image
                fit="contain"
                height={40}
                src={LogoLight}
                alt="Valet Logo"
              />
            ) : (
              <Image
                fit="contain"
                height={40}
                src={LogoDark}
                alt="Valet Logo"
              />
            )}
          </Anchor>
        </Center>
        <Navbar.Section grow mt={50}>
          <Stack justify="center" spacing={0}>
            {linksList}
          </Stack>
        </Navbar.Section>
        <Navbar.Section>
          <Stack justify="center" spacing={0}>
            <NavbarLink
              // onClick={setActive}
              label="Settings"
              icon={IconSettings}
              to="/settings"
              active={pathname === '/settings'}
            />
            <ToggleColor />
          </Stack>
        </Navbar.Section>
      </Navbar>
    </Container>
  );
}
