import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You re logged out');
          return;
        }

        const response = await axios.get('http://localhost:8080/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(response.data);
      } catch (err) {
        setError('Failed to retrieve profile data. Please re-login.');
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString('id-ID', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    });

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!profile) return <p>Loading data...</p>;

  return (
    <div style={{
      maxWidth: '600px',
      margin: 'auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#f9f9f9',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {profile.profilePhoto ? (
          <img src={profile.profilePhoto} alt="Profile" style={{ borderRadius: '50%', width: '100px' }} />
        ) : (
          <div style={{
            width: '100px', height: '100px',
            backgroundColor: '#ccc',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '36px', margin: 'auto'
          }}>
            {profile.fullName ? profile.fullName.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
      </div>

      <h2 style={{ textAlign: 'center' }}>{profile.fullName}</h2>

      <div style={{ marginTop: '20px' }}>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Number:</strong> {profile.phoneNumber || '-'}</p>
        <p><strong>Password Hash:</strong> <code style={{ wordBreak: 'break-all' }}>{profile.passwordHash}</code></p>
        <p><strong>Created:</strong> {formatDate(profile.createdAt)}</p>
        <p><strong>Last Update:</strong> {formatDate(profile.updatedAt)}</p>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button onClick={handleLogout} style={logoutBtn}>Logout</button>
      </div>
    </div>
  );
};

const logoutBtn = {
  backgroundColor: '#dc3545',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px'
};

export default ProfilePage;
