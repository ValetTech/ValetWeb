import {
  Burger,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Header,
  Menu,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons';
import { useEffect, useState } from 'react';
import Area from '../../Models/Area';
import Sitting from '../../Models/Sitting';
import { getAreasAsync, getSittingsAsync } from '../../Services/ApiServices';
import CreateReservationModal from '../Forms/CreateReservation';
import ErrorNotification from '../Notifications/NotifyError';
import SakeLogo from './SakeLogo';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

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

  linkLabel: {
    marginRight: 5,
  },
}));

interface HeaderActionProps {
  links: {
    link: string;
    label: string;
    links: { link: string; label: string }[];
  }[];
}

export default function HeaderAction({ links }: HeaderActionProps) {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [areasData, setAreasData] = useState<Area[]>([]);
  const [sittingsData, setSittingsData] = useState<Sitting[]>([]);
  const [reservationModalOpened, setReservationModalOpened] = useState(false);

  useEffect(() => {
    getAreasAsync()
      .then((response) => {
        setAreasData(response);
      })
      .catch((error) => {
        ErrorNotification(error.message);
      });
  }, []);

  useEffect(() => {
    getSittingsAsync()
      .then((response) => {
        setSittingsData(response);
      })
      .catch((error) => {
        ErrorNotification(error.message);
      });
  }, []);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={12} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Header mt={100} height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <SakeLogo />
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <Button
          onClick={() => {
            setReservationModalOpened(true);
          }}
        >
          Make a Reservation
        </Button>
        <CreateReservationModal
          opened={reservationModalOpened}
          onClose={() => setReservationModalOpened(false)}
          sittingsData={sittingsData}
          areasData={areasData}
        />
      </Container>
    </Header>
  );
}
