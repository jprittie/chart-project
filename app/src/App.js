import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import ChartContainer from './components/ChartContainer';

const App = () => (
  <BrowserRouter>
    <div className='App'>
      <Header />
      <ChartContainer />
    </div>
  </BrowserRouter>
);

export default App;
