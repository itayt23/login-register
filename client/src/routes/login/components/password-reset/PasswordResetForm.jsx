import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { FaLock } from "react-icons/fa";
import './PasswordResetForm.css';

const PasswordResetForm = ({email}) => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/update-password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });
        if (!response.ok) {
            console.error('Error changing password:', response.statusText);
        } else {
            console.log('Password changed successfully');
            navigate('/');
        }
    };

    return (
        <div className="change-password-container">
            <form onSubmit={handleSubmit}>
                <h1>Change Password</h1>
                <div className="input-box">
                    <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <FaLock className="icon"/>
                </div>
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default PasswordResetForm;