import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Stream = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socket = io();

  useEffect(() => {
    socket.on('response', (data) => {
      setMessages((prevMessages) => [...prevMessages, data.data]);
    });

    return () => {
      socket.off('response');
    };
  }, [socket]);

  const sendMessage = () => {
    socket.send(message);
    setMessage('');
  };

  return (
    <div>
      <h2>Live Stream</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message here"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Stream;
