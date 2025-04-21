// src/components/Login.jsx
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ setIsLoggedIn }) => {  // <-- props from App.jsx
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully!');
      setIsLoggedIn(true);  // <-- this is IMPORTANT!
    } catch (err) {
      alert('Error logging in: ' + err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging In...' : 'Log In'}
      </button>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
