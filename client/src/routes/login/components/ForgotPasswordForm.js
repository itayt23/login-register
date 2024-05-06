import {useState} from "react";

const ForgotPasswordForm = ({onSubmit}) => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/send-otp', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email})
        });

        if (!response.ok) {
            console.error('Error initiating password reset:', response.statusText);
        } else {
            onSubmit(email)
            console.log('Password reset email sent successfully');
        }
    };

    return (
        <div className="forgot-password-container">
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;