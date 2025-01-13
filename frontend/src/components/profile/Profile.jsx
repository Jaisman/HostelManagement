import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import './Profile.css';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [outpassRequests, setOutpassRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = 'http://localhost:4000';

  // Fetch user profile data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("No token found");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${url}/profile`, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to get profile");
        }
        const data = await response.json();
        setUserData(data.user);
        setLoading(false);
      } catch (error) {
        console.error("Failed to get profile", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Fetch outpass requests made by the user
  useEffect(() => {
    const fetchOutpassRequests = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      try {
        const response = await fetch(`${url}/outpass-requests/user`, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setOutpassRequests(data.outpassRequests);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching outpass requests:", error);
      }
    };

    fetchOutpassRequests();
  }, []);

  if (loading) {
    return <div className="loader"></div>;
  }

  if (!userData) {
    return <h1>No user found</h1>;
  }

  return (
    <div>
      <Navbar />
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                  <h5 className="my-3">{userData.name}</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.name}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Enrollment</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.enrollment}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Room Alloted</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.bookedRoom?.roomNumber || 'N/A'}</p>
                    </div>
                  </div>
                  <hr />
                  <h4 className="my-4">Outpass Requests</h4>
                  {outpassRequests.length > 0 ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Heading To</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Purpose</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {outpassRequests.map((request) => (
                          <tr key={request._id}>
                            <td>{request.headingTo}</td>
                            <td>{request.dateOfGoing}</td>
                            <td>{request.timeOfGoing}</td>
                            <td>{request.purpose}</td>
                            <td>{request.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No outpass requests found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
