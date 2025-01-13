import React, { useState } from 'react';
import Navbar from '../Navbar';
import './Outpass.css';

export default function Outpass() {
  const [formData, setFormData] = useState({
    headingTo: '',
    vehicle: '',
    dateOfGoing: '',
    timeOfGoing: '',
    purpose: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('User not authenticated');
      }
      const response = await fetch('https://hostel-management-backend-jaismans-projects.vercel.app/outpass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert('Outpass submitted successfully!');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error('Error submitting outpass:', err);
      alert('Error submitting the form.');
    }
  };

  return (
    <div>
      <Navbar />
      <section className="h-100 bg-dark">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <form onSubmit={handleSubmit}>
                <div className="card card-registration my-4">
                  <div className="row g-0">
                    <div className="col-xl-6 d-none d-xl-block">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                        alt="Sample"
                        className="img-fluid"
                        style={{ borderTopLeftRadius: '.25rem', borderBottomLeftRadius: '.25rem' }}
                      />
                    </div>
                    <div className="col-xl-6">
                      <div className="card-body p-md-5 text-black">
                        <h3 className="mb-5 text-uppercase">Student Outpass Form</h3>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="headingTo"
                            name="headingTo"
                            className="form-control form-control-lg"
                            value={formData.headingTo}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="headingTo">
                            Heading To
                          </label>
                        </div>

                        <div className="mb-4">
                          <select
                            id="vehicle"
                            name="vehicle"
                            className="form-control form-control-lg"
                            value={formData.vehicle}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Vehicle</option>
                            <option value="Own">Own</option>
                            <option value="Bus">Bus</option>
                          </select>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="date"
                            id="dateOfGoing"
                            name="dateOfGoing"
                            className="form-control form-control-lg"
                            value={formData.dateOfGoing}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="dateOfGoing">
                            Date of Going
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="time"
                            id="timeOfGoing"
                            name="timeOfGoing"
                            className="form-control form-control-lg"
                            value={formData.timeOfGoing}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="timeOfGoing">
                            Time of Going
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="purpose"
                            name="purpose"
                            className="form-control form-control-lg"
                            value={formData.purpose}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="purpose">
                            Purpose of Going
                          </label>
                        </div>


                        <div className="d-flex justify-content-end pt-3">
                          <button type="submit" className="btn btn-warning btn-lg ms-2">
                            Submit Form
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
