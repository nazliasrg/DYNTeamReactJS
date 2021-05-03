import React, { Component, Fragment } from 'react';
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent';
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent';
import './History.css';
import TableHistory from '../../../components/Admin/TableComponent/TableHistory';
import { connect } from 'react-redux';
import axios from 'axios'

class History extends Component {

    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.getActivitiesHistory()
    }

    getActivitiesHistory = () => {
        axios.get('http://localhost:7070/api/dynteam/request/getByStatusRent/3')
            .then(res => {
                this.setState({
                    data: res.data
                })
                console.log(this.state.data);
            })
            .catch(function (error) {
                console.log(error)
            })
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
                                <TableHistory data={this.state.data} />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect()(History);