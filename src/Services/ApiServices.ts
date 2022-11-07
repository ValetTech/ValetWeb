import axios from 'axios';
import Area from '../Models/Area';
import Customer from '../Models/Customer';
import Reservation from '../Models/Reservation';
import Sitting from '../Models/Sitting';
// import { IApiService } from './IApiService';
// const API_URL = 'https://localhost:7028/api';
axios.defaults.baseURL = 'https://valetapi.azurewebsites.net/api/';
// axios.defaults.headers.common = {
//   'Content-Type': 'application/json',
//   Accept: 'application/json',
// };
const JWTToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicC5iQGdtYWlsLmNvbSIsImp0aSI6IjU2MmFjMzQ0LTcxY2QtNGM4Yy05NGMzLWIxMGFmY2JkNWQ4OCIsImV4cCI6MTY2Nzg5MzQ4NiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.4smjfXPO5q6zddIwerwpItJcYPdXkeCNWl_rEfN-naw';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Authorization = `Bearer ${JWTToken}`;

axios.defaults.headers.common['X-Version'] = '2.0';

// axios.defaults.baseURL = 'https://localhost:7028/api';

// axios.defaults.headers.post['Content-Type'] = 'application/json-patch+json';
// axios.defaults.headers.post['Content-Type'] =
// 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// RESERVATION
export default async function getReservationsAsync() {
  try {
    const response = await axios.get('/reservations', {
      // withCredentials: false,
    });

    return response.data.reservations;
  } catch (error) {
    throw new Error();
  }
}

export async function getReservationByIdAsync(id: number) {
  try {
    const response = await axios.get(`/reservations/${id}`, {
      // withCredentials: false,
    });

    return response.data;
  } catch (error) {
    throw new Error();
  }
}

export async function getReservationByDateAsync(date: string) {
  try {
    const response = await axios.get(`/reservations?Date=${date}`, {
      // withCredentials: false,
    });

    return response.data.reservations;
  } catch (error) {
    throw new Error();
  }
}

export function createReservationAsync(reservation: Reservation) {
  try {
    const response = axios.post(`/reservations`, {
      ...reservation,
    });
    return response;
  } catch (error) {
    throw new Error();
  }
}

export async function updateReservationAsync(
  id: number,
  reservation: Reservation
) {
  try {
    const response = await axios.put(`/reservations/${id}`, {
      ...reservation,
    });
    return response;
  } catch (error) {
    throw new Error();
  }
}

export function deleteReservationAsync(id: number) {
  try {
    const response = axios.delete(`/reservations/${id}`);
    return response;
  } catch (error) {
    throw new Error();
  }
}

// AREA
export async function getAreasAsync() {
  try {
    const response = await axios.get('/areas', {
      // withCredentials: false,
    });

    return response.data.areas;
  } catch (error) {
    throw new Error();
  }
}

export async function getAreaByIdAsync(id: number) {
  try {
    const response = await axios.get(`/areas/${id}`, {
      // withCredentials: false,
    });

    return response.data;
  } catch (error) {
    throw new Error();
  }
}

export async function createAreaAsync(area: Area) {
  try {
    const response = await axios.post('/areas', {
      ...area,
    });

    return response.data;
  } catch (error) {
    throw new Error();
  }
}

export async function updateAreaAsync(id: number, area: Area) {
  try {
    const response = await axios.put(`/areas/${id}`, {
      ...area,
    });
    return response;
  } catch (error) {
    throw new Error();
  }
}

export function deleteAreaAsync(id: number) {
  try {
    const response = axios.delete(`/areas/${id}`);
    return response;
  } catch (error) {
    throw new Error();
  }
}

// SITTING
export async function getSittingsAsync() {
  try {
    const response = await axios.get('/sittings', {
      // withCredentials: false,
    });

    return response.data.sittings;
  } catch (error) {
    throw new Error();
  }
}

export async function getSittingByIdAsync(id: number) {
  try {
    const response = await axios.get(`/sittings/${id}`, {
      // withCredentials: false,
    });

    return response.data;
  } catch (error) {
    throw new Error();
  }
}

export async function createSittingAsync(sitting: Sitting) {
  try {
    const response = await axios.post(`/sittings`, {
      ...sitting,
    });
    return response;
  } catch (error) {
    throw new Error();
  }
}

export async function updateSittingAsync(id: number, sitting: Sitting) {
  try {
    const response = await axios.put(`/sittings/${id}`, {
      ...sitting,
    });
    return response;
  } catch (error) {
    throw new Error();
  }
}

export function deleteSittingAsync(id: number) {
  try {
    const response = axios.delete(`/sittings/${id}`);
    return response;
  } catch (error) {
    throw new Error();
  }
}

// CUSTOMER
export function createCustomerAsync(customer: Customer) {
  try {
    const response = axios.post(`/customers`, {
      ...customer,
    });
    return response;
  } catch (error) {
    throw new Error();
  }
}

export async function updateCustomerAsync(id: number, customer: Customer) {
  try {
    const response = await axios.put(`/customers/${id}`, {
      ...customer,
    });
    return response;
  } catch (error) {
    throw new Error();
  }
}

// Get sitting types
export async function getSittingTypesAsync(date?: string) {
  try {
    const response = await axios.get(
      `/sittings/types${date ? `date=${date}` : ''}`,
      {
        // withCredentials: false,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error();
  }
}
