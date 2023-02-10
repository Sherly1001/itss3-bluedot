import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const baseURL = import.meta.env.VITE_BASE_URL;
const getSocket = (token = '') => {
  return io(baseURL, {
    path: (new URL(baseURL).pathname + '/socket.io/').replace('//', '/'),
    query: {
      token,
    },
  });
};

const getToken = () => localStorage.getItem('token') ?? '';
const gsocket = getSocket(getToken());

export default function useSocket() {
  const [socket, setSocket] = useState(gsocket);

  useEffect(() => {
    const token = getToken();
    const sock = socket as any;
    if (sock?._opts?.query?.token != token) {
      setSocket((sock) => {
        sock.close();
        return getSocket(token);
      });
    }
  }, [socket, localStorage.getItem('token')]);

  return socket;
}
