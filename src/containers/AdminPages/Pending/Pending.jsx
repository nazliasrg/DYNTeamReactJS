import React, { Component, Fragment } from 'react';
import Sidebar from '../../../component/Admin/Sidebar/Sidebar';
import './Pending.css';
import $ from 'jquery';
import axios from 'axios';

class Pending extends Component{
    
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
        this.getPending();
    }

    getPending = () => {
        axios.get('json/activity.json')
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
                                <h6 className="m-0 font-weight-bold text-dark">Confirmation</h6>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>ID&nbsp;Activity</th>
                                                <th>Title&nbsp;Book</th>
                                                <th>User</th>
                                                <th>Start&nbsp;Date</th>
                                                <th>Return&nbsp;Date</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>No.</th>
                                                <th>Title&nbsp;Activity</th>
                                                <th>Book</th>
                                                <th>User</th>
                                                <th>Start&nbsp;Date</th>
                                                <th>Return&nbsp;Date</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </tfoot>
                                        <tbody id="bodyTable-waiting">
                                        {
                                            data.map((val)=>{
                                                if((val.confirm) === 0){
                                                    return(
                                                        <tr>
                                                            <td>{val.no}</td>
                                                            <td>{val.id_activity}</td>
                                                            <td>{val.title_book}</td>
                                                            <td>{val.user}</td>
                                                            <td>{val.start_date}</td>
                                                            <td>{val.return_date}</td>
                                                            <td className="text-center">
                                                                <a href="#" className="badge badge-success"><i class="fas fa-check"></i></a>
                                                                <a href="#" className="badge badge-danger"><i class="fas fa-times"></i></a>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
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

export default Pending;