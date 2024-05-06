import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
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

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <input type="submit" value="Submit"/>
            </form>
            <a href="/login/forgot-password">Forgot your password?</a>
        </div>
    );
};

export default LoginPage;
