import { useScrollLock } from '@mantine/hooks';
import { useEffect } from 'react';
import SittingsCalendar from '../Components/Calendar/Calendar';

export default function Calendar() {
  const [scrollLocked, setScrollLocked] = useScrollLock();

  useEffect(() => {
    setScrollLocked(true);
  }, []);

  return (
    // <DndContext>
    <div className="px-4 w-full h-full py-2">
      <SittingsCalendar />
    </div>
    // </DndContext>
  );
}
