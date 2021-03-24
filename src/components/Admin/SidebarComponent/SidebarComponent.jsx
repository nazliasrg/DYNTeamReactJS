import React, { Component, Fragment } from 'react';
import logo from '../../../assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';

class SidebarComponent extends Component {

    render() {
        return (
            <Fragment>
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <div className="row justify-content-center">
                            <img className="logo" src={logo} alt="" />
                        </div>
                    </div>

                    {SidebarData.map((item, index) => {
                        return <SubMenu item={item} key={index} />;
                    })}
                </nav>
            </Fragment>
        )
    }
}

export default SidebarComponent;