import {useEffect, useState} from 'react';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import PasswordReset from './components/password-reset/PasswordReset';

const ForgotPasswordPage = () => {
    const [forgotPasswordSubmitted, setForgotPasswordSubmitted] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (email) {
            setForgotPasswordSubmitted(true);
        }
    }, [email]);

    const handleForgotPasswordSubmit = async (email) => {
        setEmail(email);
    }

    return (
        <>
            {forgotPasswordSubmitted ?
                <PasswordReset email={email}/>
                :
                <ForgotPasswordForm onSubmit={handleForgotPasswordSubmit}/>
            }
        </>
    );
};

export default ForgotPasswordPage;