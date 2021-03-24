import React, { Component, Fragment } from 'react';
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent';
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent';
import './Users.css';
import TableUsers from '../../../components/Admin/TableComponent/TableUsers';
import { connect } from 'react-redux';
import { getUsersList } from '../../../actions/UsersAction';


class Users extends Component {

    componentDidMount() {
        this.props.dispatch(getUsersList());
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
                                <h6 className="m-0 font-weight-bold text-dark">Manage Users</h6>
                            </div>
                            <div className="card-body">

                                <TableUsers />

                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect()(Users);