import { Modal } from '@mantine/core';
import LoginForm from './LoginForm';

export default function LoginModal({
  modalOpened,
  setModalOpened,
}: {
  modalOpened: boolean;
  setModalOpened: (value: boolean) => void;
}) {
  return (
    <Modal
      centered
      //   closeOnClickOutside={false}
      //   closeOnEscape={false}
      overlayBlur={1}
      trapFocus
      shadow="lg"
      // size="lg"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      withCloseButton={false}
      className="cursor-default"
    >
      <LoginForm setModalOpened={setModalOpened} />
    </Modal>
  );
}
