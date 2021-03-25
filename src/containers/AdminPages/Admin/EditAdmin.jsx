import React, { Component, Fragment } from 'react'
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import { getAdminDetail } from '../../../actions/AdminAction'
import FormEditAdmin from '../../../components/Admin/FormComponent/FormEditAdmin'
import swal from 'sweetalert'

class EditAdmin extends Component {

    componentDidMount() {
        this.props.dispatch(getAdminDetail(this.props.match.params.no))
        console.log(getAdminDetail(this.props.match.params.no))
    }

    render() {
        if (this.props.getResponDataAdmin) {
            swal("Admin Updated!", this.props.getResponDataAdmin.id_role, "success")
                .then((value) => {
                    const { history } = this.props;
                    history.push('/admin-role');
                });
        }
        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />
                        <div className="card shadow mb-4">
                            <Container>
                                <h6 className='mt-4'>Edit Admin</h6>
                                <FormEditAdmin />
                            </Container>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect()(EditAdmin)
