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
import { useHistory } from "react-router-dom";

ReactSession.setStoreType("localStorage");

var userId = '';
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

    const [passwordUser, setShowPasswordUser] = useState(false);
    const closeChange = () => setShowPasswordUser(false);
    const openChange = () => setShowPasswordUser(true);

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [facebook, setInstagram] = useState('');
    const [instagram, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
   
    const history = useHistory()

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newConfirmPassword, setConfirmPassword] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        // Update the document title using the browser API
        if (authHeader()==null){
            history.push('/')
        }else{
            const user = JSON.parse(localStorage.getItem('data_user'));
            userId = user.data.userId;
            console.log(userId);

        getSaldoUser();
        }

    }, []);

    //Untuk bikin const saldoUsernya
    const getSaldoUser = async () => {
        
        axios
            .get('http://localhost:7070/api/dynteam/auth/user/' + userId,{
                headers:authHeader()
            })
            .then(res => {
                console.log(res.data);
                setSaldoUser(res.data.saldoUser);
                setFullname(res.data.detailUserEntity.fullname);
                setEmail(res.data.detailUserEntity.email);
                setPhoneNumber(res.data.detailUserEntity.phoneNumber);
                setInstagram(res.data.detailUserEntity.socialMediaEntity.instagram);
                setFacebook(res.data.detailUserEntity.socialMediaEntity.facebook);
                setTwitter(res.data.detailUserEntity.socialMediaEntity.twitter);
                setCity(res.data.detailUserEntity.addressUserEntity.city);
                setProvince(res.data.detailUserEntity.addressUserEntity.province);
                setCountry(res.data.detailUserEntity.addressUserEntity.country);
                setStreet(res.data.detailUserEntity.addressUserEntity.street);

            })
            .catch(error => {
                console.log(error);
            })

    }

    //Untuk bikin const topupUsernya
    const topupUser = async () => {
        console.log("tes " +userId);
        const topup = {
            userId: userId,
            type: 1,
            value: valueTopup

        }
        axios
            .post('http://localhost:7070/api/dynteam/auth/user/transaction', topup,{
                headers:authHeader()
            })
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
            userId: userId,
            type: 2,
            value: valueDonasi
        }
        axios
            .post('http://localhost:7070/api/dynteam/auth/user/transaction', donasi ,{
                headers:authHeader()
            })
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

    const changePasswordUser = async() => {
        const changePassword ={
            //utk isi new sama old passwordnya (sbg parameter)
            //parameter : value
            oldPassword : oldPassword,
            newPassword : newPassword,
            newConfirmPassword : newConfirmPassword
        }
        axios
        .put('http://localhost:7070/api/dynteam/auth/user/updateProfile/changePassword/' + userId, changePassword,{
            headers:authHeader()
        })
        .then(res => {
            var status = res.data.status;
            var message = res.data.message;
            if (status == 200) {
                closeChange();
                console.log(res.data);
                NotificationManager.success(message);

            } else {
                NotificationManager.error(message);
            }
        })

        .catch(error => {
            console.log(error)
        })


    }
    //untuk bikin edit ProfileUsernya
    const editProfileUser = async() => {

        const addressUser = {
            street:street, 
            city:city,        
            province:province,
            country:country
        }
        const socialMedia = {
            facebook:facebook,
            instagram:instagram,
            twitter:twitter
        }
        const detailUser ={
            email:email,
            fullname:fullname,
            phoneNumber:phoneNumber,
        }
        
        const editProfile = {
            addressUserDto:addressUser,
            socialMediaDto:socialMedia,
            detailUserDto:detailUser

        }
        axios
        .put('http://localhost:7070/api/dynteam/auth/user/updateProfile/' + userId, editProfile ,{
            headers:authHeader()
        })
        .then(res => {
            var status = res.data.status;
            var message = res.data.message;
            if (status == 200) {
                console.log(res.data);
                getSaldoUser();
                setShowEditProfil(false);
                NotificationManager.success(message);

            } else {
                NotificationManager.error(message);

            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    
    const authHeader = () => {
        const user = JSON.parse(localStorage.getItem('data_user'));
        console.log(user)

        if (user && user.data.token) {
            return {
                'authorization': `Bearer ${user.data.token}`
            }
        }
        else {
            return null;
        }
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
                                        Saldo : <br /> Rp. {saldoUser} ,00
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

                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="primary" onClick={donasiUser}>
                                                Send
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <br></br>

                                
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
                                                        <input type="text" className="form-control" id="email"  value={email} onChange={e => { setEmail(e.target.value) }} />
                                                    </div>
                                                </div>
                                            </div>                                          

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Phone Number :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="phoneNumber" value={phoneNumber} onChange={e => { setPhoneNumber(e.target.value) }}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Facebook :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="facebook" value={facebook} onChange={e => { setFacebook(e.target.value) }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Instagram :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="instagram" value={instagram} onChange={e => { setInstagram(e.target.value) }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Twitter :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="twitter" value={twitter} onChange={e => { setTwitter(e.target.value) }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>City :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="city" value={city} onChange={e => { setCity(e.target.value) }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Province :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="province" value={province} onChange={e => { setProvince(e.target.value) }}  />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Country :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="country"  value={country} onChange={e => { setCountry(e.target.value) }}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Street :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" className="form-control" id="street" value={street} onChange={e => { setStreet(e.target.value) }}/>
                                                    </div>
                                                </div>
                                            </div>

                                           


                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="primary" onClick={editProfileUser} >
                                                Edit Profile
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <br></br>

                                    <Button variant="secondary" onClick={openChange}>
                                        Change Password
                                    </Button>

                                    <Modal show={passwordUser} onHide={closeChange}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Change Password User</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="container-topup">
                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Input old password :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="password" className="form-control" id="oldPassword" value={oldPassword} onChange={e => { setOldPassword(e.target.value) }} />
                                                    </div>           
                                                    
                                                </div>
                                                <br></br>

                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Input new password :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={e => { setNewPassword(e.target.value) }} />
                                                    </div>           
                                                    
                                                </div>
                                                <br></br>

                                                <div className="row">
                                                    <div className="col">
                                                        <label style={{ textAlign: 'left' }}>Input confirmation password :</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="password" className="form-control" id="newConfirmPassword" value={newConfirmPassword} onChange={e => { setConfirmPassword(e.target.value) }} />
                                                    </div>           
                                                    
                                                </div>
                                            </div>

                                        </Modal.Body>
                                        <Modal.Footer>

                                            <Button variant="primary" onClick={changePasswordUser}>
                                                Change Password
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