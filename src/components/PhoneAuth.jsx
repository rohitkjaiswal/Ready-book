// src/components/PhoneAuth.jsx
import React, { useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase'; // Make sure Firebase is initialized

const PhoneAuth = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Setup ReCaptcha for phone verification
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible', // or 'normal' if you want it visible
        callback: () => {
          handleSendCode(); // Trigger Send OTP once reCAPTCHA is solved
        },
      }, auth);
    }
  };

  // Send OTP to the phone number
  const handleSendCode = () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        setConfirmation(confirmationResult); // Store confirmation result for OTP verification
        alert('OTP Sent!');
      })
      .catch((error) => {
        setErrorMessage(error.message); // Handle errors during phone verification
        console.error('Error during phone number verification:', error);
      });
  };

  // Verify the OTP entered by the user
  const handleVerifyOtp = () => {
    if (confirmation && otp) {
      confirmation
        .confirm(otp)
        .then((result) => {
          console.log('Phone authentication successful', result.user);
        })
        .catch((error) => {
          setErrorMessage('OTP verification failed');
          console.error('Error verifying OTP:', error);
        });
    }
  };

  return (
    <div>
      <h3>Login with Phone Number</h3>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      {/* If OTP is not yet sent, show phone input */}
      {!confirmation ? (
        <>
          <input
            type="tel"
            className="form-control mb-3"
            placeholder="+91xxxxxxxxxx"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <div id="recaptcha-container"></div> {/* ReCaptcha container */}
          <button onClick={handleSendCode} className="btn btn-success">
            Send OTP
          </button>
        </>
      ) : (
        <>
          {/* If OTP is sent, show OTP input */}
          <hr />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
          /> 
          <button onClick={handleVerifyOtp} className="btn btn-primary">
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
};

export default PhoneAuth;
