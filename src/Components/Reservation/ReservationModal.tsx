import { Modal, NumberInput, Textarea } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { IconClock } from '@tabler/icons';

interface ReservationModalProps {
  opened: boolean;
  onClose(): void;
}

interface Reservation {
  id: number;
  customerId: number;
  sittingId: number;
  dateTime: string;
  duration: number;
  noGuests: number;
  notes?: string;
}

export default function ReservationModal({
  opened,
  onClose,
}: ReservationModalProps) {
  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title="Create New Reservation"
    >
      <NumberInput
        label="Customer ID"
        // error="Please enter a customer Id."
        withAsterisk
        hideControls
      />
      <NumberInput
        label="Sitting ID"
        // error="Please enter a sitting Id."
        withAsterisk
        hideControls
      />
      <DatePicker
        placeholder="Pick date"
        label="Reservation date"
        withAsterisk
      />
      <TimeInput
        defaultValue={new Date()}
        icon={<IconClock size={16} />}
        label="Pick time"
        // error="Please input a time."
        amLabel="am"
        pmLabel="pm"
        withAsterisk
        clearable
      />
      <NumberInput
        label="Duration (minutes)"
        // error="Please enter a sitting Id."
        withAsterisk
        hideControls
      />
      <NumberInput
        label="Number of guests"
        // error="Please enter a sitting Id."
        withAsterisk
        hideControls
      />
      <Textarea
        placeholder="Notes"
        autosize
        minRows={2}
        maxRows={4}
        label="Additional Notes"
      />
    </Modal>
  );
}
