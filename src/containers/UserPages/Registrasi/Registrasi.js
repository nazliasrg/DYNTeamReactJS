import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Registrasi.css';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Col, Row } from 'react-bootstrap';

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


    selectedFile: null,
    //SELECT DATA PROVINSI
    provinceList: [],
    selectedProvince: 'Select',
    selectedProvinceId: 1,

    //SELECT DATA KABUPATEN
    cityList: [],
    selectedCity: 'Select',
    selectedCityId: 1,

    //SELECT DATA KECAMATAN
    districtsList: [],
    selectedDistricts: 'Select',
    selectedDistrictsId: 1


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
            countryError = "Districts field is required";
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


    provinsi() {
        axios
            .get('http://localhost:7070/api/dynteam/auth/user/provinsi-all')
            .then(res => {

                var status = res.data.status;
                var message = res.data.message;

                if (status == 200) {
                    this.setState({
                        provinceList: res.data.data
                    })
                }
                else {
                    NotificationManager.error(message);
                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    provinceChange = async (event) => {
        if (event.detail === 0) {
            await console.log(event.target.value)
            await this.setState({
                selectedProvinceId: event.target.value,
                province: event.target[event.target.selectedIndex].text
            })
        }
        await this.city(this.state.selectedProvinceId);
    }

    city = (selectedProvinceId) => {
        axios
            .get('http://localhost:7070/api/dynteam/auth/user/kabupaten-all/' + selectedProvinceId)
            .then(res => {
                var status = res.data.status;
                var message = res.data.message;

                if (status == 200) {

                    this.setState({
                        cityList: res.data.data
                    })
                }
                else {
                    NotificationManager.error(message);
                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    cityChange = async (event) => {
        if (event.detail === 0) {
            await console.log(event.target.value)
            await this.setState({
                selectedCityId: event.target.value,
                city: event.target[event.target.selectedIndex].text
            })
        }
        await this.districts(this.state.selectedCityId);
    }

    districts(cityId) {
        axios
            .get('http://localhost:7070/api/dynteam/auth/user/kecamatan-all/' + cityId)
            .then(res => {
                var status = res.data.status;
                var message = res.data.message;

                if (status == 200) {
                    this.setState({
                        districtsList: res.data.data
                    })
                }
                else {
                    NotificationManager.error(message);
                }

            })
            .catch(error => {
                console.log(error)
            })

    }

    districtsChange = async (event) => {
        if (event.detail === 0) {
            await console.log(event.target.value)
            await this.setState({
                selectedDistrictsId: event.target.value,
                districts: event.target[event.target.selectedIndex].text,
                country: event.target[event.target.selectedIndex].text
            })
        }

    }

    componentDidMount = async () => {
        await this.provinsi();
    }


    render() {

        const mystyle = {
            height: "80px"
        };

        const { provinceList, cityList, districtsList } = this.state;

        return (

            <Fragment>
                <div className="card shadow mx-5 my-5 containeruser ">
                    <Row className="ml-3">
                        <Col md={4} className="justify-content-end ml-5 mt-5">
                            <div className="ml-5 mt-5">
                                <img className="ml-5 mt-5 mb-3" src={logo} style={mystyle} />
                                <br />
                                <label className="ml-4">Sudah Punya Akun?</label>
                            </div>
                            <br />
                            <Link to='/'><a button type="button" className="btn btn-outline-info ml-4"
                                style={{ width: 250 }}>Sign in</a></Link>
                        </Col>
                        <Col md={7}>
                            <div className="card justify-content-center " >
                                <div className="card-body">
                                    <h2 className="card-title text-center">REGISTRATION</h2>

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
                                                <label>Province</label>
                                                <select class="form-control" name="provinceId" id="provinceIId" onClick={this.provinceChange} required>
                                                    {
                                                        provinceList.map(provinceVal => {
                                                            return (
                                                                <option value={provinceVal.id}>{provinceVal.nama}</option>
                                                            )
                                                        })
                                                    }
                                                </select>

                                                <span className="text-danger">{this.state.provinceError}</span><br />
                                            </div>

                                            <div className="col-md-4">
                                                <label>City</label>
                                                <select class="form-control" name="cityId" id="cityIId" onClick={this.cityChange} required>
                                                    {
                                                        cityList.map(cityVal => {
                                                            return (
                                                                <option value={cityVal.id}>{cityVal.nama}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className="text-danger">{this.state.cityError}</span><br />
                                            </div>

                                            <div className="col-md-4">
                                                <label>Districts</label>
                                                <select class="form-control" name="districtsId" id="districtsIId" onClick={this.districtsChange} required>
                                                    {
                                                        districtsList.map(districsVal => {
                                                            return (
                                                                <option value={districsVal.id}>{districsVal.nama}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
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
                                                <input className="btn btn-light" type="file" onChange={this.onFileChange} style={{ width: 300 }} />
                                            </div>
                                        </div>

                                        <button type="submit" class="btn btn-login mt-4" onClick={() => this.submit()}
                                            style={{ width: '100%' }}>Registration</button>
                                    </div>

                                </div>

                            </div>
                        </Col>
                    </Row>
                </div>
            </Fragment>
        )
    }
}

export default Registrasi;