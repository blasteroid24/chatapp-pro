import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import { fetchChatHistory } from '../api';
import io from 'socket.io-client';
import '../css/chatroom.css'


const ChatRoom = () => {
  const { room } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState('');
  const [socket, setSocket] = useState(null); 

  useEffect(() => {
    const socketConnection = io('http://localhost:5000');
    setSocket(socketConnection); 

    const loadChatHistory = async () => {
      try {
        const response = await fetchChatHistory(room);
        setMessages(response.data);
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    };

    loadChatHistory();

    return () => {
      socketConnection.disconnect(); 
    };
  }, [room]);

  useEffect(() => {
    if (socket && user.trim()) {
      socket.emit('joinRoom', { room, user });

      
      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      if (socket) {
        socket.off('message'); 
      }
    };
  }, [socket, room, user]);

  const sendMessage = () => {
    if (newMessage.trim() !== '' && user.trim() !== '') {
      const messagePayload = { room, message: newMessage, user };
      socket.emit('chatMessage', messagePayload); 
      setNewMessage(''); 
    }
  };

  return (
    <div className='a'>
      <h1 className='b'>Chat Room: {room}
      <Link to="/rum"><button className='btn'>Go back</button></Link>
      </h1>
      <input
        className='c'
        type="text"
        placeholder="Your Name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <div className='d'>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}:</strong> {msg.message} 
          </div>
        ))}
      </div>

      <input
        className='e'
        type="text"
        placeholder="Type your message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button className='f' onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
