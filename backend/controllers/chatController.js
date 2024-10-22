const Message = require('../models/Message');
const Room = require('../models/Room');

// Save message to MongoDB
const saveMessageToDB = async (data) => {
    const { message, user, room } = data;
    try {
    const newMessage = await  Message.create({user,room,message});
        console.log('Message saved to DB');
        return newMessage;
    } catch (error) {
        console.error('Error saving message to DB:', error);
    }
};

// Get chat history for a room
const getChatHistory = async (room) => {
    try {
        const messages = await Message.find({ room }).sort({ timestamp: 1 });
        return messages;
    } catch (error) {
        console.error('Error fetching chat history:', error);
        return [];
    }
};

// Get the list of all rooms
const getRoomList = async () => {
    try {
        const rooms = await Room.find({});
        return rooms.map(room => room.name);
    } catch (error) {
        console.error('Error fetching room list:', error);
        return [];
    }
};

// Add new room to MongoDB
const addRoom = async (req, res) => {
    if (!req.body || !req.body.name) {
        return res.status(400).json({ message: 'Room name is required' });
    }
    const { name } = req.body; 
    try {
        const existingRoom = await Room.findOne({ name });
        if (existingRoom) {
            return res.status(400).json({ message: 'Room already exists' });
        }

        const newRoom = await Room.create({ name });
        console.log('Room created:', newRoom);
        res.status(201).json(newRoom);
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ message: 'Error creating room', error: error.message });
    }
};

module.exports = {
    saveMessageToDB,
    getChatHistory,
    getRoomList,
    addRoom,
};
