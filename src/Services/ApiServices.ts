import { RootState } from '@reduxjs/toolkit/dist/query/core/apiState';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { store } from '../App/store';
import authSlice, { selectCurrentToken } from '../Features/Auth/authSlice';

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
export default async function getReservationsAsync() {
  try {
    const response = await axios.get('/reservations', {
      // withCredentials: false,
      headers: {
        authorization: `Bearer ${getTokenFromState()}`,
      },
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
      headers: {
        authorization: `Bearer ${getTokenFromState()}`,
      },
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
      headers: {
        authorization: `Bearer ${getTokenFromState()}`,
      },
    });

    return response.data.reservations;
  } catch (error) {
    throw new Error();
  }
}

export function createReservationAsync(reservation: Reservation) {
  try {
    const response = axios.post(
      `/reservations`,
      {
        ...reservation,
      },
      {
        headers: {
          authorization: `Bearer ${getTokenFromState()}`,
        },
      }
    );
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
      headers: {
        authorization: `Bearer ${getTokenFromState()}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    throw new Error();
  }
}

export function deleteReservationAsync(id: number) {
  try {
    const response = axios.delete(`/reservations/${id}`, {
      headers: {
        authorization: `Bearer ${getTokenFromState()}`,
      },
    });
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
      headers: {
        authorization: `Bearer ${getTokenFromState()}`,
      },
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
      headers: {
        authorization: `Bearer ${getTokenFromState()}`,
      },
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
      headers: {
        authorization: `Bearer ${getTokenFromState()}`,
      },
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
      headers: {
        authorization: `Bearer ${getTokenFromState()}`,
      },
    });
    return response;
  } catch (error) {
    throw new Error();
  }
}

export function deleteAreaAsync(id: number) {
  try {
    const response = axios.delete(`/areas/${id}`, {
      headers: {
        authorization: `Bearer ${getTokenFromState()}`,
      },
    });
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
      headers: {
        authorization: `Bearer ${getTokenFromState()}`,
      },
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
      headers: {
        authorization: `Bearer ${getTokenFromState()}`,
      },
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
      headers: {
        authorization: `Bearer ${getTokenFromState()}`,
      },
    });
    console.log('NEW SITTING', response);
    return response;
  } catch (error) {
    throw new Error();
  }
}

export async function updateSittingAsync(id: number, sitting: Sitting) {
  try {
    const response = await axios.put(`/sittings/${id}`, {
      ...sitting,
      headers: {
        authorization: `Bearer ${getTokenFromState()}`,
      },
    });
    return response;
  } catch (error) {
    throw new Error();
  }
}

export function deleteSittingAsync(id: number) {
  try {
    const response = axios.delete(`/sittings/${id}`, {
      headers: {
        authorization: `Bearer ${getTokenFromState()}`,
      },
    });
    return response;
  } catch (error) {
    throw new Error();
  }
}

// CUSTOMER
export function createCustomerAsync(customer: Customer) {
  try {
    const response = axios.post(
      `/customers`,
      { ...customer },
      {
        headers: {
          authorization: `Bearer ${getTokenFromState()}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error();
  }
}

export async function updateCustomerAsync(id: number, customer: Customer) {
  try {
    const response = await axios.put(`/customers/${id}`, {
      ...customer,
      headers: {
        authorization: `Bearer ${getTokenFromState()}`,
      },
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
        headers: {
          authorization: `Bearer ${getTokenFromState()}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error();
  }
}

// AUTH
export async function UserRegisterAsync(
  username: string,
  email: string,
  password: string
) {
  try {
    const response = await axios.post(`/auth/register`, {
      username,
      email,
      password,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error();
  }
}

export async function UserLoginAsync(email: string, password: string) {
  try {
    const response = await axios.post(`/auth/login`, {
      email,
      password,
    });

    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error();
  }
}
