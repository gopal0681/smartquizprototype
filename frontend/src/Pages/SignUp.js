import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../Css/Signup.css';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email , setEmail] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const validatePassword = (password) => {
        const regex =
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
        return regex.test(password);
    }

const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(password)) {
        setError(
            "Password must be at least 8 characters and include uppercase, number, and special character."
        );
        return;
    }

    if (password !== confirmpassword) {
        setError("Passwords do not match");
        return;
    }

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/register/`, {
            email,
            username,
            password
        });
        alert("Signup successful! You can now log in.");
        navigate("/login");
    } catch (err) {
        console.error(err);
        alert("Signup failed. Try again.");
    }
};
    return (
        <div className="main-content">               
            <div className="row justify-content-center">
                <div className="col-md-4">
                          
                    <form onSubmit={handleSignup}>
                        <h2>Sign Up</h2>    
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>  
                            <input type="text" className="form-control" id="email" 
                                autoComplete="email"
                                placeholder="Enter your Email"
                                value={email}                                 
                                onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">Username</label>  
                            <input type="text" className="form-control" id="username" 
                                autoComplete="new-username"
                                placeholder="Choose a username"
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" 
                                autoComplete="new-password"
                                placeholder="Choose a password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label"> Confirm Password</label>
                            <input type="password" className="form-control" id="confirmpassword"
                                autoComplete="new-password"
                                placeholder="Confirm your password"
                                value={confirmpassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </div>
                                
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                        <p className="login-text">
                            Already have an account? <Link to="/login">Login</Link>
                        </p>        
                    </form>                       
                </div>
            </div>
        </div>
    );
}

export default SignUp;