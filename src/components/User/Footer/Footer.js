import React, { Component, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import { ModalFooter } from 'react-bootstrap';


class Footer extends Component {
    render(){
        return (
            <Fragment>
                <div className="footer-dark">
                    <div className = "container">
                        <div className = "row">
                            <div className = "col-sm-6 col-md-3 item">
                                <h3>DYN Library</h3>
                                <ul>
                                    <li>Web Design</li>
                                    <li>Development</li>
                                    <li>Hosting</li>
                                </ul>
                            </div>

                            <div className = "col-sm-6 col-md-3 item">
                                <h3>About</h3>
                                <ul>
                                    <li>Company</li>
                                    <li>Team</li>
                                    <li>Career</li>
                                </ul>
                            </div>

                            <div className = "col-md-6 item text">
                                <h3>DYN Team</h3>
                                <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                scrambled it to make a type specimen book. 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Footer;