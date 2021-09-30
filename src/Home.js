import React from 'react';
import './App.css';
import NavBar from './NavBar';
import TicketMasterIntensify from './components/Ticket-Master-Intensify';
import ChartsShowcase from './components/Charts-Showcase';
import Maintenance from './components/Maintenance';
import BugReport from './components/BugReport';
import { Switch,Route,Redirect } from 'react-router-dom';
import store from 'store';

function Home() {
    if (!store.get('loggedIn')) {
        return <Redirect to="/login" />;
      }
  return (
    <div className="App">
        <NavBar/>
        <Switch>
          <Route path="/" exact component = { TicketMasterIntensify }></Route>
          <Route path="/TicketMaster" exact component = { TicketMasterIntensify }></Route>
          <Route path="/ChartsShowcase" exact component = { ChartsShowcase }></Route>
          <Route path="/Maintenance" exact component = { Maintenance }></Route>
          <Route path="/BugReport" exact component = { BugReport }></Route>
        </Switch>
    </div>
  );
}

export default Home;
