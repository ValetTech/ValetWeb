/* eslint-disable react/jsx-props-no-spreading */
import {
  Center,
  Chip,
  createStyles,
  Grid,
  Group,
  Table,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import update from 'immutability-helper';
import { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend, NativeTypes } from 'react-dnd-html5-backend';
import ItemTypes from '../Components/TableView/ItemTypes';
import { Box } from '../Components/TableView/Table';
import TableView from '../Components/TableView/TableView';

const styles = createStyles((theme) => ({
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
  chip: {
    padding: theme.spacing.xs,
    paddingLeft: 0,
    paddingBottom: 0,
    // hide input
    '& input': {
      display: 'none',
      // opacity: 0,
      // position: 'absolute',
      // left: -9999,
    },
  },
}));

function FilterChips() {
  const { classes } = styles();
  return (
    <Group
      position="left"
      spacing={5}
      noWrap
      align="flex-start"
      className={`${classes.chip} w-0`}
    >
      <Chip value="All">All</Chip>
      <Chip value="Available">Available</Chip>
      <Chip value="Occupied">Occupied</Chip>
      <Chip value="Reserved">Reserved</Chip>
    </Group>
  );
}

// TODO - add a search bar to filter the table
// TODO - add a button to filter the table
// TODO - add a button to sort the table
// TODO - show list of reservations
// TODO - show list of tables
// TODO - undo shortcut and icon

interface DustbinState {
  accepts: string[];
  lastDroppedItem: any;
}

interface BoxState {
  name: string;
  type: string;
}

export interface DustbinSpec {
  accepts: string[];
  lastDroppedItem: any;
}
export interface BoxSpec {
  name: string;
  type: string;
}
export interface ContainerState {
  droppedBoxNames: string[];
  dustbins: DustbinSpec[];
  boxes: BoxSpec[];
}

function TablesPage() {
  const theme = useMantineTheme();
  const [boxes] = useState<BoxState[]>([
    { name: 'Bottle', type: ItemTypes.GLASS },
    { name: 'Banana', type: ItemTypes.FOOD },
    { name: 'Magazine', type: ItemTypes.PAPER },
  ]);

  const [dustbins, setDustbins] = useState<DustbinState[]>([
    { accepts: [ItemTypes.GLASS], lastDroppedItem: null },
    { accepts: [ItemTypes.FOOD], lastDroppedItem: null },
    {
      accepts: [ItemTypes.PAPER, ItemTypes.GLASS, NativeTypes.URL],
      lastDroppedItem: null,
    },
    { accepts: [ItemTypes.PAPER, NativeTypes.FILE], lastDroppedItem: null },
  ]);

  const items = [
    <tr key={1}>
      <td>1</td>
      <td>Table 1</td>
    </tr>,
  ];

  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([]);

  function isDropped(boxName: string) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }

  const handleDrop = useCallback(
    (index: number, item: { name: string }) => {
      const { name } = item;
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
      );
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        })
      );
    },
    [droppedBoxNames, dustbins]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className=" xs:pl-0 my-5">
        <Grid className="w-full">
          <Grid.Col span={12}>
            <Center>
              <Text size="xl" weight={500} className="pr-16">
                Tables View
              </Text>
            </Center>
          </Grid.Col>
          <Grid.Col span={12}>
            <Center>
              <Grid gutter="xs">
                <Grid.Col span={4}>
                  <Center className="w-full">
                    {/* <ScrollArea type="never"> */}
                    <div className="w-full">
                      <TextInput
                        placeholder="Search by any field"
                        icon={<IconSearch size={14} stroke={1.5} />}
                      />
                      <div className="w-full overflow-x-auto no-scrollbar no-scrollbar::-webkit-scrollbar">
                        <FilterChips />
                      </div>
                      <Table highlightOnHover>
                        <thead>
                          <tr>
                            <th>Header 1</th>
                            <th>Header 2</th>
                          </tr>
                        </thead>
                        <tbody>
                          {boxes.map(({ name, type }, index) => (
                            <tr key={index}>
                              <Box
                                name={name}
                                type={type}
                                isDropped={isDropped(name)}
                                key={index}
                              />
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    {/* </ScrollArea> */}
                  </Center>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Center>
                    <TableView />
                  </Center>
                  {/* <Skeleton height={10} radius="md" animate={false}></Skeleton> */}
                </Grid.Col>
              </Grid>
            </Center>
          </Grid.Col>
        </Grid>
      </div>
    </DndProvider>
  );
}

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

export default TablesPage;
