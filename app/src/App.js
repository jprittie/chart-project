import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import DashboardNav from './components/DashboardNav';
import ChartContainer from './components/ChartContainer';

const App = () => (
  <BrowserRouter>
    <div>
      <DashboardNav />
      <ChartContainer />
    </div>
  </BrowserRouter>
);

export default App;
