import {
  ActionIcon,
  ColorSwatch,
  Group,
  NumberInput,
  NumberInputHandlers,
  Select,
  Text,
} from '@mantine/core';
import {
  IconLetterF,
  IconLetterM,
  IconLetterS,
  IconLetterT,
  IconLetterW,
} from '@tabler/icons';
import { useRef, useState } from 'react';

export default function Recurrence() {
  const [value, setValue] = useState(0);
  const handlers = useRef<NumberInputHandlers>();
  // recurring event modal
  return (
    <div>
      <Text className="">Recurrence</Text>
      {/* Repeat X time for Y */}
      <Group className="w-full flex flex-row" position="left" spacing="xs">
        <Text className="">Repeat every </Text>
        <Group>
          <CustomNumberInput
            value={value}
            setValue={setValue}
            handlers={handlers}
            className="max-w-[40%]"
          />
          <Select data={['Day', 'Week', 'Month']} className="max-w-[40%]" />
        </Group>
      </Group>
      <div>Repeat on:</div>
      <DaySelector />
      <div>Repeat until [date]</div>
      <div>Date</div>
      <div>Repeat X times</div>
      <CustomNumberInput
        value={value}
        setValue={setValue}
        handlers={handlers}
      />
    </div>
  );
}

function DaySelector() {
  const [checked, setChecked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayIcons = [
    <IconLetterS key="Sun" size={20} />,
    <IconLetterM key="Mon" size={20} />,
    <IconLetterT key="Tues" size={20} />,
    <IconLetterW key="Wed" size={20} />,
    <IconLetterT key="Thur" size={20} />,
    <IconLetterF key="Fri" size={20} />,
    <IconLetterS key="Sat" size={20} />,
  ];
  const daysOfWeek = days.map((day, index) => (
    <ColorSwatch
      key={day}
      component="button"
      color={checked[index] ? 'red' : 'gray'}
      onClick={() =>
        setChecked((current) => current.map((c, i) => (i === index ? !c : c)))
      }
      sx={{ color: '#fff', cursor: 'pointer' }}
    >
      {dayIcons[index]}
    </ColorSwatch>
  ));

  return (
    <div>
      <Group position="center" spacing="xs">
        {daysOfWeek}
      </Group>
    </div>
  );
}

function CustomNumberInput({ value, setValue, handlers, className }: any) {
  return (
    <Group spacing={5} className={className}>
      <ActionIcon
        size={36}
        variant="default"
        onClick={() => handlers.current.decrement()}
      >
        –
      </ActionIcon>

      <NumberInput
        hideControls
        value={value}
        onChange={(val) => setValue(val)}
        handlersRef={handlers}
        min={0}
        styles={{ input: { width: 54, textAlign: 'center' } }}
      />

      <ActionIcon
        size={36}
        variant="default"
        onClick={() => handlers.current.increment()}
      >
        +
      </ActionIcon>
    </Group>
  );
}
