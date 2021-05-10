import React, { Fragment, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import logo from '../../../assets/logo.png';
import { withRouter } from 'react-router-dom';
import axios from 'axios'

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

        console.log("this.state.username")
        console.log(this.state.username)
        console.log(this.state.password)

        if ((this.state.username === "") && (this.state.password === "")) {
            alert("Username & Password are empty!");
        }
        else if (this.state.password === "") {
            alert("Password is empty!");
        }
        else if (this.state.username === "") {
            alert("Username is empty!");
        }
        else {
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

                    window.location.reload();

                    console.log(this.props.history.location.state);
                    this.state.roles.forEach(role => {
                        if (res.data.data.token && (role === 'SUPER_ADMIN' || role === 'ADMIN')) {
                            localStorage.setItem('data_admin', JSON.stringify(res.data));
                        }
                    })

                })
                .catch(function (error) {
                    if (error.message === "Request failed with status code 417") {
                        alert("Account is not active!");
                    }
                    else if (error.message == "Request failed with status code 500") {
                        alert("Username and password not match!");
                    }
                    console.log(error.message)
                });
        }
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
                                            <form>
                                                <label>Username</label>
                                                <input type="text" className="form-control" id="username" onChange={this.handleUsernameChange} required />
                                                <label>Password</label>
                                                <input type="password" className="form-control" id="password" onChange={this.handlePasswordChange} required />
                                                <br />
                                                <button type="submit" className="btn btn-login" onClick={this.submitAction}>LOGIN</button>
                                            </form>
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