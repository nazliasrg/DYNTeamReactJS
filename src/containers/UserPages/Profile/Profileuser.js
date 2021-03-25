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


const Profileuser = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showdonasi, setShowdonasi] = useState(false);
    const close = () => setShowdonasi(false);
    const open = () => setShowdonasi(true);


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
                                        Saldo : <br /> Rp. 10.000,00
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
                                                        <input type="text" className="form-control" id="nominaltopup" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
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
                                            </div>

                                        </Modal.Body>
                                        <Modal.Footer>

                                            <Button variant="primary" onClick={handleClose}>
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
                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Input donation nominal</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="nominaltopup" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Information</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="nominaltopup" />
                                                    </div>
                                                </div>
                                            </div>

                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="primary" onClick={close}>
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
        </Fragment>
    )
}

export default Profileuser;