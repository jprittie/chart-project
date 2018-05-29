import React from 'react';
import { Link } from 'react-router-dom';

import './DashboardNav.css';

const DashboardNav = () => (
  <div className='dashboard-nav three columns teal lighten-5'>
    <h4 className='dashboard-nav-title'>Statstics Dashboard</h4>
    <div className='dashboard-nav-options' >
      <Link to={`/hourlyEvents`}>
        Hourly Events
      </Link>
      <Link to={`/dailyEvents`}>
        Daily Events
      </Link>
      <Link to={`/hourlyStats`}>
        Hourly Stats
      </Link>
      <Link to={`/dailyStats`}>
        Daily Stats
      </Link>
      <Link to={`/heatMap`}>
        Heat Map
      </Link>
    </div>
  </div>
);

export default DashboardNav;
