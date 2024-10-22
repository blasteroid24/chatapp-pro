import React, { useState, useEffect } from 'react';
import { fetchRooms, createRoom } from '../api';
import { Link } from 'react-router-dom';
import '../css/roomlist.css'

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState('');

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    const response = await fetchRooms();
    setRooms(response.data);
  };

  const handleCreateRoom = async () => {
    if (newRoom.trim() !== '') {
      await createRoom(newRoom);
      setNewRoom('');
      loadRooms();
    }
  };

  return (
    <div className='m1'>
      <h1 className='m2'>Chat Rooms
      <Link to="/"><button className='btn1'>Go back</button></Link>
      </h1>
      <input
       className='m3'
        type="text"
        placeholder="New Room Name"
        value={newRoom}
        onChange={(e) => setNewRoom(e.target.value)}
      />
      <button className='m4' onClick={handleCreateRoom}>Create Room</button>
      
      <h2 className='m5'>Available Rooms</h2>
      <ul className='m6'>
        {rooms.map((room, index) => (
          <li className='m7' key={index}>
            <Link to={`/room/${room}`}>{room}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
