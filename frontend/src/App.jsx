import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RoomList from './components/RoomList';
import ChatRoom from './components/ChatRoom';
import Home from '../pages/Home';

const App = () => {
    return (
        
        <Routes>
          <Route path ="/" element={<Home/>}/>
        <Route path="/rum" element={<RoomList />} />
        <Route path="/room/:room" element={<ChatRoom />} />
      </Routes>
    );
};

export default App;
