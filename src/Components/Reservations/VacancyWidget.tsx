// Components
// #region
import { useState, useEffect } from 'react';
import { Title } from '@mantine/core';
// #endregion

// Services
// #region
import { getSittingsAsync } from '../../Services/ApiServices';
// #endregion

export default function VacancyWidget() {
  const [capacity, setCapacity] = useState();
  const [vacancy, setVacancy] = useState();

  useEffect(() => {
    const sittings = getSittingsAsync();
  }, []);

  return <Title>Hello</Title>;
}
