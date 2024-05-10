import {useState} from "react";
import { SiAuth0 } from "react-icons/si";
import './OtpVerificationForm.css';

const OtpVerificationForm = ({email, setIsOtpVerified}) => {
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:5000/api/verify-otp', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, otp})
            });
            if (response.status === 400) {
                setErrorMessage('Invalid OTP!');
            }
            if (!response.ok) {
                console.error('Error verifying OTP:', response.statusText);
            } else {
                const data = await response.json();
                console.log(data.message); 
                setIsOtpVerified(true);
            }
        } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        }
    };

    return (
        <div className="otp-verification-container">
            <form onSubmit={handleSubmit}>
                <h1>Verify OTP</h1>
                <p>Check your email and enter the 6-digit OTP code</p>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="input-box">
                    <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required/>
                    <SiAuth0 className="icon"/>
                </div>
                <button type="submit">Verify OTP</button>
            </form>
        </div>
    );
};

export default OtpVerificationForm;