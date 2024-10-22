import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Your backend URL
});

export const createRoom = async (roomName) => {
    return await api.post('/rooms', { name: roomName });
};

export const getRooms = async () => {
    return await api.get('/rooms');
};
