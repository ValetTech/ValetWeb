// Components
// #region
import { useState, useEffect } from 'react';
import { Title, Card } from '@mantine/core';
// #endregion

// Services
// #region
import { getSittingsAsync } from '../../Services/ApiServices';
// #endregion

// Models
// #region
import Sitting from '../../Models/Sitting';
// #endregion
export default function VacancyWidget() {
  // const [sittingData, setSittingData] = useState([]);
  // const [capacity, setCapacity] = useState();
  // const [vacancy, setVacancy] = useState();

  // useEffect(() => {
  //   async function fetchSittings() {
  //     const res: Sitting[] = await getSittingsAsync();
  //     setSittingData(res);
  //   }
  //   fetchSittings();
  // }, []);

  // useEffect(() => {
  //   function getCapacity() {
  //     // Getting capacity prop value from each sitting object
  //     const capacityArray = sittingData.map((s) => {
  //       return s.capacity;
  //     });

  //     setCapacity(
  //       capacityArray.reduce((accumulator, value) => {
  //         return accumulator + value;
  //       }, 0)
  //     );
  //   }
  // }, [sittingData]);

  return (
    <Card mt={6} mb={10} radius="md">
      <Title>Hello</Title>
    </Card>
  );
}
