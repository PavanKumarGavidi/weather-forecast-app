import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { FaSearch, FaSignOutAlt, FaTemperatureHigh, FaWind, FaTint } from 'react-icons/fa';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const API_KEY = '51e04f7dae82ad89284507a3af1dec1e'; // Replace with your actual API key

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

  async function fetchWeather(e) {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    try {
      setError('');
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data", error);
      setError('Failed to fetch weather data. Please check the city name and try again.');
      setWeather(null);
    }
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Weather Dashboard</h1>
        <div className={styles.userInfo}>
          <span>Welcome, {currentUser.email}</span>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <form onSubmit={fetchWeather} className={styles.searchForm}>
          <input 
            type="text" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            placeholder="Enter city name"
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchBtn}>
            <FaSearch /> Search
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        {weather && (
          <div className={styles.weatherContainer}>
            <h2>Weather in {weather.city.name}</h2>
            
            {/* Today's weather */}
            <div className={styles.todayWeather}>
              <h3>Today</h3>
              <div className={styles.weatherCard}>
                <div className={styles.mainInfo}>
                  <img 
                    src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`} 
                    alt={weather.list[0].weather[0].description}
                  />
                  <p className={styles.temp}>{Math.round(weather.list[0].main.temp)}°C</p>
                </div>
                <p className={styles.description}>{weather.list[0].weather[0].description}</p>
                <div className={styles.details}>
                  <p><FaTemperatureHigh /> Feels like: {Math.round(weather.list[0].main.feels_like)}°C</p>
                  <p><FaWind /> Wind: {weather.list[0].wind.speed} m/s</p>
                  <p><FaTint /> Humidity: {weather.list[0].main.humidity}%</p>
                </div>
              </div>
            </div>
            
            {/* 4-day forecast */}
            <div className={styles.forecast}>
              <h3>4-Day Forecast</h3>
              <div className={styles.forecastGrid}>
                {weather.list.filter((_, index) => index % 8 === 0).slice(1, 5).map((forecast, index) => (
                  <div key={index} className={styles.forecastCard}>
                    <h4>{new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</h4>
                    <img 
                      src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} 
                      alt={forecast.weather[0].description}
                    />
                    <p className={styles.forecastTemp}>{Math.round(forecast.main.temp)}°C</p>
                    <p>{forecast.weather[0].description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
