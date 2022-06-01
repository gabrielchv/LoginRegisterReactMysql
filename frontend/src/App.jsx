import React from 'react';
import Login from './components/login';
import Logged from './components/logged';
import './styles/style.css'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/main" component={Logged}/>
        <Route exact path="/login" component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
