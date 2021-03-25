import React, { Component, Fragment } from 'react'
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import { getUsersDetail } from '../../../actions/UsersAction';
import FormEditUser from '../../../components/Admin/FormComponent/FormEditUser'

class EditUser extends Component {
    componentDidMount() {
        this.props.dispatch(getUsersDetail(this.props.match.params.no))
        console.log(getUsersDetail(this.props.match.params.no))
    }
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
                                <FormEditUser />
                            </Container>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect()(EditUser);
