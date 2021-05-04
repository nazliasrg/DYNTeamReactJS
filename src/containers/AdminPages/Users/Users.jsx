import React, { Component, Fragment } from 'react';
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent';
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent';
import './Users.css';
import TableUsers from '../../../components/Admin/TableComponent/TableUsers';
import axios from 'axios'


class Users extends Component {

    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = () => {
        axios.get('http://localhost:7070/api/dynteam/auth/users')
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
                                <h6 className="m-0 font-weight-bold text-dark">Manage Users</h6>
                            </div>
                            <div className="card-body">

                                <TableUsers data={this.state.data} />

                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Users;