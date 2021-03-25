import React, { Component, Fragment } from 'react';
import './Admin.css';
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent';
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent';
import TableAdmin from '../../../components/Admin/TableComponent/TableAdmin';
import { connect } from 'react-redux';
import { getAdminList } from '../../../actions/AdminAction';


class Admin extends Component {

    componentDidMount() {
        this.props.dispatch(getAdminList());
    }

    render() {
        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />

                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-dark">Manage Role</h6>
                            </div>
                            <div className="card-body">
                                <TableAdmin />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect()(Admin);