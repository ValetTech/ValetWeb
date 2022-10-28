/* eslint-disable react/jsx-props-no-spreading */
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { createStyles, Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import * as dayjs from 'dayjs';
import Reservation from '../../Models/Reservation';

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },
}));

function Draggable({ id, data, children }: any) {
  const { classes, cx } = useStyles();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      style={style}
      className="border"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <div className={`${cx(classes.item)}`}>{children}</div>
    </div>
  );
}

function Droppable({ id, children }: any) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div className="w-full h-full" ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}
interface TableProps {
  data: Reservation[] | undefined;
}

export default function ReservationsList({ data }: TableProps) {
  const { classes, cx } = useStyles();
  const [state, handlers] = useListState(data);

  const items = state.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id} data={item}>
      <Text className="pr-2">{item.customer.fullName}</Text>
      <div>
        <Text>{dayjs(item.dateTime).format('h:mm A - D MMM YY')}</Text>
        <Text color="dimmed" size="sm">
          Source: {item.source} | Status: {item.status}
        </Text>
      </div>
    </Draggable>
  ));
  return <div>{items}</div>;
  return (
    <DndContext
    // onDragEnd={({ destination, source }) =>
    //   handlers.reorder({ from: source.index, to: destination?.index || 0 })
    // }
    >
      {/* <Droppable id="reservationsList" direction="vertical"> */}
      {items}
      {/* </Droppable> */}
    </DndContext>
  );
}
