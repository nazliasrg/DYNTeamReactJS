import React, { Component, Fragment } from 'react';
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent';
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent';
import './History.css';
import TableHistory from '../../../components/Admin/TableComponent/TableHistory';
import axios from 'axios'

class History extends Component {

    render() {
        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-dark">History</h6>
                            </div>
                            <div className="card-body">
                                <TableHistory />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default History;