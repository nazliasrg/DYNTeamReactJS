import React, { Component, Fragment } from 'react'
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent'
import { Container } from 'reactstrap'

class EditUser extends Component {

    render() {

        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />

                        <div className="card shadow mb-4">
                            <Container>
                                <h6 className='mt-4'>Edit User</h6>
                            </Container>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default EditUser;
