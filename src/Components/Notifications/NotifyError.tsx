import { showNotification } from '@mantine/notifications';

export default function ErrorNotification(error: string) {
  showNotification({
    id: 'error',
    autoClose: 1500,
    title: 'Something went wrong',
    message: error,
    color: 'red',
  });
}
