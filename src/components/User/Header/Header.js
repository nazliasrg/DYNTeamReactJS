import React, { Component, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { ModalFooter } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends Component{
    render(){
        return(
            <Fragment>
                <header id="profilePage">
                    <div className="nav-container" id="navbar2">
        
                        <div id="myNav" className="overlayNav">
                            
                            <div className="overlayNav-content">
                            <Link className="link" to="/">Home</Link>
                            <Link className="link" to="/Catalogue">Catalogue</Link>
                            <Link className="link" to="/Location">Location</Link>
                            <Link className="link" to="/Profileuser">Profile</Link>
                            <Link className="link" to="/Login">Logout</Link>
                            </div> 
                         </div>

                         <span className="cursor" onClick="openNav()">&#9776;</span>
                         <div className="logo1">
                             
                        </div>
                    </div>
                </header>




                

            </Fragment>
        )
    }
}

export default Header;