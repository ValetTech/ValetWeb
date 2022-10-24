// Components
// #region
import {
  Card,
  Container,
  Select,
  SimpleGrid,
  Title,
  Button,
  Group,
  Modal,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import SittingTableStickyHeader from '../Tables/SittingTableStickyHeader';
import CreateSittingModal from '../Forms/CreateSittingModal';
// #endregion

// Models
// #region
import Area from '../../Models/Area';
import Sitting from '../../Models/Sitting';
import Reservation from '../../Models/Reservation';
// #endregion

// Services
// #region
import {
  getAreasAsync,
  getSittingsAsync,
  getReservationByDateAsync,
} from '../../Services/ApiServices';
// #endregion

export default function SittingSettingsWidget() {
  const [sittingData, setSittingData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [createSittingModalOpened, setCreateSittingModalOpened] =
    useState(false);

  useEffect(() => {
    async function fetchSittings() {
      const res: Area[] = await getSittingsAsync();
      setSittingData(res.sittings);
    }
    fetchSittings();
  }, []);
  useEffect(() => {
    async function fetchAreas() {
      const res: Area[] = await getAreasAsync();
      setAreaData(res.areas);
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
