import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NavbarSidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:8080/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Gagal ambil profil:', err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div style={sidebarStyle}>
      {user && (
        <div style={profileStyle} onClick={() => navigate('/profile')}>
          <div style={photoStyle}>
            {user.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt="Profile"
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
              />
            ) : (
              <span style={{ lineHeight: '80px', fontSize: '32px' }}>👤</span>
            )}
          </div>
          <div style={{ marginTop: '8px', cursor: 'pointer' }}>{user.fullName}</div>
        </div>
      )}

      <nav style={{ marginTop: '30px' }}>
        <button style={navBtn} onClick={() => navigate('/dashboard')}>Dashboard</button>
        <button style={navBtn} onClick={() => navigate('/expenses')}>Expenses</button>
        <button style={navBtn} onClick={() => navigate('/categories')}>Categories</button>
        <button style={navBtn} onClick={() => navigate('/profile')}>Profile</button>
      </nav>
    </div>
  );
};

const sidebarStyle = {
  width: '220px',
  height: '100vh',
  backgroundColor: '#1e1e2f',
  color: '#fff',
  padding: '20px',
  boxSizing: 'border-box'
};

const profileStyle = {
  textAlign: 'center',
  marginBottom: '30px',
  cursor: 'pointer'
};

const photoStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundColor: '#444',
  margin: '0 auto',
  marginBottom: '10px',
  overflow: 'hidden'
};

const navBtn = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  backgroundColor: '#2d2d44',
  border: 'none',
  borderRadius: '5px',
  color: '#fff',
  cursor: 'pointer'
};

export default NavbarSidebar;
