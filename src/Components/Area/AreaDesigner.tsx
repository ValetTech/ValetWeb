/* eslint-disable @typescript-eslint/no-use-before-define */
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
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { forwardRef, useEffect, useState } from 'react';
import { createAreaAsync, getAreasAsync } from '../../Services/ApiServices';

export default function AreaDesigner() {
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      width: 0,
      height: 0,
      venueId: 1,
      tables: [],
    },
    validate: {
      name: (value) => (value.length < 1 ? 'Please enter a valid name' : null),
      description: (value) =>
        value.length < 1 ? 'Please enter a valid description' : null,
    },
  });

  const [areas, setAreas] = useState([]);

  useEffect(() => {
    // on load call api to get areas
    getAreasAsync()
      .then((response) => {
        console.log(response);
        setAreas(response);
      })
      .catch((error) => {
        console.log(error);
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
  const tableTypes = [
    { label: 'Table', value: 'table' },
    { label: 'Bar', value: 'bar' },
    { label: 'Booth', value: 'booth' },
  ];

  function handleSubmit() {
    console.log(form.values);
    createAreaAsync(form.values)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <DndContext modifiers={[restrictToVerticalAxis]}>
      <DragOverlay modifiers={[restrictToWindowEdges]}>{}</DragOverlay>
      <form onSubmit={handleSubmit}>
        <h1>Area Designer</h1>
        <Group>
          <TextInput
            label="Name"
            placeholder="Name"
            required
            {...form.getInputProps('name')}
          />
          <Select
            label="Copy default layout"
            placeholder="Select layout"
            data={areas.map((area) => ({
              label: area.name,
              value: area.id,
            }))}
            searchable
            allowDeselect
            nothingFound="No areas"
          />
        </Group>
        <Group>
          <Textarea
            label="Description"
            placeholder="Description"
            required
            {...form.getInputProps('description')}
          />
        </Group>
        <Group>
          <NumberInput
            label="Width"
            required
            {...form.getInputProps('width')}
          />
          <NumberInput
            label="Height"
            required
            {...form.getInputProps('height')}
          />
        </Group>
        <MultiSelect
          label="Tables"
          data={tableTypes}
          searchable
          nothingFound="Nothing found"
          clearable
          {...form.getInputProps('tables')}
        />
        <Button className="mt-2" type="submit" variant="outline" color="blue">
          Create Area
        </Button>
        <App />
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
