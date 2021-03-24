import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const handleSidebar = () => {
    $('#sidebar').toggleClass('active');
}

const NavbarComponent = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button
                    type="button"
                    id="sidebarCollapse"
                    className="btn btn-light"
                    onClick={handleSidebar}
                >
                    <span className="cursor">&#9776;</span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link href={"#"} className="nav-link text-muted">
                                <i className="fa-fw fas fa-user text-muted"></i>
                                &nbsp;Administrator
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;
