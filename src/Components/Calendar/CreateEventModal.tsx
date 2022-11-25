/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  Checkbox,
  Collapse,
  Group,
  Input,
  LoadingOverlay,
  Modal,
  MultiSelect,
  NumberInput,
  Paper,
  SegmentedControl,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import Area from '../../Models/Area';
import Sitting from '../../Models/Sitting';
import {
  createSittingAsync,
  getSittingTypesAsync,
  updateSittingAsync,
} from '../../Services/ApiServices';
import CustomRadioButton from '../Buttons/CustomRadioButton';
import { BasicDateTimePickerNew } from '../Forms/DateTimePicker';
import CreatedNotification from '../Notifications/NotifyCreate';
import ErrorNotification from '../Notifications/NotifyError';
import UpdatedNotification from '../Notifications/NotifyUpdate';

export interface Rrule {
  freq?: string;
  interval?: number;
  byweekday?: number[];
  until?: Date;
  count?: number;
}

export enum StopCondition {
  never = 'never',
  until = 'until',
  count = 'count',
}

// USE UTC
export default function CreateEventModal({
  show,
  handleClose,
  handleShow,
  setEvent,
  event,
  areas,
}: any) {
  const [types, setTypes] = useState<string[]>([
    'Breakfast',
    'Lunch',
    'Dinner',
    'Special',
  ]);
  const [rrule, setRrule] = useState<Rrule>({
    freq: 'none',
    interval: 1,
    byweekday: [dayjs().day()],
    until: dayjs().add(1, 'week').toDate(),
    count: 1,
  });
  const [recurType, setRecurType] = useState<StopCondition>(
    StopCondition.never
  );
  const [eventData, setEventData] = useState<any>(
    event?.event?.extendedProps?.data
  );
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs>(dayjs().add(1, 'hour'));
  const [eventAreas, setEventAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  function RoundTime(date: Date) {
    return dayjs(date).minute(
      (Math.round(dayjs(date).minute() / 15) * 15) % 60
    );
  }

  const form = useForm({
    initialValues: {
      sitting: {
        id: eventData?.id ?? null,
        title: eventData?.title ?? '',
        capacity: eventData?.capacity ?? 1,
        type: eventData?.type ?? '',
        startTime: eventData?.startTime ?? startDate.toDate(),
        endTime: eventData?.endTime ?? endDate.toDate(),
        venueId: eventData?.venueId ?? 1,
        groupId: eventData?.groupId ?? null,
        areaIds: eventData?.areas ?? [event?.event?.resource?.id] ?? [],
      },
      rrule: {
        freq: rrule.freq ?? 'none',
        interval: rrule.interval ?? 1,
        byweekday: rrule.byweekday ?? [dayjs().day()],
        until: rrule.until ?? dayjs().add(1, 'week').toDate(),
        count: rrule.count ?? 1,
      },
    },
  });
  useEffect(() => {
    setStartDate(dayjs(event?.start));
    setEndDate(dayjs(event?.end));
    setIsUpdate(event?.event?.extendedProps?.data?.id !== undefined);
    setEventAreas([event?.resource?.id.toString()]);
  }, [event]);

  // const getTypes = useMemo(async () => await getSittingTypesAsync(), [types]);
  useEffect(() => {
    getSittingTypesAsync().then((data) => {
      setTypes(data);
    });
  }, []);

  // useEffect(() => {
  //   // form.setFieldValue('sitting.id', event?.event?.id ?? 0);
  //   // form.setFieldValue('sitting.title', event?.event?.title);

  //   form.setValues({
  //     sitting: {
  //       id: event?.event?.id ?? null,
  //       title: event?.event?.title ?? '',
  //       capacity: event?.event?.capacity ?? 1,
  //       type: event?.event?.type ?? '',
  //       startTime: event?.event?.startime ?? dayjs().toDate(),
  //       endTime: event?.event?.endTime ?? dayjs().add(1, 'hour').toDate(),
  //       venueId: event?.event?.venueId ?? 1,
  //       groupId: event?.event?.groupId ?? null,
  //       areaIds:
  //         event?.event?.areas?.map((a: Area) => a.id?.toString()) ?? [
  //           event?.event?.resource?.id,
  //         ] ??
  //         [],
  //     },
  //     rrule: {
  //       freq: rrule.freq ?? 'none',
  //       interval: rrule.interval ?? 1,
  //       byweekday: rrule.byweekday ?? [dayjs().day()],
  //       until: rrule.until ?? dayjs().add(1, 'week').toDate(),
  //       count: rrule.count ?? 1,
  //     },
  //   });
  //   // console.log('Form values: ', form.values);
  // }, [event]);

  useEffect(() => {
    // form.setFieldValue('sitting.id', event?.event?.id ?? 0);
    // form.setFieldValue('sitting.title', event?.event?.title);
    // console.log('Form values: ', form.values);
    setEventData(event?.event?.extendedProps?.data);
  }, [event]);

  useEffect(() => {
    form.setValues({
      sitting: {
        id: eventData?.id ?? null,
        title: eventData?.title ?? eventData?.type ?? '',
        capacity: eventData?.capacity ?? 1,
        type: eventData?.type ?? '',
        startTime: RoundTime(eventData?.startTime).toDate() ?? dayjs().toDate(),
        endTime:
          RoundTime(eventData?.endTime).toDate() ??
          dayjs().add(1, 'hour').toDate(),
        venueId: eventData?.venueId ?? 1,
        groupId: eventData?.groupId ?? null,
        areaIds: eventData?.areas.map((a: Area) => a.id?.toString()) ?? [],
      },
      rrule: {
        freq: rrule.freq ?? 'none',
        interval: rrule.interval ?? 1,
        byweekday: rrule.byweekday ?? [dayjs().day()],
        until: rrule.until ?? dayjs().add(1, 'week').toDate(),
        count: rrule.count ?? 1,
      },
    });
    setStartDate(RoundTime(eventData?.startTime));
    setEndDate(RoundTime(eventData?.endTime));

    setIsUpdate(eventData?.id !== null);

    setEventAreas(eventData?.areas?.map((a: Area) => a.id?.toString()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventData]);

  // ?????????????????????
  const handleRecurTypeChange = (value: StopCondition) => {
    setRecurType(value);
    if (value === StopCondition.never) {
      setRrule({ ...rrule, freq: 'none' });
    } else if (value === StopCondition.until) {
      setRrule({
        ...rrule,
        freq: 'weekly',
        until: dayjs().add(1, 'week').toDate(),
      });
    } else if (value === StopCondition.count) {
      setRrule({ ...rrule, freq: 'weekly', count: 1 });
    }
  };

  // useEffect(() => {
  //   console.log(rrule);
  // }, [rrule]);

  function handleCreateType(query: string) {
    // const item = { value: query, label: query };
    setTypes([...types, query]);
    return query;
  }

  function onSubmit(values) {
    const sitting: Sitting = {
      ...values.sitting,
      startDate: RoundTime(startDate).toDate(),
      endDate: RoundTime(endDate).toDate(),
      areaIds: eventAreas,
      groupId: values.sitting.groupId ?? null,
    };
    console.log(sitting);
    setLoading(true);
    if (values.sitting.id) {
      updateSittingAsync(values.sitting.id, sitting)
        .then(() => {
          UpdatedNotification();
          form.reset();
          handleClose();
        })
        .catch((err) => {
          ErrorNotification(err.message);
        })
        .finally(() => {
          setLoading(false);
        });

      return;
    }
    createSittingAsync(sitting)
      .then((data) => {
        CreatedNotification();
        form.reset();
        handleClose();
      })
      .catch((err) => {
        ErrorNotification(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleReset() {
    handleClose();
    setIsUpdate(false);
    form.reset();
    setEvent(null);
  }
  return (
    <>
      {/* <Button onClick={handleShow}>Launch demo modal</Button> */}

      <Modal
        opened={show}
        onClose={handleReset}
        centered
        radius="md"
        size="auto"
        title={isUpdate ? 'Update Sitting' : 'Create Sitting'}
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
      >
        <LoadingOverlay visible={loading} overlayBlur={2} />
        <form onSubmit={form.onSubmit(onSubmit)} onReset={handleReset}>
          <Stack spacing="sm">
            <div>
              <Text color="dimmed" className="mb-0 cursor-default">
                Title
              </Text>
              <TextInput
                className="mt-0 cursor-text"
                placeholder="New Sitting Title"
                {...form.getInputProps('sitting.title')}
              />
            </div>
            <div>
              <Text size="sm" color="dimmed" className="mt-1 cursor-default">
                Areas
              </Text>
              <MultiSelect
                clearable
                searchable
                className="mt-0 cursor-text"
                placeholder="Areas"
                // itemComponent={SelectItem}
                defaultValue={event?.resource?.id.toString()}
                data={areas.map((area: any) => ({
                  value: area.id.toString(),
                  label: area.name,
                  description: area.description,
                  group: area.tables?.length > 0 ? 'Tables' : 'Rooms',
                }))}
                {...form.getInputProps('sitting.areaIds')}
                onChange={setEventAreas}
                value={eventAreas}
              />
            </div>

            <Group grow>
              <div>
                <Text size="sm" color="dimmed" className="mt-1">
                  Type
                </Text>
                <Select
                  searchable
                  clearable
                  nothingFound="No options"
                  placeholder="Pick one"
                  data={types}
                  creatable
                  getCreateLabel={(query) => `+ Create type: "${query}"`}
                  onCreate={handleCreateType}
                  {...form.getInputProps('sitting.type')}
                />
              </div>
              <div>
                <Text size="sm" color="dimmed" className="mt-1">
                  Capacity
                </Text>
                <NumberInput
                  className="mt-0"
                  min={0}
                  {...form.getInputProps('sitting.capacity')}
                />
              </div>
            </Group>

            <Group grow>
              <div className="flex flex-col">
                <Text size="sm" color="dimmed" className="mt-1">
                  Start
                </Text>
                <Input.Wrapper label="" required>
                  <Input
                    component={BasicDateTimePickerNew}
                    value={startDate}
                    onChange={setStartDate}
                    rounded
                    // {...form.getInputProps('sitting.startTime')}
                  />
                </Input.Wrapper>
                {/* <DatePicker
                  className="mt-0"
                  {...form.getInputProps('sitting.startTime')}
                /> */}
              </div>
              <div className="flex flex-col">
                <Text size="sm" color="dimmed" className="mt-1">
                  End
                </Text>
                <Input.Wrapper label="" required>
                  <Input
                    component={BasicDateTimePickerNew}
                    value={endDate}
                    onChange={setEndDate}
                    rounded
                    // {...form.getInputProps('sitting.endTime')}
                  />
                </Input.Wrapper>
                {/* <DatePicker
                  className="mt-0"
                  {...form.getInputProps('sitting.endTime')}
                /> */}
              </div>
            </Group>

            <Text size="sm" color="dimmed" className="mt-1 ">
              Repeats
            </Text>
            <SegmentedControl
              fullWidth
              radius={15}
              value={rrule?.freq}
              onChange={(value) => setRrule({ ...rrule, freq: value })}
              data={[
                { label: 'None', value: 'none' },
                { label: 'Daily', value: 'daily' },
                { label: 'Weekly', value: 'weekly' },
                { label: 'Monthly', value: 'monthly' },
              ]}
            />
            <Collapse in={rrule?.freq !== 'none'}>
              <div>
                <Group spacing={0}>
                  Repeat every
                  <NumberInput
                    className="w-16 h-8 mx-1 p-0"
                    hideControls
                    value={rrule?.interval}
                    onChange={(value) =>
                      setRrule({ ...rrule, interval: value })
                    }
                  />
                  {rrule?.freq === 'daily' && 'days'}
                  {rrule?.freq === 'weekly' && 'weeks'}
                  {rrule?.freq === 'monthly' && (
                    <Group spacing={0}>
                      months on day
                      <Select
                        className="w-16 h-8 mx-1 p-0"
                        data={[...Array(31).keys()].map((i) => ({
                          label: (i + 1).toString(),
                          value: (i + 1).toString(),
                        }))}
                      />
                    </Group>
                  )}
                </Group>
                <Text size="sm" color="dimmed" className="mt-1 ml-1">
                  {rrule?.freq === 'daily' &&
                    'The event will repeat every X days'}
                  {rrule?.freq === 'weekly' &&
                    'The event will repeat every X weeks on specific days'}
                  {rrule?.freq === 'monthly' &&
                    'The event will repeat every X months on specific day of the month'}
                </Text>
              </div>
              <Collapse className="mb-2" in={rrule?.freq === 'weekly'}>
                <div>
                  <Text size="sm" color="dimmed" className="mt-1 ml-1">
                    Repeat on
                  </Text>
                  <Checkbox.Group
                    value={rrule?.byweekday?.map((day) => day.toString())}
                    onChange={(value) => {
                      setRrule({
                        ...rrule,
                        byweekday: value.map((day) => +day),
                      });
                    }}
                  >
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                      (day, index) => (
                        <Checkbox
                          key={day}
                          label={day}
                          value={index.toString()}
                          className="ml-1 cursor-pointer"
                        />
                      )
                    )}
                  </Checkbox.Group>
                </div>
              </Collapse>
              <Group className="w-full mt-1">
                {/* <Text>Stop Condition</Text> */}
                {/* <Radio.Group
              value={StopCondition[recurType]}
              onChange={(value) => setRecurType(value as StopCondition)}
              description="Stop Condition"
              orientation="vertical"
            > */}
                <Text size="md" color="dimmed" className="mt-1 mb-0">
                  Stop Condition
                </Text>
                <Paper shadow="xl" className="w-full">
                  <CustomRadioButton
                    value="never"
                    title="Never Stop"
                    description="The event will repeat for the next year"
                    checked={recurType === StopCondition.never}
                    onChange={(value) =>
                      setRecurType(
                        value ? StopCondition.never : StopCondition.never
                      )
                    }
                  />
                  <CustomRadioButton
                    value="until"
                    title="Run until a specific date"
                    input={
                      <DatePicker
                        className="w-40 h-8"
                        size="xs"
                        value={rrule?.until}
                        onChange={(value) =>
                          setRrule({ ...rrule, until: value ?? undefined })
                        }
                      />
                    }
                    description="The event will repeat until the date you specify"
                    checked={recurType === StopCondition.until}
                    onChange={(value) =>
                      setRecurType(
                        value ? StopCondition.until : StopCondition.never
                      )
                    }
                  />
                  <CustomRadioButton
                    value="count"
                    title="Run until a specific of times"
                    input={
                      <NumberInput
                        className="w-16 h-8"
                        size="xs"
                        hideControls
                        min={0}
                        value={rrule?.count}
                        onChange={(value) =>
                          setRrule({ ...rrule, count: value })
                        }
                      />
                    }
                    description="The event will repeat the number of times you specify"
                    checked={recurType === StopCondition.count}
                    onChange={(value) =>
                      setRecurType(
                        value ? StopCondition.count : StopCondition.never
                      )
                    }
                  />
                </Paper>
                {/* </Radio.Group> */}
              </Group>
            </Collapse>
            <Group position="right" mt="md">
              <Button
                className="bg-[#FFB703]"
                variant="subtle"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button className="bg-[#FFB703]" type="submit" variant="filled">
                {isUpdate ? 'Update' : 'Create'}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
