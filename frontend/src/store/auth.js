import { create } from 'zustand';
import axios from 'axios';

const API = 'http://localhost:5000/api';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || '',
  error: '',
  loading: false,

  login: async (email, password) => {
    set({ loading: true, error: '' });
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      set({ user: res.data.user, token: res.data.token });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Login failed' });
    } finally {
      set({ loading: false });
    }
  },

  register: async (name, email, password) => {
    set({ loading: true, error: '' });
    try {
      const res = await axios.post(`${API}/auth/register`, { name, email, password });
      localStorage.setItem('token', res.data.token);
      set({ user: res.data.user, token: res.data.token });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Register failed' });
    } finally {
      set({ loading: false });
    }
  },

  saveEvent: async (eventId) => {
    const { token, user } = useAuthStore.getState();
    const res = await axios.post(`${API}/user/save/${eventId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Optional: update local state
  },
  
  unsaveEvent: async (eventId) => {
    const { token, user } = useAuthStore.getState();
    const res = await axios.post(`${API}/user/unsave/${eventId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Optional: update local state
  },
  
  getSavedEvents: async () => {
    const { token } = useAuthStore.getState();
    const res = await axios.get(`${API}/user/saved`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },
  

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: '' });
  },
}));

export default useAuthStore;
