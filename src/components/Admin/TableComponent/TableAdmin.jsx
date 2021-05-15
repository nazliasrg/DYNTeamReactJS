import React, { Component } from 'react'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button, Badge, Row, Col, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap'

const { SearchBar } = Search;

class TableAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: false,
            id: 0,
            username: "",
            roles: ["superadmin"],
            role: []

        }
    }

    async componentDidMount() {
        const uname = await JSON.parse(localStorage.getItem('data_admin'))
        await console.log("role")
        await this.state.role.push(uname.data.role)
        await console.log(this.state.role)
        await this.getAdmins();
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

    handleShow = () => {
        this.setState({
            show: true
        })
    }

    closeModal = () => {
        this.setState({
            show: false
        })
    }

    handleClickActive = async (id) => {
        console.log('data ke: ' + id)

        const r = window.confirm('Are you sure to inactive this admin?')
        if (r == true) {
            await axios.delete("http://localhost:7070/api/dynteam/auth/admin/delete/" + id)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

            await window.alert('Data admin has been inactived!')
            await this.getAdmins();
        }
        else {
            window.alert('Data admin is safe!')
        }
    }

    handleClickInactive = async (id) => {
        console.log('data ke: ' + id)

        const r = window.confirm('Are you sure to active this admin?')
        if (r == true) {
            await axios.put("http://localhost:7070/api/dynteam/auth/admin/actived/" + id)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

            await window.alert('Data admin has been actived!')
            await this.getAdmins();
        }
        else {
            window.alert('Data admin is safe!')
        }

    }

    onSubmit = () => {

        const adminData = {
            username: this.state.username,
            password: "admin123",
            role: this.state.roles
        }

        console.log("admin Data :")
        console.log(adminData)

        axios.post("http://localhost:7070/api/dynteam/auth/admin/register", adminData)
            .then(function (response) {
                window.alert(this.state.username + ' account successfully registered!')
                this.setState({
                    roles: []
                })
                this.getAdmins();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    usernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
        console.log(this.state.username)
    }

    roleChange = (e) => {
        if (e.detail === 0) {
            console.log("roles1:")
            console.log(e.target.value)

            if (e.target.value == "superadmin") {
                this.state.roles.splice(0, 1);
                this.state.roles.push(e.target.value)
                console.log("roles2:")
                console.log(this.state.roles)
                this.setState({
                    roles: this.state.roles
                })
            }
            if (e.target.value == "admin") {
                this.state.roles.splice(0, 1);
                this.state.roles.push(e.target.value)
                console.log("roles2:")
                console.log(this.state.roles)
                this.setState({
                    roles: this.state.roles
                })
            }

        }

        console.log("role input")
        console.log(this.state.roles)
    }

    columns = [{
        dataField: 'adminId',
        text: 'No',
        sort: true,
        headerStyle: () => {
            return { width: '7%' }
        }
    }, {
        dataField: 'adminCode',
        text: 'Admin Code',
        sort: true
    }, {
        dataField: 'username',
        text: 'Username',
        sort: true
    }, {
        dataField: 'roles[0].roleName',
        text: 'Role',
        sort: true,
        headerStyle: () => {
            return {
                textAlign: 'center'
            }
        },
        formatter: (rowContent, row) => {
            if (row.roles[0].roleName === 'SUPER_ADMIN') {
                return (
                    <Row className='justify-content-center'>
                        <Label color='dark' className="mr-2">
                            Super Admin
                        </Label>
                    </Row>
                )
            }
            else {
                return (
                    <Row className='justify-content-center'>
                        <Label color='dark' className="mr-2">
                            Admin
                        </Label>
                    </Row>
                )
            }
        }
    }, {
        dataField: 'link',
        text: 'Status',
        headerStyle: () => {
            return {
                textAlign: 'center'
            }
        },
        formatter: (rowContent, row) => {
            if (this.state.role[0] == 'SUPER_ADMIN') {
                if (row.statusAccount === 1) {
                    return (
                        <Row className='justify-content-center'>
                            <Button color='primary' className="mr-2" onClick={() => this.handleClickActive(row.adminId)}>
                                Active
                            </Button>
                        </Row>
                    )
                }
                else {
                    return (
                        <Row className='justify-content-center'>
                            <Button color='danger' className="mr-2" onClick={() => this.handleClickInactive(row.adminId)}>
                                Inactive
                            </Button>
                        </Row>
                    )
                }
            }
            else {
                if (row.statusAccount === 1) {
                    return (
                        <Row className='justify-content-center'>
                            <Badge color='primary' className="mr-2">
                                Active
                            </Badge>
                        </Row>
                    )
                }
                else {
                    return (
                        <Row className='justify-content-center'>
                            <Badge color='danger' className="mr-2">
                                Inactive
                            </Badge>
                        </Row>
                    )
                }
            }
        }
    }];

    defaultSorted = [{
        dataField: 'adminId',
        order: 'desc'
    }];

    render() {
        return (
            <>
                <ToolkitProvider
                    bootstrap4
                    keyField='adminId'
                    data={this.state.data}
                    columns={this.columns}
                    defaultSorted={this.defaultSorted}
                    search
                >
                    {
                        props => (
                            <div>
                                <Row>
                                    <Col>
                                        <SearchBar {...props.searchProps} placeholder="Search .." />
                                    </Col>
                                    {this.state.role[0] == 'SUPER_ADMIN' ?
                                        <Col>
                                            <div className="float-right">
                                                <Button color='dark' className="mr-2" onClick={this.handleShow}>
                                                    <FontAwesomeIcon icon={faUserPlus} />
                                                Add Admin
                                        </Button>

                                                {/* modal add */}
                                                <Modal show={this.state.show}>
                                                    <Modal.Header closeButton onClick={this.closeModal}>
                                                        <Modal.Title>Add Admin</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <>
                                                            <form onSubmit={this.onSubmit}>
                                                                <div className="form-group">
                                                                    <label htmlFor="username">Username</label>
                                                                    <input className="form-control" id="username" value={this.state.username} onChange={this.usernameChange} required />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="role">Role</label><br />
                                                                    <select class="form-control" name="role" id="role" onClick={this.roleChange} required>
                                                                        <option value="superadmin" selected>Super Admin</option>
                                                                        <option value="admin">Admin</option>
                                                                    </select>
                                                                </div>
                                                                <div className="form-group">
                                                                    <button className="form-control btn btn-primary" type="submit">Add</button>
                                                                </div>
                                                            </form>
                                                        </>
                                                    </Modal.Body>
                                                </Modal>

                                            </div>
                                        </Col>
                                        :
                                        null}
                                </Row>

                                <div className="float-center mt-2">
                                    <BootstrapTable
                                        {...props.baseProps}
                                        pagination={paginationFactory()}
                                    />
                                </div>
                            </div>
                        )
                    }
                </ToolkitProvider>

            </>
        )
    }
}


export default TableAdmin;