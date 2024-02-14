import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import './chat.css';

const socket: Socket = io("http://localhost:3001");

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [chat, setChat] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>('Beth');

  useEffect(() => {
    socket.on('chat message', (msg: string) => {
      setChat([...chat, msg]);
    });

    return () => {
      socket.off('connection');
    };
  }, [chat]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('chat message', message);
    setMessage('');
  };

  return (
    <div>
      <ul>
        {chat.map((msg, index) => (
          <li key={index}>
            <img src={`https://api.multiavatar.com/${userName}.png`} alt="User" className="avatar"/>
            <div className="text">
              <div className="name">{userName}</div>
              {msg}
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;