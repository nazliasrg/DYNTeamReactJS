import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap'
import axios from 'axios'
import swal from 'sweetalert'
import { useHistory } from 'react-router';

const handleSidebar = () => {
    $('#sidebar').toggleClass('active');
}


const NavbarComponent = () => {
    const [show, setShow] = useState(false);

    const history = useHistory();

    const handleShow = () => setShow(true);

    const handleLogout = () => {

        // localStorage.clear();
        history.push({
            pathname: '/login-admin'
        });
    }

    const closeModal = () => setShow(false);

    const [username, setUsername] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const newPasswordChange = (event) => {
        setNewPassword(event.target.value)
        console.log(newPassword)
    }

    const onSubmit = () => {

        const adminData = {
            password: newPassword
        }

        console.log("adminData")
        console.log(adminData)

        axios.put('http://localhost:7070/api/dynteam/auth/admin/changePassword/' + username, adminData)
            .then(res => {
                swal({
                    title: "Successfully!",
                    text: "Password changed!",
                    icon: "success",
                    button: "Aww yiss!",
                });
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(async () => {
        const uname = await JSON.parse(localStorage.getItem('data_admin'))
        await console.log("username")
        await console.log(uname.data.username)
        await setUsername(uname.data.username)
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
                                <form onSubmit={onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="username">New Password</label>
                                        <input className="form-control" id="newPassword" value={newPassword} onChange={newPasswordChange} required />
                                    </div>
                                    <div className="form-group">
                                        <button className="form-control btn btn-primary" type="submit">Change Password</button>
                                    </div>
                                </form>
                            </>
                        </Modal.Body>
                    </Modal>

                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;
