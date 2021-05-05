import React, { Component, Fragment } from 'react';
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent';
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent';
import './Pending.css';
import TablePending from '../../../components/Admin/TableComponent/TablePending';
import axios from 'axios'

class Pending extends Component {
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
        await this.getActivitiesPending();
    }

    getActivitiesPending = () => {
        const admin = this.authHeader();

        axios.get('http://localhost:7070/api/dynteam/request/getByStatusRent/1', {
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
                                <h6 className="m-0 font-weight-bold text-dark">Confirmation</h6>
                            </div>
                            <div className="card-body">
                                <TablePending data={this.state.data} />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Pending;