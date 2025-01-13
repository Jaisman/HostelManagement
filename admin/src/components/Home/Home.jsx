import React, { useEffect, useState } from 'react';
import './Home.css';
export default function Home() {
  const [outpassRequests, setOutpassRequests] = useState([]);

  useEffect(() => {
    const fetchOutpassRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        if(!token){
          alert("No token found");
        }
        const response = await fetch('https://hostel-management-backend-jaismans-projects.vercel.app/outpass-requests', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.success) {
          setOutpassRequests(data.outpassRequests);
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Error fetching outpass requests:', error);
      }
    };

    fetchOutpassRequests();
  }, []);

  const handleApproval = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://hostel-management-backend-jaismans-projects.vercel.app/outpass/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        setOutpassRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== id)
        );
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating outpass status:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2 className='text-center mb-4'>Pending Outpass Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Heading To</th>
            <th>Date</th>
            <th>Time</th>
            <th>Purpose</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {outpassRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.studentId.name}</td>
              <td>{request.headingTo}</td>
              <td>{request.dateOfGoing}</td>
              <td>{request.timeOfGoing}</td>
              <td>{request.purpose}</td>
              <td>
                <button onClick={() => handleApproval(request._id, 'Approved')} style={{backgroundColor:'green', color:'white'}}>Approve</button>
                <button onClick={() => handleApproval(request._id, 'Rejected')} style={{backgroundColor:'red', color:'white'}}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
