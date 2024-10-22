const express = require('express');
const router = express.Router();
const { getChatHistory, getRoomList, addRoom,saveMessageToDB } = require('../controllers/chatController');
const Room = require('../models/Room');

// Get chat history for a room
router.get('/history/:room', async (req, res) => {
    const { room } = req.params;
    try {
        const messages = await getChatHistory(room);
        res.json(messages);
    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get list of all rooms
router.get('/rooms', async (req, res) => {
    try {
        const rooms = await getRoomList();
        res.json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new room
router.post('/rooms',addRoom);

//save messages in room
router.post('/history/:room', async (req, res) => {
    const { room } = req.params;
    const { message, user } = req.body; 
    try {
        const savedMessage = await saveMessageToDB({ message, user, room });
        res.status(201).json(savedMessage);
    } catch (error) {
        console.error('Error saving message to DB:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
