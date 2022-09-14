import { showNotification } from '@mantine/notifications';

export default function UpdatedNotification() {
  showNotification({
    id: 'updated',
    autoClose: 1500,
    message: 'Successfully updated',
    color: 'green',
  });
}
