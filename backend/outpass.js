const mongoose = require('mongoose');

const Outpass = mongoose.model('Outpass',{
      studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            required: true,
      },
      headingTo:{
            type: String,
            required: true
      },
      vehicle:{
            type: String,
            required: true
      },
      dateOfGoing:{
            type: String,
            required: true
            
      },
      timeOfGoing:{
            type: String,
            required: true
      },
      purpose:{
            type: String,
            required: true
      },
      status:{
            type: String,
            enum:['Pending','Approved','Rejected'],
            default: 'Pending'
      }

})

module.exports = Outpass;