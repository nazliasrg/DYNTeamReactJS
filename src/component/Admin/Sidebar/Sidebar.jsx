import React, { Component, Fragment } from 'react';
import logo from '../../../containers/assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';

class Sidebar extends Component{

    render(){
        return(
            <Fragment>
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <img className="logo" src={logo} alt=""/>
                    </div>

                    {SidebarData.map((item, index) => {
                return <SubMenu item={item} key={index} />;
                })}
                </nav>
            </Fragment>
        )
    }
}

export default Sidebar;