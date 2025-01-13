import React, { useState, useEffect } from 'react'
import './Login.css';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
    enrollment: '',
  })
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      navigate('/home');
    }
  }, [navigate]);
  const changeHandler = (e)=>{
    setData({...data, [e.target.name]: e.target.value })
  }
  
  const url = 'https://hostel-management-backend-jaismans-projects.vercel.app';
  const login = async () => {
    try {
      let responseData;
      await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          responseData = data;
          if (responseData.success) {
            alert('Login successful!');
            localStorage.setItem('token', responseData.token); // Store the token for authentication
            window.location.replace('/home'); // Redirect to a different page
          } else {
            alert(responseData.message);
          }
        });
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong during login. Please try again.');
    }
  };
  return (
    <div>
      <section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>

          
          <div data-mdb-input-init className="form-outline mb-4">
            <input name='email' type="email" id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter a valid email address" value={data.email} onChange={changeHandler}/>
            <label className="form-label" htmlFor="form3Example3">Email address</label>
          </div>

        
          <div data-mdb-input-init className="form-outline mb-3">
            <input name='password' type="password" id="form3Example4" className="form-control form-control-lg"
              placeholder="Enter password" value={data.password} onChange={changeHandler} />
            <label className="form-label" htmlFor="form3Example4">Password</label>
          </div>

          <div data-mdb-input-init className="form-outline mb-3">
            <input name='enrollment' type="text" id="form3Example5" className="form-control form-control-lg"
              placeholder="Enter enrollment no." value={data.enrollment} onChange={changeHandler} />
            <label className="form-label" htmlFor="form3Example5">Enrollment</label>
          </div>


          <div className="text-center text-lg-start mt-4 pt-2">
            <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg"
              style={{paddingLeft: "2.5rem",paddingRight: "2.5rem"}} onClick={login}>Login</button>
            
          </div>

        </form>
      </div>
    </div>
  </div>
  
</section>
    </div>
  )
}
