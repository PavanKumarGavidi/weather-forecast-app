import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Home.module.css';

function Home() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Weather Forecast App</h1>
      
      {currentUser ? (
        <div className={styles.userInfo}>
          <p>Welcome, {currentUser.email}!</p>
          <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
          <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        </div>
      ) : (
        <div className={styles.authOptions}>
          <p>Please log in or sign up to view the weather forecast.</p>
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
        </div>
      )}
    </div>
  );
}

export default Home;
