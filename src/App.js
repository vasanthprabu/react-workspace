import React from 'react';
import './App.css';
import CCSSignIn from './components/CCS-Login';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import  Home  from './Home';

function App() {
  return (
    <Router>
    <div className="App">
        <Switch>
          <Route path="/login" exact component = { CCSSignIn }></Route>
          <Route path="/" component = { Home }></Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
