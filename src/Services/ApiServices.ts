import axios from 'axios';
import Customer from '../Models/Customer';
import Reservation from '../Models/Reservation';
// import { IApiService } from './IApiService';
// const API_URL = 'https://localhost:7028/api';
axios.defaults.baseURL = 'https://valetapi.azurewebsites.net/api';
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
    console.log('response.data', response.data);

    return response.data;
  } catch (error) {
    throw new Error();
  }
}

export async function getReservationByIdAsync(id: number) {
  try {
    const response = await axios.get(`/reservations/${id}`, {
      // withCredentials: false,
    });
    console.log('response.data', response.data);

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
    console.log('response.data', response.data);

    return response.data;
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

export function updateReservationAsync(id: number, reservation: Reservation) {
  try {
    const response = axios.put(`/reservations/${id}`, {
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
    console.log('response.data', response.data);

    return response.data;
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
    console.log('response.data', response.data);

    return response.data;
  } catch (error) {
    throw new Error();
  }
}

// CUSTOMER
export function createCustomer(customer: Customer) {
  axios
    .post('/customers', {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}

// CUSTOMER
export function createCustomerAsync(customer: Customer) {
  try {
    const response = axios.post(`/customers`, {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
    });
    return response;
  } catch (error) {
    throw new Error();
  }
}

export function updateCustomerAsync(id: number, customer: Customer) {
  try {
    const response = axios.put(`/customers/${id}`, {
      ...customer,
    });
    return response;
  } catch (error) {
    throw new Error();
  }
}
