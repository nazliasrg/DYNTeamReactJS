import React, { Fragment, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import logo from '../../../assets/logo.png';
import { withRouter } from 'react-router-dom';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value })
    }

    handleUsername = () => {
        alert('Welcome ' + this.state.username + '!');
        const { history } = this.props;
        history.push('/home-admin');
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
                                            <input type="password" className="form-control" id="password" required />
                                            <br />
                                            <button type="submit" className="btn btn-login" onClick={this.handleUsername}>LOGIN</button>
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