import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import './Profileuser.css';
import Footer from '../../../components/User/Footer/Footer';
import Header from '../../../components/User/Header/Header';
import ProfileOnProgress from '../../../components/User/ProfileOnProgress/ProfileOnProgress';
import ProfileCurrent from '../../../components/User/ProfileCurrent/ProfileCurrent';
import ProfileHistory from '../../../components/User/ProfileHistory/ProfileHistory';
import ProfileMedsos from '../../../components/User/ProfileMedsos/ProfileMedsos';
import ProfileDatauser from '../../../components/User/ProfileDatauser/ProfileDatauser';
import ProfilePicture from '../../../components/User/ProfilePicture/ProfilePicture';
import axios from 'axios';
import { ReactSession } from 'react-client-session';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Profileuser = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setValueTopup();
    }

    const [showdonasi, setShowdonasi] = useState(false);
    const close = () => setShowdonasi(false);
    const open = () => {
        setShowdonasi(true);
        setValueDonasi();
    }

    const [showEditProfile, setShowEditProfil] = useState(false);
    const closeProfile = () => setShowEditProfil(false);
    const openProfile = () => setShowEditProfil(true);

    const [saldoUser, setSaldoUser] = useState(0);
    const [valueTopup, setValueTopup] = useState();
    const [valueDonasi, setValueDonasi] = useState();

    const [fullname, setFullname] = useState('');

    useEffect(() => {
        // Update the document title using the browser API
        getSaldoUser();

    }, []);

    //Untuk bikin const saldoUsernya
    const getSaldoUser = async () => {
        var userId = ReactSession.get("userId");
        console.log(userId);
        axios
            .get('http://localhost:7070/api/dynteam/auth/user/' + userId)
            .then(res => {
                console.log(res.data);
                setSaldoUser(res.data.saldoUser);
                setFullname(res.data.detailUserEntity.fullname);
            })
            .catch(error => {
                console.log(error);
            })

    }

    //Untuk bikin const topupUsernya
    const topupUser = async () => {
        const topup = {
            userId: ReactSession.get("userId"),
            type: 1,
            value: valueTopup

        }
        axios
            .post('http://localhost:7070/api/dynteam/auth/user/transaction', topup)
            .then(res => {
                var status = res.data.status;
                var message = res.data.message;
                if (status == 200) {
                    console.log(res.data);
                    getSaldoUser();
                    setShow(false);
                    NotificationManager.success(message);

                } else {
                    NotificationManager.error(message);

                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    //Untuk bikin const donasiUsernya
    const donasiUser = async () => {
        const donasi = {
            userId: ReactSession.get("userId"),
            type: 2,
            value: valueDonasi

        }
        axios
            .post('http://localhost:7070/api/dynteam/auth/user/transaction', donasi)
            .then(res => {
                var status = res.data.status;
                var message = res.data.message;
                if (status == 200) {
                    console.log(res.data);
                    getSaldoUser();
                    setShowdonasi(false);
                    NotificationManager.success(message);

                } else {
                    NotificationManager.error(message);

                }
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <Fragment>
            <Header />
            <div className="container-fluid" >
                <div className="container">
                    <div className="main-body">
                        <div className="row gutters-sm">
                            <div className="col-md-3 mb-3">
                                <ProfilePicture />

                                <div className="card mt-3">
                                    <ul className="list-group list-group-flush" style={{ marginBottom: '10' }} ></ul>
                                    <button className="btn btn-light" data-bs-toggle="modal" data-bs-target="#modalsaldo1">
                                        Saldo : <br /> {saldoUser}
                                    </button> <br />

                                    <Button variant="primary" onClick={handleShow}>
                                        Top Up
                                    </Button>

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Topup</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Input topup nominal</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="nominaltopup" value={valueTopup} onChange={e => { setValueTopup(e.target.value) }} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Input payment method</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="paymentmethodtopup" />
                                                    </div>
                                                </div>
                                                <button type="button" className="collapsible" style={{ marginTop: 5 }}>Information Transfer ATM</button>
                                                <div className="content-collapsible">
                                                    <p> 1. Select Transfer Menu> Virtual Account </p>
                                                    <p> 2. Enter the virtual account number 112233 </p>
                                                    <p> 3. Check the information on the screen and make sure your username is correct. </p>
                                                    <p> 4. Click Yes </p>
                                                    <p> 5. Enter your pin number, click OK </p>
                                                </div>
                                            </div> */}

                                        </Modal.Body>
                                        <Modal.Footer>

                                            <Button variant="primary" onClick={topupUser}>
                                                Send
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                    <br />
                                    <Button variant="primary" onClick={open}>
                                        Donasi
                                    </Button>

                                    <Modal show={showdonasi} onHide={close}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Donasi</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="container-donasi">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Input donation nominal</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="nominaltopup" value={valueDonasi} onChange={e => { setValueDonasi(e.target.value) }} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Information</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="nominaltopup" />
                                                    </div>
                                                </div>
                                            </div> */}

                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="primary" onClick={donasiUser}>
                                                Send
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                    

                                    <Button variant="secondary" onClick={openProfile} >
                                        Edit Profile
                                    </Button>

                                    <Modal show={showEditProfile} onHide={closeProfile}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit Profile</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="container-editProfil">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Fullname :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="fullname" value={fullname} onChange={e => { setFullname(e.target.value) }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Email :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="email" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Username :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="username" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Password :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="nominaltopup" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Phone Number :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="nominaltopup" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Facebook :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="nominaltopup" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Instagram :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="nominaltopup" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Twitter :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="nominaltopup" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>City :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="nominaltopup" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Province :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="nominaltopup" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Country :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="nominaltopup" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Street :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="nominaltopup" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Profile Picture :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="nominaltopup" />
                                                    </div>
                                                </div>
                                            </div>


                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="primary" onClick={closeProfile}>
                                                Send
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                  

                                    <ProfileMedsos />
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="card mb-3">
                                    <ProfileDatauser />
                                </div>
                                <div className="row gutters-sm">
                                    <ProfileOnProgress />
                                    <ProfileCurrent />
                                    <ProfileHistory />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <NotificationContainer />
        </Fragment>
    )
}

export default Profileuser;