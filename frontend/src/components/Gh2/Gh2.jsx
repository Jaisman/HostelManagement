import React, { useEffect, useState } from 'react';
import './Gh2.css'; 
import Navbar from '../Navbar';

export default function Gh2() {
  const [rooms, setRooms] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:4000/rooms',{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json()) 
      .then(data => {
        if (data.success) {
          setRooms(data.rooms);
        } else {
          console.error(data.message);
        }
      })
      .catch(error => console.error(error));
  }, []);
  

  // Handle room booking
  const handleRoomClick = (roomNumber) => {
    const token = localStorage.getItem('token');
  
    fetch('http://localhost:4000/book-room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ roomNumber }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Room booked successfully!');
          // Update the room status locally
          setRooms(rooms.map(room =>
            room.roomNumber === roomNumber ? { ...room, isBooked: true } : room
          ));
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.error(error));
  };
  

  return (
    <div>
      <Navbar/>
      <h1 className='text-center mb-4 mt-4'>Room Booking</h1>
      <div className="fence-grid d-flex align-center">
        {rooms.map(room => (
          <button
            key={room.roomNumber}
            onClick={() => handleRoomClick(room.roomNumber)}
            style={{
              backgroundColor: room.isBooked ? 'red' : 'green',
              color: 'white',
              padding: '10px',
              margin: '5px',
              cursor: 'pointer',
            }}
          >
            Room {room.roomNumber}
          </button>
        ))}
      </div>
    </div>
  );
}
