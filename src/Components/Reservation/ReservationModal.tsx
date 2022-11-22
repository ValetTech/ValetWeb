import { Button, Group, Modal, NumberInput, Textarea } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconClock } from '@tabler/icons';
import Customer from '../../Models/Customer';
import Reservation from '../../Models/Reservation';
import Sitting from '../../Models/Sitting';

interface ReservationModalProps {
  opened: boolean;
  onClose(): void;
}

interface ReservationFormValues {
  id: number;
  customer: Customer;
  sitting: Sitting;
  dateTime: Date;
  people: number;
  notes: string;
}

interface ReservationThing {
  id: number;
  customerId: number; // TODO: change to customer object
  sittingId: number; // TODO: change to sitting object
  dateTime: string; // Date picker + time picker
  duration: number; // Number input
  noGuests: number; // Number input
  notes?: string;
}

export default function ReservationModal({
  opened,
  onClose,
}: ReservationModalProps) {
  // const [values, setValues] = useState();
  const form = useForm({
    initialValues: {
      date: new Date(),
      time: new Date(),
      duration: 90,
      guests: 2,
      notes: '',
    },
    validate: (values) => ({
      date: !values.date && 'Date is required',
      time: !values.time && 'Time is required',
      duration: !values.duration && 'Duration is required',
      guests: !values.guests && 'Number of guests is required',
    }),
  });

  function onSubmit(values: Reservation) {
    console.log(values);
  }

  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title="Create New Reservation"
    >
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <NumberInput
          label="Customer ID"
          // error="Please enter a customer Id."
          withAsterisk
          hideControls
          required
          // value={form.values.customerId}
        />
        <NumberInput
          label="Sitting ID"
          // error="Please enter a sitting Id."
          withAsterisk
          hideControls
          required
          // value={form.values.sittingId}
        />
        <DatePicker
          placeholder="Pick date"
          label="Reservation date"
          withAsterisk
          required
          value={form.values.date}
          // onChange={(date) => form.setFieldValue('date', date)}
        />
        <TimeInput
          defaultValue={new Date()}
          icon={<IconClock size={16} />}
          label="Pick time"
          // error="Please input a time."
          format="12"
          // amLabel="am"
          // pmLabel="pm"
          withAsterisk
          clearable
          required
          value={form.values.time}
          // onChange={(time) => form.setFieldValue('time', time)}
        />
        <NumberInput
          label="Duration (minutes)"
          // error="Please enter a sitting Id."
          withAsterisk
          hideControls
          required
          value={form.values.duration}
          // onChange={(duration) => form.setFieldValue('duration', duration)}
        />
        <NumberInput
          label="Number of guests"
          // error="Please enter a sitting Id."
          withAsterisk
          hideControls
          required
          value={form.values.guests}
          // onChange={(guests) => form.setFieldValue('guests', guests)}
        />
        <Textarea
          placeholder="Notes"
          autosize
          minRows={2}
          maxRows={4}
          label="Additional Notes"
          value={form.values.notes}
          // onChange={(notes) => form.setFieldValue('notes', notes)}
        />
        <Group position="right" mt="md">
          <Button className="bg-[#FFB703]" variant="filled" type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
