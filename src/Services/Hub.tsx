import { Button, Input } from '@mantine/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useState } from 'react';

export default function Notify() {
  const [connection, setConnection] = useState<null | HubConnection>(null);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl('https://localhost:51130/hubs/notifications')
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on('ReceiveMessage', (message) => {
            //
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection]);

  const sendMessage = async () => {
    if (connection) await connection.send('SendMessage', inputText);
    setInputText('');
  };

  return (
    <>
      <Input
        value={inputText}
        onChange={(input) => {
          setInputText(input.target.value);
        }}
      />
      <Button onClick={sendMessage} type="button">
        Send
      </Button>
    </>
  );
}
