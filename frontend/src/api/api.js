import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => {
    if (res.data?.success !== undefined) {
      res.data = res.data.data ?? res.data;
    }
    return res;
  },
  (err) => Promise.reject(err)
);

export default api;
