import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './LoginPage.css';
import { FaUser, FaLock } from "react-icons/fa";

const LoginPage = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/verify-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });
            
            if (!response.ok) {
                if (response.status === 404) {
                    console.log('User not found');
                    setErrorMessage('User not found!');
                }
                else if (response.status === 401) {
                    console.log('Invalid credentials');
                } 
                else throw new Error('Network response was not ok');
            }

            else{
                const data = await response.json();
                console.log(data.msg); 
                navigate('/dashboard');
            } 
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };
    const handleRegisterClick = () => {
        navigate('/register'); 
    };
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="input-box">
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <FaLock className="icon"/>
                </div>
                <div className="otp-link">
                    <a href="/login/forgot-password">Forgot your password?</a>
                </div>
                <button type="submit"> Submit</button>
                <div className="register-link">
                    <p>Don't have an account? <a href="#" onClick={handleRegisterClick}>Register</a></p>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
