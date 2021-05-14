import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Badge, Row, Col } from 'reactstrap';
import React, { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap'

const { SearchBar } = Search;

const TableUsers = () => {

    const [data, setData] = useState([]);

    const getUsers = () => {
        axios.get('http://localhost:7070/api/dynteam/auth/users')
            .then(res => {
                setData(res.data)
                console.log(data);
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(async () => {
        await getUsers();
    })

    const handleClickActive = (id) => {
        console.log('data ke: ' + id)

        const r = window.confirm('Are you sure to inactived account?')
        if (r == true) {
            axios.put('http://localhost:7070/api/dynteam/auth/user/delete/' + id)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            window.alert('Data user has been inactived!')
            getUsers();
        }
        else {
            window.alert('Data user is safe!')
        }

    }

    const handleClickInactive = (id) => {
        console.log('data ke: ' + id)

        const r = window.confirm('Are you sure to actived account?')
        if (r == true) {
            axios.put('http://localhost:7070/api/dynteam/auth/user/active/' + id)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            window.alert('Data user has been actived!')
            getUsers();
        }
        else {
            window.alert('Data user is safe!')
        }
    }

    const handleClickReset = (username) => {
        const r = window.confirm('Are you sure to reset password this account?')
        const user = {
            password: "user123"
        }

        if (r == true) {
            axios.put('http://localhost:7070/api/dynteam/auth/user/resetPassword/' + username, user)
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                });
            window.alert('Password ' + username + ' has been reset!')
            getUsers();
        }
        else {
            window.alert('Data user is safe!')
        }
    }

    const columns = [{
        dataField: 'userId',
        text: 'No',
        sort: true,
        headerStyle: () => {
            return { width: '7%' }
        }
    }, {
        dataField: 'detailUserEntity.fullname',
        text: 'Full Name',
        sort: true
    }, {
        dataField: 'username',
        text: 'Username',
        sort: true
    }, {
        dataField: 'detailUserEntity.email',
        text: 'Email',
        sort: true
    }, {
        dataField: 'detailUserEntity.phoneNumber',
        text: 'Phone Number',
        sort: true
    }, {
        dataField: 'saldoUser',
        text: 'Saldo',
        sort: true,
        headerStyle: () => {
            return {
                textAlign: 'center'
            }
        },
        formatter: (rowContent, row) => {
            if (row.saldoUser === 0) {
                return (
                    <Row className='justify-content-center'>
                        <Badge color="warning">
                            Rp 0
                    </Badge>
                    </Row>
                )
            }
            else if (row.saldoUser < 0) {
                return (
                    <Row className='justify-content-center'>
                        <Badge color="danger">
                            Rp {row.saldoUser}
                        </Badge>
                    </Row>
                )
            }
            else {
                return (
                    <Row className='justify-content-center'>
                        <Badge color="success">
                            Rp {row.saldoUser}
                        </Badge>
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
            if (row.statusAccount === 1) {
                return (
                    <Row className='justify-content-center'>
                        <Button color='primary' className="mr-2" onClick={() => handleClickActive(row.userId)}>
                            Active
                        </Button>
                    </Row>
                )
            }
            else {
                return (
                    <Row className='justify-content-center'>
                        <Button color='danger' className="mr-2" onClick={() => handleClickInactive(row.userId)}>
                            Inactive
                        </Button>
                    </Row>
                )
            }
        }
    }, {
        text: 'Password',
        sort: true,
        headerStyle: () => {
            return {
                textAlign: 'center'
            }
        },
        formatter: (rowContent, row) => {
            return (
                <Row className='justify-content-center'>
                    <Button color="warning" onClick={() => handleClickReset(row.username)}>
                        Reset
                    </Button>
                </Row>
            )
        }
    }];

    const defaultSorted = [{
        dataField: 'userId',
        order: 'asc'
    }];

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const closeModal = () => setShow(false);

    const [username, setUsername] = useState("");

    const usernameChange = (e) => {
        setUsername(e.target.value)
    }
    const onSubmit = () => {

        const user = {
            addressUserDto: {
                street: "",
                city: "",
                province: "",
                country: ""
            },
            socialMediaDto: {
                facebook: "",
                instagram: "",
                twitter: ""

            },
            detailUserDto: {
                email: "",
                fullname: "",
                phoneNumber: "",
                userPhoto: ""

            },
            username: username,
            password: "user123"
        }

        axios.post("http://localhost:7070/api/dynteam/auth/user/regis", user)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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
                                {/* <Col>
                                    <SearchBar {...props.searchProps} placeholder="Search .." />
                                </Col> */}
                                <Col>
                                    <div className="float-right">

                                        <Button color='dark' className="mr-2" onClick={handleShow}>
                                            <FontAwesomeIcon icon={faUserPlus} />
                                                Add User
                                        </Button>

                                        {/* modal add */}
                                        <Modal show={show}>
                                            <Modal.Header closeButton onClick={closeModal}>
                                                <Modal.Title>Add User</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <>
                                                    <form onSubmit={onSubmit}>
                                                        <div className="form-group">
                                                            <label htmlFor="username">Username</label>
                                                            <input className="form-control" id="username" value={username} onChange={usernameChange} required />
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

export default TableUsers;
