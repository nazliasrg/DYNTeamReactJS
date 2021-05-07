import React, { Component, Fragment } from 'react'
import '../Home.css'
import SidebarComponent from '../../../../components/Admin/SidebarComponent/SidebarComponent'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from '../../../../components/Admin/NavbarComponent/NavbarComponent'
import TablePublisher from '../../../../components/Admin/TableComponent/TablePublisher';


class Publisher extends Component {

    render() {
        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <div className="row">
                                    <h6 className="ml-4 font-weight-bold text-dark">Manage Publisher</h6>
                                </div>
                            </div>
                            <div className="card-body">
                                <TablePublisher />
                            </div>
                        </div>

                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Publisher;