/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-bind */

import {
  DndContext,
  DragOverlay,
  pointerWithin,
  useDraggable,
} from '@dnd-kit/core';
import { restrictToWindowEdges, snapCenterToCursor } from '@dnd-kit/modifiers';
import { Button, Center, createStyles, Grid, Text } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { IconBrandAirtable, IconStar } from '@tabler/icons';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import ErrorNotification from '../Components/Notifications/NotifyError';
import UpdatedNotification from '../Components/Notifications/NotifyUpdate';
import TableSideBar from '../Components/TableView/TableSideBar';
import TableView, {
  Droppable,
  TableDnD,
} from '../Components/TableView/TableView';
import Area from '../Models/Area';
import Reservation from '../Models/Reservation';
import ReservationParams from '../Models/ReservationParams';
import Sitting from '../Models/Sitting';
import Table from '../Models/Table';
import getReservationsAsync, {
  AddTableToReservationAsync,
  getAreasAsync,
  getSittingsAsync,
  GetTablesAsync,
  RemoveTableFromReservationAsync,
  updateSittingAsync,
  UpdateTableAsync,
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
  const [reservationsData, setReservations] = useState<Reservation[]>([]);
  const [selectedSitting, setSelectedSitting] = useState<Sitting | null>(null);
  const [tables, setTables] = useState<Table[] | null>(null);
  const [params, setParams] = useState<ReservationParams>({
    SittingId: selectedSitting?.id?.toString() ?? undefined,
    MinDate: dayjs().add(-1, 'day').toISOString(),

    SortBy: 'DateTime',
  });
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  const [sittings, setSittings] = useState<Sitting[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { height, width } = useViewportSize();
  const [grid, setGrid] = useState<JSX.Element[][]>([]);
  const [gridSize, setGridSize] = useState<number>(12);

  function CreateGrid() {
    if (!selectedArea) return;

    const { width: w, height: h } = selectedArea;
    const size = Math.max(w ?? 12, h ?? 12);
    setGridSize(size);
    const newGrid = new Array(size).fill(0).map((_, i) => {
      return new Array(size).fill(0).map((_, j) => {
        const table = tables?.find(
          (t) =>
            t.xPosition === i &&
            t.yPosition === j &&
            t.areaId === selectedArea.id
        );
        if (table) {
          return (
            <TableDnD
              key={`table-${table.id}`}
              table={table}
              color={
                table?.reservations?.filter(
                  (r) => r?.sittingId == selectedSitting?.id
                )?.length
                  ? ' bg-slate-500'
                  : ' bg-blue-500'
              }
            />
          );
        }
        return (
          <Droppable key={`${i},${j}`} id={`${i},${j}`} accepts={['table']}>
            <div
              className="border min-w-[44px] min-h-[44px] h-full w-full"
              key={`${i}-${j}`}
            />
          </Droppable>
        );
      });
    });
    setGrid(newGrid);
  }

  useEffect(() => {
    CreateGrid();
  }, [selectedArea, tables]);

  function loadReservations() {
    setLoading(true);
    getReservationsAsync(params ?? {})
      .then((response: Reservation[]) => {
        setReservations(response);
      })
      .catch((error) => {
        ErrorNotification(error.message);
      });
    setLoading(false);
  }

  function UpdateTable(table: Table) {
    setLoading(true);
    const { reservations, area, ...newTable } = table;
    // const newTables = tables?.map((t) => {
    //   if (t.id === table.id) {
    //     return newTable;
    //   }
    //   return t;
    // });

    UpdateTableAsync(table.id ?? 0, newTable)
      .then(() => {
        GetTablesAsync()
          .then((response) => {
            setTables(response);
          })
          .catch((error) => {
            ErrorNotification(error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        ErrorNotification(error.message);
      });
    setLoading(false);
  }

  useEffect(() => {
    // Add param for future only
    setLoading(true);
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

    getAreasAsync()
      .then((response: Area[]) => {
        setAreas(response);
      })
      .catch((error) => {
        ErrorNotification(error.message);
      });
    setLoading(false);
  }, []);

  useEffect(() => {
    const [type, id] = activeId?.split('-', 2) || [null, null];
    // setActiveItem(reservations.find((r) => r.id === activeId) ?? null);
    if (type === 'reservation') {
      setActiveItem(
        reservationsData.find((r) => r.id?.toString() === id) ?? null
      );
    }
  }, [activeId, reservationsData, tables]);

  // const [tables, setTables] = useState<BoxSpec[]>([]);

  useEffect(() => {
    loadReservations();
  }, []);

  useEffect(() => {
    loadReservations();
  }, [params]);

  useEffect(() => {
    setLoading(true);
    setParams({
      ...params,
      SittingId: selectedSitting?.id?.toString() ?? undefined,
    });

    GetTablesAsync(selectedSitting?.id)
      .then((response) => {
        setTables(response);
      })
      .catch((error) => {
        ErrorNotification(error.message);
      });
    setLoading(false);
  }, [selectedSitting]);

  function handleDragEnd(event) {
    const { active, over } = event;

    setActiveId(null);
    setActiveItem(null);

    if (over && over.data.current.accepts.includes(active.data.current.type)) {
      const [type, id] = active?.id?.split('-', 2) || [null, null];

      if (type === 'reservation') {
        const reservation = reservationsData.find(
          (r) => r.id?.toString() === id
        );
        const [_, tableId] = over?.id?.split('-', 2) || [null, null];
        const table = tables?.find((t) => t.id?.toString() === tableId);
        if (
          reservation?.tables?.map((t) => t.id?.toString())?.includes(tableId)
        ) {
          reservation.tables = reservation?.tables?.filter(
            (t) => t.id !== table?.id
          );
          console.log('remove', reservation);

          // Remove table from reservation
          RemoveTableFromReservationAsync(reservation.id ?? 0, tableId).catch(
            (err) => {
              ErrorNotification(err.message);
            }
          );
        } else {
          reservation?.tables?.push(table);
          console.log('add', reservation);

          // Add table to reservation
          AddTableToReservationAsync(reservation?.id ?? 0, tableId).catch(
            (err) => {
              ErrorNotification(err.message);
            }
          );
        }
        setReservations([
          ...reservationsData.filter((r) => r.id !== reservation?.id),
          reservation,
        ]);

        loadReservations();
      }
      if (type === 'table') {
        const table = tables?.find((t) => t.id?.toString() === id);

        const [x, y] = over?.id?.split(',', 2) || [null, null];

        if (table && x && y) {
          table.xPosition = x;
          table.yPosition = y;
          setTables(tables?.map((t) => (t.id == table.id ? table : t)) ?? null);
          UpdateTable(table);
        }
      }
    }
    CreateGrid();
  }

  function UpdateSitting(sitting: Sitting) {
    setLoading(true);
    const { reservations, ...newSitting } = sitting;
    const newSittings = sittings.map((s) => {
      if (s.id === sitting.id) {
        return newSitting;
      }
      return s;
    });
    setSittings(newSittings);

    updateSittingAsync(sitting.id ?? 0, newSitting)
      .then(() => {
        UpdatedNotification();
      })
      .catch((err) => {
        ErrorNotification(err.message);
      });
    loadReservations();
    setLoading(false);
  }

  if (height < 500 || width < 500) {
    return (
      <div className="flex flex-col items-center justify-center h-screen select-none">
        <Text size="xl" weight="bold">
          Please use a larger device
        </Text>
      </div>
    );
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin}
      modifiers={[restrictToWindowEdges, snapCenterToCursor]}
      onDragStart={(event) => {
        setActiveId(event.active?.id?.toString() ?? null);
      }}
      autoScroll={false}
    >
      <div className="h-full w-full xs:pl-0 mx-4 overscroll-x-none">
        <Grid className="w-full">
          <Grid.Col span={12}>
            {/* Page Title */}
            <h1 className="mt-0 select-none">Tables View</h1>
          </Grid.Col>
          <Grid.Col span={12}>
            <Grid gutter="xs">
              <Grid.Col span={4}>
                {/* Side bar */}
                <div className="w-full h-full ">
                  <TableSideBar
                    data={reservationsData}
                    sittings={sittings}
                    selectedSitting={selectedSitting}
                    areas={areas}
                    selectSitting={setSelectedSitting}
                    params={params}
                    setParams={setParams}
                    loading={loading}
                    selectedArea={selectedArea ?? undefined}
                    loadReservations={loadReservations}
                  />
                </div>
              </Grid.Col>
              <Grid.Col span={8}>
                <Center className="h-full w-full ">
                  {/* Table view */}
                  <TableView
                    tables={tables}
                    areas={areas}
                    selectedSitting={selectedSitting}
                    updateSitting={UpdateSitting}
                    params={params}
                    setParams={setParams}
                    selectedArea={selectedArea}
                    setSelectedArea={setSelectedArea}
                    grid={grid}
                    setGrid={setGrid}
                    gridSize={gridSize}
                  />
                </Center>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </div>
      {activeId?.split('-', 2)[0] === 'reservation' ? (
        <DragOverlay className="w-32 h-32 ">
          {activeItem ? (
            <Button>
              {activeItem?.customer?.isVip && (
                <IconStar size={16} className="mr-4" />
              )}
              <div className="flex flex-col justify-between">
                <div>{activeItem?.customer?.fullName ?? ''}</div>
                <div>
                  {dayjs(activeItem?.dateTime).format('h:mm A - D MMM YY')}
                </div>
              </div>
            </Button>
          ) : null}
        </DragOverlay>
      ) : (
        <DragOverlay className="w-32 h-32 ">
          {activeId ? (
            <div className="w-11 h-11 bg-green-500 rounded-full relative z-100">
              <Center>
                <IconBrandAirtable size={40} />
              </Center>
            </div>
          ) : null}
        </DragOverlay>
      )}
    </DndContext>
  );
}
