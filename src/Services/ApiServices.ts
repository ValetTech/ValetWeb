import axios from 'axios';
import Reservation from '../Models/Reservation';
import Customer from '../Models/Customer';
// import { IApiService } from './IApiService';
// const API_URL = 'https://localhost:7028/api';
axios.defaults.baseURL = 'https://valetapi.azurewebsites.net/api';
// axios.defaults.baseURL = 'https://localhost:7028/api';

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
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

export function getReservationByIdAsync(id: number) {
  try {
    const response = axios.get(`/reservations/${id}`);
    return response;
  } catch (error) {
    throw new Error();
  }
}

export function getReservationByDateAsync(date: string) {
  try {
    const response = axios.get(`/reservations?Date=${date}`);
    return response;
  } catch (error) {
    throw new Error();
  }
}

export function updateReservationAsync(id: number, reservation: Reservation) {
  try {
    const response = axios.put(`/reservations/${id}`, {
      body: reservation,
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
export function getAllAreasAsync() {
  try {
    const response = axios.get(`/areas`);
    return response;
  } catch (error) {
    throw new Error();
  }
}

// SITTING
export function getAllSittingsAsync() {
  try {
    const response = axios.get(`/sittings`);
    return response;
  } catch (error) {
    throw new Error();
  }
}

// CUSTOMER
export function createCustomerAsync(customer: Customer) {
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
