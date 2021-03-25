import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import logo from '../../../assets/Logouser.png';

class ProfilePicture extends Component {

    render() {
        return (
            <Fragment>
                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column" style={{ alignItems: 'center' }}>
                                            <img src={logo} style={{
                                                height: 200,
                                            }} />
                                            <div className="mt-3">
                                                <h4>Hello, Bernadetha</h4>
                                                <h6>Member DYNTeam</h6>
                                                <p class="text-muted font-size-sm">Semarang, Indonesia</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
            </Fragment>
        )
    }
}

export default ProfilePicture;