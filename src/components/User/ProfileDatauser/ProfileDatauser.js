import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import axios from 'axios';

const defaultState = {
    fullname: null,
    email: null,
    phoneNumber: null

}

class ProfileDatauser extends Component {
    constructor() {
        super();
        this.state = defaultState;
    }
    componentDidMount() {
        this.getDataProfile();
    }
    componentDidUpdate() {

    }

    getDataProfile(){
        var userId = ReactSession.get("userId");
        console.log("tes "+userId);

             axios
             .get('http://localhost:7070/api/dynteam/auth/user/' + userId)
             .then(res => {
                var dataProfile = res.data.detailUserEntity;
                this.setState ({
                    fullname: dataProfile.fullname,
                    email: dataProfile.email,
                    phoneNumber: dataProfile.phoneNumber
                })
                
             })
             .catch(error => {
                console.log(error)
             })

    }



    render() {
        return (
            <Fragment>
                <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Full Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                            {this.state.fullname}
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                            {this.state.email}
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                            {this.state.phoneNumber}
                                             </div>
                                        </div>
                                    </div>

            </Fragment>
        )
    }
}

export default ProfileDatauser;








