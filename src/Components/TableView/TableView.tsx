import { useDroppable } from '@dnd-kit/core';
import { Button, Grid, SegmentedControl } from '@mantine/core';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { useEffect, useState } from 'react';
import Area from '../../Models/Area';
import Sitting from '../../Models/Sitting';

// TODO - Nav | Area | Date | Sitting |
// TODO - Area []
// TODO - Add table footer [Square, Circle, Etc]

interface ViewHeaderProps {
  areas: Area[];
  selectedArea: Area | null;
  selectArea: (area: Area | null) => void;
}

function ViewHeader({ areas, selectedArea, selectArea }: ViewHeaderProps) {
  useEffect(() => {
    console.log('Areas: ', areas);
  }, [areas]);
  useEffect(() => {
    console.log('SelectedArea: ', selectedArea);
  }, [selectedArea]);

  return (
    <div className="flex flex-row justify-between">
      {areas.length ? (
        <SegmentedControl
          data={
            areas.length
              ? areas?.map((area) => ({
                  label: area?.name ?? 'AREA',
                  value: area?.id?.toString() ?? '0',
                }))
              : [
                  { label: 'All', value: '0' },
                  { label: 'Area 1', value: '1' },
                  { label: 'Area 2', value: '2' },
                  { label: 'Area 2', value: '3' },
                ]
          }
          value={selectedArea?.id?.toString() ?? undefined}
          onChange={(value) =>
            selectArea(
              areas?.find((area) => area?.id?.toString() === value) ?? null
            )
          }
        />
      ) : (
        <Button variant="outline" className="bg-[#FFB703] ml-5">
          Add Area
        </Button>
      )}
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
  // selectedArea: Area;
  // selectArea: (area: Area) => void;
}

export default function TableView({ areas, selectedSitting }: TableViewProps) {
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
        className="w-full border"
        grow
        columns={selectedArea?.width ?? 12}
      >
        {Array(selectedArea?.width ?? 12)
          .fill(0)
          .map((_, x) => (
            <Grid.Col key={x} span={1}>
              {Array(selectedArea?.height ?? 12)
                .fill(0)
                .map((_, y) => (
                  <Droppable key={`${x},${y}`} id={`${x},${y}`}>
                    <div key={y} className="h-10 w-full bg-[#FFB703] border">
                      {`${x},${y}`}
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
