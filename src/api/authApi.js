import axios from 'axios';

const API = 'http://localhost:8080/api/auth';

export const login = async (email, password) => {
  const response = await axios.post(`${API}/login`, {
    email,
    password,
  });
  console.log('Login token:', response.data);
  return response.data; // <--- karena isinya langsung JWT string
};
