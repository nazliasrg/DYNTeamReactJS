import React, { Component, Fragment } from 'react';
import Sidebar from '../../component/Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import $ from 'jquery';

class Home extends Component{

    // handleDataTable = () =>{
    //     $('#dataTable').DataTable();
    // }

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
                                <h6 className="m-0 font-weight-bold text-dark">Manage Books</h6>
                            </div>
                            <div className="card-body">
                                <div className="row" id="tes">

                                </div>
                                <a href="addBook.html" className="btn btn-primary float-end mb-2">Add Data</a>
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th className="text-center">No.</th>
                                                <th>ID&nbsp;Book</th>
                                                <th>Cover</th>
                                                <th>Category</th>
                                                <th>Title</th>
                                                <th>Author</th>
                                                <th>Publisher</th>
                                                <th>Year</th>
                                                <th>Synopsis</th>
                                                <th className="text-center">Stock</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th className="text-center">No.</th>
                                                <th>ID&nbsp;Book</th>
                                                <th>Cover</th>
                                                <th>Category</th>
                                                <th>Title</th>
                                                <th>Author</th>
                                                <th>Publisher</th>
                                                <th>Year</th>
                                                <th>Synopsis</th>
                                                <th className="text-center">Stock</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </tfoot>
                                        <tbody id="body-table"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Home;