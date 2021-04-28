import React, { Component, Fragment } from 'react';
import './Admin.css';
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent';
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent';
import TableAdmin from '../../../components/Admin/TableComponent/TableAdmin';
import { connect } from 'react-redux';
import axios from 'axios';

class Admin extends Component {

    constructor() {
        super();
        this.state = {
            data: [{}]
        };
    }

    componentDidMount() {
        this.getAdmins()
    }

    getAdmins = () => {
        axios.get('http://localhost:7070/api/dynteam/auth/admins')
            .then(res => {
                this.setState({
                    data: res.data
                })

                console.log(this.state.data);
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
                                <h6 className="m-0 font-weight-bold text-dark">Manage Role</h6>
                            </div>
                            <div className="card-body">
                                <TableAdmin data={this.state.data} />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect()(Admin);