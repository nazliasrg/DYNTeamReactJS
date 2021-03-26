import React, { Component, Fragment, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../../assets/Logouser.png';
import {ReactSession} from 'react-client-session';


ReactSession.setStoreType("localStorage");

class ProfilePicture extends Component {

    constructor(){

        super();
        this.state = {dataUser:''}
    }

    componentDidMount() {
        this.setState({
            dataUser:(ReactSession.get("username"))
        });

     }

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
                                                <h4>Hello, {this.state.dataUser}</h4>
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