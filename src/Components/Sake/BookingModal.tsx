import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';

export default function BookingModal() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Form goes here"
      >
        {/* Modal content */}
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Make a Reservation</Button>
      </Group>
    </>
  );
}
