import {useState} from "react";
import { MdEmail } from "react-icons/md";
import './ForgotPasswordForm.css';
const ForgotPasswordForm = ({onSubmit}) => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/send-otp', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email})
        });
        if (response.status === 404) {
            setErrorMessage('User not found!');
        } 
        if (!response.ok) {
            console.error('Error initiating password reset:', response.statusText);
        } else {
            onSubmit(email)
            console.log('Password reset email sent successfully');
        }
    };

    return (
        <div className="forgot-password-container">
            <form onSubmit={handleSubmit}>
                <h1>Forgot Password</h1>
                <p>Enter your email address to reset your password</p>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="input-box">
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <MdEmail className="icon"/>
                </div>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;