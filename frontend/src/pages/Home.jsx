import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:5000/api';

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API}/events`);
        const upcoming = res.data.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 3);
        setEvents(upcoming);
      } catch (err) {
        console.error('Error loading events:', err);
      }
    };
    fetchEvents();
  }, []);

  const categories = ['Music', 'Tech', 'Art', 'Sports', 'Networking', 'Education'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Banner */}
      <section className="bg-blue-600 text-white p-8 rounded-lg shadow mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">Discover Local Events</h1>
        <p className="text-lg mb-4">Find fun, inspiration, and networking opportunities near you.</p>
        <Link to="/events" className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-gray-100">
          Browse Events
        </Link>
      </section>

      {/* Categories */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Explore by Category</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <span key={cat} className="bg-gray-200 px-4 py-2 rounded text-sm text-gray-700">
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-center">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.length === 0 ? (
            <p className="text-center col-span-full">No upcoming events.</p>
          ) : (
            events.map((event) => (
              <Link key={event._id} to={`/events/${event._id}`} className="block border p-4 rounded shadow hover:shadow-md">
                <h3 className="font-semibold text-lg">{event.name}</h3>
                <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()} • {event.location}</p>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
