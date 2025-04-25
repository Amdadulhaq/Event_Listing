import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/auth';

function Header() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">EventHub</Link>
        <nav className="flex gap-4">
          <Link to="/events" className="text-gray-700 hover:text-blue-600">Events</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
              <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
