/* eslint-disable react/jsx-props-no-spreading */
import { useDraggable } from '@dnd-kit/core';

export default function DraggableSitting({ id, data, children }: any) {
  // modifiers={[restrictToWindowEdges]}
  //   activationConstraint={{
  //     distance: 15,
  //   }}
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      supports: ['sitting'],
      ...data,
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
