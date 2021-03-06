import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter,Switch,Route,Link} from 'react-router-dom';

import Main from './views/Main';
import Create from './components/Create';
import Update from './components/Update';


function App() {
  return (
    <div className="App">
    <BrowserRouter>

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/author/create">
          <Create />
        </Route>
        <Route exact path="/author/update/:id">
        <Update />
      </Route>
          </Switch>
          </BrowserRouter>
    </div>
  );
}

export default App;
