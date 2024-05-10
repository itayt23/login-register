import {useState} from "react";
import PasswordResetForm from './PasswordResetForm';
import OtpVerificationForm from "./OtpVerificationForm";

const PasswordReset = ({email}) => {
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    return (
        <div className="verify-otp-container">
            {isOtpVerified ?
                <PasswordResetForm email={email}/> :
                <OtpVerificationForm email={email} setIsOtpVerified={setIsOtpVerified}/>
            }
        </div>
    );
};

export default PasswordReset;