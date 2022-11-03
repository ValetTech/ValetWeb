/* eslint-disable react/jsx-no-bind */
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
/* eslint-disable react/jsx-props-no-spreading */
import { CSS } from '@dnd-kit/utilities';
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
import { forwardRef, useEffect, useState } from 'react';
import Area from '../../Models/Area';
import { createAreaAsync, getAreasAsync } from '../../Services/ApiServices';
import CreatedNotification from '../Notifications/NotifyCreate';
import ErrorNotification from '../Notifications/NotifyError';

function App() {
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState(['1', '2', '3']);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </SortableContext>
      <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
    </DndContext>
  );

  function handleDragStart(event) {
    const { active } = event;

    setActiveId(active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }
}

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
        console.log(error);
        ErrorNotification(error.message);
      });
  }, []);

  //   const fields = form.values.employees.map((_, index) => (
  //     <Draggable key={index} index={index} draggableId={index.toString()}>
  //       {(provided) => (
  //         <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
  //           <Center {...provided.dragHandleProps}>
  //             <IconGripVertical size={18} />
  //           </Center>
  //           <TextInput
  //             placeholder="John Doe"
  //             {...form.getInputProps(`employees.${index}.name`)}
  //           />
  //           <TextInput
  //             placeholder="example@mail.com"
  //             {...form.getInputProps(`employees.${index}.email`)}
  //           />
  //         </Group>
  //       )}
  //     </Draggable>
  //   ));

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
        console.log(err);
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

    const tablesForm =
      selectedArea?.tables?.map((t) => ({
        label: t.type,
        value: t.type,
        type: t.type,
        capacity: t.capacity ?? 0,
        position: t.position ?? null,
      })) ?? [];

    // form.setFieldValue('tables', tablesForm);
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
        <h1>Area Designer</h1>
        <Container>
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
                value: area.id,
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
              // autosize
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
            // value={tables}
            // onChange={(value) => {
            //   console.log(value);
            //   setTables(value);
            //   form.setFieldValue('tables', value);
            // }}
          />
          <Button variant="outline" onClick={() => form.reset()}>
            Clear
          </Button>
          <Button
            className="mt-2 ml-5"
            variant="outline"
            color="blue"
            // onClick={handleSubmit}
            type="submit"
          >
            Create Area
          </Button>
          <App />
        </Container>
      </form>
    </DndContext>
  );
}

function Draggable({ id, children }: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      type="button"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
  );
}

function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Item ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.id}
    </Item>
  );
}

const Item = forwardRef(({ id, ...props }, ref) => {
  return (
    <div {...props} ref={ref}>
      {id}
    </div>
  );
});
Item.displayName = 'Item';

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
