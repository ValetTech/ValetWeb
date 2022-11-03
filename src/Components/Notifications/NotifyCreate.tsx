import { showNotification } from '@mantine/notifications';

export default function CreatedNotification() {
  showNotification({
    id: 'created',
    autoClose: 1500,
    message: 'Successfully created',
    color: 'green',
  });
}
