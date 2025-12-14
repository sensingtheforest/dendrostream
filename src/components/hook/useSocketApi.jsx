import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { BASE_SOCKET_URL } from '../../settings/EnvironmentVariables';

export default function useSocketApi({ socketPort=3001, socketName='northern-1' }) {
  const [record, setRecord] = useState(null);

  useEffect(() => {
    const socket = io(`${BASE_SOCKET_URL}:${socketPort}`);

    socket.on(`connection`, () => console.log('Connected to socket server'));

    socket.on(`latest-record-${socketName}`, data => setRecord({
        ...data,
        timestamp: new Date(data.timestamp)
    }));

    return () => socket.disconnect();
  }, []);

  return record;
}
