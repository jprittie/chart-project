import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ChartContainer from './components/ChartContainer';

const App = () => (
  <BrowserRouter>
    <div className='App'>
      <header className='App-header'>
        <h1 className='App-title'>Select a chart</h1>
      </header>
      <Switch>
        <Route path='/' component={ChartContainer} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
