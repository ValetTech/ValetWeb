/* eslint-disable react/jsx-props-no-spreading */
import '@fullcalendar/react/dist/vdom';

import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { Button, Paper } from '@mantine/core';
import { useState } from 'react';

export default function DefaultSittings({ children }: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
    data: {
      type: 'sitting',
    },
  });
}

export function Draggable({ id, children }: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </Button>
  );
}
export function Droppable({ id, children }: any) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

export function App() {
  const containers = ['A', 'B', 'C'];
  const [parent, setParent] = useState(null);
  const draggableMarkup = (
    <Draggable id="draggable" className="darg">
      Drag me
    </Draggable>
  );
  const draggables = [
    <Draggable key={1} id="draggable1" className="darg">
      Drag me
    </Draggable>,
    <Draggable key={2} id="draggable2">
      Drag me
    </Draggable>,
    <Draggable key={3} id="draggable3">
      Drag me
    </Draggable>,
  ];

  // eslint-disable-next-line no-new
  new ThirdPartyDraggable(draggableMarkup, {
    itemSelector: '.darg',
    eventData: {
      id: 1,
      title: 'event1',
      duration: '01:00',
    },
  });

  function handleDragEnd(event) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }

  return (
    // eslint-disable-next-line react/jsx-no-bind
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}
      <Paper withBorder id="container">
        {containers.map((id) => (
          // We updated the Droppable component so it would accept an `id`
          // prop and pass it to `useDroppable`
          <Button disabled key={id}>
            <Droppable key={id} id={id}>
              {parent === id ? draggableMarkup : 'Drop here'}
            </Droppable>
          </Button>
        ))}
      </Paper>
    </DndContext>
  );
}
