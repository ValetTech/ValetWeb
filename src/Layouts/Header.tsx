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
import { Link } from 'react-router-dom';
import Logo from '../Assets/Images/Logo/H-LogoLight.png';
import UserButton from '../Components/User/UserButton';

// const useStyles = createStyles((theme) => ({
//   link: {
//     display: 'block',
//     lineHeight: 1,
//     padding: '8px 12px',
//     borderRadius: theme.radius.sm,
//     textDecoration: 'none',
//     color:
//       theme.colorScheme === 'dark'
//         ? theme.colors.dark[0]
//         : theme.colors.gray[7],
//     fontSize: theme.fontSizes.sm,
//     fontWeight: 500,

//     '&:hover': {
//       backgroundColor:
//         theme.colorScheme === 'dark'
//           ? theme.colors.dark[6]
//           : theme.colors.gray[0],
//     },
//   },

//   linkActive: {
//     '&, &:hover': {
//       backgroundColor: theme.fn.variant({
//         variant: 'light',
//         color: theme.primaryColor,
//       }).background,
//       color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
//         .color,
//     },
//   },
// }));

interface HeaderSimpleProps {
  links: { link: string; label: string }[];
}

export default function Header({ links }: HeaderSimpleProps) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <MantineHeader withBorder={false} height={60} mb={120} className="z-10">
      <MediaQuery largerThan="xs" styles={{ placeContent: 'end' }}>
        <Container className="flex items-center h-full">
          <MediaQuery largerThan="xs" styles={{ display: 'none' }}>
            <Group>
              <Burger opened={opened} onClick={toggle} size="sm" />
              <Anchor component={Link} to="/">
                <Image fit="contain" height={40} src={Logo} alt="Valet Logo" />
              </Anchor>
              <Container className="flex items-end h-full">
                <UserButton
                  image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                  name="Harriette Spoonlicker"
                  email="hspoonlicker@outlook.com"
                />
              </Container>
            </Group>
          </MediaQuery>
          {/* Media query below will not display if view is smaller than xs */}
          <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
            <UserButton
              image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
              name="Harriette Spoonlicker"
              email="hspoonlicker@outlook.com"
            />
          </MediaQuery>
        </Container>
      </MediaQuery>
    </MantineHeader>
  );
}
