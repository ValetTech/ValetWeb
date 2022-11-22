// Components
// #region
import { Button, Card, Container, Group, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import CreateSittingModal from '../Forms/CreateSittingModal';
import SittingTableStickyHeader from '../Tables/SittingTableStickyHeader';
// #endregion

// Models
// #region
import Area from '../../Models/Area';
// #endregion

// Services
// #region
import { getAreasAsync, getSittingsAsync } from '../../Services/ApiServices';
// #endregion

export default function SittingSettingsWidget() {
  const [sittingData, setSittingData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [createSittingModalOpened, setCreateSittingModalOpened] =
    useState(false);

  useEffect(() => {
    async function fetchSittings() {
      const res: Area[] = await getSittingsAsync();
      setSittingData(res);
    }
    fetchSittings();
  }, []);
  useEffect(() => {
    async function fetchAreas() {
      const res: Area[] = await getAreasAsync();
      setAreaData(res);
    }
    fetchAreas();
  }, []);

  const sittings: {
    key: number;
    capacity: number;
    type: string;
    startTime: string;
    endTime: string;
  }[] = sittingData.map((s) => ({
    key: s.id,
    capacity: s.capacity,
    type: s.type,
    startTime: s.startTime,
    endTime: s.endTime,
  }));

  const areas: { key: number; value: string; label: string }[] = areaData.map(
    (a) => ({
      key: a.id,
      value: a.name,
      label: a.name,
    })
  );

  return (
    <Container mt={6}>
      <Card withBorder radius="md">
        <Title size="h4" mb={10}>
          Sittings
        </Title>
        <SittingTableStickyHeader data={sittings} areaData={areas} />
        <Group mt={20} position="left">
          <Button
            className="bg-[#FFB703]"
            size="lg"
            onClick={() => {
              setCreateSittingModalOpened(true);
            }}
          >
            Create
          </Button>
        </Group>
      </Card>
      <CreateSittingModal
        opened={createSittingModalOpened}
        onClose={() => {
          setCreateSittingModalOpened(false);
        }}
        areaData={areas}
      />
    </Container>
  );
}
