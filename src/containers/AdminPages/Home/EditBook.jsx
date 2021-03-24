import React, { Component, Fragment } from 'react'
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent'

export default class EditBook extends Component {
    render() {
        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />

                        <div className="card shadow mb-4">
                            <h1>Edit Book</h1>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}
