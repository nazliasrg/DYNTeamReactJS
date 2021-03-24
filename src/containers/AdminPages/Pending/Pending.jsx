import React, { Component, Fragment } from 'react';
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent';
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent';
import './Pending.css';
import TablePending from '../../../components/Admin/TableComponent/TablePending';
import { connect } from 'react-redux';
import getActivityList from '../../../actions/ActivityAction';


class Pending extends Component {

    componentDidMount() {
        this.props.dispatch(getActivityList());
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
                                <h6 className="m-0 font-weight-bold text-dark">Confirmation</h6>
                            </div>
                            <div className="card-body">
                                <TablePending />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect()(Pending);