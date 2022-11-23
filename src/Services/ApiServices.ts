import axios from 'axios';
import { store } from '../App/store';

import Area from '../Models/Area';
import Customer from '../Models/Customer';
import Reservation from '../Models/Reservation';
import ReservationParams from '../Models/ReservationParams';
import Sitting from '../Models/Sitting';
import Table from '../Models/Table';
// import { IApiService } from './IApiService';
// const API_URL = 'https://localhost:7028/api';
axios.defaults.baseURL = 'https://valetapi.azurewebsites.net/api/';
// axios.defaults.headers.common = {
//   'Content-Type': 'application/json',
//   Accept: 'application/json',
// };

function getTokenFromState() {
  const reduxStore = store.getState();
  const { token } = reduxStore.auth;

  return token;
}
axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.headers.common.Authorization = `Bearer ${getTokenFromState()}`;

axios.defaults.headers.common['X-Version'] = '2.0';
// axios.defaults.baseURL = 'https://localhost:7028/api';
// axios.defaults.headers.post['Content-Type'] = 'application/json-patch+json';
// axios.defaults.headers.post['Content-Type'] =
// 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// RESERVATION

export default async function getReservationsAsync(params?: ReservationParams) {
  const response = await axios.get('/reservations', {
    // withCredentials: false,
    headers: {
      Authorization: `Bearer ${getTokenFromState()}`,
    },
    params: {
      ...params,
    },
  });

  return response.data.reservations;
}

export async function getReservationByIdAsync(id: number) {
  const response = await axios.get(`/reservations?id=${id}`, {
    // withCredentials: false,
    headers: {
      Authorization: `Bearer ${getTokenFromState()}`,
    },
  });

  return response.data.reservations;
}

export async function getReservationByDateAsync(date: string) {
  const response = await axios.get(`/reservations?Date=${date}`, {
    // withCredentials: false,
    headers: {
      Authorization: `Bearer ${getTokenFromState()}`,
    },
  });

  return response.data.reservations;
}

export function createReservationAsync(reservation: Reservation) {
  const response = axios.post(
    `/reservations`,
    {
      ...reservation,
    },
    {
      headers: {
        Authorization: `Bearer ${getTokenFromState()}`,
      },
    }
  );
  return response;
}

export function createReservationAndCustomerAsync(
  reservationWithCustomer: any
) {
  const response = axios.post(
    `/reservations`,
    {
      ...reservationWithCustomer,
    },
    {
      headers: {
        Authorization: `Bearer ${getTokenFromState()}`,
      },
    }
  );
  return response;
}

export function updateReservationAndCustomerAsync(
  reservationWithCustomer: any
) {
  const response = axios.put(
    `/reservations`,
    {
      ...reservationWithCustomer,
    },
    {
      headers: {
        Authorization: `Bearer ${getTokenFromState()}`,
      },
    }
  );
  return response;
}

export async function updateReservationAsync(
  id: number,
  reservation: Reservation
) {
  const response = await axios.put(
    `/reservations/${id}`,
    {
      ...reservation,
    },
    {
      headers: {
        Authorization: `Bearer ${getTokenFromState()}`,
      },
    }
  );
  return response;
}

export function deleteReservationAsync(id: number) {
  const response = axios.delete(`/reservations/${id}`, {
    headers: {
      Authorization: `Bearer ${getTokenFromState()}`,
    },
  });
  return response;
}

// AREA
export async function getAreasAsync() {
  const response = await axios.get('/areas', {
    // withCredentials: false,
    headers: {
      Authorization: `Bearer ${getTokenFromState()}`,
    },
  });

  return response.data.areas;
}

export async function getAreaByIdAsync(id: number) {
  const response = await axios.get(`/areas/${id}`, {
    // withCredentials: false,
    headers: {
      Authorization: `Bearer ${getTokenFromState()}`,
    },
  });

  return response.data;
}

export async function createAreaAsync(area: Area) {
  const response = await axios.post(
    '/areas',
    { ...area },
    {
      headers: {
        Authorization: `Bearer ${getTokenFromState()}`,
      },
    }
  );

  return response.data;
}

export async function updateAreaAsync(id: number, area: Area) {
  const response = await axios.put(
    `/areas/${id}`,
    { ...area },
    {
      headers: {
        Authorization: `Bearer ${getTokenFromState()}`,
      },
    }
  );
  return response;
}

export function deleteAreaAsync(id: number) {
  const response = axios.delete(`/areas/${id}`, {
    headers: {
      Authorization: `Bearer ${getTokenFromState()}`,
    },
  });
  return response;
}

// SITTING
export async function getSittingsAsync() {
  const response = await axios.get('/sittings', {
    // withCredentials: false,
    headers: {
      Authorization: `Bearer ${getTokenFromState()}`,
    },
  });

  return response.data.sittings;
}

export async function getSittingByIdAsync(id: number) {
  const response = await axios.get(`/sittings/${id}`, {
    // withCredentials: false,
    headers: {
      Authorization: `Bearer ${getTokenFromState()}`,
    },
  });

  return response.data;
}

export async function createSittingAsync(sitting: Sitting) {
  const response = await axios.post(
    `/sittings`,
    { ...sitting },
    {
      headers: {
        Authorization: `Bearer ${getTokenFromState()}`,
      },
    }
  );
  return response;
}

export async function updateSittingAsync(id: number, sitting: Sitting) {
  const response = await axios.put(
    `/sittings/${id}`,
    { ...sitting },
    {
      headers: {
        Authorization: `Bearer ${getTokenFromState()}`,
      },
    }
  );
  return response;
}

export function deleteSittingAsync(id: number) {
  const response = axios.delete(`/sittings/${id}`, {
    headers: {
      Authorization: `Bearer ${getTokenFromState()}`,
    },
  });
  return response;
}

// CUSTOMER
export function createCustomerAsync(customer: Customer) {
  const response = axios.post(
    `/customers`,
    { ...customer },
    {
      headers: {
        Authorization: `Bearer ${getTokenFromState()}`,
      },
    }
  );
  return response;
}

export async function updateCustomerAsync(id: number, customer: Customer) {
  const response = await axios.put(
    `/customers/${id}`,
    { ...customer },
    {
      headers: {
        Authorization: `Bearer ${getTokenFromState()}`,
      },
    }
  );
  return response;
}

// Get sitting types
export async function getSittingTypesAsync(date?: string) {
  const response = await axios.get(
    `/sittings/types${date ? `date=${date}` : ''}`,
    {
      // withCredentials: false,
      headers: {
        Authorization: `Bearer ${getTokenFromState()}`,
      },
    }
  );

  return response.data;
}

// AUTH
export async function UserRegisterAsync(
  username: string,
  email: string,
  password: string
) {
  const response = await axios.post(`/auth/register`, {
    username,
    email,
    password,
  });

  console.log(response.data);
  return response;
}

export async function UserLoginAsync(email: string, password: string) {
  const response = await axios.post(`/auth/login`, {
    email,
    password,
  });

  // console.log(response);
  return response;
}

export async function GetTablesAsync(sittingId: number | null = null) {
  const response = await axios.get(`/tables`, {
    headers: {
      Authorization: `Bearer ${getTokenFromState()}`,
    },
    params: {
      sittingId,
    },
  });

  return response.data.tables;
}

export async function UpdateTableAsync(id: number, table: Table) {
  const response = await axios.put(
    `/tables/${id}`,
    { ...table },
    {
      headers: {
        Authorization: `Bearer ${getTokenFromState()}`,
      },
    }
  );
  return response;
}

export async function AddTableToReservationAsync(
  id: number,
  tableId?: number,
  table?: Table
) {
  const response = await axios.post(`/reservations/${id}/table`, null, {
    headers: {
      Authorization: `Bearer ${getTokenFromState()}`,
    },
    params: {
      tableId: tableId ?? table?.id,
    },
  });
  return response;
}
