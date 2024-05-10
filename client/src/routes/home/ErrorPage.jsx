import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/'); 
    };

    return (
        <div className="error-container">
            <h1>404</h1>
            <p>Page not found</p>
            <button onClick={handleButtonClick}>Go to Main Page</button>
        </div>
    );
};

export default ErrorPage;