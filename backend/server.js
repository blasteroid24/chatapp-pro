const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
require('dotenv').config();
const { getChatHistory, getRoomList, saveMessageToDB } = require('./controllers/chatController');
const Room = require('./models/Room');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {cors: {origin: '*',}});



app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());


app.use('/api', chatRoutes);


io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    
    socket.on('joinRoom', async ({ room, user }) => {
        socket.join(room);
        console.log(`${user} joined room: ${room}`);

      
        const chatHistory = await getChatHistory(room);
        socket.emit('previousMessages', chatHistory);

       
        socket.to(room).emit('userJoined', user);
    });

    socket.on('createRoom', async (roomName) => {
        const existingRoom = await Room.findOne({ name: roomName });
        if (existingRoom) {
            return socket.emit('error', 'Room already exists');
        }
        const newRoom = await Room.create({ name: roomName });
        console.log('Room created:', newRoom);
        io.emit('roomListUpdate', await getRoomList());
    });

    socket.on('chatMessage', async ({ message, user, room }) => {
        try {
            const messageData = { user, message };
            
            
            io.to(room).emit('message', messageData);
            
            
            await saveMessageToDB({ message, user, room });
        } catch (error) {
            console.error('Error sending message:', error);
            socket.emit('error', 'Error sending message');
        }
    });
    
   
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});



mongoose.connect(process.env.MONGO_URI).then(server.listen(process.env.PORT, () => {
    console.log(`Server running on port`,process.env.PORT);
})).catch((e)=>{console.log("some error occcured",e)})
