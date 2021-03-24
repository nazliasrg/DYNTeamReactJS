import React, { Component, Fragment } from 'react';
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent';
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent';
import './History.css';
import TableHistory from '../../../components/Admin/TableComponent/TableHistory';
import { connect } from 'react-redux';
import getActivityList from '../../../actions/ActivityAction';

class History extends Component {

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

export default connect()(History);