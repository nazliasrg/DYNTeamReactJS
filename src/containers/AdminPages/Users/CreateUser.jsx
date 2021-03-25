import React, { Component, Fragment } from 'react'
import { Container } from 'reactstrap'
import FormCreateUser from '../../../components/Admin/FormComponent/FormCreateUser'
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent'
import { connect } from 'react-redux'
import { postUserCreate } from '../../../actions/UsersAction'
import swal from 'sweetalert'

const mapStateToProps = (state) => {
    return {
        getResponDataUser: state.users.getResponDataUser,
        errorResponDataUser: state.users.errorResponDataUser
    }
}

class CreateUser extends Component {

    handleSubmit = (data) => {
        this.props.dispatch(postUserCreate(data))
    }

    render() {
        if (this.props.getResponDataUser || this.props.errorResponDataUser) {
            if (this.props.errorResponDataUser) {
                swal("Failed!", this.props.errorResponDataUser, "error")
            }
            else {
                swal("User Created!", this.props.getResponDataUser.id_user, "success")
                    .then((value) => {
                        const { history } = this.props;
                        history.push('/users');
                    });
            }
        }

        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />

                        <div className="card shadow mb-4">
                            <Container>
                                <h6 className="mt-5">Create User</h6>
                                <FormCreateUser onSubmit={(data) => this.handleSubmit(data)} />
                            </Container>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, null)(CreateUser);
