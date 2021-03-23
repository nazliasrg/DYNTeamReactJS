import React, { Component, Fragment } from 'react';
import Sidebar from '../../../component/Sidebar/Sidebar';
import './Admin.css';
import $ from 'jquery';

class Admin extends Component{

    handleSidebar = () =>{
        $('#sidebar').toggleClass('active');
    }

    render(){
        return(
            <Fragment>
                <div className="wrapper">
                    <Sidebar id="sidebar"/>
                    <div id="content">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid">
                                <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={this.handleSidebar}>
                                    <span className="cursor">&#9776;</span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="nav navbar-nav ml-auto">
                                        <li className="nav-item active">
                                            <a className="nav-link text-muted" href="#"><i className="fa-fw fas fa-user text-muted"></i>&nbsp;Administrator</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>

                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-dark">Manage Role</h6>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered text-center" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>ID&nbsp;Role</th>
                                                <th>Username</th>
                                                <th>Level</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>No.</th>
                                                <th>ID&nbsp;Role</th>
                                                <th>Username</th>
                                                <th>Level</th>
                                                <th>Status</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>01</td>
                                                <td>Admin</td>
                                                <td>Administrator</td>
                                                <td>
                                                    <a href="#" type="button" className="badge badge-primary">ACTIVE</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>02</td>
                                                <td>Officer</td>
                                                <td>Officer</td>
                                                <td>
                                                    <a href="#" type="button" className="badge badge-primary">ACTIVE</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Admin;