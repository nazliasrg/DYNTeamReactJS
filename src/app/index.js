import React, { Fragment } from 'react';
import Login from '../containers/Login/Login';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from '../containers/Home/Home';
import Users from '../containers/Users/Users';
import Pending from '../containers/Pending/Pending';
import Activity from '../containers/Activity/Activity';
import History from '../containers/History/History';
import Admin from '../containers/Admin/Admin';

const App = () => {
    return (
        <Router>
            <Fragment>
                <Route path="/" exact component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/users" component={Users}/>
                <Route path="/pending" component={Pending}/>
                <Route path="/activity" component={Activity}/>
                <Route path="/history" component={History}/>
                <Route path="/admin" component={Admin}/>
            </Fragment>
        </Router>
    )
}

export default App;