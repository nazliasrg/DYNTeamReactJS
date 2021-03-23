import React, { Component, Fragment } from 'react';
import logo from '../../containers/assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';

class Sidebar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            menu: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    
    toggleMenu(){
        this.setState({ menu: !this.state.menu })
    }
    render(){
        const show = (this.state.menu) ? "show" : "" ;
        return(
            <Fragment>
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <img className="logo" src={logo} alt=""/>
                    </div>

                    <ul className="list-unstyled components">
                        <li>
                            <a className="navbar-toggler" type="button"  onClick={ this.toggleMenu }>
                                <i className="fa-fw fas fa-server"></i>
                                Log Data
                            </a>
                            <div className={"collapse navbar-collapse " + show}>
                                <div className="navbar-nav">
                                    <a className="nav-item nav-link active" href="/home">Manage Books</a>
                                    <a className="nav-item nav-link" href="/users">Manage Users</a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <a className="navbar-toggler" type="button" onClick={ this.toggleMenu }>
                                <i className="fa-fw fas fa-chart-line"></i>
                                Activities
                            </a>
                            <div className={"collapse navbar-collapse " + show}>
                                <div className="navbar-nav">
                                    <a className="nav-item nav-link active" href="/pending">Waiting Confirm</a>
                                    <a className="nav-item nav-link" href="/activity">On Progress</a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <a href="/history">
                                <i className="fa-fw fas fa-clipboard-list"></i>
                                History
                            </a>
                        </li>
                        <li>
                            <a href="/admin">
                                <i className="fa-fw fas fa-user-friends"></i>
                                Manage Admin
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <i className="fa-fw fas fa-sign-out-alt"></i>
                                Log Out
                            </a>
                        </li>
                    </ul>
                </nav>
            </Fragment>
        )
    }
}

export default Sidebar;