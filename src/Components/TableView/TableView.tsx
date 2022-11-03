import { SegmentedControl } from '@mantine/core';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import Area from './DragArea';

// TODO - Nav | Area | Date | Sitting |
// TODO - Area []
// TODO - Add table footer [Square, Circle, Etc]

function ViewHeader() {
  return (
    <div className="flex flex-row justify-between">
      <SegmentedControl
        data={[
          { label: 'All', value: 'svelte' },
          { label: 'Area 1', value: 'react' },
          { label: 'Area 2', value: 'ng' },
          { label: 'Area 2', value: 'vue' },
        ]}
      />
      {/* <BasicDateTimePicker /> */}
    </div>
  );
}

export default function TableView() {
  return (
    <div className="h-full w-full ">
      <ViewHeader />
      <Area />
      {/* <Skeleton className="h-full w-full" radius="md" animate={false} /> */}
    </div>
  );
}
