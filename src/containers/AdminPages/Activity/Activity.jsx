import React, { Component, Fragment } from 'react';
import './Activity.css';
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent';
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent';
import TableActivity from '../../../components/Admin/TableComponent/TableActivity';
import { connect } from 'react-redux';
import getActivityList from '../../../actions/ActivityAction';

class Activity extends Component {

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
                                <h6 className="m-0 font-weight-bold text-dark">Manage Activities</h6>
                            </div>
                            <div className="card-body">
                                <TableActivity />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect()(Activity);