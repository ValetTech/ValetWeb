/* eslint-disable @typescript-eslint/no-use-before-define */
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { Box, Grid, Group, SimpleGrid } from '@mantine/core';
import { useState } from 'react';

export default function Area() {
  const size = {
    x: 12,
    y: 10,
  };
  const [parent, setParent] = useState(null);
  const [grid, setGrid] = useState(
    [...Array(size.x * size.y)].map(() => '[ ]')
  );

  const tableTypes = [
    { id: ' ', name: 'Clear', size: { xSpan: 1, ySpan: 1 } },
    { id: 'SS', name: 'Sm Square', size: { xSpan: 1, ySpan: 1 } },
    { id: 'SC', name: 'SM Circle', size: { xSpan: 1, ySpan: 1 } },
    { id: 'MS', name: 'Med Square', size: { xSpan: 2, ySpan: 2 } },
    { id: 'MC', name: 'Med Circle', size: { xSpan: 2, ySpan: 2 } },
    { id: 'LS', name: 'Lg Square', size: { xSpan: 3, ySpan: 3 } },
    { id: 'LC', name: 'Lg Circle', size: { xSpan: 3, ySpan: 3 } },
  ];

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* {parent === null ? draggableMarkup : null} */}
      <Group position="left" spacing="xs">
        {tableTypes.map((value, index) => (
          <Draggable key={index} id={value.id} size={value.size}>
            {value.name}
          </Draggable>
        ))}
      </Group>

      {/* <Droppable key="AreaView" id="AreaView"> */}
      <Box className="border m-2 p-2">
        <CreateGrid parent={parent} size={size} grid={grid} />
      </Box>
      {/* </Droppable> */}
    </DndContext>
  );

  function handleDragEnd(event) {
    const { over, active } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    console.log(active.data.current.size);
    console.log(over);
    const { xSpan, ySpan } = active.data.current.size;
    const newGrid = [...grid];
    for (let i = 0; i < (xSpan ?? 0); i += 1) {
      for (let j = 0; j < (ySpan ?? 0); j += 1) {
        newGrid[+over.id + i] = `[ ${active.id} ]`;
      }
    }
    // newGrid[over.id] = `[ ${active.id} ]`;

    setGrid(newGrid);
    setParent(over ? over.id : null);
  }
}

function CreateGrid({
  size,
  parent,
  grid,
  children,
}: {
  size: { x: number; y: number };
  parent: string | null;
  grid: string[];
  children: any;
}) {
  return (
    <Grid gutter="xs" columns={size.x}>
      {grid.map((value, index) => (
        <Grid.Col
          key={index}
          className=""
          span={Math.ceil(size.x / (size.x * size.y))}
        >
          <Droppable key={index} id={index.toString()}>
            {value}
          </Droppable>
        </Grid.Col>
      ))}
    </Grid>
  );
}

function CreateSimpleGrid({
  size,
  parent,
  grid,
  children,
}: {
  size: { x: number; y: number };
  parent: string | null;
  grid: string[];
  children: any;
}) {
  const simpleGrid = [...Array(size.x * size.y)].map(() => '[ ]');

  return (
    <SimpleGrid spacing="xs" cols={size.x}>
      {simpleGrid.map((value, index) => (
        <div
          key={index}
          className=""
          //   span={Math.ceil(size.x / (size.x * size.y))}
        >
          <Droppable key={index} id={index}>
            {value}
          </Droppable>
        </div>
      ))}
    </SimpleGrid>
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

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: { size: props.size },
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

/*
Header - [Title( On Hover Show Desc )]
Grid size.x by size.y
Grid - [GridItem]
*/
