import React, { Component, Fragment } from 'react';
import './Activity.css';
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent';
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent';
import TableActivity from '../../../components/Admin/TableComponent/TableActivity';
import axios from 'axios'

class Activity extends Component {

    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    authHeader = () => {
        const admin = JSON.parse(localStorage.getItem('data_admin'));
        console.log(admin)

        if (admin && admin.data.token) {
            return {
                'authorization': `Bearer ${admin.data.token}`
            }
        }
        else {
            return null;
        }
    }

    async componentDidMount() {
        await this.authHeader();
        await this.getActivitiesCurrent()
    }

    getActivitiesCurrent = () => {
        const admin = this.authHeader();

        axios.get('http://localhost:7070/api/dynteam/request/getByStatusRent/2', {
            headers: admin
        })
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
                                <h6 className="m-0 font-weight-bold text-dark">Manage Activities</h6>
                            </div>
                            <div className="card-body">
                                <TableActivity data={this.state.data} />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Activity;