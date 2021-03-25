import React, { Component, Fragment } from 'react'
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import { deleteDataAdmin, postAdminCreate } from '../../../actions/AdminAction'
import { Container } from 'reactstrap'
import FormCreateAdmin from '../../../components/Admin/FormComponent/FormCreateAdmin'

const mapStateToProps = (state) => {
    return {
        getResponDataAdmin: state.adminRole.getResponDataAdmin,
        errorResponDataAdmin: state.adminRole.errorResponDataAdmin
    }
}

class CreateAdmin extends Component {

    componentDidMount() {
        this.props.dispatch(deleteDataAdmin());
    }

    handleSubmit = (data) => {
        this.props.dispatch(postAdminCreate(data))
    }

    render() {

        if (this.props.getResponDataAdmin || this.props.errorResponDataAdmin) {
            if (this.props.errorResponDataAdmin) {
                swal("Failed!", this.props.errorResponDataAdmin, "error")
            }
            else {
                swal("Admin Created!", this.props.getResponDataAdmin.id_role, "success")
                    .then((value) => {
                        const { history } = this.props;
                        history.push('/admin-role');
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
                                <h6 className='mt-4'>Create Admin</h6>
                                <FormCreateAdmin onSubmit={(data) => this.handleSubmit(data)} />
                            </Container>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, null)(CreateAdmin)
