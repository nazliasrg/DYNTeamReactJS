import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Registrasi.css';
import logo from '../../../assets/Logouser.png';
import { Link, withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const defaultState = {
    fullname: null,
    email: null,
    username: null,
    password: null,
    phoneNumber: null,
    facebook: null,
    instagram: null,
    twitter: null,
    city: null,
    province: null,
    country: null,
    street: null,
    profPic: null,

    selectedFile: null

}

class Registrasi extends Component {

    constructor() {
        super();
        this.state = defaultState;
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    validate() {
        let fullnameError = "";
        let emailError = "";
        let usernameError = "";
        let passwordError = "";
        let phoneNumberError = "";
        let facebookError = "";
        let instagramError = "";
        let twitterError = "";
        let cityError = "";
        let provinceError = "";
        let countryError = "";
        let streetError = "";

        if (this.state.fullname == null || this.state.fullname == '') {
            fullnameError = "Full name field is required";
        }

        if (this.state.email == null || this.state.email == '') {
            emailError = "Email field is required";
        }
        if (this.state.username == null || this.state.username == '') {
            usernameError = "Username field is required";
        }

        if (this.state.password == null || this.state.password == '') {
            passwordError = "Password field is required";
        }

        if (this.state.phoneNumber == null || this.state.phoneNumber == '') {
            phoneNumberError = "Phone Number Confirmation field is required";
        }

        if (this.state.facebook == null || this.state.facebook == '') {
            facebookError = "Facebook field is required";
        }
        if (this.state.instagram == null || this.state.instagram == '') {
            instagramError = "Facebook field is required";
        }

        if (this.state.facebook == null || this.state.facebook == '') {
            facebookError = "Facebook field is required";
        }
        if (this.state.twitter == null || this.state.twitter == '') {
            twitterError = "Twitter field is required";
        }
        if (this.state.city == null || this.state.city == '') {
            cityError = "City field is required";
        }
        if (this.state.province == null || this.state.province == '') {
            provinceError = "Province field is required";
        }
        if (this.state.country == null || this.state.country == '') {
            countryError = "Country field is required";
        }
        if (this.state.street == null || this.state.street == '') {
            streetError = "Street field is required";
        }

        this.setState({
            fullnameError, emailError, usernameError, passwordError, phoneNumberError, facebookError, instagramError,
            twitterError, cityError, provinceError, countryError, streetError
        });
        if (fullnameError != "" || emailError != "" || usernameError != "" || passwordError != "" || phoneNumberError != "" ||
            facebookError != "" || instagramError != "" || twitterError != "" || cityError != "" || provinceError != "" || countryError != "" ||
            streetError != ""
        ) {

            return false;
        }
        return true;
    }
    //Untuk ganti filenya
    onFileChange = event => {
        // Update the state 
        this.setState({ selectedFile: event.target.files[0] });
    };

    //Untuk upload foto user
    onFileUpload = (userId) => {
        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
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
                this.props.history.push('/')
                
            })
            .catch(error => {
                console.log(error)
            })
    };

    submit() {
        if (this.validate()) {
            const address = {
                city: this.state.city,
                province: this.state.province,
                country: this.state.country,
                street: this.state.street
            }
            const detailUser = {
                fullname: this.state.fullname,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber

            }
            const medsos = {
                facebook: this.state.facebook,
                instagram: this.state.instagram,
                twitter: this.state.twitter
            }

            const user = {
                username: this.state.username,
                password: this.state.password,
                addressUserDto: address,
                socialMediaDto: medsos,
                detailUserDto: detailUser
            }


            axios
                .post('http://localhost:7070/api/dynteam/auth/user/regis', user)
                .then(res => {
                    var status = res.data.status;
                    var message = res.data.message;
                    if (status == 200) {
                        var userId = res.data.data.userId;
                        this.onFileUpload(userId);
                        this.setState(defaultState);
                        NotificationManager.success(message);

                    } else {
                        NotificationManager.error(message);

                    }
                })
                .catch(error => {
                    console.log(error)
                })


        }
    }
    render() {
        return (

            <Fragment>
                <div className="card shadow mx-5 my-5 containeruser ">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-4">
                                <img src={logo} style={{
                                    height: 250,
                                }} />
                                <br />
                                <label>Sudah Punya Akun?</label><br />
                                <Link to='/'><a button type="button" className="btn btn-outline-success my-3"
                                    style={{ width: 250 }}>Sign in</a></Link>

                            </div>

                            <div className="col-md-8">
                                <div className="card justify-content-center mb-5 col-regist" >

                                    <div className="card-body">
                                        <h2 className="card-title text-center">REGISTER</h2>

                                        <div className="form-group">

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Full name</label>
                                                    <input type="text" className="form-control" id="fullname" name="fullname" value={this.state.fullname} onChange={this.handleInputChange} />
                                                    <span className="text-danger">{this.state.fullnameError}</span><br />
                                                </div>

                                                <div className="col-md-6">
                                                    <label>Email</label>
                                                    <input type="text" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                                                    <span className="text-danger">{this.state.emailError}</span><br />
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label>Username</label>
                                                    <input type="text" className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleInputChange} />
                                                    <span className="text-danger">{this.state.usernameError}</span><br />
                                                </div>

                                                <div className="col-md-4">
                                                    <label>Password</label>
                                                    <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                                    <span className="text-danger">{this.state.passwordError}</span><br />
                                                </div>

                                                <div className="col-md-4">
                                                    <label>Phone Number</label>
                                                    <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInputChange} />
                                                    <span className="text-danger">{this.state.phoneNumberError}</span><br />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label>Facebook</label>
                                                    <input type="text" className="form-control" id="facebook" name="facebook" value={this.state.facebook} onChange={this.handleInputChange} />
                                                    <span className="text-danger">{this.state.facebookError}</span><br />
                                                </div>

                                                <div className="col-md-4">
                                                    <label>Instagram</label>
                                                    <input type="text" className="form-control" id="instagram" name="instagram" value={this.state.instagram} onChange={this.handleInputChange} />
                                                    <span className="text-danger">{this.state.instagramError}</span><br />
                                                </div>

                                                <div className="col-md-4">
                                                    <label>Twitter</label>
                                                    <input type="text" className="form-control" id="twitter" name="twitter" value={this.state.twitter} onChange={this.handleInputChange} />
                                                    <span className="text-danger">{this.state.twitterError}</span><br />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label>City</label>
                                                    <input type="text" className="form-control" id="city" name="city" value={this.state.city} onChange={this.handleInputChange} />
                                                    <span className="text-danger">{this.state.cityError}</span><br />
                                                </div>

                                                <div className="col-md-4">
                                                    <label>Province</label>
                                                    <input type="text" className="form-control" id="province" name="province" value={this.state.province} onChange={this.handleInputChange} />
                                                    <span className="text-danger">{this.state.provinceError}</span><br />
                                                </div>

                                                <div className="col-md-4">
                                                    <label>Country</label>
                                                    <input type="text" className="form-control" id="country" name="country" value={this.state.country} onChange={this.handleInputChange} />
                                                    <span className="text-danger">{this.state.countryError}</span><br />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Street</label>
                                                    <input type="text" className="form-control" id="street" name="street" value={this.state.street} onChange={this.handleInputChange} />
                                                    <span className="text-danger">{this.state.streetError}</span><br />
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="mx-1">Choose profile picture : </label>
                                                    <input className="btn btn-outline-primary" type="file" onChange={this.onFileChange} style={{ width: 300 }} />
                                                    {/* <button className="btn btn-outline-primary" onClick={this.onFileUpload}>
                                                        Choose File
                                                    </button> */}
                                                </div>
                                            </div>



                                            <button type="submit" class="btn btn-success mt-4" onClick={() => this.submit()}
                                                style={{ width: '100%' }}>Registration</button>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <NotificationContainer />
                </div>
            </Fragment>
        )
    }
}

export default Registrasi;