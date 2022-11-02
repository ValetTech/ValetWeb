/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { createSnapModifier } from '@dnd-kit/modifiers';
import { Group, Table } from '@mantine/core';
import { IconTable } from '@tabler/icons';
import { useMemo, useState } from 'react';

function TableItem({ id }: any) {
  return <div className="m-2">{id}</div>;
}

export function App() {
  const [activeId, setActiveId] = useState(null);

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd() {
    setActiveId(null);
  }

  const size = {
    x: 10,
    y: 10,
  };

  const tableTypes = [
    {
      type: 'table1',
      size: {
        x: 1,
        y: 1,
      },
      icon: <IconTable />,
    },
    {
      type: 'table2',
      size: {
        x: 1,
        y: 1,
      },
    },
    {
      type: 'table3',
      size: {
        x: 1,
        y: 1,
      },
    },
  ];

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Group position="left">
        {tableTypes.map((tableType, index) => (
          <Draggable key={index} id={tableType.type}>
            <TableItem id={tableType.type} />
          </Draggable>
        ))}
      </Group>
      {/* <DragOverlay>{activeId ? <TableItem id={activeId} /> : null}</DragOverlay> */}
      <AreaGrid size={size} />
    </DndContext>
  );
}

function DroppableContainer(props) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return <div ref={setNodeRef}>{props.children}</div>;
}

function Droppable({ id, children }: any) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });
  const style = {
    color: isOver ? 'red' : 'black',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

export default function AreaGrid({ size, children }: any) {
  const [gridSize, setGridSize] = useState(20);
  const { setNodeRef, isOver, over } = useDroppable({
    id: 'area-grid',
    data: {
      index: 0,
      accepts: ['table', 'tables'],
    },
  });

  const snapToGridModifier = useMemo(
    () => createSnapModifier(gridSize),
    [gridSize]
  );

  return (
    <div ref={setNodeRef}>
      <Table>
        <tbody>
          {[...Array(size.y)].map((_, y) => (
            <tr key={y}>
              {[...Array(size.x)].map((_, x) => (
                <td key={`${x} ${y}`}>
                  <Droppable id={`${x} ${y}`} key={`${x} ${y}`}>
                    [ {x} {y} ]
                  </Droppable>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
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

// const gridSize = 20;

// function snapToGrid(args) {
//   const {transform} = args;

//   return {
//     ...transform,
//     x: Math.ceil(transform.x / gridSize) * gridSize,
//     y: Math.ceil(transform.y / gridSize) * gridSize,
//   };
//  }

// export default function AreaGrid() {
//   const [gridSize, setGridSize] = useState(30);
//   const style = {
//     alignItems: 'flex-start',
//   };
//   const buttonStyle = {
//     marginLeft: gridSize - 20 + 1,
//     marginTop: gridSize - 20 + 1,
//     width: gridSize * 8 - 1,
//     height: gridSize * 2 - 1,
//   };
//   const snapToGrid = useMemo(() => createSnapModifier(gridSize), [gridSize]);

//   return (
//     <>
//       <DraggableStory
//         label={`Snapping to ${gridSize}px increments`}
//         modifiers={[snapToGrid]}
//         style={style}
//         buttonStyle={buttonStyle}
//         key={gridSize}
//       />
//       <Grid size={gridSize} onSizeChange={setGridSize} />
//     </>
//   );
// }

// interface Props {
//   size: number;
//   step?: number;
//   onSizeChange(size: number): void;
// }

// function Grid({ size }: Props) {
//   return (
//     <div
//       className={styles.Grid}
//       style={
//         {
//           '--grid-size': `${size}px`,
//         } as React.CSSProperties
//       }
//     />
//   );
// }
