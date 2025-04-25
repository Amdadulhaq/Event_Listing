import { useState } from 'react';
import useAuthStore from '../store/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login, loading, error, user } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    if (useAuthStore.getState().user) navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-4 border rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
