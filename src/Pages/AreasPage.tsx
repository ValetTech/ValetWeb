/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/no-use-before-define */

import {
  Box,
  Button,
  Card,
  Group,
  Modal,
  SegmentedControl,
  Table,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPencil } from '@tabler/icons';
import { useEffect, useState } from 'react';
import AreaDesigner from '../Components/Forms/AreaDesigner';
import ErrorNotification from '../Components/Notifications/NotifyError';
import Area from '../Models/Area';
import { createAreaAsync, getAreasAsync } from '../Services/ApiServices';

function AreasTable({ areas }: { areas: Area[] | undefined }) {
  if (!areas || areas?.length === 0) {
    return <div>No areas found</div>;
  }
  const rows = areas?.map((area) => (
    <tr key={area.id}>
      <td>{area.name}</td>
      <td>{area.description}</td>
      <td>
        {area.width}m by {area.height}m
      </td>
      <td>{area.sittings?.length ?? 0}</td>
      <td>{area.tables?.length ?? 0}</td>
    </tr>
  ));

  return (
    <Table highlightOnHover>
      <thead>
        <tr>
          <th>Name</th>
          <th>description</th>
          <th>Size</th>
          <th>Number of Sittings</th>
          <th>Number of tables</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default function AreasPage() {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState('areas');
  const [areas, setAreas] = useState<Area[]>();

  useEffect(() => {
    getAreasAsync()
      .then((res) => setAreas(res))
      .catch((err) => {
        ErrorNotification(err.message);
      });
  }, []);

  function modalClose() {
    setOpened(false);
  }
  return (
    <div className="mx-3">
      <h1>{value === 'areas' ? 'Areas' : 'Area Designer'}</h1>
      <SegmentedControl
        value={value}
        onChange={setValue}
        fullWidth
        data={[
          { label: 'Areas', value: 'areas' },
          { label: 'Area Designer', value: 'areaDesigner' },
        ]}
      />
      <div className="mx-1">
        <Card shadow="sm">
          {value === 'areas' ? <AreasTable areas={areas} /> : <AreaDesigner />}
        </Card>
      </div>
    </div>
  );
}

interface CreateAreaModalProps {
  opened: boolean;
  onClose(): void;
}

function CreateAreaModal({ opened, onClose }: CreateAreaModalProps) {
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      venueId: 1,
    },
    validate: {
      name: (value) => (value.length < 1 ? 'Please enter a valid name' : null),
      description: (value) =>
        value.length < 1 ? 'Please enter a valid description' : null,
    },
  });

  function onSubmit(values: any) {
    const area: Area = {
      name: values.name,
      description: values.description,
      venueId: values.venueId,
    };
    createAreaAsync(area);
    onClose();
  }

  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title="Create New Area"
      size="xl"
    >
      <Card radius="md" p="xl">
        <Title align="center">Create Area</Title>
        <Box sx={{ maxWidth: 300 }} mx="auto" mt={20}>
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <TextInput
              withAsterisk
              label="Name"
              placeholder="Pick a distinctive name"
              icon={<IconPencil />}
              {...form.getInputProps('name')}
            />

            <Textarea
              withAsterisk
              autosize
              minRows={2}
              maxRows={4}
              label="Description"
              mt={20}
              mb={20}
              icon={<IconPencil />}
              {...form.getInputProps('description')}
            />
            <Group position="center" mt="md">
              <Button type="submit" color="#FFB703" className="bg-[#FFB703]">
                Submit
              </Button>
            </Group>
          </form>
        </Box>
      </Card>
    </Modal>
  );
}

/*

{
  "id": 0,
  "name": "string",
  "description": "string",
  "venueId": 0,
  "tables": [
    {
      "id": 0,
      "type": "string",
      "capacity": 0,
      "areaId": 0
    }
  ],
  "sittings": [
    {
      "id": 0,
      "capacity": 0,
      "type": "Breakfast",
      "startTime": "2022-11-01T01:48:55.248Z",
      "endTime": "2022-11-01T01:48:55.248Z",
      "venueId": 0,
      "areas": [
        "string"
      ],
      "reservations": [
        {
          "id": 0,
          "customerId": 0,
          "customer": {
            "id": 0,
            "firstName": "string",
            "lastName": "string",
            "email": "string",
            "phone": "stringst",
            "reservations": [
              "string"
            ],
            "isVip": true
          },
          "sittingId": 0,
          "sitting": "string",
          "dateTime": "string",
          "duration": 0,
          "noGuests": 0,
          "source": "Website",
          "venueId": 0,
          "tables": [
            {
              "id": 0,
              "type": "string",
              "capacity": 0,
              "areaId": 0
            }
          ],
          "status": "Pending",
          "notes": "string"
        }
      ]
    }
  ]
}

*/
