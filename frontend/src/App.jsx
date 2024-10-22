import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RoomList from './components/RoomList';
import ChatRoom from './components/ChatRoom';

const App = () => {
    return (
        
        <Routes>
        <Route path="/" element={<RoomList />} />
        <Route path="/room/:room" element={<ChatRoom />} />
      </Routes>
    );
};

export default App;
