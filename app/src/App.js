import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import DashboardNav from './components/DashboardNav';
import ChartContainer from './components/ChartContainer';

const App = () => (
  <BrowserRouter>
    <div>
      <div className='App-header'>
        Statistics Dashboard
      </div>
      <div className='App-container'>
        <DashboardNav />
        <ChartContainer />
      </div>
    </div>
  </BrowserRouter>
);

export default App;
