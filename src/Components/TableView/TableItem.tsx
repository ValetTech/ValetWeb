/* eslint-disable react/jsx-props-no-spreading */
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { createStyles } from '@mantine/core';
import Reservation from '../../Models/Reservation';

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    // display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    // padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    padding: `${theme.spacing.xs}px ${theme.spacing.xs}px`,
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

function Draggable({ id, data, children, className }: any) {
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
    // eslint-disable-next-line react/button-has-type
    <button
      ref={setNodeRef}
      style={style}
      // className=""
      className={`${cx(classes.item)} ${className}`}
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
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
