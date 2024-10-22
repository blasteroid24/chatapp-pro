import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 


export const fetchRooms = async () => {
  return await axios.get(`${API_URL}/rooms`);
};

export const fetchChatHistory = async (room) => {
  return await axios.get(`${API_URL}/history/${room}`);
};

export const createRoom = async (roomName) => {
  return await axios.post(`${API_URL}/rooms`, { name: roomName });
};
