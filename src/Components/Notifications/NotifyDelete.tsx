import { showNotification } from '@mantine/notifications';

export default function DeletedNotification() {
  showNotification({
    id: 'deleted',
    autoClose: 1500,
    message: 'Successfully deleted',
    color: 'green',
  });
}
