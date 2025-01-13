const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Outpass = require('./outpass');
const User = require('./user');
const Room = require('./room');
const authenticateAdmin = require('./authenticateAdmin');
const Admin = require('./admin');

app.use(cors());
app.use(express.json());

const port = 4000;

mongoose.connect('mongodb+srv://hostel:hostel@cluster.1u4cy.mongodb.net/users')
  .then(() => console.log("Mongo db connected"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log("Server running on port " + port);
});


// API endpoint for sign up
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password, enrollment } = req.body;
    const existing = await User.findOne({ email: email, enrollment: enrollment });
    if (existing) {
      return res.json({
        success: false,
        message: "Email already registered"
      });
    }
    const user = new User({ name, email, password, enrollment });
    await user.save();
    res.json({
      success: true,
      message: "User registered successfully"
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error: " + error
    });
  }
});

// API endpoint for login
app.post('/login', async (req, res) => {
  try {
    const { enrollment, password } = req.body;
    const check = await User.findOne({ enrollment: enrollment, password: password });
    if (!check) {
      return res.json({
        success: false,
        message: "Invalid password"
      });
    }
    const token = jwt.sign(
      { id: check._id, enrollment: check.enrollment, name: check.name, email: check.email },
      'token',
      { expiresIn: '1h' }
    );
    return res.json({
      success: true,
      message: "Logged in successfully",
      token: token
    });
  } catch (e) {
    return res.json({
      success: false,
      message: "Error: " + e
    });
  }
});

// Middleware for authenticating the token
const authenticate = (req, res, next) => {
    
      const authHeader = req.headers['authorization']; // Use lowercase key
      if (!authHeader) {
        return res.json({
          success: false,
          message: "No token provided"
        });
      }
    
      const token = authHeader.split(' ')[1]; // Extract token after 'Bearer'
      if (!token) {
        return res.json({
          success: false,
          message: "Invalid token format"
        });
      }
    
      try {
        const decoded = jwt.verify(token, 'token'); // Replace 'token' with your secret key
        req.user = decoded; // Attach decoded user data to request object
        next();
      } catch (error) {
        return res.json({
          success: false,
          message: "Error authenticating: " + error.message
        });
      }
    };
    
// API endpoint for storing outpass data
app.post('/outpass', authenticate, async (req, res) => {
  try {
    const { headingTo, vehicle, dateOfGoing, timeOfGoing, purpose } = req.body;
    const studentId = req.user.id;

    const newOutpass = new Outpass({
      studentId,
      headingTo,
      vehicle,
      dateOfGoing,
      timeOfGoing,
      purpose,
    });

    await newOutpass.save();

    return res.json({
      success: true,
      message: 'Outpass submitted successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error: ' + error.message,
    });
  }
});

// API endpoint for profile
app.get('/profile',authenticate, async (req,res)=>{
      try{
            const user = await User.findById(req.user.id).select('-password').populate('bookedRoom','roomNumber');
            if(!user){
                  return res.json({
                        success: false,
                        message: "User not found"
                  });
            }
            else{
                  return res.json({
                        success: true,
                        message: "User profile",
                        user
                  });
            }
      }catch(err){
            return res.json({
                  success: false,
                  message: "Error: " + err
            });
      }
})

// getting all rooms
app.get('/rooms',authenticate, async (req,res)=>{
  try{
    const rooms = await Room.find({});
    res.json({
      success: true,
      rooms
    })
  }catch(error){
    res.json({
      success: false,
      message: "Error: " + error
    })
  }
})

// API for booking room
app.post('/book-room', authenticate, async (req, res) => {
  try {
    const { roomNumber } = req.body;
    const user = await User.findById(req.user.id);

    // Check if the user already has a room booked
    if (user.bookedRoom) {
      return res.status(400).json({
        success: false,
        message: 'You have already booked a room.',
      });
    }

    // Find the room by roomNumber
    const room = await Room.findOne({ roomNumber });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found.',
      });
    }

    if (room.isBooked) {
      return res.status(400).json({
        success: false,
        message: 'Room is already booked.',
      });
    }

    // Book the room for the user
    room.isBooked = true;
    room.bookedBy = user._id;
    await room.save();

    // Associate the booked room with the user
    user.bookedRoom = room._id;
    await user.save();

    return res.json({
      success: true,
      message: 'Room booked successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error: ' + error.message,
    });
  }
});

// API endpoint for admin approval of outpass
app.get('/outpass-requests', authenticate, async (req, res) => {
  try {

    const outpassRequests = await Outpass.find({status:'Pending'}).populate('studentId','name email');
    return res.json({ success: true, outpassRequests });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});


app.put('/outpass/:id', authenticate, async (req,res)=>{
  try{
    const {status} = req.body;
    const outpass = await Outpass.findById(req.params.id);
    if(!outpass){
      return res.status(404).json({
        success: false,
        message: "Outpass not found"
      });
    }
    outpass.status = status;
    await outpass.save();
    return res.json({
      success: true,
      message: "Outpass updated successfully"
    });
  }catch(error){
    return res.status(500).json({
      success: false,
      message: "Error: " + error
    });
  }
})

// routes/outpass.js
app.get('/outpass-requests/user', authenticate, async (req, res) => {
  try {
    const outpassRequests = await Outpass.find({ studentId: req.user.id });
    res.json({ success: true, outpassRequests });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching outpass requests" });
  }
});


// API endpoint for admin login
app.post('/loginAdmin', async (req, res) => {
  try {
    const { email , password } = req.body;
    const check = await Admin.findOne({ email : email, password: password });
    if (!check) {
      return res.json({
        success: false,
        message: "Invalid password"
      });
    }
    const token = jwt.sign(
      { id: check._id, name: check.name, email: check.email },
      'token',
      { expiresIn: '1h' }
    );
    return res.json({
      success: true,
      message: "Logged in successfully",
      token: token
    });
  } catch (e) {
    return res.json({
      success: false,
      message: "Error: " + e
    });
  }
});