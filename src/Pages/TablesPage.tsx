/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Announcements,
  CancelDrop,
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  Modifiers,
  ScreenReaderInstructions,
  SensorDescriptor,
} from '@dnd-kit/core';
import { Center, createStyles, Grid, Text } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import TableSideBar from '../Components/TableView/TableSideBar';
import TableView from '../Components/TableView/TableView';
import Reservation from '../Models/Reservation';
import getReservationsAsync from '../Services/ApiServices';

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

interface BoxState {
  name: string;
  type: string;
}

export interface BoxSpec {
  name: string;
  type: string;
}

interface Props {
  announcements?: Announcements;
  autoScroll?: boolean;
  cancelDrop?: CancelDrop;
  children?: React.ReactNode;
  collisionDetection?: CollisionDetection;
  layoutMeasuring?: Partial<LayoutMeasuring>;
  modifiers?: Modifiers;
  screenReaderInstructions?: ScreenReaderInstructions;
  sensors?: SensorDescriptor<any>[];
  onDragStart?(event: DragStartEvent): void;
  onDragMove?(event: DragMoveEvent): void;
  onDragOver?(event: DragOverEvent): void;
  onDragEnd?(event: DragEndEvent): void;
  onDragCancel?(): void;
}

export default function TablesPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { height, width } = useViewportSize();

  function loadReservations() {
    getReservationsAsync()
      .then((response: Reservation[]) => {
        setReservations(response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      console.log('active', active);
      console.log('over', over);
    }
  }

  useEffect(() => {
    loadReservations();
  }, []);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="h-full w-full xs:pl-0 my-5">
        <Grid className="w-full">
          <Grid.Col span={12}>
            <Center className="w-full ">
              <Text size="xl" weight={500} className="pr-8">
                Tables View
              </Text>
            </Center>
          </Grid.Col>
          <Grid.Col span={12}>
            <Grid gutter="xs">
              <Grid.Col span={4}>
                <TableSideBar data={reservations} />
              </Grid.Col>
              <Grid.Col span={8}>
                <Center className="h-full w-full">
                  <TableView />
                </Center>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </div>
    </DndContext>
  );
}
