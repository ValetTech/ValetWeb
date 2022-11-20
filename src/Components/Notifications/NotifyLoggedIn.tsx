import { showNotification } from '@mantine/notifications';

export default function LoggedInNotification() {
  showNotification({
    id: 'loggedIn',
    autoClose: 1500,
    message: 'Successfully logged in',
    color: 'green',
  });
}
