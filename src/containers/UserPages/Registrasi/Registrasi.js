import React, { Component, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Registrasi.css';
import logo from '../../../assets/Logouser.png';
import { Link, withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const defaultState = {
    fullname:null,
    email:null,
    password:null,
    confirmpassword:null,
    address:null,
}

class Registrasi extends Component {

    constructor(){
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

    validate(){
        let fullnameError = "";
        let emailError = "";
        let passwordError = "";
        let confirmpasswordError = "";
        let addressError = "";

        if(this.state.fullname==null || this.state.fullname==''){
            fullnameError = "Full name field is required";
        }

        if(this.state.email ==null || this.state.email==''){
            emailError = "Email field is required";
        }

        if(this.state.password ==null || this.state.password==''){
            passwordError = "Password field is required";
        }

        if(this.state.confirmpassword ==null || this.state.confirmpassword==''){
            confirmpasswordError = "Password Confirmation field is required";
        }

        if(this.state.address ==null || this.state.address==''){
            addressError = "Address field is required";
        }




        this.setState({fullnameError, emailError, passwordError, confirmpasswordError,addressError });
        if(fullnameError!= "" || emailError != "" || passwordError != "" || confirmpasswordError || addressError ){
            
            return false;
        }
        return true;
    }

    submit(){
        if(this.validate()){
            console.warn(this.state);
            this.setState(defaultState);
            this.props.history.push('/Loginuser')
        }
    }
    render() {
        return (
            
            <Fragment>
                <div className="card shadow mx-5 my-5 containeruser ">
                    <div className="container">
                        <div className="row">
                        <div className="col-md-6">
                            <img src={logo} style={{
                                height:250,
                            }}/> 
                            <br />
                            <label>Belum Punya Akun?</label><br />
                            <Link to='/'><a button type="button" className="btn btn-outline-success my-3"
                            style={{width: 250}}>Sign in</a></Link>

                        </div>

                        <div className="col-md-6">
                            <div className="card justify-content-center mb-5 col-regist" >

                            <div className="card-body">
                            <h2 className="card-title text-center">REGISTER</h2>
                            
                                <div className="form-group">
                                    <label>Full name</label>
                                    <input type="text" className="form-control" id="usernameLogin" name="fullname"  value={this.state.fullname} onChange={this.handleInputChange}/>
                                    <span className="text-danger">{this.state.fullnameError}</span><br />
                                    
                                    <label>Email</label>
                                    <input type="text" className="form-control" id="usernameLogin" name="email"  value={this.state.email} onChange={this.handleInputChange}/>
                                    <span className="text-danger">{this.state.emailError}</span><br />

                                    <label>Password</label>
                                    <input type="password" className="form-control" id="passwordLogin" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                    <span className="text-danger">{this.state.passwordError}</span><br />


                                    <label>Password Confirmation</label>
                                    <input type="password" className="form-control" id="passwordLogin" name="confirmpassword" value={this.state.confirmpassword} onChange={this.handleInputChange} />
                                    <span className="text-danger">{this.state.confirmpasswordError}</span><br />

                                    <label>Address</label>
                                    <input type="password" className="form-control" id="passwordLogin" name="address" value={this.state.address} onChange={this.handleInputChange} />
                                    <span className="text-danger">{this.state.addressError}</span><br />

                                    <button type="submit" class="btn btn-success mt-4" onClick={()=>this.submit()}
                                        style={{width: '100%'}}>Login</button>
                                </div>
                            
                        </div>

                            </div>

                        </div>


                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Registrasi;