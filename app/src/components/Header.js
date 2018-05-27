import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className='App-header'>
    <h1 className='App-title'>Select a chart</h1>
    <div>
      <Link to={`/hourlyEvents`}>
        <button>Hourly Events</button>
      </Link>
      <Link to={`/dailyEvents`}>
        <button>Daily Events</button>
      </Link>
      <Link to={`/hourlyStats`}>
        <button>Hourly Stats</button>
      </Link>
      <Link to={`/dailyStats`}>
        <button>Daily Stats</button>
      </Link>
    </div>
  </header>
);

export default Header;
