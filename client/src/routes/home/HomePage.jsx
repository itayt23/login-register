import {useNavigate} from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>LogNet Systems</h1>
            <p>Welcome to LogNet Systems!</p>
            <div className="buttons">
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/register')}>Register</button>
            </div>
        </div>
    );
};

export default HomePage;