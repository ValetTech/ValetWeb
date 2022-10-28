import { Chip, createStyles } from '@mantine/core';
import { useEventListener } from '@mantine/hooks';

const styles = createStyles((theme) => ({
  chips: {
    padding: theme.spacing.xs,
    paddingLeft: 0,
    paddingBottom: 0,
    // hide input
    '& input': {
      display: 'none',
    },
  },
}));

interface Props {
  filters: string[];
  onChange: (filters: string[]) => void;
}

export default function FilterChips({ filters, onChange }: Props) {
  const onWheel = (e: any) => {
    if (e.deltaY === 0) return;
    e.preventDefault();

    e.currentTarget.scrollTo({
      left: e.currentTarget.scrollLeft + e.deltaY,
      // behavior: 'smooth',
    });
  };

  const ref = useEventListener('wheel', onWheel);

  const { classes } = styles();

  return (
    <div
      ref={ref}
      className="w-full overflow-x-auto no-scrollbar no-scrollbar::-webkit-scrollbar"
    >
      <Chip.Group
        multiple
        position="left"
        spacing={5}
        noWrap
        align="flex-start"
        className={`${classes.chips} w-0 pb-2 pt-2`}
        value={filters}
        onChange={onChange}
      >
        <Chip value="All">All</Chip>
        <Chip value="Available">Available</Chip>
        <Chip value="Occupied">Occupied</Chip>
        <Chip value="Reserved">Reserved</Chip>
      </Chip.Group>
    </div>
  );
}
