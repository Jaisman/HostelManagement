import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
      const [data, setData] = useState({
            email: '',
            password: '',
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
          
          const url = 'http://localhost:4000';
          const login = async () => {
            try {
              let responseData;
              await fetch(`${url}/loginAdmin`, {
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
                    localStorage.setItem('token', responseData.token); 
                    window.location.replace('/home');
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
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="img-fluid" alt="Phone image"/>
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form>
            <h1 className='text-center mb-4'>Login</h1>
          
          <div data-mdb-input-init className="form-outline mb-4">
            <input name='email' placeholder='Email' type="email" id="form1Example13" className="form-control form-control-lg" onChange={changeHandler} value={data.email} />
            <label className="form-label" htmlFor="form1Example13">Email address</label>
          </div>

          
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="password" name='password' placeholder='password' id="form1Example23" className="form-control form-control-lg" onChange={changeHandler} value={data.password}/>
            <label className="form-label" htmlFor="form1Example23">Password</label>
          </div>

          

          

          

        </form>
          <button type="submit" onClick={login} data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block">Log in</button>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
