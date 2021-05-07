import React, { useState, useEffect } from 'react'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Badge, Row, Col, Label } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap'

const { SearchBar } = Search;


const TableAdmin = () => {

    const [data, setData] = useState([]);

    const getAdmins = () => {
        axios.get('http://localhost:7070/api/dynteam/auth/admins')
            .then(res => {
                setData(res.data)

                console.log(data);
            })
    }

    useEffect(async () => {
        const uname = await JSON.parse(localStorage.getItem('data_admin'))
        await console.log("role")
        await role.push(uname.data.role)
        await console.log(role)
        await getAdmins();
    });

    const handleClickActive = (id) => {
        console.log('data ke: ' + id)

        const r = window.confirm('Are you sure to inactive this admin?')
        if (r == true) {
            axios.delete("http://localhost:7070/api/dynteam/auth/admin/delete/" + id)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

            window.alert('Data admin has been inactived!')
            getAdmins();
        }
        else {
            window.alert('Data admin is safe!')
        }
    }

    const handleClickInactive = (id) => {
        console.log('data ke: ' + id)

        const r = window.confirm('Are you sure to active this admin?')
        if (r == true) {
            axios.put("http://localhost:7070/api/dynteam/auth/admin/actived/" + id)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

            window.alert('Data admin has been actived!')
            getAdmins();
        }
        else {
            window.alert('Data admin is safe!')
        }

    }

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const closeModal = () => setShow(false);

    const [username, setUsername] = useState("");

    const [roles, setRoles] = useState(["superadmin"]);

    const [role, setRole] = useState([]);

    const onSubmit = () => {

        const adminData = {
            username: username,
            password: "admin123",
            role: roles
        }

        console.log("admin Data :")
        console.log(adminData)

        axios.post("http://localhost:7070/api/dynteam/auth/admin/register", adminData)
            .then(function (response) {
                window.alert(username + ' account successfully registered!')
                setRoles([])
                getAdmins();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const usernameChange = (event) => {
        setUsername(event.target.value)
        console.log(username)
    }

    const roleChange = (e) => {
        if (e.detail === 0) {
            console.log("roles1:")
            console.log(e.target.value)

            if (e.target.value == "superadmin") {
                roles.splice(0, 1);
                roles.push(e.target.value)
                console.log("roles2:")
                console.log(roles)
                setRoles(roles)
            }
            if (e.target.value == "admin") {
                roles.splice(0, 1);
                roles.push(e.target.value)
                console.log("roles2:")
                console.log(roles)
                setRoles(roles)
            }

        }

        console.log("role input")
        console.log(roles)
    }

    const columns = [{
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
            if (role[0] == 'SUPER_ADMIN') {
                if (row.statusAccount === 1) {
                    return (
                        <Row className='justify-content-center'>
                            <Button color='primary' className="mr-2" onClick={() => handleClickActive(row.adminId)}>
                                Active
                            </Button>
                        </Row>
                    )
                }
                else {
                    return (
                        <Row className='justify-content-center'>
                            <Button color='danger' className="mr-2" onClick={() => handleClickInactive(row.adminId)}>
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

    const defaultSorted = [{
        dataField: 'adminId',
        order: 'desc'
    }];

    return (
        <>
            <ToolkitProvider
                bootstrap4
                keyField='adminId'
                data={data}
                columns={columns}
                defaultSorted={defaultSorted}
                search
            >
                {
                    props => (
                        <div>
                            <Row>
                                <Col>
                                    <SearchBar {...props.searchProps} placeholder="Search .." />
                                </Col>
                                {role[0] == 'SUPER_ADMIN' ?
                                    <Col>
                                        <div className="float-right">
                                            <Button color='dark' className="mr-2" onClick={handleShow}>
                                                <FontAwesomeIcon icon={faUserPlus} />
                                                Add Admin
                                        </Button>

                                            {/* modal add */}
                                            <Modal show={show}>
                                                <Modal.Header closeButton onClick={closeModal}>
                                                    <Modal.Title>Add Admin</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <>
                                                        <form onSubmit={onSubmit}>
                                                            <div className="form-group">
                                                                <label htmlFor="username">Username</label>
                                                                <input className="form-control" id="username" value={username} onChange={usernameChange} required />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="role">Role</label><br />
                                                                <select class="form-control" name="role" id="role" onClick={roleChange} required>
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

                            <div className="float-center">
                                <BootstrapTable
                                    {...props.baseProps}
                                    pagination={paginationFactory()}
                                />
                            </div>
                        </div>
                    )
                }
            </ToolkitProvider>

        </>)
}

export default TableAdmin;
