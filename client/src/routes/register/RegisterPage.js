import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
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

    const handleLoginLinkClick = () => {
        navigate('/login'); 
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email}
                       onChange={(e) => setEmail(e.target.value)} 
                       required/>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                       required/>

                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="#" onClick={handleLoginLinkClick}>Login</a></p>
        </div>
    );
};

export default RegisterPage;