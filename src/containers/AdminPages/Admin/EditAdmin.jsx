import React, { Component, Fragment } from 'react'
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent'
import BackComponent from '../../../components/Admin/Button/BackComponent'

export default class EditAdmin extends Component {
    render() {
        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />
                        <BackComponent />
                        <div className="card shadow mb-4">
                            <h1>Edit Admin</h1>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}
