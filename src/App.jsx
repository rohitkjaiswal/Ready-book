// src/App.jsx
import React, { useState } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PhoneAuth from './components/PhoneAuth';
import Welcome from './components/home-body/Welcome';
import './index.css';

function App() {
  const [authType, setAuthType] = useState('login');  // 'login' or 'signup'
  const [authMethod, setAuthMethod] = useState('email'); // 'email' or 'phone'
  const [isLoggedIn, setIsLoggedIn] = useState(false); // login state

  return (
    <div className="auth-container">
      <h1 className="app-title">🔥Ready Book</h1>

      {/* IF LOGGED IN => Show only Welcome */}
      {isLoggedIn ? (
        <Welcome />
      ) : (
        <>
          {/* Toggle Buttons: Sign In / Sign Up */}
          <div className="tab-buttons">
            <button
              className={authType === 'login' ? 'active' : ''}
              onClick={() => setAuthType('login')}
            >
              Sign In
            </button>
            <button
              className={authType === 'signup' ? 'active' : ''}
              onClick={() => setAuthType('signup')}
            >
              Sign Up
            </button>
          </div>

          {/* Auth Method Toggle: Email / Phone */}
          <div className="method-buttons">
            <button
              className={authMethod === 'email' ? 'active email-btn' : 'email-btn'}
              onClick={() => setAuthMethod('email')}
            >
              Email
            </button>
            <button
              className={authMethod === 'phone' ? 'active phone-btn' : 'phone-btn'}
              onClick={() => setAuthMethod('phone')}
            >
              Phone
            </button>
          </div>

          {/* Render Form Based on State */}
          <div className="auth-form fade-in">
            {authMethod === 'email' ? (
              authType === 'login' ? (
                <Login setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <SignUp />
              )
            ) : (
              <PhoneAuth />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
