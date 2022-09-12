import axios from 'axios';
// import { IApiService } from './IApiService';
// const API_URL = 'https://localhost:7028/api';
axios.defaults.baseURL = 'https://valetapi.azurewebsites.net/api';
// axios.defaults.baseURL = 'https://localhost:7028/api';

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

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
