import React from 'react';
import EventCard from '../components/EventCard';
import './HomePage.css';

const HomePage = () => {
  const events = [
    {
      image: 'https://via.placeholder.com/300',
      title: 'Tech Conference 2024',
      date: 'December 15, 2024',
      description: 'An annual conference for tech enthusiasts.',
    },
    {
      image: 'https://via.placeholder.com/300',
      title: 'Art Exhibition',
      date: 'November 20, 2024',
      description: 'A showcase of modern art from local artists.',
    },
  ];

  return (
    <div className="home-page">
      <h1>Upcoming Events</h1>
      <div className="events-container">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
