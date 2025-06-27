import React from 'react';

const ExpensePage = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📊 Expense Page</h2>
      <p style={styles.placeholder}>Soon.</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
  },
  heading: {
    fontSize: '24px',
    color: '#343a40',
    marginBottom: '15px',
  },
  placeholder: {
    fontSize: '16px',
    color: '#6c757d',
  },
};

export default ExpensePage;
