import React from 'react';
import { Link } from 'react-router-dom';

import './DashboardNav.css';

const DashboardNav = () => (
  <div className='dashboard-nav'>
    <div className='dashboard-nav-options'>
      <div className='dashboard-nav-category'>
        <Link to={`/hourlyEvents`}>
          Hourly Events Charts
        </Link>
      </div>
      <div className='dashboard-nav-category'>
        <Link to={`/dailyEvents`}>
          Daily Events Charts
        </Link>
      </div>
      <div className='dashboard-nav-category'>
        <Link to={`/hourlyStatsCharts`}>
          Hourly Stats Charts
        </Link>
      </div>
      <div className='dashboard-nav-category'>
        <Link to={`/HourlyStatsTable`}>
          Hourly Stats Table
        </Link>
      </div>
      <div className='dashboard-nav-category'>
        <Link to={`/dailyStats`}>
          Daily Stats Charts
        </Link>
      </div>
      <div className='dashboard-nav-category'>
        <Link to={`/heatMap`}>
          Heat Map
        </Link>
      </div>
    </div>
  </div>
);

export default DashboardNav;
