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
import CreateAdmin from '../containers/AdminPages/Admin/CreateAdmin';
import EditAdmin from '../containers/AdminPages/Admin/EditAdmin';
import CreateUser from '../containers/AdminPages/Users/CreateUser';
import EditUser from '../containers/AdminPages/Users/EditUser';
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
import EditAuthor from '../containers/AdminPages/Home/Author/EditAuthor';
import EditCategory from '../containers/AdminPages/Home/Category/EditCategory';
import EditPublisher from '../containers/AdminPages/Home/Publisher/EditPublisher';
import AddAuthor from '../containers/AdminPages/Home/Author/AddAuthor';
import AddCategory from '../containers/AdminPages/Home/Category/AddCategory';
import AddPublisher from '../containers/AdminPages/Home/Publisher/AddPublisher';
import BookDetail from '../components/User/DetailBook';

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
                <Route path="/detail/:bookId" exact component={BookDetail} />

                <Route path="/login-admin" exact component={Login} />
                <Route path="/home-admin" component={Home} />
                <Route path="/users" component={Users} />
                <Route path="/pending" component={Pending} />
                <Route path="/activity" component={Activity} />
                <Route path="/history" component={History} />
                <Route path="/admin-role" component={Admin} />

                {/* admin table */}
                <Route path="/create-admin" component={CreateAdmin} />
                <Route path="/edit-admin/:no" component={EditAdmin} />

                {/* users table */}
                <Route path="/create-user" component={CreateUser} />
                <Route path="/edit-user/:id" component={EditUser} />

                {/* books table */}
                <Route path="/add-book" component={AddBook} />
                <Route path="/edit-book/:no" component={EditBook} />
                <Route path="/book-author" component={Author} />
                <Route path="/book-category" component={Category} />
                <Route path="/book-publisher" component={Publisher} />
                <Route path="/edit-author/:authorId" component={EditAuthor} />
                <Route path="/add-author" component={AddAuthor} />
                <Route path="/edit-category/:categoryId" component={EditCategory} />
                <Route path="/add-category" component={AddCategory} />
                <Route path="/edit-publisher/:publisherId" component={EditPublisher} />
                <Route path="/add-publisher" component={AddPublisher} />


            </Switch>
        </Router>
    )
}

export default App;