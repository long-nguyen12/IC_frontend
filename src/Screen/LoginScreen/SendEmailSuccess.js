import React from 'react';
import { useNavigate } from 'react-router-dom';

const SendEmailSuccess = () => {
    const navigate = useNavigate();

    const handleBackToLogin = () => {
        navigate('/reset-password');
    };

    return (
        <div className="send-email-success">
            <div className="message-container">
                <h1>Check Your Email</h1>
                <p>
                    We have sent a password reset link to your email. Please check your inbox and follow the instructions to reset your password.
                </p>
                <button onClick={handleBackToLogin} className="back-to-login-btn">
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default SendEmailSuccess;