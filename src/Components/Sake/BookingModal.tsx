/* eslint-disable react/jsx-no-bind */
import {
  Button,
  Group,
  Indicator,
  Input,
  Modal,
  NumberInput,
  Select,
  Stepper,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import {
  IconAt,
  IconCalendar,
  IconCalendarEvent,
  IconClock,
  IconMeat,
  IconPencil,
  IconPhone,
  IconSelect,
  IconToolsKitchen2,
  IconUser,
  IconUsers,
} from '@tabler/icons';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import Area from '../../Models/Area';
import Reservation from '../../Models/Reservation';
import Sitting from '../../Models/Sitting';
import { createReservationAsync } from '../../Services/ApiServices';
import CreatedNotification from '../Notifications/NotifyCreate';

interface BookingModalProps {
  opened: boolean;
  onClose: () => void;
  areasData: Area[];
  sittingsData: Sitting[];
}

export default function BookingModal({
  opened,
  onClose,
  areasData,
  sittingsData,
}: BookingModalProps) {
  const [loading, setLoading] = useState(false);
  const [dateTime, setDateTime] = useState<Dayjs>(dayjs());
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const form = useForm<Reservation>({
    initialValues: {
      customer: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      sittingId: undefined,
      areaId: undefined,
      dateTime: dayjs().toISOString(),
      duration: 90,
      noGuests: 1,
      source: 'Website',
      status: 'Pending',
      notes: '',
    },
    // validate: {
    //   customer: {
    //     lastName: (value) =>
    //       value.length < 2 ? 'Please provide a valid first name' : null,
    //     phone: (value) =>
    //       value.length < 10 ? 'Please provide a valid phone number' : null,
    //     email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    //   },
    //   dateTime: (value) => (value != null ? 'Please enter a valid date' : null),
    //   sittingId: (value) => (value < 1 ? 'Please select a Sitting' : null),
    //   areaId: (value) => (value < 1 ? 'Please select an Area' : null),
    //   source: (value) => (value < 1 ? 'Please select a Source' : null),
    //   duration: (value) =>
    //     value < 15 ? 'Please enter a valid duration' : null,
    //   noGuests: (value) =>
    //     value < 1 ? 'Please enter a valid number of guests' : null,
    // },
  });

  // Name of sitting will be displayed in select, but it will return the ID number.

  function onSubmit() {
    setLoading(true);
    const reservation = {
      ...form.values,
      customer: {
        ...form.values.customer,
        phone: form.values.customer.phone.replace(/\s/g, ''),
      },
    };
    // const reservation: Reservation = {
    //   ...reservationDetails,
    //   sittingId: sitting?.id ?? reservationDetails.sittingId,
    //   areaId: area?.id ?? reservationDetails.areaId,
    //   dateTime: reservationDetails.dateTime,
    // };

    createReservationAsync(reservation)
      .then(() => {
        onClose();
        CreatedNotification();
      })
      .catch((error) => {
        // ErrorNotification(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onChange(value: Date) {
    setDateTime(dayjs(value));
    form.setFieldValue('dateTime', value.toISOString());
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      transition="fade"
      transitionDuration={600}
      transitionTimingFunction="ease"
      title="Book a table"
      trapFocus
      size="lg"
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stepper
          color="#FFB703"
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
        >
          <Stepper.Step
            label="First step"
            description="Create an account"
            allowStepSelect={active > 0}
            icon={<IconCalendarEvent size={18} />}
          >
            <div className="select-none items-center space-y-3">
              <DatePicker
                label="When would you like to book for?"
                placeholder="Pick a date"
                icon={<IconCalendar />}
                minDate={dayjs().toDate()}
                allowFreeInput={false}
                dateParser={(dateString) => new Date(Date.parse(dateString))}
                value={dateTime.toDate()}
                onChange={onChange}
                clearable={false}
                renderDay={(date) => {
                  const day = date.getDate();
                  return (
                    <Indicator
                      size={6}
                      color="red"
                      offset={8}
                      disabled={day !== 16}
                    >
                      <div>{day}</div>
                    </Indicator>
                  );
                }}
              />
              <Select
                placeholder="Choose a dining area"
                data={
                  areasData.map((a) => ({
                    label: a.name,
                    value: a.id?.toString() ?? '',
                  })) ?? []
                }
                label="Where would you like to sit?"
                icon={<IconToolsKitchen2 />}
                {...form.getInputProps('areaId')}
              />
              <div className="w-full flex flex-col xs:flex-row flex-grow space-x-2">
                <NumberInput
                  className="w-full"
                  label="How long would you like to stay?"
                  icon={<IconClock />}
                  min={15}
                  max={120}
                  step={15}
                  formatter={(value) =>
                    !Number.isNaN(Number(value) ?? 15)
                      ? `${value} minutes`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      : ' '
                  }
                  {...form.getInputProps('duration')}
                />
                <NumberInput
                  className="w-full"
                  label="How many would you like to book for?"
                  icon={<IconUsers />}
                  min={1}
                  formatter={(value) =>
                    !Number.isNaN(Number(value) ?? 1) && Number(value) === 1
                      ? `${value} guest`
                      : `${value} guests`
                  }
                  {...form.getInputProps('noGuests')}
                />
              </div>
            </div>
          </Stepper.Step>
          <Stepper.Step
            label="Second step"
            description="Verify email"
            allowStepSelect={active > 1}
            icon={<IconMeat size={18} />}
          >
            <div className="flex flex-col space-y-2">
              <Select
                data={sittingsData.map((s) => ({
                  label: s.title ?? s.type,
                  value: s.id?.toString(),
                  group: s.type,
                }))}
                placeholder="Select the type of sitting"
                searchable
                label="Please select from our available sittings"
                icon={<IconSelect />}
                {...form.getInputProps('sittingId')}
              />
              <Select
                searchable
                placeholder="Select area"
                data={
                  areasData.map((a) => ({
                    label: a.name,
                    value: a.id?.toString() ?? '',
                  })) ?? []
                }
                label="What time would you like to book for?"
                icon={<IconClock />}
                {...form.getInputProps('dateTime')}
              />
            </div>
          </Stepper.Step>
          <Stepper.Step
            label="Final step"
            description="Get full access"
            allowStepSelect={active > 2}
            icon={<IconUser size={18} />}
          >
            <div className="flex flex-row space-x-2">
              <TextInput
                label="First Name"
                icon={<IconUser />}
                placeholder="First Name"
                {...form.getInputProps('customer.firstName')}
                className="w-1/2"
              />
              <TextInput
                label="Last Name"
                icon={<IconUser />}
                withAsterisk
                required
                placeholder="Last Name"
                {...form.getInputProps('customer.lastName')}
                className="w-1/2"
              />
            </div>
            <div className="flex flex-row space-x-2">
              <Input.Wrapper label="Phone number" required className="w-1/2">
                <Input
                  component={InputMask}
                  icon={<IconPhone />}
                  mask="+(99) 999 999 999"
                  placeholder="Your phone number"
                  {...form.getInputProps('customer.phone')}
                />
              </Input.Wrapper>
              <TextInput
                label="Email"
                icon={<IconAt />}
                placeholder="Your email"
                {...form.getInputProps('customer.email')}
                className="w-1/2"
              />
            </div>
            <Textarea
              autosize
              maxRows={4}
              label="Notes"
              icon={<IconPencil />}
              placeholder="Notes"
              {...form.getInputProps('notes')}
            />
          </Stepper.Step>
          <Stepper.Completed>
            <div>
              <div className="text-2xl font-bold text-center">
                Please confirm your booking
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">
                  {dateTime.format('h:mm a')} -{' '}
                  {dateTime.format('dddd, MMMM DD YYYY')}
                </div>
                <div className="text-lg font-bold">
                  {form.values.areaId
                    ? areasData.find((a) => a.id === form.values.areaId)?.name
                    : 'No area selected'}
                </div>
                <div className="text-lg font-bold">
                  {form.values.sittingId
                    ? sittingsData.find((s) => s.id === form.values.sittingId)
                        ?.title
                    : 'No sitting selected'}
                </div>
                <div className="text-lg font-bold">
                  {form.values.duration} minutes - {form.values.noGuests} guests
                </div>
                <div className="text-lg font-bold">
                  {form.values.customer.firstName}{' '}
                  {form.values.customer.lastName}
                </div>
                <div className="text-lg font-bold">
                  {form.values.customer.phone}
                </div>
                <div className="text-lg font-bold">
                  {form.values.customer.email}
                </div>
                <div className="text-lg font-bold">{form.values.notes}</div>
              </div>
            </div>
          </Stepper.Completed>
        </Stepper>
        <Group mt={20} position="center">
          {active === 0 ? (
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                form.reset();
                onClose();
              }}
            >
              Cancel
            </Button>
          ) : (
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
          )}
          {active === 3 ? (
            <div>
              <Button className="bg-[#FFB703]" type="submit" size="lg">
                Confirm
              </Button>
            </div>
          ) : (
            <div>
              <Button className="bg-[#FFB703]" onClick={nextStep}>
                Next step
              </Button>
            </div>
          )}
        </Group>
      </form>
    </Modal>
  );
}
