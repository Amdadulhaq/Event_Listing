import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = 'http://localhost:5000/api';

function Events() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API}/events`);
      setEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Events</h1>
      {events.length === 0 ? (
        <p className="text-center">No events available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="border p-4 rounded shadow hover:shadow-md transition">
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()} @ {event.time}</p>
              <p className="text-gray-700">{event.location}</p>
              <Link to={`/events/${event._id}`} className="text-blue-600 mt-2 inline-block hover:underline">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
