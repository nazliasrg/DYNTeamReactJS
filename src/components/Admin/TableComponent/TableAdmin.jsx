import React, { useState } from 'react'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Col } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap'

const { SearchBar } = Search;

const handleClickActive = (id) => {
    console.log('data ke: ' + id)
    swal({
        title: "Are you sure to inactive this admin?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            inactivedAdmin(id);
            if (willDelete) {
                swal("Data admin has been inactived!", {
                    icon: "success",
                }).then((OK) => {
                    window.location.reload(false);
                })

            } else {
                swal("Data admin is safe!");
            }
        });
}

const inactivedAdmin = (id) => {
    axios.delete("http://localhost:7070/api/dynteam/auth/admin/delete/" + id)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const handleClickInactive = (id) => {
    console.log('data ke: ' + id)
    swal({
        title: "Are you sure to active this admin?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            activedAuthor(id);
            if (willDelete) {
                swal("Data admin has been actived!", {
                    icon: "success",
                }).then((OK) => {
                    window.location.reload(false);
                })

            } else {
                swal("Data admin is safe!");
            }
        });
}

const activedAuthor = (id) => {
    axios.put("http://localhost:7070/api/dynteam/auth/admin/actived/" + id)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const TableAdmin = (props) => {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const closeModal = () => setShow(false);

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [roles, setRoles] = useState([]);

    const onSubmit = () => {

        const adminData = {
            username: username,
            password: password,
            role: roles
        }

        console.log("admin Data :")
        console.log(adminData)

        axios.post("http://localhost:7070/api/dynteam/auth/admin/register", adminData)
            .then(function (response) {
                console.log(response);
                setRoles([])
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const usernameChange = (event) => {
        setUsername(event.target.value)
        console.log(username)
    }

    const passwordChange = (event) => {
        setPassword(event.target.value)
        console.log(password)
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
            else if (e.target.value == "admin") {
                roles.splice(0, 1);
                roles.push(e.target.value)
                console.log("roles2:")
                console.log(roles)
                setRoles(roles)
            }

        }
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
        dataField: 'roles().get(0)',
        text: 'Role',
        sort: true
    }, {
        dataField: 'link',
        text: 'Status',
        headerStyle: () => {
            return {
                textAlign: 'center'
            }
        },
        formatter: (rowContent, row) => {
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
    }];

    const defaultSorted = [{
        dataField: 'adminId',
        order: 'asc'
    }];

    const { data } = props;

    return (
        <>
            <ToolkitProvider
                bootstrap4
                keyField='id'
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
                                                            <input className="form-control" id="username" value={username} onChange={usernameChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="username">Password</label>
                                                            <input className="form-control" id="password" value={password} onChange={passwordChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="role">Role</label><br />
                                                            <select className="form-group" name="role" id="role" onClick={roleChange}>
                                                                <option value="superadmin">Super Admin</option>
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

        </>
    )
}

export default connect()(TableAdmin);
