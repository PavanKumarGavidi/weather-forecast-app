import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loginWithGoogle, loginWithFacebook } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Failed to log in');
    }
  }

  async function handleGoogleLogin() {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch {
      setError('Failed to log in with Google');
    }
  }

  async function handleFacebookLogin() {
    try {
      await loginWithFacebook();
      navigate('/dashboard');
    } catch {
      setError('Failed to log in with Facebook');
    }
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Welcome Back</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className={styles.input}
          />
          <button type="submit" className={`${styles.button} ${styles.primaryButton}`}>Log In</button>
        </form>
        <div className={styles.separator}>
          <span>or</span>
        </div>
        <button onClick={handleGoogleLogin} className={`${styles.button} ${styles.googleButton}`}>
          <FaGoogle /> Log in with Google
        </button>
        <button onClick={handleFacebookLogin} className={`${styles.button} ${styles.facebookButton}`}>
          <FaFacebook /> Log in with Facebook
        </button>
        <p className={styles.linkText}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
