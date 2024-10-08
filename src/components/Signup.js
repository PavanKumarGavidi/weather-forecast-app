import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import styles from './Signup.module.css';  // Make sure this import is correct

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup, loginWithGoogle, loginWithFacebook } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      await signup(email, password);
      navigate('/dashboard');
    } catch {
      setError('Failed to create an account');
    }
  }

  async function handleGoogleSignup() {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch {
      setError('Failed to sign up with Google');
    }
  }

  async function handleFacebookSignup() {
    try {
      await loginWithFacebook();
      navigate('/dashboard');
    } catch {
      setError('Failed to sign up with Facebook');
    }
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Create Account</h2>
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
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className={styles.input}
          />
          <button type="submit" className={`${styles.button} ${styles.primaryButton}`}>Sign Up</button>
        </form>
        <div className={styles.separator}>
          <span>or</span>
        </div>
        <button onClick={handleGoogleSignup} className={`${styles.button} ${styles.googleButton}`}>
          <FaGoogle /> Sign up with Google
        </button>
        <button onClick={handleFacebookSignup} className={`${styles.button} ${styles.facebookButton}`}>
          <FaFacebook /> Sign up with Facebook
        </button>
        <p className={styles.linkText}>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
