/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-bind */

import {
  DndContext,
  DragOverlay,
  pointerWithin,
  useDraggable,
} from '@dnd-kit/core';
import { restrictToWindowEdges, snapCenterToCursor } from '@dnd-kit/modifiers';
import { Center, createStyles, Grid, Text } from '@mantine/core';
import { useListState, useScrollLock, useViewportSize } from '@mantine/hooks';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import ErrorNotification from '../Components/Notifications/NotifyError';
import TableSideBar from '../Components/TableView/TableSideBar';
import TableView from '../Components/TableView/TableView';
import Area from '../Models/Area';
import Reservation from '../Models/Reservation';
import Sitting from '../Models/Sitting';
import Table from '../Models/Table';
import getReservationsAsync, {
  getSittingsAsync,
  GetTablesAsync,
} from '../Services/ApiServices';

export const styles = createStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
  container: {
    maxWidth: 1200,
    width: '100%',
  },
  title: {
    marginBottom: theme.spacing.xl,
  },
  search: {
    marginBottom: theme.spacing.xl,
  },
  table: {
    marginBottom: theme.spacing.xl,
  },
}));

// TODO - add a search bar to filter the table
// TODO - add a button to filter the table
// TODO - add a button to sort the table
// TODO - show list of reservations
// TODO - show list of tables
// TODO - undo shortcut and icon

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

export function ReservationsList({ data }: any) {
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

  const dItems = state.map((item, index) => (
    <Draggable className="" key={item.id} id={item.id}>
      <Text className="pr-2">Full name</Text>
      <div>
        <Text>{dayjs('2022-10-16').format('h:mm A - D MMM YY')}</Text>
        <Text color="dimmed" size="sm">
          Source: | Status:
        </Text>
      </div>
    </Draggable>
  ));
  return <DndContext autoScroll={false}>{dItems}</DndContext>;
}

// function Draggable({ id, data, children }: any) {
// const { classes, cx } = useStyles();
// const { attributes, listeners, setNodeRef, transform } = useDraggable({
//   id,
//   data,
// });
// const style = transform
//   ? {
//       transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
//     }
//   : undefined;

// return (
//   <button
//     style={style}
//     {...listeners}
//     {...attributes}
//     className={`${cx(classes.item)} border`}
//     ref={setNodeRef}
//   >
//     <Text className="pr-2 ">A name</Text>
//     <div>
//       <Text>{dayjs('2022-10-16T16:00').format('h:mm A - D MMM YY')}</Text>
//       <Text color="dimmed" size="sm">
//         Source: Some | Status: Thing
//       </Text>
//     </div>
//   </button>
// );
// }
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
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}
export interface BoxSpec {
  name: string;
  type: string;
}

export default function TablesPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedSitting, setSelectedSitting] = useState<Sitting | null>(null);
  const [tables, setTables] = useState<Table[] | null>(null);

  const [sittings, setSittings] = useState<Sitting[]>([]);
  const [areas, setAreas] = useState<Area[]>([
    {
      id: 1,
      name: 'Area 1',
      venueId: 1,
      width: 10,
      height: 10,
    },
    {
      id: 2,
      name: 'Area 2',
      venueId: 1,
      width: 10,
      height: 10,
    },
    {
      id: 3,
      name: 'Area 3',
      venueId: 1,
      width: 10,
      height: 10,
    },
  ]);
  const { height, width } = useViewportSize();
  const [scrollLocked, setScrollLocked] = useScrollLock();
  const [activeId, setActiveId] = useState(null);
  const [activeReservation, setActiveReservation] =
    useState<Reservation | null>(null);

  useEffect(() => {
    // Add param for future only
    getSittingsAsync()
      .then((response: Sitting[]) => {
        setSittings(response);
        // setAreas(response.areas);
        // setEvents(sittings.map((s) => s.toEvent()));
      })
      .catch((error) => {
        // ErrorNotification('Could not get sittings');
        ErrorNotification(error.message);
      });

    setScrollLocked(true);
    // getAreasAsync()
    //   .then((res) => {
    //     setAreas(res);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     ErrorNotification('Could not get areas');
    //   });
  }, []);

  useEffect(() => {
    setActiveReservation(reservations.find((r) => r.id === activeId) ?? null);
  }, [activeId]);

  // const [tables, setTables] = useState<BoxSpec[]>([]);

  const gridSize = 20;

  function snapToGrid(args) {
    const { transform } = args;

    return {
      ...transform,
      x: Math.ceil(transform.x / gridSize) * gridSize,
      y: Math.ceil(transform.y / gridSize) * gridSize,
    };
  }

  function loadReservations() {
    getReservationsAsync()
      .then((response: Reservation[]) => {
        setReservations(response);
      })
      .catch((error) => {
        console.error('Error:', error);
        ErrorNotification(error.message);
      });
  }
  function handleDragEnd(event: any) {
    setActiveId(null);
    const { active, over } = event;
    if (active.id !== over.id) {
      console.log('active', active);
      console.log('over', over);
    }
  }

  useEffect(() => {
    loadReservations();
  }, []);

  useEffect(() => {
    GetTablesAsync(selectedSitting?.id)
      .then((response) => {
        setTables(response);
      })
      .catch((error) => {
        console.error('Error:', error);
        ErrorNotification(error.message);
      });
  }, [selectedSitting]);

  return (
    // <DndContext
    //   collisionDetection={closestCenter}
    //   autoScroll={false}
    //   onDragEnd={({ active, over }) => {
    //     if (active.id !== over?.id) {
    //       setItems((items) => {
    //         const oldIndex = items.findIndex((item) => item.id === active.id);
    //         const newIndex = items.findIndex((item) => item.id === over?.id);
    //         return moveItem(items, oldIndex, newIndex);
    //       });
    //     }
    //   }}
    // ></DndContext>
    <DndContext
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin}
      modifiers={[restrictToWindowEdges, snapCenterToCursor]}
      autoScroll={false}
      onDragStart={(event) => {
        setActiveId(event.active?.id ?? null);
      }}
    >
      <div className="h-full w-full xs:pl-0 my-5 mx-4">
        <Grid className="w-full">
          <Grid.Col span={12}>
            <Center className="w-full ">
              {/* Page Title */}
              <Text size="xl" weight={500} className="pr-8">
                Tables View
              </Text>
              <Draggable key={1} index={1} id={1} draggableId={1} data={1}>
                Something
              </Draggable>
            </Center>
          </Grid.Col>
          <Grid.Col span={12}>
            <Grid gutter="xs">
              <Grid.Col span={4}>
                {/* Side bar */}
                <div className="w-full h-full ">
                  <TableSideBar
                    data={reservations}
                    sittings={sittings}
                    selectedSitting={selectedSitting}
                    selectSitting={setSelectedSitting}
                  />
                </div>
              </Grid.Col>
              <Grid.Col span={8}>
                <Center className="h-full w-full ">
                  {/* Table view */}
                  <TableView areas={areas} selectedSitting={selectedSitting} />
                </Center>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </div>
      <DragOverlay className="w-32 h-32 ">
        {activeId ? (
          <div className="p-2 ">
            <Text className="pr-2" size="sm">
              {activeReservation?.customer?.fullName ?? ''}
            </Text>
            <Text size="sm">
              {dayjs(activeReservation?.dateTime).format('h:mm A - D MMM YY') ??
                ''}
            </Text>
            <Text size="sm">{activeReservation?.tables?.length} tables</Text>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
