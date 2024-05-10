import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FaUser, FaLock } from "react-icons/fa";
import './RegisterPage.css';

const RegisterPage = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

            if (!response.ok) {
                if (response.status === 400) {
                    console.log('User already exists');
                    setErrorMessage('User already exists!');
                } 
                else throw new Error('Network response was not ok');
            }
            else {
                const data = await response.json();
                console.log(data.msg); 
                navigate('/');
            } 
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    const handleLoginClick = () => {
        navigate('/login'); 
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="input-box">
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <FaLock className="icon"/>
                </div>
                <button type="submit">Register</button>
                <div className="login-link">
                    <p>Already have an account? <a href="#" onClick={handleLoginClick}>Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;