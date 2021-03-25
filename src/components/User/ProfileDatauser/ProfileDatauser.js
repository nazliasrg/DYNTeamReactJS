import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom';

class ProfileDatauser extends Component {

    render() {
        return (
            <Fragment>
                <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Full Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                Bernadetha Yona Astikasari
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                yonaastika1507@gmail.com
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                024 7478783
                                             </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Mobile</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                081 111 222 333
                                        </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Address</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                Jatiluhur Barat V nomor 13, Semarang
                                        </div>
                                        </div>
                                    </div>

            </Fragment>
        )
    }
}

export default ProfileDatauser;








