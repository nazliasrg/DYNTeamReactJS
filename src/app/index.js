import React from 'react';
import Login from '../containers/AdminPages/Login/Login';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../containers/AdminPages/Home/Home';
import Users from '../containers/AdminPages/Users/Users';
import Pending from '../containers/AdminPages/Pending/Pending';
import Activity from '../containers/AdminPages/Activity/Activity';
import History from '../containers/AdminPages/History/History';
import Admin from '../containers/AdminPages/Admin/Admin';
import AddBook from '../containers/AdminPages/Home/AddBook';
import EditBook from '../containers/AdminPages/Home/EditBook';
import Loginuser from '../containers/UserPages/Loginuser/Loginuser';
import Registrasi from '../containers/UserPages/Registrasi/Registrasi';
import Profileuser from '../containers/UserPages/Profile/Profileuser';
import Location from '../containers/UserPages/Location/Location';
import HomeUser from '../containers/UserPages/HomeUser/HomeUser';
import Genre from '../containers/UserPages/Genre/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailBook from '../containers/UserPages/DetailBook/DetailBook';
import Author from '../containers/AdminPages/Home/Author/Author';
import Category from '../containers/AdminPages/Home/Category/Category';
import Publisher from '../containers/AdminPages/Home/Publisher/Publisher';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Loginuser} />
                <Route path="/home" exact component={HomeUser} />
                <Route path="/Registrasi" exact component={Registrasi} />
                <Route path="/Profileuser" exact component={Profileuser} />
                <Route path="/location" exact component={Location} />
                <Route path="/Genre" exact component={Genre} />
                <Route path="/detail-book/:bookId" exact component={DetailBook} />

                <Route path="/login-admin" exact component={Login} />
                <Route path="/home-admin" component={Home} />
                <Route path="/users" component={Users} />
                <Route path="/pending" component={Pending} />
                <Route path="/activity" component={Activity} />
                <Route path="/history" component={History} />
                <Route path="/admin-role" component={Admin} />

                {/* books table */}
                <Route path="/add-book" component={AddBook} />
                <Route path="/edit-book/:no" component={EditBook} />
                <Route path="/book-author" component={Author} />
                <Route path="/book-category" component={Category} />
                <Route path="/book-publisher" component={Publisher} />
            </Switch>
        </Router>
    )
}

export default App;