const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true, 
    },
    room: {
        type: String,
        required: true, 
    },
    message: {
        type: String,
        required: true, 
    },
    timestamp: {
        type: Date,
        default: Date.now, 
    },
});

module.exports  = mongoose.model('Messagemmmm', messageSchema);


