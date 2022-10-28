import DraggableSitting from './DraggableSitting';

export default function DefaultSittings() {
  const defaultSittings = [
    {
      id: 'breakfast',
      className: 'sitting',
      data: {
        title: 'Breakfast',
        duration: '01:00',
      },
    },
    {
      id: 'lunch',
      className: 'sitting',
      data: {
        title: 'Lunch',
        duration: '01:00',
      },
    },
    {
      id: 'dinner',
      className: 'sitting',
      data: {
        title: 'Dinner',
        duration: '01:00',
      },
    },
    {
      id: 'special',
      className: 'sitting',
      data: {
        title: 'Special',
        duration: '01:00',
      },
    },
  ];

  return (
    <div className="border p-2">
      <div>Default Sittings</div>
      <div className=" flex flex-row">
        {defaultSittings.map((sitting) => (
          <div key={sitting.id} className="m-2 p-1 border">
            <DraggableSitting
              key={sitting.id}
              id={sitting.id}
              data={sitting.data}
            >
              {sitting.data.title}
            </DraggableSitting>
          </div>
        ))}
      </div>
    </div>
  );
}
