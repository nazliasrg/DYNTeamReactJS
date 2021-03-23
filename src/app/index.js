import React, { Fragment } from 'react';
import Login from '../containers/AdminPages/Login/Login';
import './App.css';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Home from '../containers/AdminPages/Home/Home';
import Users from '../containers/AdminPages/Users/Users';
import Pending from '../containers/AdminPages/Pending/Pending';
import Activity from '../containers/AdminPages/Activity/Activity';
import History from '../containers/AdminPages/History/History';
import Admin from '../containers/AdminPages/Admin/Admin';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/admin" exact component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/users" component={Users}/>
                <Route path="/pending" component={Pending}/>
                <Route path="/activity" component={Activity}/>
                <Route path="/history" component={History}/>
                <Route path="/admin" component={Admin}/>
            </Switch>
        </Router>
    )
}

export default App;