import {
  Anchor,
  Burger,
  Container,
  createStyles,
  Group,
  Header as MantineHeader,
  Image,
  MediaQuery,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assets/Images/Logo/H-LogoLight.png';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
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

interface HeaderSimpleProps {
  links: { link: string; label: string }[];
}

export default function Header({ links }: HeaderSimpleProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Anchor
      key={link.label}
      component={Link}
      to={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={() => {
        setActive(link.link);
      }}
    >
      {link.label}
    </Anchor>
  ));
  return (
    <MantineHeader
      withBorder={false}
      height={60}
      mb={120}
      // pl={80}
      className="z-10"
    >
      <MediaQuery largerThan="xs" styles={{ placeContent: 'end' }}>
        <Container className="flex items-center h-full">
          <MediaQuery largerThan="xs" styles={{ display: 'none' }}>
            <Group>
              <Burger opened={opened} onClick={toggle} size="sm" />
              <Anchor component={Link} to="/">
                <Image fit="contain" height={40} src={Logo} alt="Valet Logo" />
              </Anchor>
            </Group>
          </MediaQuery>
          <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
            <Group spacing={5}>{items}</Group>
          </MediaQuery>
        </Container>
      </MediaQuery>
    </MantineHeader>
  );
}
