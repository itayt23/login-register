import {useState} from "react";

const OtpVerificationForm = ({email, setIsOtpVerified}) => {
    const [otp, setOtp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:5000/api/verify-otp', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, otp})
            });
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
        <>
            <h1>Verify OTP</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="otp">OTP</label>
                <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required/>
                <button type="submit">Verify OTP</button>
            </form>
        </>
    );
};

export default OtpVerificationForm;