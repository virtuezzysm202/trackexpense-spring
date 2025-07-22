import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpensePage = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [editId, setEditId] = useState(null); // ID expense yang sedang diedit

  useEffect(() => {
    fetchCategories();
    fetchExpenses();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/categories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Gagal memuat kategori:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data);
    } catch (error) {
      console.error('Gagal memuat pengeluaran:', error);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const expenseData = {
      amount: parseFloat(amount),
      description,
      categoryId,
      date: date ? new Date(date).toISOString() : new Date().toISOString(),
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:8080/api/expenses/${editId}`, expenseData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditId(null);
      } else {
        await axios.post('http://localhost:8080/api/expenses', expenseData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      resetForm();
      fetchExpenses();
    } catch (error) {
      console.error('Gagal simpan pengeluaran:', error);
    }
  };

  const handleEdit = (expense) => {
    setAmount(expense.amount);
    setDescription(expense.description);
    setCategoryId(expense.categoryId);
    setDate(expense.date.slice(0, 10)); // ISO to YYYY-MM-DD
    setEditId(expense.id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Yakin ingin menghapus?')) return;

    try {
      await axios.delete(`http://localhost:8080/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpenses();
    } catch (error) {
      console.error('Gagal menghapus:', error);
    }
  };

  const resetForm = () => {
    setAmount('');
    setDescription('');
    setCategoryId('');
    setDate('');
    setEditId(null);
  };

  // Filter by date
  const filteredExpenses = expenses.filter((exp) => {
    const expDate = new Date(exp.date);
    const from = startDate ? new Date(startDate) : null;
    const to = endDate ? new Date(endDate) : null;
    return (!from || expDate >= from) && (!to || expDate <= to);
  });

  const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div style={styles.container}>
      <h2>{editId ? 'Edit Pengeluaran' : 'Tambah Pengeluaran'}</h2>
      <div style={styles.form}>
        <input
          type="number"
          placeholder="Jumlah"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Deskripsi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          style={styles.input}
        >
          <option value="">Pilih Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleSubmit} style={styles.button}>
            {editId ? 'Simpan Perubahan' : 'Tambah'}
          </button>
          {editId && (
            <button onClick={resetForm} style={styles.cancelButton}>
              Batal
            </button>
          )}
        </div>
      </div>

      <h2>Filter Tanggal</h2>
      <div style={{ ...styles.form, flexDirection: 'row', gap: '1rem' }}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={styles.input}
        />
      </div>

      <h3>Total: Rp {total.toLocaleString('id-ID')}</h3>

      <h2>Daftar Pengeluaran</h2>
      <ul style={styles.list}>
        {filteredExpenses.map((exp) => (
          <li key={exp.id} style={styles.item}>
            <div>
              <strong>Rp{exp.amount}</strong> - {exp.description} (
              {exp.category?.name || 'No Category'}) -{' '}
              {new Date(exp.date).toLocaleDateString('id-ID')}
            </div>
            <div>
              <button onClick={() => handleEdit(exp)} style={styles.smallButton}>
                Edit
              </button>
              <button onClick={() => handleDelete(exp.id)} style={styles.deleteButton}>
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    marginBottom: '2rem',
  },
  input: {
    padding: '0.5rem',
    marginBottom: '1rem',
    fontSize: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    padding: '0.75rem 0',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallButton: {
    padding: '0.25rem 0.5rem',
    marginRight: '0.5rem',
    fontSize: '0.9rem',
    backgroundColor: '#ffc107',
    color: '#000',
    border: 'none',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '0.25rem 0.5rem',
    fontSize: '0.9rem',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default ExpensePage;
