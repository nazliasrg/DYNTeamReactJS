import React, { Component, Fragment } from 'react'
import BackComponent from '../../../components/Admin/Button/BackComponent'
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent'

export default class CreateAdmin extends Component {
    render() {
        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />
                        <BackComponent />

                        <div className="card shadow mb-4">
                            <h1>Create Admin</h1>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}
