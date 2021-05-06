import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Loginuser.css';
import logo from '../../../assets/Logouser.png';
import { Link } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import axios from 'axios';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

ReactSession.setStoreType("localStorage");

class Loginuser extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            roles: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    validate() {
        let usernameError = "";
        let passwordError = "";

        if (this.state.username == null || this.state.username == '') {
            usernameError = "Username field is required";
        }

        if (this.state.password == null || this.state.password == '') {
            passwordError = "Password field is required";
        }
        this.setState({ usernameError, passwordError });
        if (usernameError != "" || passwordError != "") {

            return false;
        }
        return true;
    }

    submit() {
        if (this.validate()) {

            const user = {
                username: this.state.username,
                password: this.state.password
            }

            axios.post('http://localhost:7070/api/dynteam/auth/user/login', user)
                .then(res => {
                    console.log("res");
                    console.log(res.data.data.roles[0]);
                    this.setState({
                        roles: res.data.data.roles[0]
                    })

                    alert('Welcome ' + this.state.username + '!');
                    this.props.history.push({
                        pathname: '/Home',
                        state: res.data.data,
                    })

                    console.log(this.props.history.location.state);
                    console.log("res.data.data.token");
                    console.log(res.data.data.token);

                    if (res.data.data.token && (this.state.roles === 'USER')) {
                        localStorage.setItem('data_user', JSON.stringify(res.data));
                    }

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
    }
    render() {
        return (

            <Fragment>
                <div className="card shadow mx-5 my-5 containeruser ">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <img src={logo} style={{
                                    height: 250,
                                }} />
                                <br />
                                <label>Belum Punya Akun?</label><br />
                                <Link to='/Registrasi'><a button type="button" className="btn btn-outline-success my-3"
                                    style={{ width: 250 }}>Sign up</a></Link>

                            </div>

                            <div className="col-md-6">
                                <div className="card justify-content-center mb-5">

                                    <div className="card-body">
                                        <h2 className="card-title text-center">LOGIN</h2>

                                        <div className="form-group">
                                            <label>Username</label>
                                            <input type="text" className="form-control" id="usernameLogin" name="username" value={this.state.username} onChange={this.handleInputChange} />
                                            <span className="text-danger">{this.state.usernameError}</span><br />

                                            <label>Password</label>
                                            <input type="password" className="form-control" id="passwordLogin" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                            <span className="text-danger">{this.state.passwordError}</span>

                                            <button type="submit" class="btn btn-success mt-4" onClick={() => this.submit()}
                                                style={{ width: '100%' }}>Login</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <NotificationContainer />
                </div>
            </Fragment>
        )
    }
}

export default Loginuser;