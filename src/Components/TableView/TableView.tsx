import { useDroppable } from '@dnd-kit/core';
import {
  Button,
  Center,
  Grid,
  SegmentedControl,
  SegmentedControlItem,
  Tooltip,
} from '@mantine/core';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { useEffect, useState } from 'react';
import Area from '../../Models/Area';
import Sitting from '../../Models/Sitting';
import Table from '../../Models/Table';

// TODO - Nav | Area | Date | Sitting |
// TODO - Area []
// TODO - Add table footer [Square, Circle, Etc]

interface ViewHeaderProps {
  areas: Area[];
  selectedArea: Area | null;
  selectArea: (area: Area | null) => void;
}

function CreateSegement({
  id,
  name,
  description,
}: {
  id: number | undefined;
  name: string;
  description: string | undefined;
}) {
  return {
    label: (
      // <div className="">
      <Center>
        <Tooltip
          withArrow
          label={description ?? 'Add an area to Sitting'}
          position="top"
        >
          {/* <IconEye size={16} /> */}
          <Button ml={10}>{name}</Button>
        </Tooltip>
      </Center>
      // </div>
    ),
    value: id?.toString() ?? '',
  };
}

function ViewHeader({ areas, selectedArea, selectArea }: ViewHeaderProps) {
  const addAreaSegement = { label: 'Add Area', value: '0' };
  const [data, setData] = useState<SegmentedControlItem[] | string[]>([
    // { label: 'No Areas', value: '-1' },
    { label: 'Add Area', value: '0' },
  ]);

  useEffect(() => {
    console.log('Data', data);
  }, [data]);

  useEffect(() => {
    console.log('Areas: ', areas);
    if (areas.length > 1) {
      setData(
        areas
          .map(({ id, name }) => ({ label: name, value: id?.toString() ?? '' }))
          .concat({ label: 'Add Area', value: '0' })
      );
    }

    // setData(
    //   (areas.length ? areas : [{ name: 'No Areas', id: -1 }])
    //     ?.map((area) => ({
    //       label: area?.name,
    //       value: area?.id?.toString() ?? '',
    //     }))
    //     .concat([{ label: 'Add Area', value: '0' }])
    // );
  }, [areas]);
  useEffect(() => {
    console.log('SelectedArea: ', selectedArea);
  }, [selectedArea]);

  return (
    <div className="flex flex-row justify-between z-50">
      <SegmentedControl
        transitionDuration={500}
        transitionTimingFunction="linear"
        data={data}
        value={selectedArea?.id?.toString() ?? undefined}
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

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
    background: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
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
    <div className="h-full w-full">
      <ViewHeader
        areas={sittingAreas ?? areas}
        selectedArea={selectedArea}
        selectArea={setSelectedArea}
      />

      <Grid
        gutter={0}
        className="w-full border  z-0"
        grow
        columns={selectedArea?.width ?? 12}
      >
        {Array(selectedArea?.width ?? 12)
          .fill(0)
          .map((_, x) => (
            <Grid.Col key={x} span={1} className=" z-0">
              {Array(selectedArea?.height ?? 12)
                .fill(0)
                .map((_, y) => (
                  <Droppable
                    key={`${x},${y}`}
                    id={`${x},${y}`}
                    zIndex={0}
                    className=""
                  >
                    <div
                      key={y}
                      className="h-10 w-full bg-[#FFB703] border  z-0"
                    >
                      {/* {`${x},${y}`} */}
                      {`${tables
                        ?.filter(
                          (table) =>
                            table?.areaId === selectedArea?.id &&
                            table?.xPosition === x &&
                            table?.yPosition === y
                        )
                        .map((table) => table?.type)}`}
                    </div>
                  </Droppable>
                ))}
            </Grid.Col>
          ))}
      </Grid>

      {/* <Area /> */}
      {selectedArea?.tables?.map((table) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Droppable key={table.id} id={table.id}>
          {/* {parent === id ? draggableMarkup : 'Drop here'} */}
          drop here
        </Droppable>
      ))}
      {/* <Skeleton className="h-full w-full" radius="md" animate={false} /> */}
    </div>
  );
}
