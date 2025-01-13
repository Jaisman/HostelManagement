const mongoose = require('mongoose');

const Room = mongoose.model('Room',{
      roomNumber:{
            type: Number,
            required: true,
            unique: true
      },
      isBooked:{
            type: Boolean,
            default: false
      },
      bookedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
      },
});

module.exports = Room;