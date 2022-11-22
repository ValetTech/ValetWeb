// Components
// #region
import { Button, Card, Container, Group, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import CreateAreaModal from '../Forms/CreateAreaModal';
import AreaTableStickyHeader from '../Tables/AreaTableStickyHeader';
// #endregion

// Models
// #region
import Area from '../../Models/Area';
// #endregion

// Services
// #region
import { getAreasAsync } from '../../Services/ApiServices';
// #endregion

export default function AreaSettingsWidget() {
  const [areaData, setAreaData] = useState([]);
  const [createAreaModalOpened, setCreateAreaModalOpened] = useState(false);

  useEffect(() => {
    async function fetchAreas() {
      const res: Area[] = await getAreasAsync();
      setAreaData(res);
    }
    fetchAreas();
  }, []);

  const areas: { key: number; name: string; description: string }[] =
    areaData.map((a) => ({
      key: a.id,
      name: a.name,
      description: a.description,
    }));

  return (
    <Container mt={6}>
      <Card withBorder radius="md">
        <Title size="h4" mb={10}>
          Areas
        </Title>
        <AreaTableStickyHeader data={areas} />
        <Group mt={20} position="left">
          <Button
            className="bg-[#FFB703]"
            size="lg"
            onClick={() => {
              setCreateAreaModalOpened(true);
            }}
          >
            Create
          </Button>
        </Group>
      </Card>
      <CreateAreaModal
        opened={createAreaModalOpened}
        onClose={() => {
          setCreateAreaModalOpened(false);
        }}
      />
    </Container>
  );
}
