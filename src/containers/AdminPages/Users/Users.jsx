import React, { Component, Fragment } from 'react';
import Sidebar from '../../../component/Admin/Sidebar/Sidebar';
import './Users.css';
import $ from 'jquery';
import axios from 'axios';

class Users extends Component{
    
    constructor() {
        super();
        this.state = {
            data: [],
            search: ""
        };
    }

    handleSidebar = () =>{
        $('#sidebar').toggleClass('active');
    }

    componentDidMount= () =>{
        this.getUsers();
    }

    getUsers = () => {
        axios.get('json/user.json')
        .then(res => {
            this.setState({
                data: res.data
            })
            console.log(this.state.data);
        })
    }

    render(){
        const { data, search } = this.state;

        return(
            <Fragment>
                <div className="wrapper">
                    <Sidebar id="sidebar"/>
                    <div id="content">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid">
                                <button type="button" id="sidebarCollapse" className="btn btn-light" onClick={this.handleSidebar}>
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
                                <h6 className="m-0 font-weight-bold text-dark">Manage Users</h6>
                            </div>
                            <div className="card-body">
                                <a href="#" className="btn btn-dark float-end mb-3">Add Data</a>
                                <div className="table-responsive">
                                    <table className="table table-bordered text-center" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>ID&nbsp;User</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone&nbsp;Number</th>
                                                <th>Member</th>
                                                <th className="text-center">Status</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>No.</th>
                                                <th>ID&nbsp;User</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone&nbsp;Number</th>
                                                <th>Member</th>
                                                <th className="text-center">Status</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </tfoot>
                                        <tbody id="bodyTable-user">
                                        {
                                            data.map((val) =>{
                                                return (
                                                    <tr>
                                                        <td>{val.no}</td>
                                                        <td>{val.id_user}</td>
                                                        <td>{val.name}</td>
                                                        <td>{val.email}</td>
                                                        <td>{val.phone_number}</td>
                                                        <td>{val.member}</td>
                                                        <td className="text-center"><a type="button" className="badge badge-primary">{val.status}</a></td>
                                                        <td className="text-center">
                                                            <a href="#" className="badge badge-warning text-uppercase"><i className="fas fa-key"></i>&nbsp;Reset Password</a><br />
                                                            <a href="#" className="badge badge-primary text-uppercase"><i class="fas fa-edit"></i>&nbsp;Edit Detail</a>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
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

export default Users;