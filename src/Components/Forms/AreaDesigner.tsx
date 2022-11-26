/* eslint-disable react/jsx-no-bind */
import { DndContext, DragOverlay } from '@dnd-kit/core';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  Container,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import Area from '../../Models/Area';
import { createAreaAsync, getAreasAsync } from '../../Services/ApiServices';
import CreatedNotification from '../Notifications/NotifyCreate';
import ErrorNotification from '../Notifications/NotifyError';

export default function AreaDesigner() {
  const form = useForm<Area>({
    initialValues: {
      name: '',
      description: '',
      width: 0,
      height: 0,
      venueId: 1,
      tables: [{}],
    },
    validate: {
      name: (value) => (value.length < 1 ? 'Please enter a valid name' : null),
      description: (value: any) =>
        value.length < 1 ? 'Please enter a valid description' : null,
    },
  });
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [tables, setTables] = useState<any[]>([]);

  const tableTypes = [
    {
      label: 'Table',
      value: 'table',
      type: 'table',
      capacity: 4,
    },
    {
      label: 'Bar',
      value: 'bar',
      type: 'bar',
      capacity: 12,
    },
    {
      label: 'Booth',
      value: 'booth',
      type: 'booth',
      capacity: 6,
    },
  ];

  useEffect(() => {
    // on load call api to get areas
    getAreasAsync()
      .then((response) => {
        setAreas(response);
      })
      .catch((error) => {
        ErrorNotification(error.message);
      });
  }, []);

  function handleSubmit() {
    const { sittings, id, ...rest } = form.values;
    rest.tables = [...tableTypes, ...tables]
      .filter((t) => form.values?.tables?.includes(t.type))
      .map((t) => ({
        type: t.type,
        capacity: t.capacity,
        position: t.position ?? null,
      }));

    createAreaAsync(rest)
      .then((response) => {
        setAreas([...areas, response]);
        CreatedNotification();
        form.reset();
      })
      .catch((err) => {
        ErrorNotification(err.message);
      });
  }

  function handleLayoutChange(value: string) {
    const area = areas.filter((a) => a.id === +value)[0];
    setSelectedArea(area);
    const tablesData = area.tables?.map((t) => {
      return {
        label: t.type,
        value: t.type,
        ...t,
      };
    });
    setTables(tablesData ?? []);

    if (area) {
      form.setValues(area);
    }
  }

  function handleReset() {
    form.reset();
    setSelectedArea(null);
    setTables([]);
  }

  return (
    <DndContext modifiers={[restrictToVerticalAxis]}>
      <DragOverlay modifiers={[restrictToWindowEdges]}>{}</DragOverlay>
      <form onSubmit={form.onSubmit(handleSubmit)} onReset={handleReset}>
        <Container className="">
          <div className="flex flex-row w-full">
            <TextInput
              label="Name"
              placeholder="Name"
              required
              {...form.getInputProps('name')}
              className="mr-3 w-1/2"
            />
            <Select
              label="Copy default layout"
              placeholder="Select layout"
              data={areas.map((area) => ({
                label: area.name,
                value: area.id?.toString() ?? '',
                ...area,
              }))}
              searchable
              allowDeselect
              nothingFound="No areas"
              className="w-1/2"
              value={selectedArea?.id?.toString()}
              onChange={handleLayoutChange}
            />
          </div>
          <div className="flex flex-row">
            <Textarea
              label="Description"
              placeholder="Description"
              required
              minRows={3}
              maxRows={5}
              {...form.getInputProps('description')}
              className="mr-3 w-1/2 h-full [&>*>*]:pb-[20px]"
            />
            <Group className="flex-col w-1/2" spacing={0}>
              <NumberInput
                label="Width"
                required
                {...form.getInputProps('width')}
                className="w-full"
              />
              <NumberInput
                label="Height"
                required
                {...form.getInputProps('height')}
                className="w-full"
              />
            </Group>
          </div>
          <MultiSelect
            label="Tables"
            placeholder="Add tables"
            data={[
              ...tableTypes,
              ...tables.map((t) => ({
                label: t.type,
                value: t.type,
                capacity: t.capacity ?? 0,
              })),
            ]}
            searchable
            nothingFound="Nothing found"
            clearable
            className="mb-2"
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = {
                value: query,
                label: query,
                type: query,
                capacity: 5,
              };
              form.setFieldValue('tables', [
                ...(form.values.tables ?? []),
                item,
              ]);
              return item;
            }}
            {...form.getInputProps('tables')}
          />
          <Button
            className="bg-[#FFB703]"
            variant="outline"
            onClick={() => form.reset()}
          >
            Clear
          </Button>
          <Button
            className="mt-2 ml-5 bg-[#FFB703]"
            variant="outline"
            // onClick={handleSubmit}
            type="submit"
          >
            Create Area
          </Button>
        </Container>
      </form>
    </DndContext>
  );
}

/*

{
  "name": "string",
  "description": "string",
  "venueId": 0,
  "tables": [
    {
      "id": 0,
      "type": "string",
      "capacity": 0,
      "areaId": 0
    }
  ],
}

*/
