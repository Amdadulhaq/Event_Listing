import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/auth'; // adjust path if needed

const API = 'http://localhost:5000/api';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const { user, token } = useAuthStore();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${API}/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error('Failed to fetch event:', err);
      } finally {
        setLoading(false);
      }
    };

    const checkSaved = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`${API}/user/saved`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSaved(res.data.some(e => e._id === id));
      } catch (err) {
        console.error('Failed to check saved events:', err);
      }
    };

    fetchEvent();
    checkSaved();
  }, [id, user, token]);

  const toggleSave = async () => {
    try {
      if (saved) {
        await axios.post(`${API}/user/unsave/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API}/user/save/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setSaved(!saved);
    } catch (err) {
      console.error('Failed to toggle save:', err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading event...</p>;
  if (!event) return <p className="text-center mt-10 text-red-500">Event not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
      <p className="text-gray-600 mb-2">
        📅 {new Date(event.date).toLocaleDateString()} at 🕒 {event.time}
      </p>
      <p className="text-gray-700 mb-4">📍 {event.location}</p>
      <p className="text-gray-800">{event.description}</p>
      {event.category && (
        <div className="mt-4 text-sm text-white bg-blue-500 inline-block px-2 py-1 rounded">
          {event.category}
        </div>
      )}

      {user && (
        <button
          onClick={toggleSave}
          className="mt-6 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
        >
          {saved ? 'Unsave Event' : 'Save Event'}
        </button>
      )}
    </div>
  );
}

export default EventDetail;
