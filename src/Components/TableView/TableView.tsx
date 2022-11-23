import { useDroppable } from '@dnd-kit/core';
import {
  Button,
  Grid,
  SegmentedControl,
  SegmentedControlItem,
} from '@mantine/core';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { useEffect, useState } from 'react';
import Area from '../../Models/Area';
import Sitting from '../../Models/Sitting';
import Table from '../../Models/Table';
import AreaDesigner from '../Area/AreaDesigner';
import { Draggable } from './TableSideBar';

// TODO - Nav | Area | Date | Sitting |
// TODO - Area []
// TODO - Add table footer [Square, Circle, Etc]

interface ViewHeaderProps {
  areas: Area[];
  selectedArea: Area | null;
  selectedSitting: Sitting | null;
  selectArea: (area: Area | null) => void;
}

function ViewHeader({
  areas,
  selectedSitting,
  selectedArea,
  selectArea,
}: ViewHeaderProps) {
  const addAreaSegment = { label: 'Add Area', value: '0' };
  const [data, setData] = useState<SegmentedControlItem[] | string[]>([
    { label: 'Add Area', value: '0' },
  ]);

  useEffect(() => {
    const activeAreas =
      areas.filter((area) =>
        selectedSitting?.areas
          ?.map((a) => a.id.toString())
          .includes(area?.id?.toString())
      ) ?? [];

    if (!activeAreas || !activeAreas?.length) {
      selectArea(null);
      setData([addAreaSegment]);
      return;
    }
    setData(
      activeAreas
        .map(({ id, name }) => ({
          label: name,
          value: id?.toString() ?? '',
        }))
        .concat({ label: 'Add Area', value: '0' })
    );
  }, [selectedSitting, areas]);

  // useEffect(() => {
  //   console.log('Areas: ', areas);
  //   if (areas.length > 1) {
  //     setData(
  //       areas
  //         .map(({ id, name }) => ({ label: name, value: id?.toString() ?? '' }))
  //         .concat({ label: 'Add Area', value: '0' })
  //     );
  //   }
  // }, [areas]);
  // useEffect(() => {
  //   console.log('SelectedArea: ', selectedArea);
  // }, [selectedArea]);

  return (
    <div className="flex flex-row justify-between z-50">
      <SegmentedControl
        transitionDuration={500}
        transitionTimingFunction="linear"
        data={data}
        value={selectedArea?.id?.toString() ?? '0'}
        onChange={(value) =>
          +value > 0
            ? selectArea(areas?.find((a) => a.id?.toString() === value) ?? null)
            : selectArea(null)
        }
      />
      {/* <BasicDateTimePicker /> */}
    </div>
  );
}

export function Droppable({
  id,
  accepts,
  children,
}: {
  id: string;
  accepts: string[];
  children: any;
}) {
  const { isOver, setNodeRef, over, active } = useDroppable({
    id,
    data: { accepts },
  });
  const style = {
    color:
      isOver &&
      over?.data?.current?.accepts?.includes(active?.data?.current?.type)
        ? 'green'
        : undefined,
    background:
      isOver &&
      over?.data?.current?.accepts?.includes(active?.data?.current?.type)
        ? 'green'
        : undefined,
    backgroundColor:
      isOver &&
      over?.data?.current?.accepts?.includes(active?.data?.current?.type)
        ? 'green'
        : undefined,
  };
  // if (over && over.data.current.accepts.includes(active.data.current.type)) {
  // }

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

function TableDnD({ table }: { table: Table }) {
  return (
    <Draggable
      key={`table-${table.id}`}
      id={`table-${table.id}`}
      // data={table}
      type="table"
    >
      <Droppable
        key={`table-${table.id}`}
        id={`table-${table.id}`}
        accepts={['reservation']}
      >
        <Button>
          <div className="flex flex-col justify-between">
            <div>{table?.type}</div>
            <div>
              {table?.xPosition},{table?.yPosition}
            </div>
            <div>{table?.capacity} Seats</div>
          </div>
        </Button>
      </Droppable>
    </Draggable>
  );
}

function CreateGrid({ area, tables }: { area: Area; tables: Table[] | null }) {
  return (
    <Grid
      gutter={0}
      className="w-full border  z-0"
      grow
      columns={area?.width ?? 12}
    >
      {Array(area?.width ?? 12)
        .fill(0)
        .map((_, x) => (
          <Grid.Col key={x} span={1}>
            {Array(area?.height ?? 12)
              .fill(0)
              .map((_, y) => (
                <Droppable
                  key={`${x},${y}`}
                  id={`${x},${y}`}
                  accepts={['table']}
                >
                  <div key={y} className="h-10 w-full  border  z-0">
                    {tables
                      ?.filter(
                        (table) =>
                          table?.areaId === area?.id &&
                          table?.xPosition === x &&
                          table?.yPosition === y
                      )
                      ?.map((table) => (
                        <TableDnD key={table.id} table={table} />
                      ))}
                  </div>
                </Droppable>
              ))}
          </Grid.Col>
        ))}
    </Grid>
  );
}

interface TableViewProps {
  areas: Area[];
  selectedSitting: Sitting | null;
  tables: Table[] | null;
  // selectedArea: Area;
  // selectArea: (area: Area) => void;
}

export default function TableView({
  areas,
  selectedSitting,
  tables,
}: TableViewProps) {
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [sittingAreas, setSittingAreas] = useState<Area[]>(areas);

  useEffect(() => {
    // const newAreas = areas?.map((area) => {
    //   const newArea = { ...area };
    //   newArea?.tables?.forEach((table) => {
    //     table?.sittings?.forEach((sitting) => {
    //       sitting?.reservations?.forEach((reservation) => {
    //         reservation?.guests?.forEach((guest) => {
    //           guest?.name = 'Guest';
    //         });
    //       });
    //     });
    //   });
    //   return newArea;
    // });
    // setSittingAreas(newAreas);

    setSittingAreas(selectedSitting?.areas ?? areas);
  }, [areas, selectedSitting]);

  return (
    <div className="h-full w-full mr-2">
      <ViewHeader
        areas={sittingAreas ?? areas}
        selectedArea={selectedArea}
        selectArea={setSelectedArea}
        selectedSitting={selectedSitting}
      />
      {selectedArea?.id ? (
        <div>
          <CreateGrid area={selectedArea} tables={tables} />
          {tables?.length ? (
            tables
              ?.filter(
                (table) =>
                  table?.areaId === selectedArea?.id &&
                  (table?.xPosition === -1 || table?.yPosition === 1)
              )
              ?.map((table) => <TableDnD key={table.id} table={table} />)
          ) : (
            <Button>Add Table</Button>
          )}
        </div>
      ) : (
        <AreaDesigner />
      )}

      {/* <Skeleton className="h-full w-full" radius="md" animate={false} /> */}
    </div>
  );
}
