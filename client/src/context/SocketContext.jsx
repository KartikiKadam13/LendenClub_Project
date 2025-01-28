import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Create a context for the socket
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  // Function to initialize the socket
  const initializeSocket = () => {
    if (!socket) {
      const socketInstance = io('http://localhost:4000'); // Replace with your server's URL
      setSocket(socketInstance);
      return socketInstance;
    }
    return socket;
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (socket) socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, initializeSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
