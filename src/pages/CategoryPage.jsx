import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const CategoryPage = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Ambil kategori
  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/categories', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCategories(res.data);
    } catch (err) {
      console.error('Gagal ambil kategori:', err);
    }
  };

  // Ambil semua pengeluaran
  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/expenses', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setExpenses(res.data);
    } catch (err) {
      console.error('Gagal ambil pengeluaran:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8080/api/categories',
        { name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setName('');
      fetchCategories(); // refresh list
    } catch (err) {
      console.error('Gagal tambah kategori:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchExpenses();
  }, []);

  // Hitung total pengeluaran per kategori
  const expensePerCategory = categories.map((cat) => {
    const total = expenses
      .filter((e) => e.category?.id === cat.id)
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      name: cat.name,
      total: parseFloat(total.toFixed(2)),
    };
  });

  return (
    <div style={{ padding: '20px' }}>
      <h2>Kelola Kategori & Statistik Pengeluaran</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Kategori baru"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Tambah Kategori</button>
      </form>

      <h3>Daftar Kategori</h3>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>

      <h3>Grafik Pengeluaran per Kategori</h3>
      {expenses.length === 0 ? (
        <p>Belum ada data pengeluaran.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={expensePerCategory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CategoryPage;
