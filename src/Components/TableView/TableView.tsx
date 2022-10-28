import { Skeleton } from '@mantine/core';

export default function TableView() {
  return (
    <div className="border h-full w-full">
      <Skeleton className="h-full w-full" radius="md" animate={false} />
    </div>
  );
}
