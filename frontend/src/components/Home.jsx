import React from 'react'
import outpass from '../assets/outpass.png';
import room from '../assets/room.png';
import profile from '../assets/profile.png';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
export default function Home() {
  return (
    <>
    <Navbar/>
    <div className='d-flex justify-content-center align-items-center vh-100 gap-5'>
      <div className="card" style={{width: "18rem"}}>
            <img src={outpass} className="card-img-top p-5" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">Request outpass</h5>
            <p className="card-text">You need to wait for warden approval to go out after 6p.m.</p>
            <Link to="/outpass" className="btn btn-primary">Go to page</Link>
            </div>
      </div>

      <div className="card" style={{width: "18rem"}}>
            <img src={room} className="card-img-top p-5" alt="..." />
            <div className="card-body">
            <h5 className="card-title">Room enquiry</h5>
            <p className="card-text">You can book a room only once.So choose carefully.</p>
            <a href="/enquiry" className="btn btn-primary">Go to page</a>
            </div>
      </div>

      <div className="card" style={{width: "18rem"}}>
            <img src={profile} className="card-img-top p-5" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">View Profile</h5>
            <p className="card-text">Here you can view your profile</p>
            <a href="/profile" className="btn btn-primary">Go to page</a>
            </div>
      </div>
    </div>
    </>
  )
}
