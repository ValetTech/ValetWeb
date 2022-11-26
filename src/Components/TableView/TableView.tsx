/* eslint-disable react-hooks/exhaustive-deps */
import { useDroppable } from '@dnd-kit/core';
import {
  Accordion,
  Button,
  Center,
  MultiSelect,
  SegmentedControl,
  SegmentedControlItem,
  Tooltip,
} from '@mantine/core';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { IconBrandAirtable } from '@tabler/icons';
import { useEffect, useState } from 'react';
import Area from '../../Models/Area';
import ReservationParams from '../../Models/ReservationParams';
import Sitting from '../../Models/Sitting';
import Table from '../../Models/Table';
import AreaDesigner from '../Forms/AreaDesigner';
import { Draggable } from './TableSideBar';

// TODO - Nav | Area | Date | Sitting |
// TODO - Area []
// TODO - Add table footer [Square, Circle, Etc]

interface ViewHeaderProps {
  areas: Area[];
  selectedArea: Area | null;
  selectedSitting: Sitting | null;
  setSelectedArea: (area: Area | undefined) => void;
}

function ViewHeader({
  areas,
  selectedSitting,
  selectedArea,
  setSelectedArea,
}: ViewHeaderProps) {
  const addAreaSegment = { label: 'Add Area', value: '0' };
  const [data, setData] = useState<SegmentedControlItem[] | string[]>([
    { label: 'Add Area', value: '0' },
  ]);
  const [areaSegment, setAreaSegment] = useState<string>(
    selectedArea?.id?.toString() ?? data[0]?.value?.toString()
  );

  useEffect(() => {
    const activeAreas =
      areas.filter((area) =>
        selectedSitting?.areas
          ?.map((a) => a.id.toString())
          .includes(area?.id?.toString())
      ) ?? [];

    if (!activeAreas || !activeAreas?.length) {
      setSelectedArea(null);
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
    setAreaSegment(selectedArea?.id?.toString() ?? data[0]?.value?.toString());
  }, [selectedSitting, areas]);

  useEffect(() => {
    if (areaSegment === '0') {
      setSelectedArea(null);
      return;
    }
    setSelectedArea(
      areas.find((area) => area.id?.toString() === areaSegment) ?? null
    );
  }, [areaSegment]);

  return (
    <SegmentedControl
      transitionDuration={500}
      transitionTimingFunction="linear"
      data={data}
      value={areaSegment}
      onChange={setAreaSegment}
    />
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
        ? '#FFB703'
        : undefined,
    background:
      isOver &&
      over?.data?.current?.accepts?.includes(active?.data?.current?.type)
        ? '#FFB703'
        : undefined,
    backgroundColor:
      isOver &&
      over?.data?.current?.accepts?.includes(active?.data?.current?.type)
        ? '#FFB703'
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

export function TableDnD({ table }: { table: Table }) {
  return (
    <Tooltip position="top" label={`${table?.type} - ${table?.capacity} Seats`}>
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
          <div
            className={`w-11 h-11  rounded-full relative z-100 ${
              table?.reservations?.length > 0 ? ' bg-slate-500' : 'bg-blue-500'
            }`}
          >
            <Center>
              <IconBrandAirtable size={40} />
            </Center>
          </div>
        </Droppable>
      </Draggable>
    </Tooltip>
  );
}

interface TableViewProps {
  areas: Area[];
  selectedSitting: Sitting | null;
  tables: Table[] | null;
  updateSitting: (sitting: Sitting) => void;
  params: ReservationParams;
  setParams: (params: ReservationParams) => void;
  selectedArea: Area | null;
  setSelectedArea: (area: Area) => void;
  grid: JSX.Element[][];
  setGrid: (grid: JSX.Element[][]) => void;
  gridSize: number;
}

export default function TableView({
  areas,
  selectedSitting,
  tables,
  updateSitting,
  params,
  setParams,
  selectedArea,
  setSelectedArea,
  grid,
  setGrid,
  gridSize,
}: TableViewProps) {
  const [sittingAreas, setSittingAreas] = useState<Area[]>(areas);
  const [addAreasValue, setAddAreasValue] = useState<string[]>(
    selectedSitting?.areas?.map((area) => area?.id.toString()) ?? []
  );

  useEffect(() => {
    setAddAreasValue(
      selectedSitting?.areas?.map((area) => area?.id.toString()) ?? []
    );
    setSittingAreas(selectedSitting?.areas ?? areas);
  }, [areas, selectedSitting]);

  useEffect(() => {
    setParams({
      ...params,
      AreaId: selectedArea?.id?.toString() ?? undefined,
    });
  }, [selectedArea]);

  return (
    <div className="h-full w-full mr-2">
      <ViewHeader
        areas={sittingAreas ?? areas}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        selectedSitting={selectedSitting}
      />
      {selectedArea?.id ? (
        <div>
          <div className={`grid grid-cols-${gridSize ?? 12} gap-0 `}>
            {grid}
          </div>
          <div
            className={
              tables?.filter(
                (table) =>
                  table?.areaId === selectedArea?.id &&
                  (table?.xPosition === -1 || table?.yPosition === -1)
              )?.length
                ? 'block'
                : 'hidden'
            }
          >
            <h2>Unplaced Tables</h2>
            <div className="flex flex-row w-full h-full border border-slate-800">
              {tables
                ?.filter(
                  (table) =>
                    table?.areaId === selectedArea?.id &&
                    (table?.xPosition === -1 || table?.yPosition === -1)
                )
                ?.map((table) => (
                  <TableDnD key={table.id} table={table} />
                ))}
            </div>
          </div>
          <Button className="mt-2">Add New Table</Button>
        </div>
      ) : (
        <div className="flex flex-col">
          <Accordion defaultValue="existing">
            <Accordion.Item value="existing">
              <Accordion.Control>
                <h1>Update Sitting Areas</h1>
              </Accordion.Control>
              <Accordion.Panel>
                <MultiSelect
                  placeholder="Select Area"
                  clearable
                  searchable
                  nothingFound="No Areas"
                  data={areas.map((a) => ({
                    label: a.name,
                    value: a.id?.toString() ?? '',
                  }))}
                  onChange={(values) => {
                    const newAreas = values?.map((value) => {
                      const area = areas.find(
                        (a) => a.id?.toString() === value
                      );
                      return area;
                    });
                    setSittingAreas(newAreas);
                    setAddAreasValue(values);
                  }}
                  value={addAreasValue}
                />
                <Tooltip
                  position="right"
                  label={
                    selectedSitting
                      ? 'Update Sitting Areas'
                      : 'Select A Sitting'
                  }
                >
                  <Button
                    className="mt-2 bg-[#FFB703]"
                    variant="outline"
                    type="submit"
                    disabled={!selectedSitting}
                    onClick={() => {
                      if (!selectedSitting) return;
                      updateSitting({
                        ...selectedSitting,
                        areaIds: sittingAreas.map((area) => area.id),
                      });
                    }}
                  >
                    Set Areas
                  </Button>
                </Tooltip>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="designer">
              <Accordion.Control>
                <h1>Area Designer</h1>
              </Accordion.Control>
              <Accordion.Panel>
                <AreaDesigner />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      )}
    </div>
  );
}
