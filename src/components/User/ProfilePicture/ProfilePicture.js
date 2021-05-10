import React, { Component, Fragment, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../../assets/Logouser.png';
import {ReactSession} from 'react-client-session';
import axios from 'axios';


ReactSession.setStoreType("localStorage");

class ProfilePicture extends Component {
    userId = '';

    constructor(){

        super();
        this.state = {dataUser:''}
        this.fileUpload = React.createRef();
        this.showFileUpload = this.showFileUpload.bind(this);
    }
    authHeader = () => {
        
        const user = JSON.parse(localStorage.getItem('data_user'));
        console.log("yona" +user)

        if (user && user.data.token) {
            return {
                'authorization': `Bearer ${user.data.token}`
            }
        }
        else {
            return null;
        }
    }

    componentDidMount() {
        var dataUser = localStorage.getItem('data_user');

        if(dataUser != null){
            const user = JSON.parse(localStorage.getItem('data_user'));
            this.userId = user.data.userId;

            this.setState({
            dataUser:user.data.username
            });
            this.getProfilPicture();

        }
        
     }

    getProfilPicture = async () => {

        axios
            .get('http://localhost:7070/api/dynteam/auth/user/' + this.userId ,{
                headers:this.authHeader()
            })
            .then(res => {
                console.log(res.data);
                this.setState({
                    userPhoto : 'http://localhost:7070/api/dynteam/auth/user/download/' +res.data.detailUserEntity.userPhoto 
                });

            })
            .catch(error => {
                console.log(error);
            })

    }
    onFileChange = event => {
        // Update the state 
     
        this.setState({
            selectedFile:event.target.files[0]
        })

        this.onFileUpload(this.userId, event.target.files[0])
    };

    showFileUpload() {
        this.fileUpload.current.click();
      }

      //Untuk edit foto user
    onFileUpload = (userId, file) => {
        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "file",
            file,
            file.name
        );

        formData.append(
            "userId",
            userId

        );

        // Details of the uploaded file 
        console.log(this.state.selectedFile);

        // Request made to the backend api 
        // Send formData object 

        axios
            .post('http://localhost:7070/api/dynteam/auth/user/uploadProfile', formData)
            .then(res => {
                window.location.reload();

            })
            .catch(error => {
                console.log(error)
            })
    };


    render() {
        
        return (
            <Fragment>
                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column" style={{ alignItems: 'center' }}>
                                        <input type="file" id="my_file"
                                            style={{ display: "none" }}
                                            ref={this.fileUpload} onChange={this.onFileChange} >
                                            
                                        </input>

                                        <img src={this.state.userPhoto} onClick={this.showFileUpload} style={{
                                                    height: 200, width:200
                                                }} />                                        
                                        
                                            <div className="mt-3">
                                                <h4>Hello, {this.state.dataUser}</h4>
                                                <h6>Member DYNTeam</h6>

                                            </div>
                                        </div>
                                    </div>
                                </div>
            
            </Fragment>
        )
    }
}

export default ProfilePicture;