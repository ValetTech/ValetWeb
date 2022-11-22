/* eslint-disable react/button-has-type */
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Text } from '@mantine/core';
import dayjs from 'dayjs';
import { useState } from 'react';

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export default function Area() {
  const containers = ['A', 'B', 'C'];
  const [parent, setParent] = useState(null);
  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  return (
    <div>
      {/* {parent === null ? draggableMarkup : null} */}
      <Draggable id="draggable1">
        <Text className="pr-2">Full name</Text>
        <div>
          <Text>{dayjs('2022-10-16').format('h:mm A - D MMM YY')}</Text>
          <Text color="dimmed" size="sm">
            Source: | Status:
          </Text>
        </div>
      </Draggable>
      <Draggable id="2s">Drag me</Draggable>

      {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Droppable key={id} id={id}>
          {parent === id ? draggableMarkup : 'Drop here'}
        </Droppable>
      ))}
    </div>
  );

  function handleDragEnd(event) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
}
