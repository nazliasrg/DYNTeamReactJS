import React, { Fragment, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import logo from '../../../assets/logo.png';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import { Button } from 'bootstrap';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            roles: []
        };
    }

    handleUsernameChange = (event) => {
        window.sessionStorage.setItem("username", event.target.value);
        this.setState({ username: event.target.value })
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    submitAction = (e) => {
        e.preventDefault();

        const admin = {
            username: this.state.username,
            password: this.state.password
        }

        console.log(admin)

        axios.post('http://localhost:7070/api/dynteam/auth/admin/login', admin)
            .then(res => {
                console.log(res);
                this.setState({
                    roles: res.data.data.role
                })
                alert('Welcome ' + this.state.username + '!');
                this.props.history.push({
                    pathname: '/home-admin',
                    state: res.data.data,
                })


                console.log(this.props.history.location.state);
                this.state.roles.forEach(role => {
                    if (res.data.data.token && (role === 'SUPER_ADMIN' || role === 'ADMIN')) {
                        localStorage.setItem('data_admin', JSON.stringify(res.data));
                    }
                })

            })
            .catch(function (error) {
                if (error == "Error: Request failed with status code 417") {
                    alert("Account is not active!");
                }
                else if (error == "Request failed with status code 500") {
                    alert("Username and password don't match!");
                }
                console.log(error.message)
            });
    }



    render() {
        return (
            <Fragment>
                <div className="card shadow card-login">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6 mb-5">
                                <form>
                                    <div className="row container-login justify-content-center">
                                        <img className="logoLogin mx-2" src={logo} alt="" />
                                        <p className="judul-login-admin text-center">Login Admin</p>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <label>Username</label>
                                            <input type="text" className="form-control" id="username" onChange={this.handleUsernameChange} required />
                                            <label>Password</label>
                                            <input type="password" className="form-control" id="password" onChange={this.handlePasswordChange} required />
                                            <br />
                                            <button type="submit" className="btn btn-login" onClick={this.submitAction}>LOGIN</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(Login);