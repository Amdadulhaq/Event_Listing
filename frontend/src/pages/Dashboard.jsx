import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthStore from '../store/auth';

const API = 'http://localhost:5000/api';

function Dashboard() {
  const { user, token } = useAuthStore();
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ name: '', date: '', time: '', location: '', description: '', category: '' });
  const [editId, setEditId] = useState(null);

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchEvents = async () => {
    const res = await axios.get(`${API}/events`, authHeader);
    const userEvents = res.data.filter(event => event.user === user.id);
    setEvents(userEvents);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API}/events/${editId}`, form, authHeader);
    } else {
      await axios.post(`${API}/events`, form, authHeader);
    }
    setForm({ name: '', date: '', time: '', location: '', description: '', category: '' });
    setEditId(null);
    fetchEvents();
  };

  const handleEdit = (event) => {
    setForm(event);
    setEditId(event._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/events/${id}`, authHeader);
    fetchEvents();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">My Dashboard</h1>

      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded shadow">
        <h2 className="text-xl font-semibold mb-4">{editId ? 'Edit Event' : 'Create New Event'}</h2>
        {['name', 'date', 'time', 'location', 'description', 'category'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            type={field === 'date' ? 'date' : 'text'}
          />
        ))}
        <button className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700">
          {editId ? 'Update Event' : 'Create Event'}
        </button>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Events</h2>
        {events.length === 0 ? (
          <p>No events yet.</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="border rounded p-4 mb-4 shadow-sm">
              <h3 className="text-lg font-bold">{event.name}</h3>
              <p>{event.date} @ {event.time} - {event.location}</p>
              <p className="text-sm text-gray-600">{event.description}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => handleEdit(event)} className="text-blue-500">Edit</button>
                <button onClick={() => handleDelete(event._id)} className="text-red-500">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
