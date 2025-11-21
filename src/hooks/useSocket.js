import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const useSocket = (user) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (user) {
      socketRef.current = io('http://localhost:5000');
      
      socketRef.current.emit('user-connected', {
        userId: user.id || user._id,
        name: user.name,
        role: user.role
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user]);

  return socketRef.current;
};

export default useSocket;