import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div style={styles.container}>
    <div style={styles.card}>
      <h1 style={styles.title}>Welcome to Expense Tracker</h1>
      <p style={styles.subtitle}>Manage your finances easily.</p>
      <div style={styles.buttonContainer}>
        <Link to="/login" style={styles.button}>Login</Link>
        <Link to="/register" style={{ ...styles.button, backgroundColor: '#6c757d' }}>Register</Link>
      </div>
    </div>
  </div>
);

const styles = {
  container: {
    backgroundColor: '#f7f9fc',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '50px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '90%',
  },
  title: {
    color: '#007BFF',
    fontSize: '28px',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#333',
    fontSize: '16px',
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
  }
};

export default HomePage;
