/* eslint-disable react/require-default-props */
// Lint Rules
// #region
/* eslint-disable react/jsx-props-no-spreading */
// #endregion

import {
  Button,
  Group,
  Input,
  Modal,
  NumberInput,
  Select,
  Switch,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconAt,
  IconNews,
  IconPencil,
  IconPhone,
  IconUser,
} from '@tabler/icons';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import Area from '../../Models/Area';
import Reservation from '../../Models/Reservation';
import Sitting from '../../Models/Sitting';
import { createReservationAsync } from '../../Services/ApiServices';
import CreatedNotification from '../Notifications/NotifyCreate';
import ErrorNotification from '../Notifications/NotifyError';
import { BasicDateTimePickerNew } from './DateTimePicker';

interface CreateReservationModalProps {
  opened: boolean;
  onClose(): void;
  sittingsData: Sitting[];
  areasData: Area[];
  sitting?: Sitting;
  area?: Area;
}

export default function CreateReservationModal({
  opened,
  onClose,
  areasData,
  sittingsData,
  sitting = undefined,
  area = undefined,
}: CreateReservationModalProps) {
  const sources = ['InPerson', 'Email', 'Phone', 'Website'];
  const [loading, setLoading] = useState(false);

  const [reservationDetails, setReservationDetails] = useState<Reservation>({
    customer: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    sittingId: sitting?.id ?? undefined,
    areaId: area?.id ?? undefined,
    dateTime: dayjs().toISOString(),
    duration: 90,
    noGuests: 1,
    source: 'InPerson',
    status: 'Pending',
    notes: '',
  });

  const form = useForm<Reservation>({
    initialValues: {
      ...reservationDetails,
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

    const reservation: Reservation = {
      ...reservationDetails,
      sittingId: sitting?.id ?? reservationDetails.sittingId,
      areaId: area?.id ?? reservationDetails.areaId,
      dateTime: reservationDetails.dateTime,
    };

    createReservationAsync(reservation)
      .then(() => {
        onClose();
        CreatedNotification();
      })
      .catch((error) => {
        ErrorNotification(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title="Create New Reservation"
      size="auto"
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <div className="w-full flex flex-col flex-grow space-y-2 ">
          <div className="flex flex-row space-x-2">
            <TextInput
              label="First Name"
              icon={<IconUser />}
              placeholder="First Name"
              value={reservationDetails?.customer?.firstName?.toString() ?? ''}
              onChange={(event) =>
                setReservationDetails({
                  ...reservationDetails,
                  customer: {
                    ...reservationDetails.customer,
                    firstName: event.currentTarget.value,
                  },
                })
              }
              className="w-1/2"
            />
            <TextInput
              label="Last Name"
              icon={<IconUser />}
              withAsterisk
              required
              placeholder="Last Name"
              value={reservationDetails?.customer?.lastName?.toString() ?? ''}
              onChange={(event) =>
                setReservationDetails({
                  ...reservationDetails,
                  customer: {
                    ...reservationDetails.customer,
                    lastName: event.currentTarget.value,
                  },
                })
              }
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
                value={reservationDetails.customer?.phone}
                onChange={(event) =>
                  setReservationDetails({
                    ...reservationDetails,
                    customer: {
                      ...reservationDetails.customer,
                      phone: event.currentTarget.value.replace(/\s/g, ''),
                    },
                  })
                }
              />
            </Input.Wrapper>
            <TextInput
              label="Email"
              icon={<IconAt />}
              placeholder="Your email"
              value={reservationDetails.customer?.email}
              onChange={(event) =>
                setReservationDetails({
                  ...reservationDetails,
                  customer: {
                    ...reservationDetails.customer,
                    email: event.currentTarget.value,
                  },
                })
              }
              className="w-1/2"
            />
          </div>
          <div className=" w-full space-x-2 flex flex-row flex-grow justify-around ">
            <Input.Wrapper label="Time" required className="w-1/2">
              <Input
                component={BasicDateTimePickerNew}
                value={dayjs(reservationDetails.dateTime)}
                onChange={(value) => {
                  form.clearFieldError('dateTime');
                  setReservationDetails({
                    ...reservationDetails,
                    dateTime: value.toISOString(),
                  });
                }}
                // Add min and max
                rounded
                minDate={dayjs().add(-1, 'hour').toISOString()}
                error={form.errors.dateTime}
              />
            </Input.Wrapper>
            <Select
              data={sources}
              placeholder="Select source"
              searchable
              label="Source"
              icon={<IconNews />}
              withAsterisk
              {...form.getInputProps('source')}
              value={reservationDetails.source ?? ''}
              onChange={(value) => {
                form.clearFieldError('source');

                setReservationDetails({
                  ...reservationDetails,
                  source: value ?? 'InPerson',
                });
              }}
              className="w-1/2"
            />
          </div>

          <div className="flex flex-row space-x-2">
            <Select
              data={sittingsData.map((s) => ({
                label: s.title ?? s.type,
                value: s.id?.toString(),
                group: s.type,
              }))}
              placeholder="Select sitting"
              searchable
              label="Sitting"
              icon={<IconPencil />}
              withAsterisk
              {...form.getInputProps('sittingId')}
              value={
                sitting?.id?.toString() ??
                reservationDetails.sitting?.id?.toString()
              }
              onChange={(value) => {
                form.clearFieldError('sittingId');

                setReservationDetails({
                  ...reservationDetails,
                  sittingId: Number(value) ?? 0,
                });
              }}
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
              label="Area"
              icon={<IconPencil />}
              withAsterisk
              {...form.getInputProps('areaId')}
              value={
                area?.id?.toString() ?? reservationDetails.area?.id?.toString()
              }
              onChange={(value) =>
                setReservationDetails({
                  ...reservationDetails,
                  areaId: Number(value) ?? 0,
                })
              }
            />
          </div>
          <div className="w-full flex flex-row flex-grow space-x-2">
            <NumberInput
              label="Duration"
              icon={<IconPencil />}
              withAsterisk
              required
              min={15}
              max={120}
              step={15}
              {...form.getInputProps('duration')}
              value={reservationDetails.duration}
              onChange={(value) =>
                setReservationDetails({
                  ...reservationDetails,
                  duration: value ?? 15,
                })
              }
              formatter={(value) =>
                !Number.isNaN(Number(value) ?? 15)
                  ? `${value} mins`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : ' '
              }
            />
            <NumberInput
              label="Number of Guests"
              icon={<IconPencil />}
              withAsterisk
              required
              min={1}
              {...form.getInputProps('noGuests')}
              value={reservationDetails.noGuests}
              onChange={(value) =>
                setReservationDetails({
                  ...reservationDetails,
                  noGuests: value ?? 1,
                })
              }
            />
          </div>
          <Textarea
            autosize
            maxRows={4}
            label="Notes"
            icon={<IconPencil />}
            placeholder="Notes"
            value={reservationDetails.notes}
            onChange={(event) =>
              setReservationDetails({
                ...reservationDetails,
                notes: event.currentTarget.value,
              })
            }
          />
          <Switch
            label={reservationDetails.customer?.isVip ? 'VIP' : 'Not VIP'}
            checked={reservationDetails.customer?.isVip?.toString() === 'true'}
            onChange={(value) =>
              setReservationDetails({
                ...reservationDetails,
                customer: {
                  ...reservationDetails.customer,
                  isVip: value.currentTarget.checked,
                },
              })
            }
          />
        </div>
        <Group mt={20} position="center">
          <Button
            className="bg-[#FFB703]"
            variant="outline"
            type="button"
            size="lg"
            onClick={() => {
              form.reset();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button className="bg-[#FFB703]" type="submit" size="lg">
            Create
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
