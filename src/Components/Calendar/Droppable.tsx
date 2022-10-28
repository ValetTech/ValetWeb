import { useDroppable } from '@dnd-kit/core';

export default function Droppable({ id, data, children }: any) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div className="w-full h-full" ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}
