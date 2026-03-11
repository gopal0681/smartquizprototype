import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/token/`, {
        username,
        password
    });
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    navigate('/dashboard');
  }

  return (

    <div className="main-content">              
                 <div class="row justify-content-center">
                    <div class="col-md-4">
                        <form onSubmit={loginUser}>
                            <h2>Login</h2>    
                           
                            <div className="form-group">
                                <label htmlFor="username" className="form-label">Username</label>
                                 <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>

                            <button type="submit" className="btn btn-primary">Login</button>
                            <p className="signup-text">
                                Don't have an account? <Link to="/signup">Sign Up</Link>
                            </p>       
                        </form>                       
                    </div>
                </div>
            
        </div>


  );
}

export default Login;