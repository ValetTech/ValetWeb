import * as signalR from '@microsoft/signalr';
import Reservation from '../Models/Reservation';

const baseURL = 'https://valetapi.azurewebsites.net/hubs/reservation';
const homeURL = 'https://localhost:7028/hub/reservation';

const connection = new signalR.HubConnectionBuilder().withUrl(homeURL).build();

connection.on('reservationReceived', (reservation: Reservation) => {
  console.log('reservation', reservation);
});

connection.start().catch((err) => console.error(err.toString()));

export default connection;
// function send() {
//   connection
//     .send('newMessage', username, tbMessage.value)
//     .then(() => (tbMessage.value = ''));
// }
