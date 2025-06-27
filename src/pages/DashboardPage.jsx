import React from 'react';
import NavbarSidebar from '../components/Navbar';

const DashboardPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <NavbarSidebar />

      <div style={{ flex: 1, padding: '30px' }}>
        <h2>Dashboard</h2>
        <p>Welcome.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
