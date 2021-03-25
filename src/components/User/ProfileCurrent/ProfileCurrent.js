import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import coverbook from '../../../assets/B001.jpeg';


class ProfileCurrent extends Component {

    render() {
        return (
            <Fragment>

                <div className="container">
                    <div classname="row text-center">
                        <h2 className="pageTitle">
                            C&nbsp;U&nbsp;R&nbsp;R&nbsp;E&nbsp;N&nbsp;T&nbsp;&nbsp;B&nbsp;O&nbsp;O&nbsp;K
                        </h2>
                    </div>
                    <div className="row mx-6 my-3" id="onprogressbook">
                        <div className="col-sm-3 mb-2">
                            <div className="card coverBook">
                                <img src={coverbook} className="img-thumbnail" />
                                <Button variant="primary">
                                    Information
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ProfileCurrent;