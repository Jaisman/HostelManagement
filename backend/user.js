const mongoose = require('mongoose');

const User = mongoose.model('User',{
      name:{
            type: String,
            required: true
      },
      email:{
            type: String,
            required: true,
            unique: true
      },
      password:{
            type: String,
            required: true
      },
      enrollment:{
            type: String,
            required: true,
            unique: true
      },
      hasRoom:{
            type: Boolean,
            default: false
      },
      bookedRoom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room', 
            default: null,
      },
      
})

module.exports = User;