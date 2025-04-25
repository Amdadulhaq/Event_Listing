import { useState } from 'react';
import useAuthStore from '../store/auth';
import { useNavigate } from 'react-router-dom';

function Register() {
  const { register, loading, error, user } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form.name, form.email, form.password);
    if (useAuthStore.getState().user) navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-4 border rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-4 border rounded"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={form.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;
