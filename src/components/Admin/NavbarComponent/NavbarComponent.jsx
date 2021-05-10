import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router';

const handleSidebar = () => {
    $('#sidebar').toggleClass('active');
}


const NavbarComponent = () => {
    const [show, setShow] = useState(false);

    const history = useHistory();

    const handleShow = () => setShow(true);

    const handleLogout = async () => {

        const r = window.confirm('Are you sure to logout?');
        if (r == true) {
            await localStorage.clear();
            await history.push({
                pathname: '/login-admin'
            });
        }
    }

    const closeModal = () => setShow(false);

    const [username, setUsername] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [rNewPassword, setRNewPassword] = useState("");

    const [checkPassword, setCheckPassword] = useState(true);

    const oldPasswordChange = (event) => {
        setOldPassword(event.target.value)
        console.log(oldPassword)
    }

    const newPasswordChange = (event) => {
        setNewPassword(event.target.value)
        console.log(newPassword)
    }

    const rNewPasswordChange = (event) => {
        setRNewPassword(event.target.value)
        console.log(rNewPassword)

    }

    const changePassword = () => {
        const adminData = {
            oldPassword: oldPassword,
            password: newPassword
        }

        console.log("adminData")
        console.log(adminData)

        axios.put('http://localhost:7070/api/dynteam/auth/admin/changePassword/' + username, adminData)
            .then(res => {
                console.log(res)
            })
            .catch(function (error) {
                if (error.status === 500) {
                    alert('Old password not match!')
                }
            })
    }

    const onSubmit = async () => {
        if (oldPassword === "") {
            alert('Old password is required!')
        }
        if (newPassword === "") {
            alert('New password is required!')
        }
        if (rNewPassword === "") {
            alert('Repeat New password is required!')
        }
        else {
            if (newPassword != rNewPassword) {
                await alert('New Password & Repeat New Password don\'t match!')
                await handleShow();
            }
            else if (newPassword === rNewPassword) {

                await changePassword();
                await showAlert();
                await localStorage.clear();
                await history.push({
                    pathname: '/login-admin'
                });
            }
        }

    }

    const showAlert = () => {
        window.alert("Password has been changed!");
    }

    const authHeader = () => {
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

    useEffect(async () => {
        await authHeader();

        if (authHeader() == null) {
            await history.push('/login-admin')
        }
        else {
            const uname = await JSON.parse(localStorage.getItem('data_admin'))
            await console.log("username")
            await console.log(uname.data.username)
            await setUsername(uname.data.username)
        }
    });

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button
                    type="button"
                    id="sidebarCollapse"
                    className="btn"
                    onClick={handleSidebar}
                >
                    <span className="cursor">&#9776;</span>
                </button>

                <div className="justify-content-end">
                    <Dropdown as={ButtonGroup}>
                        <Button variant="light">{username}</Button>

                        <Dropdown.Toggle split variant="primary" id="dropdown-split-basic"></Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleShow}>Change Password</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* modal add */}
                    <Modal show={show}>
                        <Modal.Header closeButton onClick={closeModal}>
                            <Modal.Title>Change Password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <>

                                <div className="form-group">
                                    <label htmlFor="username">Old Password</label>
                                    <input type="password" className="form-control" id="oldPassword" value={oldPassword} onChange={oldPasswordChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">New Password</label>
                                    <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={newPasswordChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Repeat New Password</label>
                                    <input type="password" className="form-control" id="rNewPassword" value={rNewPassword} onChange={rNewPasswordChange} required />
                                </div>
                                <div className="form-group">
                                    <button className="form-control btn btn-primary" onClick={onSubmit}>Change Password</button>
                                </div>
                            </>
                        </Modal.Body>
                    </Modal>

                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;
